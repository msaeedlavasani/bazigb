'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Gamepad2, Trophy, Swords, TrendingUp, RefreshCw, LogOut, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

/* ------------------------------- types ---------------------------------- */

interface HistoryStats {
  gamesPlayed: number;
  wins: number;
  losses: number;
}

interface HistoryMatch {
  id: string;
  winnerId: string | null;
  roomId: string;
  gameName: string;
  /** JSON-encoded array of participating user ids. */
  players: string;
  /** JSON-encoded final game state. */
  data: string;
  createdAt: string;
}

interface HistoryResponse {
  userId: string;
  stats: HistoryStats;
  history: HistoryMatch[];
}

type MatchResult = 'win' | 'loss' | 'draw';

/* ------------------------------ helpers --------------------------------- */

function formatGameName(name: string): string {
  if (!name) return 'Unknown Game';
  return name
    .split(/[-_ ]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function truncateId(id: string, max = 12): string {
  return id.length > max ? `${id.slice(0, max)}…` : id;
}

function parsePlayers(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function getResult(match: HistoryMatch, currentUserId: string): MatchResult {
  if (match.winnerId === null) return 'draw';
  return match.winnerId === currentUserId ? 'win' : 'loss';
}

const RESULT_BADGE: Record<
  MatchResult,
  { label: string; className: string }
> = {
  win: {
    label: 'Win',
    className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40',
  },
  loss: {
    label: 'Loss',
    className: 'bg-rose-500/10 text-rose-400 border-rose-500/40',
  },
  draw: {
    label: 'Draw',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/40',
  },
};

/* ------------------------------- UI bits -------------------------------- */

function StatCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${accent}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-2xl font-extrabold leading-tight text-white">{value}</div>
        <div className="truncate text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </div>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-t border-slate-800/80">
          {Array.from({ length: 4 }).map((__, j) => (
            <td key={j} className="px-4 py-4">
              <div className="h-4 w-24 max-w-full animate-pulse rounded bg-slate-800" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

/* ------------------------------ profile page ---------------------------- */

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const [stats, setStats] = useState<HistoryStats | null>(null);
  const [matches, setMatches] = useState<HistoryMatch[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!user) return;
    setLoadingHistory(true);
    setError(null);
    try {
      const data = await api.get<HistoryResponse>(`/history/${user.id}`);
      setStats(data.stats);
      setMatches(data.history);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Could not load match history.',
      );
    } finally {
      setLoadingHistory(false);
    }
  }, [user]);

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  // Not signed in -> send to the login page after the session check settles.
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 animate-pulse">Loading your profile...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
        <div className="w-full max-w-md rounded-2xl bg-slate-800/60 border border-slate-700 p-8 text-center shadow-xl">
          <h1 className="text-xl font-bold">Please sign in</h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to view your stats and match history.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-2.5 font-semibold text-white hover:from-indigo-400 hover:to-sky-400 transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const winRate =
    stats && stats.gamesPlayed > 0
      ? `${((stats.wins / stats.gamesPlayed) * 100).toFixed(1)}%`
      : '—';

  const hasMatches = matches.length > 0;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to game
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </header>

        {/* Identity card */}
        <section className="mt-8 flex flex-wrap items-center gap-5 rounded-2xl bg-slate-800/60 border border-slate-700/70 p-6 shadow-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-2xl font-extrabold uppercase">
            {user.username.charAt(0) || '?'}
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight">{user.username}</h1>
            <p className="truncate text-sm text-slate-400">{user.email}</p>
          </div>
          <p className="ml-auto hidden text-xs font-mono text-slate-500 sm:block">
            ID: {truncateId(user.id, 16)}
          </p>
        </section>

        {/* Stats */}
        <section className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Games Played"
            value={stats ? stats.gamesPlayed : '—'}
            icon={<Gamepad2 className="h-5 w-5 text-indigo-400" />}
            accent="border-indigo-400/30 bg-indigo-500/10"
          />
          <StatCard
            label="Wins"
            value={stats ? stats.wins : '—'}
            icon={<Trophy className="h-5 w-5 text-emerald-400" />}
            accent="border-emerald-400/30 bg-emerald-500/10"
          />
          <StatCard
            label="Losses"
            value={stats ? stats.losses : '—'}
            icon={<Swords className="h-5 w-5 text-rose-400" />}
            accent="border-rose-400/30 bg-rose-500/10"
          />
          <StatCard
            label="Win Rate"
            value={winRate}
            icon={<TrendingUp className="h-5 w-5 text-sky-400" />}
            accent="border-sky-400/30 bg-sky-500/10"
          />
        </section>

        {/* Match history */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">
              Match History
              {stats && (
                <span className="ml-2 text-sm font-medium text-slate-500">
                  ({stats.gamesPlayed} {stats.gamesPlayed === 1 ? 'game' : 'games'})
                </span>
              )}
            </h2>
            <button
              onClick={() => void loadHistory()}
              disabled={loadingHistory}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`h-4 w-4 ${loadingHistory ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300"
            >
              {error}
            </div>
          )}

          {loadingHistory && !error ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/50">
              <table className="w-full text-left text-sm">
                <tbody>
                  <SkeletonRows />
                </tbody>
              </table>
            </div>
          ) : hasMatches ? (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-700/70 bg-slate-900/50 shadow-xl">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700/70 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="px-4 py-3">Game Type</th>
                    <th className="px-4 py-3">Opponent</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match, index) => {
                    const players = parsePlayers(match.players);
                    const opponent =
                      players.find((id) => id !== user.id) ?? 'unknown';
                    const result = getResult(match, user.id);
                    const badge = RESULT_BADGE[result];
                    return (
                      <tr
                        key={match.id}
                        className={
                          index % 2 === 0
                            ? 'bg-slate-800/30 transition-colors hover:bg-slate-800/60'
                            : 'bg-transparent transition-colors hover:bg-slate-800/60'
                        }
                      >
                        <td className="px-4 py-3.5 font-medium text-slate-200">
                          {formatGameName(match.gameName)}
                        </td>
                        <td
                          className="px-4 py-3.5 font-mono text-xs text-slate-300"
                          title={opponent}
                        >
                          {opponent === 'unknown'
                            ? 'Unknown'
                            : truncateId(opponent)}
                        </td>
                        <td className="px-4 py-3.5 text-slate-400">
                          {formatDate(match.createdAt)}
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <span
                            className={`inline-block min-w-[3.5rem] rounded-full border px-2.5 py-0.5 text-center text-xs font-bold ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            !error && (
              <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-14 text-center">
                <Gamepad2 className="h-10 w-10 text-slate-600" />
                <p className="mt-3 font-medium text-slate-300">No matches yet</p>
                <p className="mt-1 text-sm text-slate-500">
                  Play a game and your results will show up here.
                </p>
                <Link
                  href="/"
                  className="mt-5 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2 text-sm font-semibold text-white hover:from-indigo-400 hover:to-sky-400 transition-colors"
                >
                  Play a Game
                </Link>
              </div>
            )
          )}
        </section>
      </div>
    </main>
  );
}
