import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
  }

  @SubscribeMessage('makeMove')
  handleMakeMove(@MessageBody() data: any) {
    // اینجا منطق همگام‌سازی حرکت بازیکنان قرار می‌گیرد
    this.server.to(data.room).emit('moveMade', data.move);
  }
}
