'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Chip,
  Badge,
  Fab,
  Drawer,
  alpha,
  useTheme,
  Divider,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { MessageSquare, Send, X, Wifi, WifiOff } from 'lucide-react';
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
  /** socketId -> real username map. */
  names?: Record<string, string>;
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
export default function ChatSidebar({ roomCode, playerIds, myId, names }: ChatSidebarProps) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<ChatEntry[]>([]);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(0);
  const theme = useTheme();

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
      if (names?.[senderId]) return names[senderId];
      const idx = playerIds.indexOf(senderId);
      if (idx >= 0) return `Player ${idx + 1}`;
      return 'Spectator';
    },
    [myId, playerIds, names],
  );

  const connected = socket.connected;

  return (
    <>
      {/* Floating toggle button with unread badge */}
      <Fab
        color="primary"
        aria-label={open ? 'Close chat' : 'Open chat'}
        onClick={() => setOpen((v) => !v)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: `0 8px 24px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.info.main})`,
          '&:hover': {
            background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.info.dark})`,
          },
        }}
      >
        <Badge
          badgeContent={unread > 9 ? '9+' : unread}
          color="error"
          invisible={open || unread === 0}
          sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}
        >
          {open ? <X size={24} /> : <MessageSquare size={24} />}
        </Badge>
      </Fab>

      {/* Slide-over chat panel */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        variant="persistent"
        slotProps={{
          paper: {
            sx: {
              width: { xs: '100%', sm: 384 },
              bgcolor: alpha(theme.palette.background.default, 0.95),
              backdropFilter: 'blur(8px)',
              borderLeft: '1px solid',
              borderColor: 'divider',
              boxShadow: theme.shadows[24],
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              Room chat
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', gap: 0.5 }}>
              Room{' '}
              <Box component="span" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.primary' }}>
                {roomCode}
              </Box>
            </Typography>
          </Box>
          <Chip
            size="small"
            icon={connected ? <Wifi size={12} /> : <WifiOff size={12} />}
            label={connected ? 'Live' : 'Reconnecting'}
            sx={{
              height: 24,
              fontSize: '0.65rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              bgcolor: alpha(connected ? theme.palette.success.main : theme.palette.warning.main, 0.1),
              color: connected ? 'success.light' : 'warning.light',
              borderColor: alpha(connected ? theme.palette.success.main : theme.palette.warning.main, 0.3),
              border: '1px solid',
              '& .MuiChip-icon': { color: 'inherit' },
            }}
          />
        </Box>

        {/* Messages */}
        <Box
          ref={listRef}
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {entries.length === 0 ? (
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                color: 'text.disabled',
                textAlign: 'center',
              }}
            >
              <MessageSquare size={48} strokeWidth={1} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                No messages yet
              </Typography>
              <Typography variant="caption">Say hi to your opponent before the first move!</Typography>
            </Box>
          ) : (
            entries.map((entry) =>
              entry.kind === 'system' ? (
                <Box key={entry.key} sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      bgcolor: 'background.paper',
                      px: 2,
                      py: 0.5,
                      borderRadius: 10,
                      fontWeight: 500,
                      color: 'text.secondary',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    {entry.message}
                  </Typography>
                </Box>
              ) : (
                <Box
                  key={entry.key}
                  sx={{
                    display: 'flex',
                    justifyContent: entry.senderId === myId ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Paper
                    elevation={1}
                    sx={{
                      maxWidth: '85%',
                      p: 1.5,
                      borderRadius: 3,
                      borderTopRightRadius: entry.senderId === myId ? 4 : 12,
                      borderTopLeftRadius: entry.senderId === myId ? 12 : 4,
                      bgcolor:
                        entry.senderId === myId
                          ? 'primary.main'
                          : alpha(theme.palette.background.paper, 0.8),
                      color: entry.senderId === myId ? 'white' : 'text.primary',
                      border: entry.senderId === myId ? 'none' : '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1,
                        mb: 0.5,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: entry.senderId === myId ? alpha('#fff', 0.7) : 'text.disabled',
                      }}
                    >
                      <Box component="span">{senderLabel(entry.senderId)}</Box>
                      <Box component="span">
                        {entry.pending ? (
                          <CircularProgress size={8} color="inherit" />
                        ) : (
                          formatTime(entry.timestamp)
                        )}
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                      {entry.message}
                    </Typography>
                  </Paper>
                </Box>
              ),
            )
          )}
        </Box>

        {/* Composer */}
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 1,
          }}
        >
          <TextField
            fullWidth
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={connected ? 'Type a message…' : 'Reconnecting…'}
            disabled={!connected}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: alpha(theme.palette.background.paper, 0.5),
              },
            }}
          />
          <Tooltip title="Send message">
            <IconButton
              type="submit"
              disabled={!connected || !input.trim()}
              sx={{
                borderRadius: 3,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'action.disabled',
                },
              }}
            >
              <Send size={18} />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </>
  );
}
