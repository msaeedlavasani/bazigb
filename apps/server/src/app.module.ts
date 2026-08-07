import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameGateway } from './game/game.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RoomService } from './rooms/room.service';
import { HistoryService } from './history/history.service';
import { HistoryController } from './history/history.controller';
import { RoomsController } from './rooms/room.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [HistoryController, RoomsController],
  providers: [GameGateway, RoomService, HistoryService],
})
export class AppModule {}
