import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaziGBEngine, GameState } from '@bazigb/engine';
import { TicTacToe } from '@bazigb/game-tic-tac-toe';
import { RoomService } from '../rooms/room.service';
import { HistoryService } from '../history/history.service';

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

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomCode: string) {
    if (!roomCode) return;

    try {
      const room = await this.roomService.joinRoom(roomCode, client.id);
      client.join(roomCode);
      console.log(`Client ${client.id} joined room ${roomCode}. Total players: ${room.players.length}`);

      // Two players seated and no game running yet -> start TicTacToe.
      const shouldStart =
        room.players.length === 2 && room.status === 'waiting' && !room.currentState;

      if (shouldStart) {
        const initialState = BaziGBEngine.createInitialState(TicTacToe, room.players);
        await this.roomService.startGame(roomCode, initialState);
        this.server.to(roomCode).emit('gameState', initialState);
        console.log(`Game started in room ${roomCode}`);
      } else if (room.currentState) {
        // Late joiner / reconnection: send the current state.
        client.emit('gameState', room.currentState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
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
      const nextState = BaziGBEngine.processMove(
        TicTacToe,
        roomRecord.currentState,
        moveName,
        client.id,
        ...args,
      );

      // Check for a winner or a draw.
      const result = TicTacToe.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        console.log(`Game over in room ${room}. Winner: ${result}`);
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });

        const winner = result === 'draw' ? null : result;
        await this.roomService.finishRoom(room, winner, nextState);
        await this.historyService.recordGameResult({
          roomCode: room,
          gameName: TicTacToe.name,
          winnerId: winner,
          players: roomRecord.players,
          finalState: nextState,
        });
        console.log(`Game result logged in history for room ${room}`);
      } else {
        await this.roomService.saveState(room, nextState);
        this.server.to(room).emit('gameState', nextState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }
}
