'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Crown, Loader2, Medal, RefreshCw, Search, Trophy } from 'lucide-react';
import Nav from '../components/Nav';
import { fetchLeaderboard, LeaderboardEntry } from '../../lib/leaderboard';
import { useAuth } from '@/hooks/useAuth';

/* ------------------------------- styling -------------------------------- */

const RANK_META: Record<
  number,
  { ring: string; badge: string; gradient: string; label: string }
> = {
  1: {
    ring: 'ring-amber-400/60',
    badge: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950',
    gradient: 'from-amber-400/80 to-yellow-500/80',
    label: 'Gold',
  },
  2: {
    ring: 'ring-slate-300/60',
    badge: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900',
    gradient: 'from-slate-300/80 to-slate-400/80',
    label: 'Silver',
  },
  3: {
    ring: 'ring-amber-600/60',
    badge: 'bg-gradient-to-br from-amber-500 to-orange-700 text-amber-100',
    gradient: 'from-amber-600/80 to-orange-700/80',
    label: 'Bronze',
  },
};

const MEDAL_ICON: Record<number, React.ReactNode> = {
  1: <Crown className="h-5 w-5" />,
  2: <Medal className="h-5 w-5" />,
  3: <Medal className="h-5 w-5" />,
};

function WinRateBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-700/70">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-sky-400"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
        >
          <div className="h-5 w-6 animate-pulse rounded bg-slate-800" />
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-32 animate-pulse rounded bg-slate-800" />
            <div className="h-2.5 w-24 animate-pulse rounded bg-slate-800" />
          </div>
          <div className="h-4 w-14 animate-pulse rounded bg-slate-800" />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------- page ------------------------------------ */

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeaderboard();
      setEntries(data);
    } catch (e: any) {
      setError(e?.message || 'Could not load the leaderboard.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) => e.username.toLowerCase().includes(q));
  }, [entries, query]);

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);
  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean) as LeaderboardEntry[];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Nav />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight">
              <Trophy className="h-8 w-8 text-amber-400" />
              Leaderboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Top 50 players ranked by competitive rating.
            </p>
          </div>
          <button
            onClick={() => void load()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </header>

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players by username…"
              aria-label="Search players"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/60"
            />
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300"
          >
            {error}
          </div>
        )}

        {/* Podium */}
        {!loading && top3.length > 0 && (
          <section className="mt-8" aria-label="Top 3">
            <div className="flex items-end justify-center gap-4">
              {podiumOrder.map((entry) => {
                const meta = RANK_META[entry.rank];
                const first = entry.rank === 1;
                return (
                  <div
                    key={entry.userId}
                    className={`flex flex-col items-center rounded-2xl border border-slate-700/70 bg-slate-800/60 px-6 pt-6 shadow-xl ${
                      first ? 'pb-8' : 'pb-6'
                    }`}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${meta.gradient} ring-2 ${meta.ring} ${
                        first ? 'h-14 w-14' : ''
                      }`}
                    >
                      {MEDAL_ICON[entry.rank]}
                    </span>
                    <div className="mt-3 text-center">
                      <div className="text-base font-extrabold">{entry.username}</div>
                      <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
                        #{entry.rank} · {meta.label}
                      </div>
                      <div className="mt-2 text-xl font-extrabold text-amber-300">
                        {entry.rating}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider text-slate-500">
                        rating
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Ranked list */}
        <section className="mt-10">
          <h2 className="text-lg font-bold text-slate-300">
            Full Rankings
            <span className="ml-2 text-sm font-medium text-slate-500">
              {loading ? '…' : `${filtered.length} ${filtered.length === 1 ? 'player' : 'players'}`}
            </span>
          </h2>

          <div className="mt-4">
            {loading ? (
              <SkeletonRows />
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-600" />
                <p className="mt-3 font-medium text-slate-300">No players found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Nobody matches “{query}” — try a different username.
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {filtered.map((entry) => {
                  const meta = RANK_META[entry.rank];
                  const isMe = user?.id === entry.userId;
                  return (
                    <li
                      key={entry.userId}
                      className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                        isMe
                          ? 'border-indigo-400/50 bg-indigo-500/10'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      {/* Rank badge */}
                      <div className="w-10 shrink-0 text-center">
                        {meta ? (
                          <span
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${meta.badge} font-extrabold`}
                          >
                            {MEDAL_ICON[entry.rank]}
                          </span>
                        ) : (
                          <span className="font-mono text-sm font-bold text-slate-400">
                            {entry.rank}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${
                          meta
                            ? meta.gradient
                            : 'from-indigo-500 to-sky-500'
                        } text-sm font-extrabold uppercase`}
                      >
                        {entry.username.charAt(0) || '?'}
                      </div>

                      {/* Identity + stats */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-semibold">
                            {entry.username}
                          </span>
                          {isMe && (
                            <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300">
                              You
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-400">
                          <span>
                            <span className="font-semibold text-emerald-400">
                              {entry.wins}W
                            </span>
                            <span className="mx-1 text-slate-600">/</span>
                            <span className="font-semibold text-rose-400">
                              {entry.losses}L
                            </span>
                          </span>
                          <span>{entry.gamesPlayed} games</span>
                          <span className="flex items-center gap-1.5">
                            <WinRateBar value={entry.winRate} />
                            {entry.winRate}%
                          </span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="shrink-0 text-right">
                        <div className="text-lg font-extrabold text-sky-300">
                          {entry.rating}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500">
                          rating
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
