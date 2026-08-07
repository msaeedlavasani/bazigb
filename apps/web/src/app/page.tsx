'use client';

import React, { useEffect, useState } from 'react';
import { socket, connectSocket } from '../lib/socket';
import Board from './components/Board';

export default function Home() {
  const [gameState, setGameState] = useState<any>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [room, setRoom] = useState('lobby');

  useEffect(() => {
    connectSocket();

    socket.on('gameState', (state) => {
      setGameState(state);
      setWinner(null);
    });

    socket.on('gameOver', ({ state, winner }) => {
      setGameState(state);
      setWinner(winner);
    });

    socket.on('connect', () => {
      socket.emit('joinRoom', room);
    });

    return () => {
      socket.off('gameState');
      socket.off('gameOver');
      socket.off('connect');
    };
  }, [room]);

  const handleCellClick = (index: number) => {
    if (!gameState || winner) return;
    socket.emit('makeMove', { room, moveName: 'clickCell', args: [index] });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className="max-w-md w-full text-center space-y-8">
        <header>
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            BaziGB
          </h1>
          <p className="mt-2 text-slate-400 font-medium">Tic Tac Toe Online</p>
        </header>

        {gameState ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${socket.id === gameState.ctx.currentPlayer ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'}`}></span>
                <span className="text-sm font-semibold uppercase tracking-wider">
                  {socket.id === gameState.ctx.currentPlayer ? 'Your Turn' : "Opponent's Turn"}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500">
                Turn {gameState.ctx.turn}
              </div>
            </div>

            <Board 
              cells={gameState.G.cells} 
              onCellClick={handleCellClick}
              disabled={socket.id !== gameState.ctx.currentPlayer || !!winner}
            />

            {winner && (
              <div className="p-4 bg-indigo-600 rounded-xl shadow-xl animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold">
                  {winner === 'draw' ? "It's a Draw!" : `Winner: ${winner === socket.id ? 'YOU!' : 'Opponent'}`}
                </h2>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 animate-pulse">Waiting for opponent to join room "{room}"...</p>
          </div>
        )}
      </div>
    </main>
  );
}
