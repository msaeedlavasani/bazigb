/**
 * E2E smoke test for the competitive/social backend:
 *  - 3 clients: A + B seated as players, C joins as a spectator (room full).
 *  - Chat from the spectator is broadcast to the room.
 *  - A full tic-tac-toe match is played to a win; ELO ratings and history
 *    rows are persisted.
 * Run with: npx ts-node e2e-smoke.ts   (from apps/server)
 */
process.env.DATABASE_URL =
  'file:/Users/farzaaneh/Documents/Github/bazigb-main/apps/server/prisma/dev.db';

import { NestFactory } from '@nestjs/core';
import { io, Socket } from 'socket.io-client';
import { AppModule } from './src/app.module';
import { PrismaClient } from './src/generated/prisma';

const PORT = 3101;
const ROOM = 'SMOKE1';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function connect(): Promise<Socket> {
  return new Promise((resolve, reject) => {
    const s = io(`http://localhost:${PORT}`, { transports: ['websocket'] });
    s.on('connect', () => resolve(s));
    s.on('connect_error', (e: Error) => reject(e));
  });
}

function collect<T>(s: Socket, event: string, arr: T[]) {
  s.on(event, (d: T) => arr.push(d));
}

let failures = 0;
function check(name: string, ok: boolean, detail?: unknown) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail !== undefined ? '  -> ' + JSON.stringify(detail) : ''}`);
  if (!ok) failures++;
}

async function main() {
  const app = await NestFactory.create(AppModule, { logger: false });
  await app.listen(PORT);
  console.log('== test server listening on', PORT);

  const prisma = new PrismaClient();
  await prisma.room.deleteMany({ where: { code: ROOM } });

  const A = await connect();
  const B = await connect();
  const C = await connect();

  const sysA: any[] = []; collect(A, 'systemMessage', sysA);
  const sysB: any[] = []; collect(B, 'systemMessage', sysB);
  const sysC: any[] = []; collect(C, 'systemMessage', sysC);
  const chatA: any[] = []; collect(A, 'chatMessage', chatA);
  const chatC: any[] = []; collect(C, 'chatMessage', chatC);
  const errA: any[] = []; collect(A, 'error', errA);
  const errB: any[] = []; collect(B, 'error', errB);
  const statesA: any[] = []; collect(A, 'gameState', statesA);

  // A creates + seats, B seats (game should start), C is a spectator.
  A.emit('joinRoom', { roomCode: ROOM, gameType: 'tic-tac-toe' });
  await sleep(250);
  B.emit('joinRoom', ROOM);
  await sleep(250);
  C.emit('joinRoom', ROOM);
  await sleep(350);

  const room = await prisma.room.findUnique({ where: { code: ROOM } });
  const seated = room ? JSON.parse(room.players) : [];
  check('2 players seated', room !== null && seated.length === 2, seated);
  check('room status playing', room?.status === 'playing', room?.status);
  check('spectator not seated', !seated.includes(C.id), seated);

  // C (spectator) chats; A and C should both receive the broadcast.
  C.emit('chatMessage', { room: ROOM, message: 'hello from the stands' });
  await sleep(300);
  check('chat broadcast to player A', chatA[0]?.message === 'hello from the stands', chatA[0]);
  check('chat broadcast to spectator C', chatC[0]?.message === 'hello from the stands', chatC[0]);

  // System messages: joins + game start.
  check('system: game started emitted', sysA.some((m) => m.type === 'gameStart'), sysA.map((m) => m.type));
  check('system: player join emitted', sysB.some((m) => m.type === 'join'), sysB.map((m) => m.type));
  check('system: spectator join emitted', sysC.some((m) => m.type === 'spectate'), sysC.map((m) => m.type));

  // Play tic-tac-toe to a win for A (column 0-3-6).
  const gameOver = new Promise<any>((resolve) => A.once('gameOver', resolve));
  A.emit('makeMove', { room: ROOM, moveName: 'clickCell', args: [0] }); await sleep(120);
  B.emit('makeMove', { room: ROOM, moveName: 'clickCell', args: [1] }); await sleep(120);
  A.emit('makeMove', { room: ROOM, moveName: 'clickCell', args: [3] }); await sleep(120);
  B.emit('makeMove', { room: ROOM, moveName: 'clickCell', args: [4] }); await sleep(120);
  A.emit('makeMove', { room: ROOM, moveName: 'clickCell', args: [6] });
  const go = await Promise.race([gameOver, sleep(2500).then(() => null)]);
  check('gameOver emitted with winner', go?.winner === A.id, go?.winner);
  console.log('DEBUG errors A:', JSON.stringify(errA));
  console.log('DEBUG errors B:', JSON.stringify(errB));
  console.log('DEBUG last gameState cells:', JSON.stringify(statesA[statesA.length - 1]?.G?.cells ?? null));

  const aUser = await prisma.user.findUnique({ where: { id: A.id } });
  const bUser = await prisma.user.findUnique({ where: { id: B.id } });
  check('winner rating 1216 (1200 -> +16)', aUser?.rating === 1216, aUser?.rating);
  check('loser rating 1184 (1200 -> -16)', bUser?.rating === 1184, bUser?.rating);
  check('winner wins=1', aUser?.wins === 1, aUser?.wins);
  check('loser losses=1', bUser?.losses === 1, bUser?.losses);
  const history = await prisma.gameHistory.findFirst({
    where: { roomId: room!.id },
    orderBy: { createdAt: 'desc' },
  });
  check('history row recorded', history?.winnerId === A.id, history?.winnerId);
  check('system: game over emitted', sysC.some((m) => m.type === 'gameOver'), sysC.map((m) => m.type));

  // HTTP history endpoint includes rating in stats.
  const res = await fetch(`http://localhost:${PORT}/history/${A.id}`);
  const stats = (await res.json()).stats;
  check('GET /history stats include rating', stats?.rating === 1216, stats);

  // Cleanup test rows.
  await prisma.gameHistory.deleteMany({ where: { winnerId: A.id } });
  await prisma.user.deleteMany({ where: { id: { in: [A.id!, B.id!] } } });
  await prisma.room.deleteMany({ where: { code: ROOM } });

  A.disconnect(); B.disconnect(); C.disconnect();
  await app.close();
  await prisma.$disconnect();

  console.log(failures === 0 ? '== ALL CHECKS PASSED' : `== ${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(2);
});
