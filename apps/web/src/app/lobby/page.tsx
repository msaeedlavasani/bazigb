'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Copy, Gamepad2, Loader2, Plus, RefreshCw, Users, Banknote, Dice6 } from 'lucide-react';
import { createRoom, fetchRooms, Room } from '../../lib/rooms';
import Nav from '../components/Nav';

const REFRESH_INTERVAL_MS = 5000;

const STATUS_LABEL: Record<Room['status'], string> = {
  waiting: 'Waiting',
  playing: 'In progress',
  finished: 'Finished',
};

type GameType = 'tic-tac-toe' | 'chess' | 'backgammon' | 'vegas';

const GAME_OPTIONS: GameType[] = ['tic-tac-toe', 'chess', 'backgammon', 'vegas'];

const GAME_META: Record<string, { label: string; tagline: string; isNew?: boolean }> = {
  'tic-tac-toe': { label: 'Tic-Tac-Toe', tagline: 'Classic 3×3 duel' },
  chess: { label: 'Chess', tagline: 'Full board battle' },
  backgammon: { label: 'Backgammon', tagline: 'Dices & Strategy' },
  vegas: { label: 'Vegas', tagline: 'Casino Dice Luck', isNew: true },
};

function GameIcon({ game, className }: { game: string; className?: string }) {
  if (game === 'chess') {
    return (
      <span className={`${className ?? ''} leading-none select-none`} aria-hidden>
        ♞
      </span>
    );
  }
  if (game === 'backgammon') {
    return (
      <span className={`${className ?? ''} leading-none select-none`} aria-hidden>
        🎲
      </span>
    );
  }
  if (game === 'vegas') {
    return <Banknote className={className} />;
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

export default function LobbyPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [codeInput, setCodeInput] = useState('');
  const [joinError, setJoinError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [gameType, setGameType] = useState<GameType>('tic-tac-toe');

  const loadRooms = useCallback(async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);
      setLoadError(null);
    } catch (e: any) {
      setLoadError(e?.message || 'Could not load rooms. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
    const timer = setInterval(loadRooms, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [loadRooms]);

  const handleCreate = async () => {
    setCreating(true);
    setCreateError(null);
    try {
      const room = await createRoom(gameType);
      router.push(`/game/${room.code}`);
    } catch (e: any) {
      setCreateError(e?.message || 'Could not create a room');
      setCreating(false);
    }
  };

  const handleJoinByCode = (e: React.FormEvent) => {
    e.preventDefault();
    const code = codeInput.trim().toUpperCase();
    if (!code) {
      setJoinError('Enter a room code first');
      return;
    }
    router.push(`/game/${code}`);
  };

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  // Rooms the lobby cares about: anything still waiting or being played.
  const activeRooms = rooms
    .filter((r) => r.status !== 'finished')
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'waiting' ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center p-6 bg-slate-900 text-white">
      <div className="w-full max-w-2xl space-y-8 py-8">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
            BaziGB Lobby
          </h1>
          <p className="text-slate-400 font-medium">Create a room or join a friend with a code</p>
        </header>

        {/* Create / Join actions */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl bg-slate-800 border border-slate-700 p-4">
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-400">Select Game</span>
            <div className="grid grid-cols-2 gap-2">
              {GAME_OPTIONS.map((type) => {
                const meta = GAME_META[type];
                const selected = gameType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGameType(type)}
                    aria-pressed={selected}
                    className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl border transition-all ${
                      selected
                        ? 'bg-indigo-500/15 border-indigo-400/60 text-white shadow-lg shadow-indigo-500/10'
                        : 'bg-slate-900/60 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-200'
                    }`}
                  >
                    <span className={selected ? 'text-indigo-300' : 'text-slate-500'}>
                      <GameIcon game={type} className={type === 'chess' || type === 'backgammon' ? 'text-2xl' : 'w-6 h-6'} />
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold">{meta.label}</span>
                      {meta.isNew && (
                        <span className="bg-emerald-500 text-white text-[8px] px-1 rounded uppercase font-black">New</span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium opacity-70">{meta.tagline}</span>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 font-bold text-lg shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
              Create Room
            </button>
          </div>

          <form
            onSubmit={handleJoinByCode}
            className="flex flex-col gap-2 rounded-2xl bg-slate-800 border border-slate-700 p-4"
          >
            <label htmlFor="room-code" className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Join by code
            </label>
            <div className="flex gap-2">
              <input
                id="room-code"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value.toUpperCase());
                  setJoinError(null);
                }}
                placeholder="e.g. ABCDE"
                maxLength={8}
                className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-slate-900 border border-slate-600 text-lg font-mono tracking-widest placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-3 rounded-xl bg-white text-indigo-600 font-bold hover:bg-slate-100 transition-colors disabled:opacity-50"
                disabled={!codeInput.trim()}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            {joinError && <p className="text-sm text-rose-400">{joinError}</p>}
          </form>
        </section>

        {(createError || loadError) && (
          <p className="text-center text-sm text-rose-400">
            {createError || loadError}
          </p>
        )}

        {/* Room list */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-300 flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-indigo-400" />
              Active Rooms
            </h2>
            <button
              type="button"
              onClick={loadRooms}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          ) : activeRooms.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 p-10 text-center text-slate-500">
              No active rooms yet — create the first one!
            </div>
          ) : (
            <ul className="space-y-2">
              {activeRooms.map((room) => (
                <li
                  key={room.id}
                  className="flex items-center gap-4 rounded-2xl bg-slate-800 border border-slate-700 p-4 hover:border-indigo-400/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold tracking-widest">{room.code}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(room.code)}
                        className="text-slate-500 hover:text-white transition-colors"
                        aria-label={`Copy room code ${room.code}`}
                      >
                        {copiedCode === room.code ? (
                          <span className="text-xs text-emerald-400 font-semibold">Copied!</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-400/20">
                        <GameIcon
                          game={room.gameType}
                          className={room.gameType === 'chess' || room.gameType === 'backgammon' ? 'text-sm' : 'w-3.5 h-3.5'}
                        />
                        {GAME_META[room.gameType]?.label ?? room.gameType}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                          room.status === 'waiting'
                            ? 'bg-emerald-500/15 text-emerald-400'
                            : 'bg-amber-500/15 text-amber-400'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {STATUS_LABEL[room.status]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {room.players.length}/{room.gameType === 'vegas' ? 5 : 2}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => router.push(`/game/${room.code}`)}
                    disabled={room.status !== 'waiting'}
                    className="px-4 py-2 rounded-xl bg-indigo-500/80 hover:bg-indigo-500 font-semibold text-sm transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
                  >
                    {room.status === 'waiting' ? 'Join' : 'Playing'}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      </main>
    </>
  );
}
