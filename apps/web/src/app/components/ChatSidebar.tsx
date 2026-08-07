'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { socket } from '../../lib/socket';

/** Chat entries rendered by the sidebar. */
type ChatEntry =
  | {
      kind: 'chat';
      key: string;
      senderId: string;
      message: string;
      timestamp: string;
      pending?: boolean;
    }
  | {
      kind: 'system';
      key: string;
      type: string;
      message: string;
      timestamp: string;
    };

interface ChatSidebarProps {
  /** Room the sidebar talks to (all events are scoped to this room). */
  roomCode: string;
  /** Socket ids of the two seated players, used to label senders. */
  playerIds: string[];
  /** Current socket id, used to label the local user as "You". */
  myId?: string | null;
}

const MAX_ENTRIES = 100;

function formatTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Room chat: a floating toggle + slide-over panel. Messages are sent over
 * socket.io (`chatMessage`) and echoed back to the whole room, including
 * players and spectators. Sending is optimistic (instant) and de-duplicated
 * against the server echo by sender + text.
 */
export default function ChatSidebar({ roomCode, playerIds, myId }: ChatSidebarProps) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(0);

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
    if (open) setUnread(0);
  }, [open]);

  const listRef = useRef<HTMLDivElement>(null);

  // Incoming chat + system messages (both are room-scoped broadcasts).
  useEffect(() => {
    const onChatMessage = (msg: {
      room?: string;
      senderId?: string;
      message?: string;
      timestamp?: string;
    }) => {
      if (!msg || typeof msg.message !== 'string' || !msg.message) return;
      const senderId = msg.senderId ?? 'unknown';
      const timestamp = msg.timestamp ?? new Date().toISOString();
      const key = `chat:${senderId}:${timestamp}:${msg.message}`;

      setEntries((prev) => {
        // Acknowledge the optimistic copy of our own message (drop "pending").
        const pendingIdx = prev.findIndex(
          (e) =>
            e.kind === 'chat' && e.pending && e.senderId === senderId && e.message === msg.message,
        );
        if (pendingIdx >= 0) {
          const next = [...prev];
          next[pendingIdx] = {
            kind: 'chat' as const,
            key,
            senderId,
            message: msg.message as string,
            timestamp,
          };
          return next;
        }
        if (prev.some((e) => e.key === key)) return prev;
        return [
          ...prev,
          { kind: 'chat' as const, key, senderId, message: msg.message as string, timestamp },
        ].slice(-MAX_ENTRIES);
      });

      if (!openRef.current) setUnread((u) => u + 1);
    };

    const onSystemMessage = (msg: {
      type?: string;
      message?: string;
      userId?: string;
      timestamp?: string;
    }) => {
      if (!msg || typeof msg.message !== 'string' || !msg.message) return;
      const timestamp = msg.timestamp ?? new Date().toISOString();
      const key = `system:${msg.type ?? 'info'}:${timestamp}:${msg.message}`;
      setEntries((prev) => {
        if (prev.some((e) => e.key === key)) return prev;
        return [
          ...prev,
          { kind: 'system' as const, key, type: msg.type ?? 'info', message: msg.message as string, timestamp },
        ].slice(-MAX_ENTRIES);
      });
    };

    socket.on('chatMessage', onChatMessage);
    socket.on('systemMessage', onSystemMessage);
    return () => {
      socket.off('chatMessage', onChatMessage);
      socket.off('systemMessage', onSystemMessage);
    };
  }, []);

  // Keep the list pinned to the newest message while the panel is open.
  useEffect(() => {
    if (openRef.current) {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    }
  }, [entries, open]);

  const handleSend = useCallback(() => {
    const message = input.trim();
    if (!message) return;
    if (!socket.connected) return;

    const optimistic: ChatEntry = {
      kind: 'chat',
      key: `chat:${socket.id}:${Date.now()}:${message}`,
      senderId: socket.id ?? 'me',
      message,
      timestamp: new Date().toISOString(),
      pending: true,
    };
    setEntries((prev) => [...prev, optimistic].slice(-MAX_ENTRIES));
    socket.emit('chatMessage', { room: roomCode, message });
    setInput('');
  }, [input, roomCode]);

  const senderLabel = useCallback(
    (senderId: string): string => {
      if (senderId && senderId === myId) return 'You';
      const idx = playerIds.indexOf(senderId);
      if (idx >= 0) return `Player ${idx + 1}`;
      return 'Spectator';
    },
    [myId, playerIds],
  );

  const connected = socket.connected;

  return (
    <>
      {/* Floating toggle button with unread badge */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-xl shadow-indigo-500/30 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 px-1.5 text-xs font-bold shadow">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Slide-over chat panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full w-full max-w-sm flex-col border-l border-slate-700 bg-slate-900/95 shadow-2xl shadow-black/60 backdrop-blur sm:w-96">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <h2 className="font-bold text-white">Room chat</h2>
              <p className="text-xs text-slate-500">
                Room <span className="font-mono font-semibold tracking-wider text-slate-400">{roomCode}</span>
              </p>
            </div>
            <span
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                connected
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                  : 'border-amber-500/30 bg-amber-500/10 text-amber-400'
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              {connected ? 'Live' : 'Reconnecting'}
            </span>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
            {entries.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-1 text-center text-slate-600">
                <MessageSquare className="h-8 w-8" />
                <p className="text-sm font-medium">No messages yet</p>
                <p className="text-xs">Say hi to your opponent before the first move!</p>
              </div>
            ) : (
              entries.map((entry) =>
                entry.kind === 'system' ? (
                  <div key={entry.key} className="flex justify-center">
                    <span className="rounded-full bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-400">
                      {entry.message}
                    </span>
                  </div>
                ) : (
                  <div key={entry.key} className={`flex ${entry.senderId === myId ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow ${
                        entry.senderId === myId
                          ? 'rounded-br-md bg-gradient-to-br from-indigo-500 to-sky-500 text-white'
                          : 'rounded-bl-md bg-slate-800 border border-slate-700 text-slate-100'
                      }`}
                    >
                      <div className={`mb-0.5 flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-wide ${entry.senderId === myId ? 'text-indigo-100' : 'text-slate-500'}`}>
                        <span>{senderLabel(entry.senderId)}</span>
                        <span>{entry.pending ? 'sending…' : formatTime(entry.timestamp)}</span>
                      </div>
                      <p className="break-words whitespace-pre-wrap">{entry.message}</p>
                    </div>
                  </div>
                ),
              )
            )}
          </div>

          {/* Composer */}
          <form
            className="flex items-center gap-2 border-t border-slate-800 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              placeholder={connected ? 'Type a message…' : 'Reconnecting…'}
              disabled={!connected}
              className="flex-1 min-w-0 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!connected || !input.trim()}
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow transition-transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
