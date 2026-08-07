'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Copy, Gamepad2, Loader2, Plus, RefreshCw, Users } from 'lucide-react';
import { createRoom, fetchRooms, Room } from '../../lib/rooms';

const REFRESH_INTERVAL_MS = 5000;

const STATUS_LABEL: Record<Room['status'], string> = {
  waiting: 'Waiting',
  playing: 'In progress',
  finished: 'Finished',
};

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
      const room = await createRoom();
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
          <button
            type="button"
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center justify-center gap-2 px-6 py-5 rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 font-bold text-lg shadow-lg shadow-indigo-500/20 hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {creating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
            Create Room
          </button>

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
                        {room.players.length}/2
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
  );
}
