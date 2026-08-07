'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Loader2, Users } from 'lucide-react';
import { socket, connectSocket } from '../../../lib/socket';
import { fetchRoom, GameState, Room } from '../../../lib/rooms';
import Board from '../../components/Board';
import ChessBoard, { ChessMoveInput } from '../../components/ChessBoard';

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const roomCode = useMemo(() => (roomId ?? '').trim().toUpperCase(), [roomId]);

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!roomCode) return;
    connectSocket();
    let cancelled = false;

    // 1. Fetch the persisted room + initial game state from the DB via the server.
    fetchRoom(roomCode)
      .then((r) => {
        if (cancelled) return;
        setRoom(r);
        if (r.currentState) setGameState(r.currentState);
      })
      .catch((e: any) => {
        if (!cancelled) setError(e?.message || 'Room not found');
      });

    // 2. Live updates over the socket.
    const onConnect = () => {
      socket.emit('joinRoom', roomCode);
    };
    const onGameState = (state: GameState) => {
      setGameState(state);
      setWinner(null);
      setError(null);
    };
    const onGameOver = ({ state, winner: w }: { state: GameState; winner: string }) => {
      setGameState(state);
      setWinner(w);
    };
    const onError = (err: any) => {
      setError(err?.message || 'An unknown error occurred');
    };

    socket.on('gameState', onGameState);
    socket.on('gameOver', onGameOver);
    socket.on('error', onError);
    socket.on('connect', onConnect);

    // Socket may already be connected (e.g. coming from the lobby).
    if (socket.connected) onConnect();

    return () => {
      cancelled = true;
      socket.off('gameState', onGameState);
      socket.off('gameOver', onGameOver);
      socket.off('error', onError);
      socket.off('connect', onConnect);
    };
  }, [roomCode]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (!gameState || winner) return;
      socket.emit('makeMove', { room: roomCode, moveName: 'clickCell', args: [index] });
    },
    [gameState, winner, roomCode],
  );

  /**
   * Chess moves are sent with the standard `{ from, to, promotion }` object.
   * The server re-validates them against the authoritative position.
   */
  const handleChessMove = useCallback(
    (move: ChessMoveInput) => {
      if (!gameState || winner) return;
      const args = move.promotion
        ? [{ from: move.from, to: move.to, promotion: move.promotion }]
        : [{ from: move.from, to: move.to }];
      socket.emit('makeMove', { room: roomCode, moveName: 'move', args });
    },
    [gameState, winner, roomCode],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  const isMyTurn = !!gameState && socket.id === gameState.ctx.currentPlayer;

  // Generic container: pick the board component from the room's game type
  // (falls back to the state shape so old rooms still render correctly).
  const gameType = room?.gameType ?? (gameState && 'fen' in gameState.G ? 'chess' : 'tic-tac-toe');
  const isChess = gameType === 'chess';

  // Winner is emitted live via `gameOver`, but can also be reconstructed from
  // the persisted state (e.g. after a page reload on a finished chess room).
  const winnerId: string | null = winner ?? (gameState?.G?.winner ?? null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className={`w-full ${isChess ? 'max-w-xl' : 'max-w-md'} text-center space-y-6`}>
        <header className="flex items-center justify-between">
          <Link
            href="/lobby"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Lobby
          </Link>
          <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Room</span>
            <span className="font-mono font-bold tracking-widest">{roomCode}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="Copy room code"
            >
              {copied ? (
                <span className="text-xs text-emerald-400 font-semibold">Copied!</span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </header>

        {error && !gameState ? (
          /* Error state (room not found / full). */
          <div className="space-y-4 p-6 rounded-2xl bg-slate-800 border border-rose-500/40">
            <h2 className="text-xl font-bold text-rose-400">Room unavailable</h2>
            <p className="text-slate-400 text-sm">{error}</p>
            <Link
              href="/lobby"
              className="inline-block px-6 py-2 rounded-xl bg-white text-indigo-600 font-bold hover:bg-slate-100 transition-colors"
            >
              Back to Lobby
            </Link>
          </div>
        ) : !gameState ? (
          /* Waiting for opponent — only one player seated (or still fetching). */
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="w-14 h-14 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-300">
                Waiting for opponent…
              </p>
              <p className="text-slate-500 text-sm">
                Share room code <span className="font-mono font-bold tracking-widest text-slate-300">{roomCode}</span>{' '}
                to invite a friend
              </p>
            </div>
            {room && (
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 rounded-full border border-slate-700 px-4 py-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                {room.players.length}/2 players in room
              </div>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-semibold hover:bg-indigo-500/30 transition-colors"
            >
              {copied ? <Loader2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Code copied!' : 'Copy room code'}
            </button>
          </div>
        ) : (
          /* Board — both players seated and a game state exists. */
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isMyTurn ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'
                  }`}
                />
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {isMyTurn ? 'Your Turn' : "Opponent's Turn"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-2.5 py-0.5">
                  {isChess ? '♞ Chess' : 'Tic-Tac-Toe'}
                </span>
                <span className="text-xs font-mono text-slate-500">Turn {gameState.ctx.turn}</span>
              </div>
            </div>

            {isChess ? (
              <ChessBoard
                fen={gameState.G.fen}
                onMove={handleChessMove}
                disabled={!isMyTurn || !!winnerId}
                orientation={socket.id === gameState.ctx.players[0] ? 'w' : 'b'}
              />
            ) : (
              <Board
                cells={gameState.G.cells}
                onCellClick={handleCellClick}
                disabled={!isMyTurn || !!winnerId}
              />
            )}

            {winnerId && (
              <div className="p-4 bg-indigo-600 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold">
                  {winnerId === 'draw' ? "It's a Draw!" : `Winner: ${winnerId === socket.id ? 'YOU!' : 'Opponent'}`}
                </h2>
                <Link
                  href="/lobby"
                  className="mt-4 inline-block px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Back to Lobby
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
