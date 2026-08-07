import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RecordGameResultInput {
  roomCode: string;
  gameName: string;
  /** Winning player user id, or null on a draw. */
  winnerId: string | null;
  /** User ids of all players who took part in the match. */
  players: string[];
  /** Final game state (board) at the moment the match ended. */
  finalState: unknown;
}

/**
 * Persists finished matches into the GameHistory table and updates the
 * win/loss counters of the participating users.
 */
@Injectable()
export class HistoryService {
  private readonly logger = new Logger(HistoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Log one finished match and update User win/loss counts.
   *
   * - Every participant is ensured to have a `users` row (lazy registration
   *   for players that connect before the auth flow sends a real user id).
   * - The winner gets +1 win, every other participant gets +1 loss.
   * - Draws are only recorded in history (no counter changes).
   */
  async recordGameResult(data: RecordGameResultInput): Promise<unknown> {
    const room = await this.prisma.room.findUnique({ where: { code: data.roomCode } });
    if (!room) {
      throw new NotFoundException(`Room "${data.roomCode}" not found`);
    }

    // Users must exist before the GameHistory row is created because
    // `winnerId` is a foreign key into the users table.
    for (const playerId of data.players) {
      await this.ensureUser(playerId);
    }

    const record = await this.prisma.gameHistory.create({
      data: {
        roomId: room.id,
        winnerId: data.winnerId,
        gameName: data.gameName,
        players: JSON.stringify(data.players),
        data: JSON.stringify(data.finalState ?? {}),
      },
    });

    if (data.winnerId) {
      await this.prisma.user.update({
        where: { id: data.winnerId },
        data: { wins: { increment: 1 } },
      });
      for (const playerId of data.players) {
        if (playerId !== data.winnerId) {
          await this.prisma.user.update({
            where: { id: playerId },
            data: { losses: { increment: 1 } },
          });
        }
      }
    }

    return record;
  }

  /** Fetch the full match history of one user, newest first, plus stats. */
  async getUserHistory(userId: string) {
    const [history, user] = await Promise.all([
      this.prisma.gameHistory.findMany({
        where: {
          OR: [{ players: { contains: userId } }, { winnerId: userId }],
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.findUnique({ where: { id: userId } }),
    ]);

    return {
      userId,
      stats: {
        gamesPlayed: history.length,
        wins: user?.wins ?? 0,
        losses: user?.losses ?? 0,
      },
      history,
    };
  }

  /**
   * Make sure a user row exists for the given id. Socket ids are used as
   * player ids until the client sends its authenticated user id, so rows are
   * created lazily with a stable placeholder identity.
   */
  private async ensureUser(userId: string): Promise<void> {
    try {
      await this.prisma.user.upsert({
        where: { id: userId },
        update: {},
        create: {
          id: userId,
          email: `player-${userId}@bazigb.local`,
          username: `player-${userId}`,
          // Placeholder users never authenticate; this is a bcrypt hash of
          // "bazigb-placeholder-user" so the row satisfies the NOT NULL column.
          password: '$2b$10$Pp9TOWuZDgyIk3AWaQSiW.TNsX6i5F3MHN.dEvVIH/XJGe054kCCy',
          wins: 0,
          losses: 0,
        },
      });
    } catch (error) {
      // A real registered user may already own the placeholder email/username;
      // keep the game result but skip the counter update in that edge case.
      this.logger.warn(
        `Could not ensure user "${userId}": ${(error as Error).message}`,
      );
    }
  }
}
