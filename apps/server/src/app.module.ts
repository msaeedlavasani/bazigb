import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameGateway } from './game/game.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RoomService } from './rooms/room.service';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { RoomsController } from './rooms/room.controller';
import { LeaderboardService } from './leaderboard/leaderboard.service';
import { LeaderboardController } from './leaderboard/leaderboard.controller';
import { TournamentService } from './tournaments/tournament.service';
import { TournamentsController } from './tournaments/tournament.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [
    HistoryController,
    RoomsController,
    LeaderboardController,
    TournamentsController,
  ],
  providers: [GameGateway, RoomService, HistoryService, LeaderboardService, TournamentService],
})
export class AppModule {}
