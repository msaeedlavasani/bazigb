'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Swords, Trophy, User } from 'lucide-react';

const NAV_LINKS = [
  { href: '/lobby', label: 'Lobby', icon: Gamepad2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/tournaments', label: 'Tournaments', icon: Swords },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-900/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-1 px-4 py-3">
        <Link
          href="/"
          className="mr-4 text-lg font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400"
        >
          BaziGB
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-500/15 text-indigo-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/profile"
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
      </nav>
    </header>
  );
}
