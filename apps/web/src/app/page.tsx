import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <Link
        href="/profile"
        className="absolute top-5 right-5 rounded-lg border border-slate-700 bg-slate-800/60 px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
      >
        Profile
      </Link>
      <div className="max-w-md w-full text-center space-y-8">
        <header className="space-y-3">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            BaziGB
          </h1>
          <p className="text-slate-400 font-medium">Online Board Game Platform</p>
        </header>

        <div className="space-y-3">
          <Link
            href="/lobby"
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 font-bold text-lg shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.99] transition-all"
          >
            Enter Lobby
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-slate-600">
            Create a room, share the code, and play Tic-Tac-Toe with a friend.
          </p>
        </div>
      </div>
    </main>
  );
}
