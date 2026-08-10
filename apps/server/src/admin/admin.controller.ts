import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../common/admin.guard';
import { Roles } from '../common/roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('stats')
  @Roles('ADMIN')
  async getStats() {
    const [
      totalUsers,
      adminUsers,
      totalRooms,
      waitingRooms,
      playingRooms,
      finishedRooms,
      totalGames,
      gamesByType,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.room.count(),
      this.prisma.room.count({ where: { status: 'waiting' } }),
      this.prisma.room.count({ where: { status: 'playing' } }),
      this.prisma.room.count({ where: { status: 'finished' } }),
      this.prisma.gameHistory.count(),
      this.prisma.gameHistory.groupBy({
        by: ['gameName'],
        _count: {
          _all: true,
        },
      }),
    ]);

    const byType: Record<string, number> = {};
    gamesByType.forEach((g) => {
      byType[g.gameName] = g._count._all;
    });

    return {
      users: { total: totalUsers, admins: adminUsers },
      rooms: { total: totalRooms, waiting: waitingRooms, playing: playingRooms, finished: finishedRooms },
      games: { total: totalGames, byType },
    };
  }

  @Get('users')
  @Roles('ADMIN')
  async getUsers(
    @Query('q') q?: string,
    @Query('role') role?: string,
    @Query('take') take: string = '50',
    @Query('skip') skip: string = '0',
  ) {
    const takeNum = Math.min(parseInt(take, 10) || 50, 100);
    const skipNum = parseInt(skip, 10) || 0;

    const where: any = {};
    if (role) {
      where.role = role;
    }
    if (q) {
      // NOTE: `mode: 'insensitive'` is not supported by the SQLite provider —
      // plain `contains` works on both SQLite (dev) and Postgres (prod).
      where.OR = [
        { username: { contains: q } },
        { email: { contains: q } },
        { phone: { contains: q } },
      ];
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        take: takeNum,
        skip: skipNum,
        select: {
          id: true,
          email: true,
          username: true,
          phone: true,
          role: true,
          wins: true,
          losses: true,
          rating: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { items, total };
  }
}
