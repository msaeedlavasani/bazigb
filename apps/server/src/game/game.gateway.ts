import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaziGBEngine, Game, GameState } from '@bazigb/engine';
import { TicTacToe } from '@bazigb/game-tic-tac-toe';
import { ChessGame } from '@bazigb/game-chess';
import { Backgammon } from '@bazigb/game-backgammon';
import { Vegas } from '@bazigb/game-vegas';
import { RoomService, getMaxPlayers } from '../rooms/room.service';
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
export class GameGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly historyService: HistoryService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
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
    // Accept both the legacy plain-string form and { roomCode, gameType }.
    @MessageBody() payload: string | { roomCode: string; gameType?: string },
  ) {
    const roomCode = typeof payload === 'string' ? payload : payload?.roomCode;
    const gameType = typeof payload === 'string' ? undefined : payload?.gameType;
    if (!roomCode) return;

    try {
      let room = await this.roomService.getRoom(roomCode);

      // Room does not exist yet -> the first joiner creates it and is seated.
      if (!room) {
        room = await this.roomService.joinRoom(roomCode, client.id, gameType);
      } else if (
        !room.players.includes(client.id) &&
        room.players.length < getMaxPlayers(room.gameType)
      ) {
        // Free seat -> seat the client as a player.
        try {
          room = await this.roomService.joinRoom(roomCode, client.id, gameType);
        } catch {
          // Lost the race for the last seat -> fall through as a spectator.
          room = (await this.roomService.getRoom(roomCode)) ?? room;
        }
      }
      // Otherwise (room already full, or the client is already seated) the
      // client joins as a spectator: they receive state + broadcasts but are
      // never seated in `room.players`.

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

      // Game starts when room is full and no game running yet.
      const shouldStart =
        room.players.length === getMaxPlayers(room.gameType) && room.status === 'waiting' && !room.currentState;

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

    const nextState = BaziGBEngine.rollDice(roomRecord.currentState, count);
    await this.roomService.saveState(room, nextState);
    this.server.to(room).emit('gameState', nextState);
    this.emitSystemMessage(room, `Player rolled: ${nextState.ctx.dice?.join(', ')}`, client.id, 'roll');
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
        ...args,
      );

      // Check for a winner or a draw.
      const result = game.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        console.log(`Game over in room ${room}. Winner: ${result}`);
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });

        const winner = result === 'draw' ? null : result;
        await this.roomService.finishRoom(room, winner, nextState);
        await this.historyService.recordGameResult({
          roomCode: room,
          gameName: game.name,
          winnerId: winner,
          players: roomRecord.players,
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
      const nextState = BaziGBEngine.applyAction(
        game,
        roomRecord.currentState,
        moveName,
        client.id,
        endTurn ?? true,
        ...args,
      );

      const result = game.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });
        const winner = result === 'draw' ? null : result;
        await this.roomService.finishRoom(room, winner, nextState);
        await this.historyService.recordGameResult({
          roomCode: room,
          gameName: game.name,
          winnerId: winner,
          players: roomRecord.players,
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
