'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  CheckCircle2,
  Crown,
  Loader2,
  RefreshCw,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import Nav from '../components/Nav';
import { useAuth } from '@/hooks/useAuth';
import {
  fetchTournaments,
  joinTournament,
  JoinResult,
  Tournament,
  TournamentStatus,
} from '../../lib/tournaments';

const FALLBACK_DESCRIPTION =
  'Single-elimination knockout. Winners advance, one player takes it all.';

/* ------------------------------- helpers --------------------------------- */

const STATUS_META: Record<
  TournamentStatus,
  { label: string; className: string; dot: string }
> = {
  registration: {
    label: 'Registration Open',
    className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    dot: 'bg-amber-400',
  },
  completed: {
    label: 'Completed',
    className: 'bg-slate-500/15 text-slate-400 border-slate-500/40',
    dot: 'bg-slate-400',
  },
};

function GameIcon({ game, className }: { game: string; className?: string }) {
  if (game === 'chess') {
    return (
      <span className={`${className ?? ''} leading-none select-none`} aria-hidden>
        ♞
      </span>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M3 8h18M3 16h18M8 3v18M16 3v18" />
    </svg>
  );
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

type Filter = 'all' | TournamentStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'registration', label: 'Open' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
];

/* --------------------------------- page ---------------------------------- */

export default function TournamentsPage() {
  const { user } = useAuth();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [joined, setJoined] = useState<Record<string, JoinResult>>({});
  const [joining, setJoining] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTournaments();
      setTournaments(data);
    } catch (e: any) {
      setError(e?.message || 'Could not load tournaments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const visible = useMemo(
    () =>
      filter === 'all'
        ? tournaments
        : tournaments.filter((t) => t.status === filter),
    [tournaments, filter],
  );

  const handleJoin = async (t: Tournament) => {
    if (t.status !== 'registration' || joined[t.id]?.joined || !user) return;
    setJoining(t.id);
    try {
      const result = await joinTournament(t.id, user.id);
      setJoined((prev) => ({ ...prev, [t.id]: result }));
      if (result.joined) {
        // Reflect the join locally so the player count updates instantly.
        setTournaments((prev) =>
          prev.map((x) =>
            x.id === t.id
              ? { ...x, playersJoined: Math.min(x.maxPlayers, x.playersJoined + 1) }
              : x,
          ),
        );
      }
    } catch (e: any) {
      setError(e?.message || 'Could not join the tournament.');
    } finally {
      setJoining(null);
    }
  };

  const openCount = tournaments.filter((t) => t.status === 'registration').length;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Nav />
      <div className="mx-auto w-full max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight">
              <Swords className="h-8 w-8 text-indigo-400" />
              Tournaments
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {openCount > 0
                ? `${openCount} tournament${openCount === 1 ? '' : 's'} open for registration right now.`
                : 'Pick a tournament and claim your spot.'}
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

        {/* Filter tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                filter === f.key
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/40'
                  : 'border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300"
          >
            {error}
          </div>
        )}

        {/* Cards */}
        <section className="mt-8">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/60"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-14 text-center">
              <Trophy className="mx-auto h-10 w-10 text-slate-600" />
              <p className="mt-3 font-medium text-slate-300">No tournaments here</p>
              <p className="mt-1 text-sm text-slate-500">
                Check back soon — new tournaments are added regularly.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {visible.map((t) => {
                const status = STATUS_META[t.status];
                const isJoined = Boolean(joined[t.id]?.joined);
                const joinResult = joined[t.id];
                const full = t.playersJoined >= t.maxPlayers;
                const fill = Math.min(
                  100,
                  Math.round((t.playersJoined / t.maxPlayers) * 100),
                );
                return (
                  <article
                    key={t.id}
                    className="flex flex-col rounded-2xl border border-slate-700/70 bg-slate-800/60 p-5 shadow-xl transition-colors hover:border-indigo-400/40"
                  >
                    {/* Top row: icon + status */}
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 text-xl text-indigo-300">
                        <GameIcon game={t.gameType} className={t.gameType === 'chess' ? 'text-2xl' : 'w-6 h-6'} />
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                      </span>
                    </div>

                    {/* Name + meta */}
                    <h2 className="mt-3 text-lg font-extrabold tracking-tight">
                      {t.name}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                      {t.description || FALLBACK_DESCRIPTION}
                    </p>

                    <dl className="mt-4 space-y-1.5 text-sm text-slate-300">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-500" />
                        <span>Starts {formatDate(t.startsAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>
                          {t.playersJoined}/{t.maxPlayers} players
                        </span>
                      </div>
                      {t.prize && (
                        <div className="flex items-center gap-2">
                          <Crown className="h-4 w-4 text-amber-400" />
                          <span className="font-medium text-amber-300">{t.prize}</span>
                        </div>
                      )}
                    </dl>

                    {/* Fill bar */}
                    <div className="mt-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/70">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 transition-all"
                          style={{ width: `${fill}%` }}
                        />
                      </div>
                    </div>

                    {/* Action */}
                    <div className="mt-5 flex flex-1 items-end">
                      {t.status === 'registration' && isJoined ? (
                        <div className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-center text-sm font-semibold text-emerald-400">
                          <CheckCircle2 className="mr-1.5 inline h-4 w-4" />
                          Joined
                          {joinResult?.demo && (
                            <span className="mt-0.5 block text-[11px] font-normal text-emerald-400/70">
                              {joinResult.message}
                            </span>
                          )}
                        </div>
                      ) : t.status === 'registration' ? (
                        !user ? (
                          <Link
                            href="/login"
                            className="block w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2.5 text-center text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:opacity-90 active:scale-[0.99]"
                          >
                            Sign in to join
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void handleJoin(t)}
                            disabled={full || joining === t.id || isJoined}
                            className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-2.5 text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {joining === t.id ? (
                              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                            ) : full ? (
                              'Full'
                            ) : (
                              'Join'
                            )}
                          </button>
                        )
                      ) : (
                        <Link
                          href={`/tournaments/${t.id}`}
                          className="block w-full rounded-xl border border-slate-600 bg-slate-900/60 px-4 py-2.5 text-center text-sm font-bold text-slate-300 transition-all hover:border-indigo-400/50 hover:text-white"
                        >
                          {t.status === 'in_progress' ? 'View Bracket' : 'View Results'}
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
