'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Copy,
  Gamepad2,
  Loader2,
  Plus,
  RefreshCw,
  Users,
  Banknote,
} from 'lucide-react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  alpha,
  useTheme,
  Grid,
  ButtonBase,
  Tooltip,
} from '@mui/material';
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

function GameIcon({ game, sx }: { game: string; sx?: any }) {
  if (game === 'chess') {
    return (
      <Box component="span" sx={{ fontSize: '1.5rem', lineHeight: 1, userSelect: 'none', ...sx }} aria-hidden>
        ♞
      </Box>
    );
  }
  if (game === 'backgammon') {
    return (
      <Box component="span" sx={{ fontSize: '1.5rem', lineHeight: 1, userSelect: 'none', ...sx }} aria-hidden>
        🎲
      </Box>
    );
  }
  if (game === 'vegas') {
    return <Banknote size={sx?.fontSize === 'text-2xl' ? 24 : 20} />;
  }
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      sx={{
        width: 24,
        height: 24,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2.2,
        strokeLinecap: 'round',
        ...sx
      }}
      aria-hidden
    >
      <path d="M3 8h18M3 16h18M8 3v18M16 3v18" />
    </Box>
  );
}

export default function LobbyPage() {
  const router = useRouter();
  const theme = useTheme();
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

  const activeRooms = rooms
    .filter((r) => r.status !== 'finished')
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === 'waiting' ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          bgcolor: '#0f172a',
          color: 'white',
        }}
      >
        <Box sx={{ w: '100%', maxWidth: 'sm', width: '100%', display: 'flex', flexDirection: 'column', gap: 4, py: 4 }}>
          <Box component="header" sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: 'tight',
                background: 'linear-gradient(to right, #818cf8, #38bdf8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BaziGB Lobby
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Create a room or join a friend with a code
            </Typography>
          </Box>

          {/* Create / Join actions */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: alpha('#1e293b', 0.6),
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary' }}
                >
                  Select Game
                </Typography>
                <Grid container spacing={1}>
                  {GAME_OPTIONS.map((type) => {
                    const meta = GAME_META[type];
                    const selected = gameType === type;
                    return (
                      <Grid size={6} key={type}>
                        <ButtonBase
                          onClick={() => setGameType(type)}
                          sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 0.75,
                            p: 1.5,
                            borderRadius: 3,
                            border: '1px solid',
                            transition: 'all 0.2s',
                            bgcolor: selected ? alpha('#6366f1', 0.15) : alpha('#0f172a', 0.6),
                            borderColor: selected ? alpha('#818cf8', 0.6) : 'divider',
                            color: selected ? 'white' : alpha('#94a3b8', 0.8),
                            boxShadow: selected ? '0 10px 15px -3px rgba(99, 102, 241, 0.1)' : 'none',
                            '&:hover': {
                              borderColor: selected ? alpha('#818cf8', 0.8) : 'text.disabled',
                              color: selected ? 'white' : 'text.primary',
                            },
                          }}
                        >
                          <Box sx={{ color: selected ? '#a5b4fc' : 'text.disabled', display: 'flex' }}>
                            <GameIcon game={type} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {meta.label}
                            </Typography>
                            {meta.isNew && (
                              <Box
                                component="span"
                                sx={{
                                  bgcolor: '#10b981',
                                  color: 'white',
                                  fontSize: '8px',
                                  px: 0.5,
                                  borderRadius: 0.5,
                                  textTransform: 'uppercase',
                                  fontWeight: 900,
                                }}
                              >
                                New
                              </Box>
                            )}
                          </Box>
                          <Typography variant="caption" sx={{ fontSize: '10px', fontWeight: 500, opacity: 0.7 }}>
                            {meta.tagline}
                          </Typography>
                        </ButtonBase>
                      </Grid>
                    );
                  })}
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCreate}
                  disabled={creating}
                  startIcon={creating ? <CircularProgress size={20} color="inherit" /> : <Plus size={20} />}
                  sx={{
                    mt: 0.5,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(to right, #6366f1, #0ea5e9)',
                    fontWeight: 700,
                    fontSize: '1.125rem',
                    boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)',
                    '&:hover': {
                      opacity: 0.9,
                    },
                    '&:active': {
                      transform: 'scale(0.99)',
                    },
                  }}
                >
                  Create Room
                </Button>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Paper
                component="form"
                onSubmit={handleJoinByCode}
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  bgcolor: alpha('#1e293b', 0.6),
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  height: '100%',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary' }}
                >
                  Join by code
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    value={codeInput}
                    placeholder="e.g. ABCDE"
                    onChange={(e) => {
                      setCodeInput(e.target.value.toUpperCase());
                      setJoinError(null);
                    }}
                    slotProps={{
                      input: {
                        sx: {
                          bgcolor: '#0f172a',
                          borderRadius: 3,
                          fontFamily: 'monospace',
                          letterSpacing: '0.2em',
                          fontWeight: 700,
                          fontSize: '1.125rem',
                          textTransform: 'uppercase',
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!codeInput.trim()}
                    sx={{
                      minWidth: 56,
                      borderRadius: 3,
                      bgcolor: 'white',
                      color: '#4f46e5',
                      '&:hover': {
                        bgcolor: alpha('#f8fafc', 0.9),
                      },
                    }}
                  >
                    <ArrowRight size={20} />
                  </Button>
                </Box>
                {joinError && (
                  <Typography variant="caption" sx={{ color: '#fb7185' }}>
                    {joinError}
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>

          {(createError || loadError) && (
            <Alert severity="error" variant="outlined" sx={{ borderRadius: 3, borderColor: alpha('#f43f5e', 0.5) }}>
              {createError || loadError}
            </Alert>
          )}

          {/* Room list */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Gamepad2 size={20} style={{ color: '#818cf8' }} />
                <Typography variant="h6" sx={{ fontWeight: 700, color: alpha('#cbd5e1', 0.9) }}>
                  Active Rooms
                </Typography>
              </Box>
              <Button
                size="small"
                onClick={loadRooms}
                startIcon={<RefreshCw size={16} />}
                sx={{ color: 'text.secondary', textTransform: 'none', '&:hover': { color: 'white' } }}
              >
                Refresh
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={32} sx={{ color: 'text.disabled' }} />
              </Box>
            ) : activeRooms.length === 0 ? (
              <Box
                sx={{
                  borderRadius: 4,
                  border: '2px dashed',
                  borderColor: 'divider',
                  p: 6,
                  textAlign: 'center',
                }}
              >
                <Typography sx={{ color: 'text.disabled' }}>
                  No active rooms yet — create the first one!
                </Typography>
              </Box>
            ) : (
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {activeRooms.map((room) => (
                  <Paper
                    key={room.id}
                    component="li"
                    elevation={0}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      borderRadius: 4,
                      bgcolor: alpha('#1e293b', 0.6),
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'border-color 0.2s',
                      '&:hover': {
                        borderColor: alpha('#818cf8', 0.5),
                      },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: 'monospace',
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                          }}
                        >
                          {room.code}
                        </Typography>
                        <Tooltip title={copiedCode === room.code ? "Copied!" : "Copy code"}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopy(room.code)}
                            sx={{ color: 'text.disabled', '&:hover': { color: 'white' } }}
                          >
                            {copiedCode === room.code ? (
                              <Typography variant="caption" sx={{ color: '#34d399', fontWeight: 600 }}>
                                Copied!
                              </Typography>
                            ) : (
                              <Copy size={16} />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                        <Chip
                          icon={<GameIcon game={room.gameType} sx={{ fontSize: '0.875rem', color: 'inherit' }} />}
                          label={GAME_META[room.gameType]?.label ?? room.gameType}
                          size="small"
                          sx={{
                            height: 24,
                            bgcolor: alpha('#6366f1', 0.1),
                            color: '#a5b4fc',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: alpha('#818cf8', 0.2),
                            '& .MuiChip-icon': {
                              ml: 0.5,
                              mr: -0.5,
                            },
                          }}
                        />
                        <Chip
                          label={STATUS_LABEL[room.status]}
                          size="small"
                          sx={{
                            height: 24,
                            bgcolor: room.status === 'waiting' ? alpha('#10b981', 0.1) : alpha('#f59e0b', 0.1),
                            color: room.status === 'waiting' ? '#4ade80' : '#fbbf24',
                            fontWeight: 600,
                            '&::before': {
                              content: '""',
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: 'currentColor',
                              mr: 1,
                            },
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                          <Users size={14} />
                          <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {room.players.length}/{room.gameType === 'vegas' ? 5 : 2}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => router.push(`/game/${room.code}`)}
                      disabled={room.status !== 'waiting'}
                      sx={{
                        borderRadius: 2.5,
                        px: 3,
                        bgcolor: alpha('#6366f1', 0.8),
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: '#6366f1',
                        },
                        '&:disabled': {
                          bgcolor: alpha('#334155', 0.8),
                          color: 'text.disabled',
                        },
                      }}
                    >
                      {room.status === 'waiting' ? 'Join' : 'Playing'}
                    </Button>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
