'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Swords, Trophy, User, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { useSoundSettings } from '../../hooks/useSoundSettings';

const NAV_LINKS = [
  { href: '/lobby', label: 'Lobby', icon: Gamepad2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/tournaments', label: 'Tournaments', icon: Swords },
];

export default function Nav() {
  const pathname = usePathname();
  const { muted, toggleMute } = useSoundSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-900/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-0.5 px-3 py-2.5 sm:gap-1 sm:px-4 sm:py-3">
        <Link
          href="/"
          className="mr-2 flex shrink-0 items-center gap-2 group sm:mr-4"
        >
          <div className="relative h-7 w-7 overflow-hidden rounded-lg sm:h-8 sm:w-8">
            <Image
              src="/brand/logo-256.webp"
              alt="BaziG3 Logo"
              fill
              className="object-cover transition-transform group-hover:scale-110"
            />
          </div>
          <span className="text-base font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-sky-300 group-hover:from-white group-hover:to-white transition-all sm:text-lg">
            BaziG3
          </span>
        </Link>

        <div className="flex min-w-0 items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  active
                    ? 'bg-indigo-500/15 text-indigo-300'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            aria-pressed={!muted}
            title={muted ? 'Unmute sounds' : 'Mute sounds'}
            className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-sm font-medium transition-colors sm:px-3 ${
              muted
                ? 'border-slate-800 text-slate-500 hover:bg-slate-800 hover:text-slate-300'
                : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{muted ? 'Muted' : 'Sound'}</span>
          </button>

          <Link
            href="/profile"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 px-2 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors sm:px-3"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
