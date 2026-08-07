'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Crown,
  Loader2,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import Nav from '../../components/Nav';
import { useAuth } from '@/hooks/useAuth';
import {
  BracketMatch,
  fetchTournament,
  joinTournament,
  TournamentDetail,
  TournamentStatus,
} from '../../../lib/tournaments';

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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function roundLabel(round: number, rounds: number): string {
  const fromEnd = rounds - round; // 1 = final
  if (fromEnd === 1) return 'Final';
  if (fromEnd === 2) return 'Semifinals';
  if (fromEnd === 3) return 'Quarterfinals';
  return `Round ${round + 1}`;
}

/**
 * Bracket geometry: an 8-player knockout becomes a grid with 4 implicit rows
 * of 5rem each. A match in round `r` at slot `s` spans 2^r rows and is
 * vertically centred, which naturally forms the tree. Connector lines are
 * drawn with an overlay SVG using percentage coordinates that mirror the
 * grid geometry exactly (columns split the width minus a 3% gutter).
 */
function useBracketGeometry(rounds: number) {
  return useMemo(() => {
    if (rounds <= 0) return { maxSlots: 0, gapPct: 3, colW: 0 };
    const maxSlots = Math.pow(2, rounds - 1);
    const gapPct = 3;
    const colW = (100 - (rounds - 1) * gapPct) / rounds;
    return { maxSlots, gapPct, colW };
  }, [rounds]);
}

function buildConnectors(
  matches: BracketMatch[],
  rounds: number,
  maxSlots: number,
  gapPct: number,
  colW: number,
): { path: string; isFinal: boolean }[] {
  const byKey = new Map(
    matches.map((m) => [`${m.round}:${m.slot}`, m] as const),
  );
  const connectors: { path: string; isFinal: boolean }[] = [];

  for (const match of matches) {
    if (match.round <= 0) continue;

    const childA = byKey.get(`${match.round - 1}:${match.slot * 2}`);
    const childB = byKey.get(`${match.round - 1}:${match.slot * 2 + 1}`);
    if (!childA || !childB) continue;

    const unitsAt = (round: number, slot: number) =>
      slot * Math.pow(2, round) + Math.pow(2, round - 1);
    const yA = (unitsAt(match.round - 1, childA.slot) / maxSlots) * 100;
    const yB = (unitsAt(match.round - 1, childB.slot) / maxSlots) * 100;
    const yP = (unitsAt(match.round, match.slot) / maxSlots) * 100;

    const childRightX = (match.round - 1) * (colW + gapPct) + colW;
    const parentLeftX = match.round * (colW + gapPct);
    const midX = parentLeftX - gapPct / 2;

    connectors.push({
      path: `M ${childRightX} ${yA} H ${midX} M ${childRightX} ${yB} H ${midX} M ${midX} ${yA} V ${yB} M ${midX} ${yP} H ${parentLeftX}`,
      isFinal: match.round === rounds - 1,
    });
  }

  return connectors;
}

/* --------------------------- match card bits ----------------------------- */

function PlayerRow({
  name,
  isWinner,
  live,
}: {
  name: string | null;
  isWinner: boolean;
  live: boolean;
}) {
  if (!name) {
    return (
      <div className="flex items-center gap-2 px-2">
        <span className="text-xs italic text-slate-600">TBD</span>
      </div>
    );
  }
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2 px-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-700 text-[10px] font-extrabold uppercase text-slate-300">
        {name.charAt(0)}
      </span>
      <span
        className={`truncate text-xs font-medium ${
          isWinner ? 'font-bold text-emerald-400' : 'text-slate-200'
        }`}
      >
        {name}
      </span>
      {isWinner && <CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-400" />}
      {live && !isWinner && (
        <span className="ml-auto flex shrink-0 items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
          Live
        </span>
      )}
    </div>
  );
}

function MatchCard({ match }: { match: BracketMatch }) {
  const border =
    match.status === 'completed'
      ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
      : match.status === 'in_progress'
        ? 'border-amber-500/50 bg-amber-500/[0.05] shadow-lg shadow-amber-500/10'
        : 'border-slate-800 bg-slate-900/50';

  return (
    <div
      className={`flex h-16 flex-col justify-center overflow-hidden rounded-lg border ${border} transition-colors`}
    >
      <div className="flex min-h-0 flex-1 items-stretch">
        <PlayerRow
          name={match.playerA}
          isWinner={match.winnerId === match.playerA}
          live={match.status === 'in_progress'}
        />
        {match.score && (
          <span className="hidden items-center pr-2 text-xs font-bold text-slate-400 sm:flex">
            {match.score.split('–')[0]}
          </span>
        )}
      </div>
      <div className="mx-3 h-px bg-slate-700/60" />
      <div className="flex min-h-0 flex-1 items-stretch">
        <PlayerRow
          name={match.playerB}
          isWinner={match.winnerId === match.playerB}
          live={match.status === 'in_progress'}
        />
        {match.score && (
          <span className="hidden items-center pr-2 text-xs font-bold text-slate-400 sm:flex">
            {match.score.split('–')[1]}
          </span>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- page ---------------------------------- */

export default function TournamentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { user } = useAuth();
  const [tournament, setTournament] = useState<TournamentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joined, setJoined] = useState(false);
  const [joinNote, setJoinNote] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTournament(params.id);
      setTournament(data);
    } catch (e: any) {
      setError(e?.message || 'Could not load this tournament.');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleJoin = async () => {
    if (!tournament || tournament.status !== 'registration' || joined || !user) return;
    setJoining(true);
    try {
      const result = await joinTournament(tournament.id, user.id);
      setJoined(result.joined);
      setJoinNote(result.message);
      if (result.joined) {
        setTournament((prev) =>
          prev
            ? {
                ...prev,
                playersJoined: Math.min(prev.maxPlayers, prev.playersJoined + 1),
              }
            : prev,
        );
      }
    } catch (e: any) {
      setError(e?.message || 'Could not join the tournament.');
    } finally {
      setJoining(false);
    }
  };

  const { maxSlots, gapPct, colW } = useBracketGeometry(tournament?.rounds ?? 0);
  const connectors = useMemo(
    () =>
      tournament && tournament.rounds > 0
        ? buildConnectors(
            tournament.matches,
            tournament.rounds,
            maxSlots,
            gapPct,
            colW,
          )
        : [],
    [tournament, maxSlots, gapPct, colW],
  );

  const matchesByRound = useMemo(() => {
    if (!tournament) return [];
    const groups: BracketMatch[][] = Array.from(
      { length: tournament.rounds },
      () => [],
    );
    for (const m of tournament.matches) {
      if (m.round >= 0 && m.round < groups.length) groups[m.round].push(m);
    }
    return groups;
  }, [tournament]);

  const champion = useMemo(() => {
    if (!tournament || tournament.rounds === 0) return null;
    const final = tournament.matches.find(
      (m) => m.round === tournament.rounds - 1,
    );
    if (!final || final.status !== 'completed' || !final.winnerId) return null;
    return final.winnerId;
  }, [tournament]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <Nav />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        </div>
      </main>
    );
  }

  if (error && !tournament) {
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <Nav />
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <p className="text-rose-400">{error}</p>
          <Link
            href="/tournaments"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Back to Tournaments
          </Link>
        </div>
      </main>
    );
  }

  if (!tournament) {
    return (
      <main className="min-h-screen bg-slate-900 text-white">
        <Nav />
        <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
          <Swords className="mx-auto h-10 w-10 text-slate-600" />
          <h1 className="mt-4 text-2xl font-extrabold">Tournament not found</h1>
          <p className="mt-2 text-sm text-slate-400">
            The tournament you are looking for does not exist.
          </p>
          <Link
            href="/tournaments"
            className="mt-6 inline-block rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Back to Tournaments
          </Link>
        </div>
      </main>
    );
  }

  const status = STATUS_META[tournament.status];
  const hasBracket = tournament.rounds > 0 && tournament.matches.length > 0;

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <Nav />
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        {/* Back link */}
        <Link
          href="/tournaments"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          All tournaments
        </Link>

        {/* Header */}
        <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-400/30 bg-indigo-500/10 text-3xl text-indigo-300">
              <GameIcon
                game={tournament.gameType}
                className={tournament.gameType === 'chess' ? 'text-3xl' : 'w-8 h-8'}
              />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {tournament.name}
                </h1>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${status.className}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>
              <dl className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  {formatDate(tournament.startsAt)}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-500" />
                  {tournament.playersJoined}/{tournament.maxPlayers} players
                </div>
                {tournament.prize && (
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-amber-300">{tournament.prize}</span>
                  </div>
                )}
              </dl>
              <p className="mt-2 max-w-xl text-sm text-slate-400">
                {tournament.description || FALLBACK_DESCRIPTION}
              </p>
            </div>
          </div>

          {/* Join action (registration phase only) */}
          {tournament.status === 'registration' &&
            (!user ? (
              <Link
                href="/login"
                className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:opacity-90 active:scale-[0.99]"
              >
                Sign in to join
              </Link>
            ) : (
            <button
              type="button"
              onClick={() => void handleJoin()}
              disabled={joining || joined || tournament.playersJoined >= tournament.maxPlayers}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {joining ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : joined ? (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Joined
                </span>
              ) : tournament.playersJoined >= tournament.maxPlayers ? (
                'Full'
              ) : (
                'Join Tournament'
              )}
            </button>
            ))}
        </header>

        {joinNote && (
          <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
            {joinNote}
          </p>
        )}

        {/* Champion banner */}
        {champion && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/5 px-5 py-4">
            <Crown className="h-7 w-7 text-amber-400" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400/80">
                Champion
              </div>
              <div className="text-xl font-extrabold">{champion}</div>
            </div>
          </div>
        )}

        {/* Bracket */}
        <section className="mt-10" aria-label="Tournament bracket">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold tracking-tight">Bracket</h2>
            {hasBracket && (
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Winner
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" /> Live
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-600" /> Upcoming
                </span>
              </div>
            )}
          </div>

          {!hasBracket ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-700 p-14 text-center">
              <Trophy className="mx-auto h-10 w-10 text-slate-600" />
              <p className="mt-3 font-medium text-slate-300">
                {tournament.status === 'registration'
                  ? 'Bracket not generated yet'
                  : 'No bracket data'}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {tournament.status === 'registration'
                  ? 'The bracket is built automatically once registration closes.'
                  : 'Results for this tournament are unavailable.'}
              </p>
            </div>
          ) : (
            <div className="mt-4 overflow-x-auto pb-4">
              <div className="min-w-[720px]">
                {/* Round labels (aligned with the match columns) */}
                <div
                  className="mb-3 grid"
                  style={{
                    gridTemplateColumns: `repeat(${tournament.rounds}, minmax(180px, 1fr))`,
                    columnGap: `${gapPct}%`,
                  }}
                >
                  {matchesByRound.map((_, r) => (
                    <div
                      key={r}
                      className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500"
                    >
                      {roundLabel(r, tournament.rounds)}
                    </div>
                  ))}
                </div>

                {/* Bracket area: connector lines behind the match cards */}
                <div className="relative">
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    {connectors.map((c, i) => (
                      <path
                        key={i}
                        d={c.path}
                        fill="none"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                        className={c.isFinal ? 'text-indigo-400/70' : 'text-slate-700'}
                      />
                    ))}
                  </svg>

                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: `repeat(${tournament.rounds}, minmax(180px, 1fr))`,
                      gridAutoRows: '5rem',
                      columnGap: `${gapPct}%`,
                    }}
                  >
                    {matchesByRound.flatMap((roundMatches, r) =>
                      roundMatches.map((m) => {
                        const span = Math.pow(2, m.round);
                        return (
                          <div
                            key={m.id}
                            className="flex items-center"
                            style={{
                              gridRow: `${m.slot * span + 1} / span ${span}`,
                            }}
                          >
                            <MatchCard match={m} />
                          </div>
                        );
                      }),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
