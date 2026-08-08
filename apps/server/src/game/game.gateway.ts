import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { BaziGBEngine, Game, GameState } from '@bazigb/engine';
import { TicTacToe } from '@bazigb/game-tic-tac-toe';
import { ChessGame } from '@bazigb/game-chess';
import { Backgammon } from '@bazigb/game-backgammon';
import { Vegas } from '@bazigb/game-vegas';
import { RoomService, getMaxPlayers, getMinPlayers, RoomWithParsedData } from '../rooms/room.service';
import { HistoryService } from '../history/history.service';

/** Registry of playable games keyed by the room's `gameType`. */
const GAMES: Record<string, Game> = {
  'tic-tac-toe': TicTacToe,
  chess: ChessGame,
  backgammon: Backgammon,
  vegas: Vegas,
};

/** Resolve the game plugin for a room, falling back to Tic-Tac-Toe. */
function resolveGame(gameType?: string): Game {
  return (gameType && GAMES[gameType]) || TicTacToe;
}

/** Maximum length of a chat message, in characters. */
const MAX_CHAT_LENGTH = 500;

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  /**
   * socketId -> authenticated user id. Populated when a client joins a room
   * with a valid JWT, so finished games can be recorded against the real user
   * account (profile stats / ELO) instead of anonymous socket ids.
   */
  private readonly socketUsers = new Map<string, string>();

  constructor(
    private readonly roomService: RoomService,
    private readonly historyService: HistoryService,
    private readonly jwtService: JwtService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  /** Resolve socket ids to authenticated user ids (falls back to the id itself). */
  private resolveUserIds(socketIds: string[]): string[] {
    return socketIds.map((id) => this.socketUsers.get(id) ?? id);
  }

  /** Try to authenticate the client with the JWT attached to the join payload. */
  private async bindUser(client: Socket, token?: string) {
    if (!token) return;
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      if (payload?.sub) {
        this.socketUsers.set(client.id, payload.sub);
        console.log(`Socket ${client.id} bound to user ${payload.sub}`);
      }
    } catch {
      // Invalid/expired token — the socket just stays anonymous.
    }
  }

  /**
   * Emit a system message to the whole room (players and spectators).
   */
  private emitSystemMessage(
    roomCode: string,
    message: string,
    userId?: string,
    type = 'info',
  ) {
    this.server.to(roomCode).emit('systemMessage', {
      type,
      message,
      userId,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    // Accept both the legacy plain-string form and { roomCode, gameType, token }.
    @MessageBody() payload: string | { roomCode: string; gameType?: string; token?: string },
  ) {
    const roomCode = typeof payload === 'string' ? payload : payload?.roomCode;
    const gameType = typeof payload === 'string' ? undefined : payload?.gameType;
    if (!roomCode) return;

    await this.bindUser(client, typeof payload === 'string' ? undefined : payload?.token);

    try {
      let room = await this.roomService.getRoom(roomCode);
      const state = room?.currentState ?? null;
      const connectedIds = new Set(
        this.server.sockets.adapter.rooms.get(roomCode) ?? [],
      );

      // 1) Create the room when it does not exist (first joiner is seated).
      if (!room) {
        room = await this.roomService.joinRoom(roomCode, client.id, gameType);
      } else if (room.players.includes(client.id)) {
        // 2) Already seated — re-join is a no-op.
      } else if (room.status === 'waiting' && room.players.length < getMaxPlayers(room.gameType)) {
        // 3) Free seat in a waiting room -> seat the client as a player.
        try {
          room = await this.roomService.joinRoom(roomCode, client.id, gameType);
        } catch {
          // Lost the race for the last seat -> fall through as a spectator.
          room = (await this.roomService.getRoom(roomCode)) ?? room;
        }
      } else if (room.status === 'playing' && state) {
        // 4) Reconnection mid-game: a stale socket id (their pre-refresh
        //    connection) may still own a seat in ctx.players. Swap it for the
        //    fresh socket so turns keep flowing and they are a player again.
        const stale = state.ctx.players.find(
          (p) => p !== client.id && !connectedIds.has(p),
        );
        if (stale) {
          const nextState: GameState = {
            ...state,
            ctx: {
              ...state.ctx,
              players: state.ctx.players.map((p) => (p === stale ? client.id : p)),
              currentPlayer:
                state.ctx.currentPlayer === stale ? client.id : state.ctx.currentPlayer,
            },
          };
          await this.roomService.saveState(roomCode, nextState);
          room =
            (await this.roomService.swapPlayer(roomCode, stale, client.id)) ??
            (await this.roomService.getRoom(roomCode));
          // The stale id was already removed from room.players on disconnect —
          // re-seat the fresh socket so the room sees 2 players again.
          if (room && !room.players.includes(client.id)) {
            room = await this.roomService.joinRoom(roomCode, client.id, gameType);
          }
          this.server.to(roomCode).emit('gameState', nextState);
          console.log(
            `Reconnection in room ${roomCode}: swapped stale socket ${stale} -> ${client.id}`,
          );
        }
      }
      // Otherwise (waiting-but-full, playing with live players, finished) the
      // client joins as a spectator: they receive state + broadcasts but are
      // never seated in `room.players`.

      room = room ?? (await this.roomService.getRoom(roomCode));
      if (!room) return; // the room vanished mid-join

      const isSpectator = !room.players.includes(client.id);

      client.join(roomCode);
      console.log(
        `Client ${client.id} joined room ${roomCode} as ${
          isSpectator ? 'spectator' : 'player'
        }. Total seated players: ${room.players.length}`,
      );

      // Social: announce the arrival and keep spectators in sync on seats/status.
      this.emitSystemMessage(
        roomCode,
        isSpectator
          ? `User ${client.id} is now spectating`
          : `User ${client.id} joined the game`,
        client.id,
        isSpectator ? 'spectate' : 'join',
      );
      this.server.to(roomCode).emit('roomUpdate', {
        code: roomCode,
        players: room.players,
        status: room.status,
      });

      // Two-player games auto-start once the minimum number of players is
      // seated. Vegas waits for the room owner's explicit START command so
      // 2–5 players can join first (see handleStartGame).
      const shouldStart =
        room.gameType !== 'vegas' &&
        room.players.length >= getMinPlayers() &&
        room.status === 'waiting' &&
        !room.currentState;

      if (shouldStart) {
        const game = resolveGame(room.gameType);
        const initialState = BaziGBEngine.createInitialState(game, room.players);
        await this.roomService.startGame(roomCode, initialState);
        this.server.to(roomCode).emit('gameState', initialState);
        this.emitSystemMessage(roomCode, 'The game has started', undefined, 'gameStart');
        console.log(`Game started in room ${roomCode}`);
      } else if (room.currentState) {
        // Late joiner / reconnection / spectator: send the current state.
        client.emit('gameState', room.currentState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }

  /**
   * When a socket drops (refresh, tab close, network blip) its stale id is
   * removed from every room it was seated in. Otherwise the room looks full
   * forever and a reloading player is admitted as a spectator.
   */
  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.socketUsers.delete(client.id);

    let rooms: RoomWithParsedData[] = [];
    try {
      rooms = await this.roomService.listRooms();
    } catch {
      return;
    }

    for (const room of rooms) {
      if (!room.players.includes(client.id)) continue;
      try {
        const updated = await this.roomService.removePlayer(room.code, client.id);
        if (updated && !updated.players.includes(client.id)) {
          this.server.to(room.code).emit('roomUpdate', {
            code: room.code,
            players: updated.players,
            status: updated.status,
          });
          this.emitSystemMessage(
            room.code,
            `User ${client.id} left the game`,
            client.id,
            'leave',
          );
        }
      } catch {
        // Ignore per-room cleanup errors — the room simply keeps the stale id.
      }
    }
  }

  /**
   * Vegas: the room owner (or any seated player when the owner is gone)
   * explicitly starts the game with ALL currently seated players.
   */
  @SubscribeMessage('startGame')
  async handleStartGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const { room: roomCode } = data;
    const roomRecord = await this.roomService.getRoom(roomCode);
    if (!roomRecord || roomRecord.status !== 'waiting' || roomRecord.currentState) return;
    if (roomRecord.players.length < getMinPlayers()) {
      client.emit('error', 'Need at least 2 players to start');
      return;
    }

    const ownerLive = roomRecord.ownerId
      ? (this.server.sockets.adapter.rooms.get(roomCode) ?? new Set()).has(roomRecord.ownerId)
      : false;
    const isOwner = roomRecord.ownerId === client.id || (roomRecord.ownerId && !ownerLive);
    if (!isOwner || !roomRecord.players.includes(client.id)) {
      client.emit('error', 'Only the room owner can start the game');
      return;
    }

    const game = resolveGame(roomRecord.gameType);
    const initialState = BaziGBEngine.createInitialState(game, roomRecord.players);
    await this.roomService.startGame(roomCode, initialState);
    this.server.to(roomCode).emit('gameState', initialState);
    this.emitSystemMessage(
      roomCode,
      `The game has started with ${roomRecord.players.length} players`,
      undefined,
      'gameStart',
    );
    console.log(`Room ${roomCode} started by ${client.id}`);
  }

  /**
   * Rematch: seated players can restart a finished room with the same players
   * and a fresh initial state — no need to go back to the lobby.
   */
  @SubscribeMessage('newGame')
  async handleNewGame(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ) {
    const { room: roomCode } = data;
    const roomRecord = await this.roomService.getRoom(roomCode);
    if (!roomRecord || roomRecord.status !== 'finished') {
      client.emit('error', 'Game is not finished');
      return;
    }
    if (!roomRecord.players.includes(client.id)) {
      client.emit('error', 'Only seated players can start a rematch');
      return;
    }

    const game = resolveGame(roomRecord.gameType);
    const initialState = BaziGBEngine.createInitialState(game, roomRecord.players);
    await this.roomService.startGame(roomCode, initialState);
    this.server.to(roomCode).emit('gameState', initialState);
    this.emitSystemMessage(roomCode, 'A new game has started', undefined, 'gameStart');
    console.log(`Rematch started in room ${roomCode} by ${client.id}`);
  }

  /**
   * Vegas: when a player runs out of dice while others still have some, the
   * turn must skip to the next player who still has dice — otherwise that
   * player can neither roll, nor place, nor pass, and the game locks.
   */
  private skipVegasNoDicePlayers(state: GameState): GameState {
    const G = state.G as any;
    if (!G?.casinos || !G?.playerDiceRemaining) return state;

    const remaining: Record<string, number> = G.playerDiceRemaining;
    const players: string[] = state.ctx.players;
    const anyDiceLeft = players.some((p) => (remaining[p] ?? 0) > 0);
    if (!anyDiceLeft) return state;

    let idx = players.indexOf(state.ctx.currentPlayer);
    let steps = 0;
    while ((remaining[players[idx]] ?? 0) === 0 && steps < players.length) {
      idx = (idx + 1) % players.length;
      steps++;
    }
    if (steps > 0 && (remaining[players[idx]] ?? 0) > 0) {
      return { ...state, ctx: { ...state.ctx, currentPlayer: players[idx] } };
    }
    return state;
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string },
  ) {
    const room = data?.room;
    const message = typeof data?.message === 'string' ? data.message.trim() : '';
    if (!room || !message) return;

    const roomRecord = await this.roomService.getRoom(room);
    if (!roomRecord) {
      client.emit('error', `Room "${room}" not found`);
      return;
    }

    // Only sockets that actually joined the room (players and spectators)
    // may chat — this also guards against chatting into a room by code alone.
    if (!client.rooms.has(room)) {
      client.emit('error', 'You are not in this room');
      return;
    }

    this.server.to(room).emit('chatMessage', {
      room,
      senderId: client.id,
      message: message.slice(0, MAX_CHAT_LENGTH),
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('rollDice')
  async handleRollDice(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; count?: number },
  ) {
    const { room, count } = data;
    const roomRecord = await this.roomService.getRoom(room);
    if (!roomRecord || !roomRecord.currentState || roomRecord.status !== 'playing') return;

    if (roomRecord.currentState.ctx.currentPlayer !== client.id) {
      client.emit('error', "It's not your turn to roll!");
      return;
    }

    let nextState = BaziGBEngine.rollDice(roomRecord.currentState, count);

    // Backgammon keeps its own dice bookkeeping in G.diceRemaining — sync it
    // with the roll so `endTurn` knows exactly which dice are left to play.
    if (roomRecord.gameType === 'backgammon') {
      try {
        nextState = BaziGBEngine.applyAction(
          resolveGame('backgammon'),
          nextState,
          'rollDice',
          client.id,
          false,
        );
      } catch (error: any) {
        client.emit('error', error?.message || 'Dice already rolled this turn');
        return;
      }
    }

    await this.roomService.saveState(room, nextState);
    this.server.to(room).emit('gameState', nextState);
  }

  @SubscribeMessage('makeMove')
  async handleMakeMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; moveName: string; args: any[] },
  ) {
    const { room, moveName, args } = data;
    const roomRecord = await this.roomService.getRoom(room);
    if (!roomRecord || !roomRecord.currentState || roomRecord.status !== 'playing') return;

    try {
      const game = resolveGame(roomRecord.gameType);
      const nextState = BaziGBEngine.processMove(
        game,
        roomRecord.currentState,
        moveName,
        client.id,
        ...(args ?? []),
      );

      // Check for a winner or a draw.
      const result = game.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        console.log(`Game over in room ${room}. Winner: ${result}`);
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });

        const winner = result === 'draw' ? null : result;
        await this.roomService.finishRoom(room, winner, nextState);
        const resolvedPlayers = this.resolveUserIds(roomRecord.players);
        const resolvedWinner = winner ? this.socketUsers.get(winner) ?? winner : null;
        await this.historyService.recordGameResult({
          roomCode: room,
          gameName: game.name,
          winnerId: resolvedWinner,
          players: resolvedPlayers,
          finalState: nextState,
        });
        this.emitSystemMessage(
          room,
          result === 'draw'
            ? 'The game ended in a draw'
            : `User ${result} won the game`,
          result === 'draw' ? undefined : result,
          'gameOver',
        );
        console.log(`Game result logged in history for room ${room}`);
      } else {
        await this.roomService.saveState(room, nextState);
        this.server.to(room).emit('gameState', nextState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }

  @SubscribeMessage('gameAction')
  async handleGameAction(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; moveName: string; args: any[]; endTurn?: boolean },
  ) {
    const { room, moveName, args, endTurn } = data;
    const roomRecord = await this.roomService.getRoom(room);
    if (!roomRecord || !roomRecord.currentState || roomRecord.status !== 'playing') return;

    try {
      const game = resolveGame(roomRecord.gameType);
      let nextState = BaziGBEngine.applyAction(
        game,
        roomRecord.currentState,
        moveName,
        client.id,
        endTurn ?? true,
        ...(args ?? []),
      );

      // Vegas: skip to the next player who still has dice (a player with no
      // dice left can neither roll, nor place, nor pass — the game would lock).
      if (endTurn !== false) {
        nextState = this.skipVegasNoDicePlayers(nextState);
      }

      const result = game.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });
        const winner = result === 'draw' ? null : result;
        await this.roomService.finishRoom(room, winner, nextState);
        const resolvedPlayers = this.resolveUserIds(roomRecord.players);
        const resolvedWinner = winner ? this.socketUsers.get(winner) ?? winner : null;
        await this.historyService.recordGameResult({
          roomCode: room,
          gameName: game.name,
          winnerId: resolvedWinner,
          players: resolvedPlayers,
          finalState: nextState,
        });
        this.emitSystemMessage(
          room,
          result === 'draw' ? 'The game ended in a draw' : `User ${result} won the game`,
          result === 'draw' ? undefined : result,
          'gameOver',
        );
      } else {
        await this.roomService.saveState(room, nextState);
        this.server.to(room).emit('gameState', nextState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }
}
