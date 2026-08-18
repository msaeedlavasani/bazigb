import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { randomBytes } from 'crypto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { BaziGBEngine, Game, GameState } from '@bazigb/engine';
import { TicTacToe } from '@bazigb/game-tic-tac-toe';
import { ChessGame } from '@bazigb/game-chess';
import { Backgammon } from '@bazigb/game-backgammon';
import { Vegas } from '@bazigb/game-vegas';
import { RoomService, getMaxPlayers, getMinPlayers, RoomWithParsedData } from '../rooms/room.service';
import { HistoryService } from '../history/history.service';
import {
  chatSchema,
  gameActionSchema,
  joinRoomSchema,
  makeMoveSchema,
  nextRoundSchema,
  rollDiceSchema,
  undoSchema,
} from '../socket-validation';

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
  private readonly socketUsernames = new Map<string, string>();

  /**
   * Seat-reclaim protection. When a seated socket drops mid-game, its seat in
   * ctx.players stays stale until the ORIGINAL client reclaims it — otherwise
   * the first spectator to (re)join steals the seat (reported bug: a spectator
   * sat in a disconnected player's place in backgammon).
   *
   * Two independent proofs are kept per vacated seat:
   *  - `vacatedUsers`: the authenticated user id bound to the dropped socket
   *    (captured at disconnect, since socketUsers is cleared there).
   *  - `seatKeys`: a random reconnect ticket issued to the player when seated
   *    and stored by the web client in sessionStorage, so even anonymous
   *    players can prove "I held this seat".
   *
   * A reclaim is allowed when the joining socket matches EITHER the same
   * authenticated user id OR the same seat ticket. Pre-ticket anonymous seats
   * (sessions started before this feature) keep the legacy first-joiner
   * behavior via `legacyOk`.
   */
  private readonly vacatedUsers = new Map<string, { value: string | null; at: number }>();
  private readonly seatKeys = new Map<string, { value: string; at: number }>();

  /** Snapshot stack for undo functionality (per room). */
  private readonly undoStacks = new Map<string, { state: GameState; actorId: string }[]>();

  /** Per-turn countdown (see scheduleTurnTimer / expireTurn). */
  private static readonly TURN_MS = 120_000; // 2 minutes per turn
  private static readonly TURN_WARN_MS = 10_000; // warn 10s before expiry
  private readonly turnTimers = new Map<string, NodeJS.Timeout>();
  private readonly turnWarnTimers = new Map<string, NodeJS.Timeout>();

  private clearTurnTimers(roomCode: string) {
    const t = this.turnTimers.get(roomCode);
    if (t) clearTimeout(t);
    this.turnTimers.delete(roomCode);
    const w = this.turnWarnTimers.get(roomCode);
    if (w) clearTimeout(w);
    this.turnWarnTimers.delete(roomCode);
  }

  /**
   * (Re)start the per-turn countdown after any state-changing action.
   * Announces `turnStarted { player, endsAt }` so the web UI can render a
   * countdown; emits `turnWarning` shortly before expiry and `turnTimeout`
   * on expiry (see expireTurn).
   */
  private scheduleTurnTimer(roomCode: string, state: GameState | null) {
    this.clearTurnTimers(roomCode);
    if (!state || !state.ctx?.currentPlayer) return;

    const endsAt = Date.now() + GameGateway.TURN_MS;
    this.server.to(roomCode).emit('turnStarted', {
      room: roomCode,
      player: state.ctx.currentPlayer,
      endsAt,
    });

    this.turnWarnTimers.set(
      roomCode,
      setTimeout(() => {
        this.server.to(roomCode).emit('turnWarning', {
          room: roomCode,
          player: state.ctx.currentPlayer,
        });
      }, GameGateway.TURN_MS - GameGateway.TURN_WARN_MS),
    );

    this.turnTimers.set(
      roomCode,
      setTimeout(() => {
        void this.expireTurn(roomCode, state);
      }, GameGateway.TURN_MS),
    );
  }

  /**
   * A turn expired without any action. Emits `turnTimeout`; for games with a
   * safe end-turn action (backgammon, vegas) the turn advances automatically
   * so the room never stalls. Chess / tic-tac-toe get the warning only — an
   * auto-move there would be destructive.
   */
  private async expireTurn(roomCode: string, state: GameState) {
    this.turnTimers.delete(roomCode);

    const room = await this.roomService.getRoom(roomCode);
    if (!room || room.status !== 'playing' || !room.currentState) return;
    // The room moved on since this timer was scheduled — a newer timer is
    // already running; do not double-fire.
    if (JSON.stringify(room.currentState) !== JSON.stringify(state)) return;

    const player = state.ctx.currentPlayer;
    this.server.to(roomCode).emit('turnTimeout', { room: roomCode, player });

    const autoEnd = room.gameType === 'backgammon' || room.gameType === 'vegas';
    if (!autoEnd) return;

    try {
      const game = resolveGame(room.gameType);
      let nextState = BaziGBEngine.applyAction(game, room.currentState, 'endTurn', player, true);
      if (room.gameType === 'vegas') nextState = this.skipVegasNoDicePlayers(nextState);

      const result = game.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        await this.handleGameOver(room, game, nextState, result);
      } else {
        await this.roomService.saveState(roomCode, nextState);
        this.server.to(roomCode).emit('gameState', nextState);
        this.scheduleTurnTimer(roomCode, nextState);
      }
    } catch (error: any) {
      console.warn(`Auto end-turn failed in ${roomCode}: ${error?.message}`);
    }
  }

  private static readonly SEAT_CLAIM_TTL = 10 * 60 * 1000; // 10 minutes

  private cloneState(state: GameState): GameState {
    return JSON.parse(JSON.stringify(state));
  }

  private getVacatedUser(roomCode: string, socketId: string): string | null {
    const key = `${roomCode}:${socketId}`;
    const entry = this.vacatedUsers.get(key);
    if (!entry) return null;
    if (Date.now() - entry.at > GameGateway.SEAT_CLAIM_TTL) {
      this.vacatedUsers.delete(key);
      return null;
    }
    return entry.value;
  }

  private getSeatKey(roomCode: string, socketId: string): string | null {
    const key = `${roomCode}:${socketId}`;
    const entry = this.seatKeys.get(key);
    if (!entry) return null;
    if (Date.now() - entry.at > GameGateway.SEAT_CLAIM_TTL) {
      this.seatKeys.delete(key);
      return null;
    }
    return entry.value;
  }

  /** Issue a fresh reconnect ticket to a seated player and send it to them. */
  private issueSeatKey(client: Socket, roomCode: string) {
    const seatKey = randomBytes(16).toString('hex');
    this.seatKeys.set(`${roomCode}:${client.id}`, { value: seatKey, at: Date.now() });
    client.emit('seatKey', { room: roomCode, seatKey });
  }

  constructor(
    private readonly roomService: RoomService,
    private readonly historyService: HistoryService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Authenticate at the handshake when a JWT is supplied (the web client
    // sends it via the socket.io `auth` callback — see apps/web/src/lib/socket.ts).
    // An invalid/expired token is ignored (the socket stays anonymous) instead
    // of hard-rejecting the connection: a hard reject would lock out users
    // whose token simply expired. Identity is bound before any joinRoom.
    const token = (client.handshake.auth as { token?: string } | undefined)?.token;
    if (token) {
      void this.tryBindWithToken(client, token);
    }
  }

  /** Resolve socket ids to authenticated user ids (falls back to the id itself). */
  private resolveUserIds(socketIds: string[]): string[] {
    return socketIds.map((id) => this.socketUsers.get(id) ?? id);
  }

  /**
   * Verify the JWT and bind the socket to the user (socketUsers + the cached
   * username). Returns true when bound. Invalid/expired tokens return false —
   * the socket stays anonymous (no crash, no lockout).
   */
  private async tryBindWithToken(client: Socket, token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token);
      if (!payload?.sub) return false;

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: { username: true, deactivated: true },
      });

      if (!user) return false;
      if (user.deactivated) {
        console.warn(`Socket ${client.id} belongs to deactivated user ${payload.sub} — binding blocked`);
        return false;
      }

      this.socketUsers.set(client.id, payload.sub);
      console.log(`Socket ${client.id} bound to user ${payload.sub}`);

      if (user.username) {
        this.socketUsernames.set(client.id, user.username);
      }
      return true;
    } catch {
      // Invalid/expired token — the socket just stays anonymous.
      console.warn(`Socket ${client.id} sent an invalid JWT — keeping anonymous`);
      return false;
    }
  }

  /** Try to authenticate the client with the JWT attached to the join payload. */
  private async bindUser(client: Socket, token?: string) {
    if (!token) return;
    await this.tryBindWithToken(client, token);
  }

  /** Resolve socket ids to real usernames (or null). */
  private namesForPlayers(players: string[]): (string | null)[] {
    return players.map((id) => this.socketUsernames.get(id) ?? null);
  }

  /**
   * Emit a system message to the whole room (players and spectators).
   */
  private emitSystemMessage(
    roomCode: string,
    message: string,
    userId?: string,
    type = 'info',
    username?: string,
  ) {
    this.server.to(roomCode).emit('systemMessage', {
      type,
      message,
      userId,
      username,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    // Accept both the legacy plain-string form and { roomCode, gameType, token, seatKey }.
    @MessageBody() payload: any,
  ) {
    const validated = joinRoomSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const data = validated.data;

    const roomCode = typeof data === 'string' ? data : data.roomCode;
    const gameType = typeof data === 'string' ? undefined : data.gameType;
    const maxRounds = typeof data === 'string' ? undefined : data.maxRounds;
    const seatKey = typeof data === 'string' ? undefined : data.seatKey;
    const token = typeof data === 'string' ? undefined : data.token;
    if (!roomCode) return;

    await this.bindUser(client, token);

    try {
      let room = await this.roomService.getRoom(roomCode);
      const state = room?.currentState ?? null;
      const connectedIds = new Set(
        this.server.sockets.adapter.rooms.get(roomCode) ?? [],
      );

      // 1) Create the room when it does not exist (first joiner is seated).
      if (!room) {
        room = await this.roomService.joinRoom(roomCode, client.id, gameType, maxRounds);
        this.issueSeatKey(client, roomCode);
      } else if (room.players.includes(client.id)) {
        // 2) Already seated — re-join is a no-op.
      } else if (room.status === 'waiting' && room.players.length < getMaxPlayers(room.gameType)) {
        // 3) Free seat in a waiting room -> seat the client as a player.
        try {
          room = await this.roomService.joinRoom(roomCode, client.id, gameType, maxRounds);
          this.issueSeatKey(client, roomCode);
        } catch {
          // Lost the race for the last seat -> fall through as a spectator.
          room = (await this.roomService.getRoom(roomCode)) ?? room;
        }
      } else if (room.status === 'playing' && state) {
        // 4) Reconnection mid-game: a stale socket id (their pre-refresh
        //    connection) may still own a seat in ctx.players. Only the ORIGINAL
        //    player may reclaim it — same authenticated user id OR the seat
        //    ticket they received when they were seated. Anyone else (e.g. a
        //    spectator) stays a spectator instead of stealing the seat.
        const stale = state.ctx.players.find(
          (p) => p !== client.id && !connectedIds.has(p),
        );
        const staleUserId = stale ? this.getVacatedUser(roomCode, stale) : null;
        const joinerUserId = this.socketUsers.get(client.id) ?? null;
        const staleTicket = stale ? this.getSeatKey(roomCode, stale) : null;
        const identityOk = !!staleUserId && !!joinerUserId && staleUserId === joinerUserId;
        const ticketOk = !staleUserId && !!staleTicket && seatKey === staleTicket;
        const legacyOk = !staleUserId && !staleTicket; // pre-ticket anonymous seat
        const canReclaim = !!(stale && (identityOk || ticketOk || legacyOk));
        if (stale && canReclaim) {
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
          this.scheduleTurnTimer(roomCode, nextState);
          room =
            (await this.roomService.swapPlayer(roomCode, stale, client.id)) ??
            (await this.roomService.getRoom(roomCode));
          // The stale id was already removed from room.players on disconnect —
          // re-seat the fresh socket so the room sees 2 players again.
          if (room && !room.players.includes(client.id)) {
            room = await this.roomService.joinRoom(roomCode, client.id, gameType, maxRounds);
          }
          this.server.to(roomCode).emit('gameState', nextState);
          console.log(
            `Reconnection in room ${roomCode}: swapped stale socket ${stale} -> ${client.id}`,
          );
          // Seat claimed — clear the old proofs and issue a fresh ticket.
          this.seatKeys.delete(`${roomCode}:${stale}`);
          this.vacatedUsers.delete(`${roomCode}:${stale}`);
          this.issueSeatKey(client, roomCode);
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
      const name = this.socketUsernames.get(client.id);
      this.emitSystemMessage(
        roomCode,
        isSpectator
          ? `${name ?? `User ${client.id}`} is now spectating`
          : `${name ?? `User ${client.id}`} joined the game`,
        client.id,
        isSpectator ? 'spectate' : 'join',
        name,
      );
      this.server.to(roomCode).emit('roomUpdate', {
        code: roomCode,
        players: room.players,
        names: this.namesForPlayers(room.players),
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
        // A fresh match starts 0-0 regardless of any previous match's scores.
        await this.roomService.startGame(roomCode, initialState, { resetScores: true });
        this.undoStacks.delete(roomCode);
        this.server.to(roomCode).emit('matchScore', {
          scores: {},
          maxRounds: room.maxRounds ?? 1,
          round: 0,
        });
        this.server.to(roomCode).emit('gameState', initialState);
        this.scheduleTurnTimer(roomCode, initialState);
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

  @SubscribeMessage('undo')
  async handleUndo(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const validated = undoSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room } = validated.data;
    const roomRecord = await this.roomService.getRoom(room);
    if (
      !roomRecord ||
      roomRecord.status !== 'playing' ||
      !roomRecord.players.includes(client.id)
    ) {
      return;
    }

    const stack = this.undoStacks.get(room);
    if (!stack || stack.length === 0) {
      client.emit('error', 'Nothing to undo');
      return;
    }

    // Only the MOST RECENT action can be undone, and only by the player who
    // made it. Once the next player acts, their snapshot sits on top and this
    // undo is rejected — a natural "take-back" rule that also prevents
    // reverting an opponent's move.
    const top = stack[stack.length - 1];
    if (top.actorId !== client.id) {
      client.emit('error', 'Nothing to undo');
      return;
    }

    stack.pop();
    if (stack.length === 0) {
      this.undoStacks.delete(room);
    }
    const entry = top;

    await this.roomService.saveState(room, entry.state);
    this.server.to(room).emit('gameState', entry.state);
    this.scheduleTurnTimer(room, entry.state);
    console.log(`Undo performed in room ${room} by ${client.id}`);
  }

  /**
   * When a socket drops (refresh, tab close, network blip) its stale id is
   * removed from every room it was seated in. Otherwise the room looks full
   * forever and a reloading player is admitted as a spectator.
   */
  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    const userId = this.socketUsers.get(client.id);
    const username = this.socketUsernames.get(client.id);
    this.socketUsers.delete(client.id);
    this.socketUsernames.delete(client.id);

    let rooms: RoomWithParsedData[] = [];
    try {
      rooms = await this.roomService.listRooms();
    } catch {
      return;
    }

    for (const room of rooms) {
      if (!room.players.includes(client.id)) continue;
      // Remember who held this seat so only they can reclaim it on reconnect
      // (the same user id or their seat ticket — see handleJoinRoom branch 4).
      if (room.status === 'playing') {
        this.vacatedUsers.set(`${room.code}:${client.id}`, { value: userId ?? null, at: Date.now() });
      }
      try {
        const updated = await this.roomService.removePlayer(room.code, client.id);
        if (updated && !updated.players.includes(client.id)) {
          this.server.to(room.code).emit('roomUpdate', {
            code: room.code,
            players: updated.players,
            names: this.namesForPlayers(updated.players),
            status: updated.status,
          });
          this.emitSystemMessage(
            room.code,
            `${username ?? `User ${client.id}`} left the game`,
            client.id,
            'leave',
            username,
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
    // A fresh match starts 0-0 regardless of any previous match's scores.
    await this.roomService.startGame(roomCode, initialState, { resetScores: true });
    this.undoStacks.delete(roomCode);
    this.server.to(roomCode).emit('matchScore', {
      scores: {},
      maxRounds: roomRecord.maxRounds ?? 1,
      round: 0,
    });
    this.server.to(roomCode).emit('gameState', initialState);
    this.scheduleTurnTimer(roomCode, initialState);
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
    // A rematch is a brand-new match: the scoreboard starts 0-0 again.
    await this.roomService.startGame(roomCode, initialState, { resetScores: true });
    this.undoStacks.delete(roomCode);
    this.server.to(roomCode).emit('matchScore', {
      scores: {},
      maxRounds: roomRecord.maxRounds ?? 1,
      round: 0,
    });
    this.server.to(roomCode).emit('gameState', initialState);
    this.scheduleTurnTimer(roomCode, initialState);
    this.emitSystemMessage(roomCode, 'A new game has started', undefined, 'gameStart');
    console.log(`Rematch started in room ${roomCode} by ${client.id}`);
  }

  /**
   * Shared game-over path used by every game type (makeMove / gameAction /
   * turn-timeout auto end-turn).
   *
   * Single-game rooms (maxRounds = 1, the default) finish exactly like before:
   * the room is closed and the result is recorded in history.
   *
   * Best-of-N rooms (maxRounds = 3 | 5) tally the finished round into the
   * match scoreboard (`scores` keyed by player id; a draw awards no point).
   * When a player reaches the win threshold (ceil(maxRounds / 2)) the match is
   * finished and the room is closed. Otherwise the next round starts
   * immediately with a fresh initial state and the same players — the room
   * stays in `playing` and its accumulated scores survive.
   *
   * Emitted events:
   *  - `gameOver`  { state, winner, matchOver, scores, maxRounds } — round (or
   *    match) result. `matchOver: true` means the room is finished.
   *  - `matchScore` { scores, maxRounds, round } — live scoreboard update
   *    between rounds (also reflected in the `gameOver` payload).
   *  - `gameState` — the fresh initial state of the next round.
   */
  private async handleGameOver(
    roomRecord: RoomWithParsedData,
    game: Game,
    nextState: GameState,
    result: string,
  ) {
    const roomCode = roomRecord.code;
    this.clearTurnTimers(roomCode);
    this.undoStacks.delete(roomCode);

    const winner = result === 'draw' ? null : result;
    const maxRounds = roomRecord.maxRounds ?? 1;
    const threshold = Math.ceil(maxRounds / 2);
    const scores = { ...(roomRecord.scores ?? {}) };

    // Tally the finished round into the match scoreboard.
    if (winner) scores[winner] = (scores[winner] ?? 0) + 1;
    const matchWinner = maxRounds > 1 && winner && scores[winner] >= threshold ? winner : null;

    const resolvedPlayers = this.resolveUserIds(roomRecord.players);
    const resolvedWinner = winner ? this.socketUsers.get(winner) ?? winner : null;
    const recordRound = () =>
      this.historyService.recordGameResult({
        roomCode,
        gameName: game.name,
        winnerId: resolvedWinner,
        players: resolvedPlayers,
        finalState: nextState,
      });

    // Single-game room: legacy behavior — finish and log as before.
    if (maxRounds <= 1) {
      this.server.to(roomCode).emit('gameOver', {
        state: nextState,
        winner: result,
        matchOver: true,
        scores,
        maxRounds,
      });
      await this.roomService.finishRoom(roomCode, winner, nextState);
      await recordRound();
      this.emitSystemMessage(
        roomCode,
        result === 'draw' ? 'The game ended in a draw' : `User ${result} won the game`,
        result === 'draw' ? undefined : result,
        'gameOver',
      );
      console.log(`Game over in room ${roomCode}. Winner: ${result}`);
      return;
    }

    // Best-of-N match: persist the scoreboard first so a crash between rounds
    // cannot lose the finished round.
    await this.roomService.saveScores(roomCode, scores);

    // The win threshold was reached — the match is over, close the room.
    if (matchWinner) {
      this.server.to(roomCode).emit('gameOver', {
        state: nextState,
        winner: result,
        matchOver: true,
        scores,
        maxRounds,
      });
      await this.roomService.finishRoom(roomCode, matchWinner, nextState);
      await recordRound();
      const winnerScore = scores[matchWinner] ?? 0;
      const loserScore = Object.values(scores).reduce((sum, n) => sum + n, 0) - winnerScore;
      this.emitSystemMessage(
        roomCode,
        `User ${matchWinner} won the match ${winnerScore} - ${loserScore}`,
        matchWinner,
        'gameOver',
      );
      console.log(
        `Match over in room ${roomCode}: ${matchWinner} won ${winnerScore}-${loserScore} (best of ${maxRounds})`,
      );
      return;
    }

    // Round over but the match continues: persist the next round's fresh state
    // BEFORE announcing the round result, so a move raced in from a client in
    // the announcement window cannot overwrite the new round's initial state.
    const roundsPlayed = Object.values(scores).reduce((sum, n) => sum + n, 0);
    const initialState = BaziGBEngine.createInitialState(game, roomRecord.players);
    // No score reset here — this is a new ROUND of the same match.
    await this.roomService.startGame(roomCode, initialState);

    this.server.to(roomCode).emit('gameOver', {
      state: nextState,
      winner: result,
      matchOver: false,
      scores,
      maxRounds,
    });
    await recordRound();
    this.server.to(roomCode).emit('matchScore', {
      scores,
      maxRounds,
      round: roundsPlayed,
    });
    this.server.to(roomCode).emit('gameState', initialState);
    this.scheduleTurnTimer(roomCode, initialState);
    this.emitSystemMessage(
      roomCode,
      result === 'draw'
        ? 'The round ended in a draw — next round starting'
        : `User ${result} won the round — next round starting`,
      result === 'draw' ? undefined : result,
      'gameOver',
    );
    console.log(
      `Round ${roundsPlayed} finished in room ${roomCode} (winner: ${result}) — next round started`,
    );
  }

  /**
   * Vegas: when a player runs out of dice while others still have some, the
   * turn must skip to the next player who still has dice — otherwise that
   * player can neither roll, nor place, nor pass, and the game locks.
   */
  private skipVegasNoDicePlayers(state: GameState): GameState {
    const G = state.G as any;
    if (!G?.casinos || !G?.playerDiceRemaining) return state;

    // NOTE: Vegas state keys every player ledger by the player's INDEX
    // (e.g. "0", "1"), not by socket id — lookups must use idx.toString().
    const remaining: Record<string, number> = G.playerDiceRemaining;
    const players: string[] = state.ctx.players;
    const anyDiceLeft = players.some((_, i) => (remaining[i.toString()] ?? 0) > 0);
    if (!anyDiceLeft) return state;

    let idx = players.indexOf(state.ctx.currentPlayer);
    let steps = 0;
    while ((remaining[idx.toString()] ?? 0) === 0 && steps < players.length) {
      idx = (idx + 1) % players.length;
      steps++;
    }
    if (steps > 0 && (remaining[idx.toString()] ?? 0) > 0) {
      return { ...state, ctx: { ...state.ctx, currentPlayer: players[idx] } };
    }
    return state;
  }

  /**
   * Vegas: after a round resolves (phase === 'roundEnd') any seated player can
   * deal the next round. This intentionally bypasses the engine's turn check —
   * `applyAction` would reject anyone who is not the current player.
   */
  @SubscribeMessage('nextRound')
  async handleNextRound(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const validated = nextRoundSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room: roomCode } = validated.data;
    const roomRecord = await this.roomService.getRoom(roomCode);
    if (
      !roomRecord ||
      roomRecord.gameType !== 'vegas' ||
      roomRecord.status !== 'playing' ||
      !roomRecord.currentState
    ) {
      return;
    }
    if (!roomRecord.players.includes(client.id)) {
      client.emit('error', 'Only seated players can start the next round');
      return;
    }
    const state = roomRecord.currentState;
    if ((state.G as any)?.phase !== 'roundEnd') return;

    try {
      const nextG = Vegas.moves.nextRound(state.G, state.ctx);
      const nextState: GameState = { G: nextG, ctx: state.ctx };
      await this.roomService.saveState(roomCode, nextState);
      this.undoStacks.delete(roomCode);
      this.server.to(roomCode).emit('gameState', nextState);
      this.scheduleTurnTimer(roomCode, nextState);
      console.log(`Vegas room ${roomCode}: next round started by ${client.id}`);
    } catch (error: any) {
      client.emit('error', error?.message || 'Could not start the next round');
    }
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const validated = chatSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room, message } = validated.data;
    const msg = message.trim();
    if (!msg) return;

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
    @MessageBody() payload: any,
  ) {
    const validated = rollDiceSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room, count } = validated.data;
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
    this.scheduleTurnTimer(room, nextState);
  }

  @SubscribeMessage('makeMove')
  async handleMakeMove(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const validated = makeMoveSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room, moveName, args } = validated.data;
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
        await this.handleGameOver(roomRecord, game, nextState, result);
      } else {
        await this.roomService.saveState(room, nextState);
        this.server.to(room).emit('gameState', nextState);
        this.scheduleTurnTimer(room, nextState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }

  @SubscribeMessage('gameAction')
  async handleGameAction(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: any,
  ) {
    const validated = gameActionSchema.safeParse(payload);
    if (!validated.success) {
      client.emit('error', { message: 'درخواست نامعتبر است' });
      return;
    }
    const { room, moveName, args, endTurn } = validated.data;
    const roomRecord = await this.roomService.getRoom(room);
    if (!roomRecord || !roomRecord.currentState || roomRecord.status !== 'playing') return;

    // Snapshot before action for undo support (Backgammon & Vegas only)
    const isUndoable = roomRecord.gameType === 'backgammon' || roomRecord.gameType === 'vegas';
    if (isUndoable) {
      const stack = this.undoStacks.get(room) ?? [];
      if (!this.undoStacks.has(room)) this.undoStacks.set(room, stack);
      stack.push({ state: this.cloneState(roomRecord.currentState), actorId: client.id });
      if (stack.length > 50) stack.shift();
    }

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
        await this.handleGameOver(roomRecord, game, nextState, result);
      } else {
        // The undo stack is intentionally NOT cleared on turn rotation: undo
        // only pops the TOP snapshot and only when it belongs to the requester
        // (see handleUndo), so a player can take back their latest action until
        // the next player acts — this also makes Vegas undo work, where every
        // placement rotates the turn.
        await this.roomService.saveState(room, nextState);
        this.server.to(room).emit('gameState', nextState);
        this.scheduleTurnTimer(room, nextState);
      }
    } catch (error: any) {
      if (isUndoable) {
        const stack = this.undoStacks.get(room);
        if (stack) stack.pop();
      }
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }
}
