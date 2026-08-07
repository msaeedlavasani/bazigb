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

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  // In-memory storage for game states (Room ID -> State)
  private games = new Map<string, GameState>();
  private roomPlayers = new Map<string, string[]>();

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: string) {
    client.join(room);
    
    if (!this.roomPlayers.has(room)) {
      this.roomPlayers.set(room, []);
    }
    
    const players = this.roomPlayers.get(room);
    if (players && !players.includes(client.id)) {
      players.push(client.id);
    }

    const currentPlayers = players || [];
    console.log(`Client ${client.id} joined room ${room}. Total players: ${currentPlayers.length}`);

    // If 2 players joined, start TicTacToe
    if (currentPlayers.length === 2 && !this.games.has(room)) {
      const initialState = BaziGBEngine.createInitialState(TicTacToe, currentPlayers);
      this.games.set(room, initialState);
      this.server.to(room).emit('gameState', initialState);
      console.log(`Game started in room ${room}`);
    } else if (this.games.has(room)) {
      client.emit('gameState', this.games.get(room));
    }
  }

  @SubscribeMessage('makeMove')
  handleMakeMove(@ConnectedSocket() client: Socket, @MessageBody() data: { room: string; moveName: string; args: any[] }) {
    const { room, moveName, args } = data;
    const state = this.games.get(room);

    if (!state) return;

    try {
      const nextState = BaziGBEngine.processMove(TicTacToe, state, moveName, client.id, ...args);
      
      // Check for winner
      const result = TicTacToe.endIf?.(nextState.G, nextState.ctx);
      if (result) {
        console.log(`Game over in room ${room}. Winner: ${result}`);
        this.server.to(room).emit('gameOver', { state: nextState, winner: result });
        this.games.delete(room);
        this.roomPlayers.delete(room);
      } else {
        this.games.set(room, nextState);
        this.server.to(room).emit('gameState', nextState);
      }
    } catch (error: any) {
      client.emit('error', error.message || 'An unknown error occurred');
    }
  }
}
