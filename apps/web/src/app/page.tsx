import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Nav from './components/Nav';

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white overflow-hidden">
        {/* Banner Background */}
        <div className="absolute inset-0 z-0 opacity-20 blur-2xl scale-110">
          <Image
            src="/brand/banner.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center space-y-10">
          <header className="space-y-6">
            <div className="relative mx-auto h-32 w-32 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Image
                src="/brand/logo-512.webp"
                alt="BaziG3 Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300">
                BaziG3
              </h1>
              <p className="text-xl font-bold tracking-widest text-indigo-400/90 uppercase">
                بازی جیبی
              </p>
              <p className="text-slate-400 font-medium">همه‌ی بازی‌ها، توی جیبت</p>
            </div>
          </header>

          <div className="max-w-md mx-auto space-y-4">
            <Link
              href="/lobby"
              className="flex items-center justify-center gap-2 w-full px-6 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-600 font-black text-xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Enter Lobby
              <ArrowRight className="w-6 h-6" />
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/leaderboard"
                className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-2xl border border-slate-700 bg-slate-800/40 backdrop-blur-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all hover:border-slate-500"
              >
                Leaderboard
              </Link>
              <Link
                href="/tournaments"
                className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-2xl border border-slate-700 bg-slate-800/40 backdrop-blur-sm font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all hover:border-slate-500"
              >
                Tournaments
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
