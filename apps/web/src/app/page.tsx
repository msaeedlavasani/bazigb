import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Nav from './components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
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
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/leaderboard"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/60 font-semibold text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                href="/tournaments"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/60 font-semibold text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                Tournaments
              </Link>
            </div>
            <p className="text-xs text-slate-600">
              Create a room, share the code, climb the rankings, and enter tournaments.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
