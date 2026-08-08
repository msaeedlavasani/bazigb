import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GameState } from '@bazigb/engine';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma';

export const MAX_PLAYERS = 2;
export const VEGAS_MAX_PLAYERS = 5;

export function getMaxPlayers(gameType: string): number {
  return gameType === 'vegas' ? VEGAS_MAX_PLAYERS : MAX_PLAYERS;
}

/**
 * Minimum number of players required for a game to start. All games start as
 * soon as 2 players are seated (the lobby has no player-count selector yet),
 * even though a Vegas room can later host up to 5 while still waiting.
 */
export function getMinPlayers(): number {
  return 2;
}
export type RoomStatus = 'waiting' | 'playing' | 'finished';

// Ambiguous characters (0, O, 1, I) are excluded so codes are easy to share by voice.
const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ROOM_CODE_LENGTH = 5;

export interface RoomWithParsedData {
  id: string;
  code: string;
  status: string;
  gameType: string;
  players: string[];
  currentState: GameState | null;
  winnerId: string | null;
  ownerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * All database operations for game rooms.
 *
 * Room lifecycle: create/join -> start -> play (saveState) -> finish.
 * Replaces the in-memory `games` / `roomPlayers` maps that used to live in
 * GameGateway. Rooms (players + current game state) are persisted in the
 * `rooms` table so they survive server restarts.
 */
@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Load a room by its invite code, with the JSON `players` / `currentState`
   * columns decoded. Returns null when the room does not exist.
   */
  async getRoom(code: string): Promise<RoomWithParsedData | null> {
    const room = await this.prisma.room.findUnique({ where: { code } });
    return room ? this.toParsed(room) : null;
  }

  /**
   * Create the room if it does not exist yet, otherwise seat `playerId`.
   * `gameType` is only used when a room is created here (socket-side join
   * without a preceding HTTP create); existing rooms keep their own type.
   * Throws when the room is already full.
   */
  async joinRoom(code: string, playerId: string, gameType = 'tic-tac-toe'): Promise<RoomWithParsedData> {
    const existing = await this.prisma.room.findUnique({ where: { code } });

    if (!existing) {
      const room = await this.prisma.room.create({
        data: {
          code,
          gameType,
          status: 'waiting',
          players: JSON.stringify([playerId]),
          ownerId: playerId,
        },
      });
      return this.toParsed(room);
    }

    // First joiner of a room created via HTTP becomes its owner.
    if (!existing.ownerId) {
      const claimed = await this.prisma.room.update({
        where: { id: existing.id },
        data: { ownerId: playerId },
      });
      // If the first seater is also a newcomer, seat them in the same update.
      const claimedPlayers = this.parsePlayers(claimed.players);
      if (!claimedPlayers.includes(playerId)) {
        return this.joinRoom(code, playerId, existing.gameType);
      }
      return this.toParsed(claimed);
    }

    const players = this.parsePlayers(existing.players);

    if (players.includes(playerId)) {
      return this.toParsed(existing); // re-join is a no-op
    }

    const maxPlayers = getMaxPlayers(existing.gameType);
    if (players.length >= maxPlayers) {
      throw new BadRequestException(`Room "${code}" is full`);
    }

    const room = await this.prisma.room.update({
      where: { id: existing.id },
      data: {
        players: JSON.stringify([...players, playerId]),
        // Reuse a finished room for a rematch.
        ...(existing.status === 'finished'
          ? { status: 'waiting', winnerId: null, currentState: null }
          : {}),
      },
    });
    return this.toParsed(room);
  }

  /**
   * Create an empty room with a fresh invite code and persist it to the DB.
   * Players are not seated here; they join later through the socket.io
   * `joinRoom` event (GameGateway) which seats them by socket id.
   */
  async createRoom(gameType = 'tic-tac-toe'): Promise<RoomWithParsedData> {
    for (let attempt = 0; attempt < 10; attempt++) {
      const code = this.generateCode();
      try {
        const room = await this.prisma.room.create({
          data: {
            code,
            gameType,
            status: 'waiting',
            players: '[]',
          },
        });
        return this.toParsed(room);
      } catch (error) {
        // P2002 = unique constraint violation on `code` -> retry with a new code.
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          continue;
        }
        throw error;
      }
    }
    throw new Error('Could not allocate a unique room code');
  }

  /**
   * Replace `oldPlayerId` with `newPlayerId` in the room's seats. Used when a
   * disconnected player reconnects with a fresh socket id mid-game.
   */
  async swapPlayer(code: string, oldPlayerId: string, newPlayerId: string): Promise<RoomWithParsedData | null> {
    const existing = await this.prisma.room.findUnique({ where: { code } });
    if (!existing) return null;
    const players = this.parsePlayers(existing.players);
    if (!players.includes(oldPlayerId)) return this.toParsed(existing);
    const updated = await this.prisma.room.update({
      where: { id: existing.id },
      data: {
        players: JSON.stringify(players.map((p) => (p === oldPlayerId ? newPlayerId : p))),
        // Keep ownership when the owner's stale socket is swapped on reconnect.
        ...(existing.ownerId === oldPlayerId ? { ownerId: newPlayerId } : {}),
      },
    });
    return this.toParsed(updated);
  }

  /**
   * Remove `playerId` from the room's seats. Used on socket disconnect so a
   * player who refreshes / drops can re-join without being blocked by their
   * stale socket id filling the room (which turned them into spectators).
   */
  async removePlayer(code: string, playerId: string): Promise<RoomWithParsedData | null> {
    const existing = await this.prisma.room.findUnique({ where: { code } });
    if (!existing || existing.status === 'finished') return existing ? this.toParsed(existing) : null;

    const players = this.parsePlayers(existing.players).filter((p) => p !== playerId);
    if (players.length === this.parsePlayers(existing.players).length) {
      return this.toParsed(existing); // not seated — nothing to do
    }

    const updated = await this.prisma.room.update({
      where: { id: existing.id },
      data: { players: JSON.stringify(players) },
    });
    return this.toParsed(updated);
  }

  /** Mark a room as playing and store the initial game state. */
  async startGame(code: string, initialState: GameState): Promise<RoomWithParsedData> {
    const room = await this.prisma.room.findUnique({ where: { code } });
    if (!room) {
      throw new NotFoundException(`Room "${code}" not found`);
    }
    const updated = await this.prisma.room.update({
      where: { id: room.id },
      data: { status: 'playing', currentState: JSON.stringify(initialState) },
    });
    return this.toParsed(updated);
  }

  /** Persist the current game state after every accepted move. */
  async saveState(code: string, state: GameState): Promise<RoomWithParsedData> {
    const room = await this.prisma.room.findUnique({ where: { code } });
    if (!room) {
      throw new NotFoundException(`Room "${code}" not found`);
    }
    const updated = await this.prisma.room.update({
      where: { id: room.id },
      data: { currentState: JSON.stringify(state) },
    });
    return this.toParsed(updated);
  }

  /** Mark a room as finished and store the final state + winner. */
  async finishRoom(
    code: string,
    winnerId: string | null,
    finalState: GameState,
  ): Promise<RoomWithParsedData> {
    const room = await this.prisma.room.findUnique({ where: { code } });
    if (!room) {
      throw new NotFoundException(`Room "${code}" not found`);
    }
    const updated = await this.prisma.room.update({
      where: { id: room.id },
      data: { status: 'finished', winnerId, currentState: JSON.stringify(finalState) },
    });
    return this.toParsed(updated);
  }

  /** List rooms, optionally filtered by status. */
  async listRooms(status?: RoomStatus): Promise<RoomWithParsedData[]> {
    const rooms = status
      ? await this.prisma.room.findMany({ where: { status } })
      : await this.prisma.room.findMany();
    return rooms.map((room) => this.toParsed(room));
  }

  private generateCode(): string {
    let code = '';
    for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
      code += ROOM_CODE_ALPHABET[Math.floor(Math.random() * ROOM_CODE_ALPHABET.length)];
    }
    return code;
  }

  private parsePlayers(players: string): string[] {
    try {
      const parsed = JSON.parse(players);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private toParsed(room: {
    id: string;
    code: string;
    status: string;
    gameType: string;
    players: string;
    currentState: string | null;
    winnerId: string | null;
    ownerId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): RoomWithParsedData {
    let currentState: GameState | null = null;
    if (room.currentState) {
      try {
        currentState = JSON.parse(room.currentState) as GameState;
      } catch {
        currentState = null;
      }
    }
    return {
      id: room.id,
      code: room.code,
      status: room.status,
      gameType: room.gameType,
      players: this.parsePlayers(room.players),
      currentState,
      winnerId: room.winnerId,
      ownerId: room.ownerId,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    };
  }
}
