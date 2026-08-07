import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

/**
 * Shared socket.io client for the whole app.
 *
 * Resilience:
 *  - `autoConnect: false` lets pages decide when the socket should exist
 *    (e.g. only when a game page mounts).
 *  - Reconnection is enabled with an exponential backoff and unlimited
 *    attempts, so a dropped connection is retried automatically.
 *  - Pages listen for `connect` / `disconnect` / `connect_error` and call
 *    `rejoinRoom()` to re-emit `joinRoom` — the server re-seats the client
 *    (or re-admits a spectator) and re-sends the persisted game state.
 */
export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 800,
  reconnectionDelayMax: 5000,
  randomizationFactor: 0.5,
  timeout: 10000,
});

/** Connect the socket (no-op when it is already connected). */
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

/**
 * Join (or re-join) a room. Safe to call on every `connect` event — the
 * server treats a re-join as a no-op for seated players, seats newcomers,
 * admits spectators when the room is full, and replies with the latest
 * persisted game state.
 */
export const rejoinRoom = (roomCode: string) => {
  if (socket.connected) {
    socket.emit('joinRoom', roomCode);
  }
};
