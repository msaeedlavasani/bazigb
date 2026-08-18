'use client';

import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Divider,
  alpha,
  useTheme,
  Tooltip,
} from '@mui/material';
import {
  ArrowLeft,
  Copy,
  Eye,
  Loader2,
  Play,
  RotateCcw,
  Share2,
  Timer,
  Trophy,
  Undo2,
  Users,
  Wifi,
  WifiOff,
  Check,
} from 'lucide-react';
import { socket, connectSocket, rejoinRoom } from '../../../lib/socket';
import { fetchRoom, GameState, Room } from '../../../lib/rooms';
import Board from '../../components/Board';
import ChessBoard, { ChessMoveInput } from '../../components/ChessBoard';
import BackgammonBoard from '../../components/BackgammonBoard';
import VegasBoard from '../../components/VegasBoard';
import ChatSidebar from '../../components/ChatSidebar';
import {
  getCapturedPieces,
  getMoveHistory,
  getChessResult,
  materialValue,
  PIECE_GLYPHS,
  CHESS_RESULT_LABELS,
  HistoryMove,
} from '../../../lib/chess';
import { soundService } from '../../../lib/sound-service';

type ConnStatus = 'connecting' | 'connected' | 'reconnecting';

/** One row of the captured-pieces tray. */
function CapturedRow({ label, pieces }: { label: string; pieces: string[] }) {
  const value = materialValue(pieces);
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
      <Typography
        variant="caption"
        sx={{
          width: 64,
          flexShrink: 0,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', minHeight: 24, flex: 1, flexWrap: 'wrap', alignItems: 'center', gap: 0.5, fontSize: '1.25rem', lineHeight: 1 }}>
        {pieces.length === 0 ? (
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>—</Typography>
        ) : (
          pieces.map((piece, i) => (
            <Box key={i} component="span" sx={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }}>
              {PIECE_GLYPHS[piece] ?? piece}
            </Box>
          ))
        )}
      </Box>
      {value > 0 && (
        <Chip
          label={`+${value}`}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.625rem',
            fontWeight: 700,
            bgcolor: alpha(theme.palette.success.main, 0.15),
            color: 'success.light',
            border: '1px solid',
            borderColor: alpha(theme.palette.success.main, 0.3),
          }}
        />
      )}
    </Box>
  );
}

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const theme = useTheme();
  const roomCode = useMemo(() => (roomId ?? '').trim().toUpperCase(), [roomId]);

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [playerNames, setPlayerNames] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [connStatus, setConnStatus] = useState<ConnStatus>('connecting');
  const [turnEndsAt, setTurnEndsAt] = useState<number | null>(null);
  const [turnWarned, setTurnWarned] = useState(false);
  const [turnExpired, setTurnExpired] = useState(false);
  const [nowMs, setNowMs] = useState(() => Date.now());

  // Multi-round (best-of-N) match state. `scores` maps player id -> round wins;
  // `matchOver` gates the final winner banner (false while rounds remain).
  const [matchScores, setMatchScores] = useState<Record<string, number>>({});
  const [matchMaxRounds, setMatchMaxRounds] = useState(1);
  const [matchOver, setMatchOver] = useState(false);
  const [roundNotice, setRoundNotice] = useState<string | null>(null);

  // Shared computed variables (declared early so callbacks can use them)
  const mySocketId = socket.id ?? null;
  const ctxPlayers = gameState?.ctx.players ?? [];
  const isPlayer = !!mySocketId && (ctxPlayers.includes(mySocketId) || (room?.players?.includes(mySocketId) ?? false));
  const isMyTurn = isPlayer && !!gameState && gameState.ctx.currentPlayer === mySocketId;

  // Turn countdown: server announces `turnStarted { player, endsAt }` on every
  // turn change; we tick once per second while a deadline is active.
  useEffect(() => {
    if (turnEndsAt === null) return;
    const interval = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [turnEndsAt]);

  const turnRemainingSec =
    turnEndsAt !== null && isMyTurn ? Math.max(0, Math.ceil((turnEndsAt - nowMs) / 1000)) : null;
  const winnerId: string | null = winner ?? (gameState?.G?.winner ?? null) ?? room?.winnerId ?? null;

  const boardKeyRef = useRef<string | null>(null);
  const pendingMyMoveRef = useRef(false);
  const prevDiceRef = useRef('');

  const markMyMove = useCallback(() => {
    pendingMyMoveRef.current = true;
    window.setTimeout(() => {
      pendingMyMoveRef.current = false;
    }, 3000);
  }, []);

  useEffect(() => {
    if (!roomCode) return;
    connectSocket();
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const refreshRoomFromDb = () => {
      fetchRoom(roomCode)
        .then((r) => {
          if (cancelled) return;
          setRoom(r);
          setMatchScores(r.scores ?? {});
          setMatchMaxRounds(r.maxRounds ?? 1);
          // A finished room means the match itself is over (winner banner);
          // a playing room is mid-round or mid-match.
          setMatchOver(r.status === 'finished');
          if (r.currentState) {
            setGameState(r.currentState);
            setWinner(r.winnerId ?? null);
          }
          setError(null);
        })
        .catch((e: any) => {
          if (!cancelled) setError(e?.message || 'Room not found');
        });
    };

    const joinRoom = () => {
      if (cancelled) return;
      rejoinRoom(roomCode);
      refreshRoomFromDb();
    };

    const handleStateChange = (state: GameState) => {
      const G = state.G;
      const isBackgammon = G && Array.isArray(G.points);

      // Move SFX: board changed because someone (not me) played — for
      // tic-tac-toe and chess. My own moves already chime from the board
      // components and are suppressed here via pendingMyMoveRef.
      const key = G && typeof G.fen === 'string' ? G.fen : Array.isArray(G?.cells) ? G.cells.join(',') : null;
      const prev = boardKeyRef.current;
      boardKeyRef.current = key;
      if (!isBackgammon && prev !== null && prev !== key && !pendingMyMoveRef.current) {
        soundService.play('move');
      }

      // Dice SFX: a roll result just arrived for backgammon.
      // NOTE: dice live in `state.ctx`, not inside G — `G.ctx` is always
      // undefined, which previously silenced the dice sound entirely.
      if (isBackgammon) {
        const dice = Array.isArray(state.ctx?.dice) ? state.ctx.dice.join(',') : '';
        const prevDice = prevDiceRef.current;
        prevDiceRef.current = dice;
        if (dice !== '' && dice !== prevDice) {
          soundService.play('dice');
        }
      }

      pendingMyMoveRef.current = false;
    };

    const onConnect = () => {
      if (cancelled) return;
      setConnStatus('connected');
      if (retryTimer) {
        clearTimeout(retryTimer);
        retryTimer = null;
      }
      joinRoom();
    };
    const onConnectError = () => {
      if (cancelled) return;
      setConnStatus('reconnecting');
      if (!retryTimer) {
        retryTimer = setTimeout(() => {
          retryTimer = null;
          if (cancelled) return;
          if (!socket.connected) connectSocket();
        }, 2500);
      }
    };
    const onDisconnect = () => {
      if (cancelled) return;
      setConnStatus('reconnecting');
    };
    const onGameState = (state: GameState) => {
      if (cancelled) return;
      setGameState(state);
      setWinner(null);
      setError(null);
      handleStateChange(state);
    };
    const onGameOver = ({
      state,
      winner: w,
      scores,
      maxRounds,
      matchOver: over,
    }: {
      state: GameState;
      winner: string;
      scores?: Record<string, number>;
      maxRounds?: number;
      matchOver?: boolean;
    }) => {
      if (cancelled) return;
      setGameState(state);
      setWinner(w);
      handleStateChange(state);
      // `matchOver: false` means a round ended but the best-of-N match
      // continues — the server starts the next round right away. Any other
      // value (incl. legacy servers without match fields) = match finished.
      const roundEnded = over === false;
      setMatchOver(over !== false);
      if (scores) setMatchScores(scores);
      if (typeof maxRounds === 'number') setMatchMaxRounds(maxRounds);

      if (roundEnded) {
        const label =
          w === 'draw'
            ? 'Draw'
            : w === socket.id
              ? 'You won the round!'
              : 'Opponent won the round';
        setRoundNotice(`${label} — next round starting`);
        window.setTimeout(() => {
          if (!cancelled) setRoundNotice(null);
        }, 6000);
      } else {
        setRoundNotice(null);
      }
    };

    // Live scoreboard update between rounds of a best-of-N match.
    const onMatchScore = (data: { scores?: Record<string, number>; maxRounds?: number }) => {
      if (cancelled) return;
      if (data.scores) setMatchScores(data.scores);
      if (typeof data.maxRounds === 'number') setMatchMaxRounds(data.maxRounds);
    };
    const onError = (err: any) => {
      if (cancelled) return;
      setError(err?.message || 'An unknown error occurred');
    };
    const onRoomUpdate = (update: {
      code?: string;
      players?: string[];
      status?: Room['status'];
      names?: (string | null)[];
    }) => {
      if (cancelled || update.code !== roomCode) return;
      setRoom((prev) =>
        prev
          ? {
              ...prev,
              ...(Array.isArray(update.players) ? { players: update.players } : {}),
              ...(update.status ? { status: update.status } : {}),
            }
          : prev,
      );

      if (Array.isArray(update.players) && Array.isArray(update.names)) {
        const nextNames: Record<string, string> = {};
        update.players.forEach((id, i) => {
          const name = update.names![i];
          if (name) nextNames[id] = name;
        });
        setPlayerNames(nextNames);
      }
    };

    // Store the seat ticket issued by the server when we were seated — it lets
    // us reclaim our seat after a refresh instead of a spectator taking it.
    const onSeatKey = (data: { room?: string; seatKey?: string }) => {
      if (cancelled || !data?.room || !data?.seatKey || data.room !== roomCode) return;
      try {
        window.sessionStorage.setItem(`bazigb_seat_${roomCode}`, data.seatKey);
      } catch {
        // storage unavailable — seat reclaim falls back to the JWT identity
      }
    };

    // Turn timer: server announces the turn deadline (`turnStarted`), warns
    // 10s before expiry and fires `turnTimeout` (auto end-turn on backgammon
    // / vegas). Only count down while it is our turn.
    const onTurnStarted = (data: { room?: string; player?: string; endsAt?: number }) => {
      if (cancelled || data?.room !== roomCode) return;
      setTurnEndsAt(typeof data.endsAt === 'number' ? data.endsAt : null);
      setTurnWarned(false);
      setTurnExpired(false);
    };
    const onTurnWarning = (data: { room?: string }) => {
      if (cancelled || data?.room !== roomCode) return;
      setTurnWarned(true);
    };
    const onTurnTimeout = (data: { room?: string }) => {
      if (cancelled || data?.room !== roomCode) return;
      setTurnExpired(true);
      setTurnEndsAt(null);
      setTimeout(() => setTurnExpired(false), 5000);
    };

    socket.on('gameState', onGameState);
    socket.on('gameOver', onGameOver);
    socket.on('matchScore', onMatchScore);
    socket.on('error', onError);
    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);
    socket.on('roomUpdate', onRoomUpdate);
    socket.on('seatKey', onSeatKey);
    socket.on('turnStarted', onTurnStarted);
    socket.on('turnWarning', onTurnWarning);
    socket.on('turnTimeout', onTurnTimeout);

    if (socket.connected) onConnect();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      socket.off('gameState', onGameState);
      socket.off('gameOver', onGameOver);
      socket.off('matchScore', onMatchScore);
      socket.off('error', onError);
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
      socket.off('roomUpdate', onRoomUpdate);
      socket.off('seatKey', onSeatKey);
      socket.off('turnStarted', onTurnStarted);
      socket.off('turnWarning', onTurnWarning);
      socket.off('turnTimeout', onTurnTimeout);
    };
  }, [roomCode]);

  const handleCellClick = useCallback(
    (index: number) => {
      if (!gameState || !isMyTurn || winnerId) return;
      socket.emit('makeMove', { room: roomCode, moveName: 'clickCell', args: [index] });
      markMyMove();
    },
    [gameState, isMyTurn, winnerId, roomCode, markMyMove],
  );

  const handleChessMove = useCallback(
    (move: ChessMoveInput) => {
      if (!gameState || !isMyTurn || winnerId) return;
      const args = move.promotion
        ? [{ from: move.from, to: move.to, promotion: move.promotion }]
        : [{ from: move.from, to: move.to }];
      socket.emit('makeMove', { room: roomCode, moveName: 'move', args });
      markMyMove();
    },
    [gameState, isMyTurn, winnerId, roomCode, markMyMove],
  );

  const handleBackgammonMove = useCallback(
    (from: number, to: number) => {
      if (!gameState || !isMyTurn || winnerId) return;
      socket.emit('gameAction', { room: roomCode, moveName: 'movePiece', args: [{ from, to }], endTurn: false });
      markMyMove();
    },
    [gameState, isMyTurn, winnerId, roomCode, markMyMove],
  );

  const handleEndTurn = useCallback(() => {
    if (!gameState || !isMyTurn || winnerId) return;
    socket.emit('gameAction', { room: roomCode, moveName: 'endTurn', args: [], endTurn: true });
    markMyMove();
  }, [gameState, isMyTurn, winnerId, roomCode, markMyMove]);

  const handleVegasPlace = useCallback(
    (value: number) => {
      if (!gameState || !isMyTurn || winnerId) return;
      socket.emit('gameAction', { room: roomCode, moveName: 'placeDice', args: [value], endTurn: true });
      markMyMove();
    },
    [gameState, isMyTurn, winnerId, roomCode, markMyMove],
  );

  const handleRollDice = useCallback(() => {
    if (!gameState || !isMyTurn) return;
    const G = gameState.G as any;
    // Only Vegas rolls a variable number of dice (8 per round). Backgammon
    // always rolls 2 — sending `count` there made it roll 8 dice.
    const isVegasGame = !!G?.casinos;
    const count = isVegasGame
      ? (G.playerDiceRemaining?.[gameState.ctx.players.indexOf(mySocketId ?? '').toString()] ?? 8)
      : undefined;
    socket.emit('rollDice', { room: roomCode, count });
  }, [gameState, isMyTurn, mySocketId, roomCode]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/game/${roomCode}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'BaziGB — join my game!', text: 'Join my BaziGB game room', url: shareUrl });
        return;
      } catch (err: any) {
        if (err?.name === 'AbortError') return; // user cancelled — do nothing
        // otherwise fall through to clipboard fallback
      }
    }
    await handleCopy();
  };

  // Derive the game type from the room when known; fall back to inspecting the
  // game state so a backgammon/vegas state arriving before the room fetch
  // resolves is never mis-rendered as Tic-Tac-Toe (which crashed the page).
  const gameType =
    room?.gameType ??
    (gameState?.G?.casinos
      ? 'vegas'
      : gameState?.G?.fen
        ? 'chess'
        : Array.isArray(gameState?.G?.points)
          ? 'backgammon'
          : 'tic-tac-toe');
  const isChess = gameType === 'chess';
  const isBackgammon = gameType === 'backgammon';
  const isVegas = gameType === 'vegas';
  const isTicTacToe = gameType === 'tic-tac-toe';

  // Tic-Tac-Toe cells store player ids server-side; map them to X/O for display.
  const tttCells = useMemo(() => {
    if (!isTicTacToe || !gameState?.G?.cells) return [];
    const [p0, p1] = gameState.ctx.players;
    return gameState.G.cells.map((c: string | null) =>
      c === null ? null : c === p0 ? 'X' : c === p1 ? 'O' : null,
    );
  }, [isTicTacToe, gameState]);

  // Vegas hand: the server stores every per-player ledger (playerDice,
  // playerDiceRemaining, casino.dice) keyed by the player's INDEX (e.g. "0"),
  // not by socket id — resolve our own index before reading the roll.
  const vegasHand = useMemo(() => {
    if (!isVegas || !gameState?.G?.playerDice) return [];
    const idx = gameState.ctx.players.indexOf(mySocketId ?? '');
    if (idx < 0) return [];
    const mine = gameState.G.playerDice[idx.toString()];
    if (Array.isArray(mine) && mine.length > 0) return mine;
    return isMyTurn ? (gameState.ctx.dice ?? []) : [];
  }, [isVegas, gameState, mySocketId, isMyTurn]);

  const chessData = useMemo(() => {
    if (!isChess || !gameState?.G?.fen) return null;
    return {
      captured: getCapturedPieces(gameState.G.fen),
      history: Array.isArray(gameState.G.moves) ? getMoveHistory(gameState.G.moves) : [],
      result: getChessResult(gameState.G.fen),
    };
  }, [isChess, gameState]);

  const historyPairs = useMemo(() => {
    if (!chessData) return [] as { number: number; white?: HistoryMove; black?: HistoryMove }[];
    const pairs: { number: number; white?: HistoryMove; black?: HistoryMove }[] = [];
    for (const move of chessData.history) {
      let pair = pairs.find((p) => p.number === move.number);
      if (!pair) {
        pair = { number: move.number };
        pairs.push(pair);
      }
      if (move.color === 'w') pair.white = move;
      else pair.black = move;
    }
    return pairs;
  }, [chessData]);

  const winnerLabel = useMemo(() => {
    if (!winnerId) return null;
    if (winnerId === 'draw') return "It's a Draw!";
    if (isPlayer) return winnerId === mySocketId ? 'Winner: YOU!' : 'Winner: Opponent';
    const idx = ctxPlayers.indexOf(winnerId);
    return idx >= 0 ? `Winner: Player ${idx + 1}` : 'Winner: Player';
  }, [winnerId, isPlayer, mySocketId, ctxPlayers]);

  // Best-of-N match scoreboard, resolved in seat order (player 0 vs player 1)
  // so "Matches: 2 - 1" always reads from the seated players' perspective.
  const [player0Id, player1Id] = ctxPlayers;
  const scoreA = player0Id ? (matchScores[player0Id] ?? 0) : 0;
  const scoreB = player1Id ? (matchScores[player1Id] ?? 0) : 0;
  const isMultiRoundMatch = matchMaxRounds > 1;

  const connChip =
    connStatus === 'connected'
      ? {
          label: 'Connected',
          Icon: Wifi,
          bgcolor: alpha(theme.palette.success.main, 0.1),
          color: theme.palette.success.light,
          borderColor: alpha(theme.palette.success.main, 0.3),
        }
      : {
          label: connStatus === 'reconnecting' ? 'Reconnecting…' : 'Connecting…',
          Icon: WifiOff,
          bgcolor: alpha(theme.palette.warning.main, 0.1),
          color: theme.palette.warning.light,
          borderColor: alpha(theme.palette.warning.main, 0.3),
        };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 6 },
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Container
        maxWidth={isVegas ? 'lg' : isChess ? 'md' : 'sm'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          textAlign: 'center',
        }}
      >
        <Box
          component="header"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          <Button
            component={Link}
            href="/lobby"
            startIcon={<ArrowLeft size={18} />}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              textTransform: 'none',
              fontWeight: 500,
              minWidth: { xs: 'auto', sm: 64 },
              px: { xs: 1, sm: 2 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              '& .MuiButton-startIcon': { mr: { xs: 0.5, sm: 1 } },
            }}
          >
            Lobby
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
            {(turnRemainingSec !== null || turnExpired) && gameState && (
              <Chip
                icon={<Timer size={14} />}
                label={turnExpired ? 'نوبت منقضی شد' : `${turnRemainingSec}s`}
                size="small"
                variant="outlined"
                sx={{
                  bgcolor: turnExpired || turnWarned
                    ? alpha(theme.palette.warning.main, 0.15)
                    : alpha(theme.palette.success.main, 0.1),
                  color: turnExpired
                    ? theme.palette.error.light
                    : turnWarned
                      ? theme.palette.warning.light
                      : theme.palette.success.light,
                  borderColor: turnExpired
                    ? alpha(theme.palette.error.main, 0.4)
                    : turnWarned
                      ? alpha(theme.palette.warning.main, 0.4)
                      : alpha(theme.palette.success.main, 0.3),
                  fontWeight: 700,
                  fontSize: { xs: '0.65rem', sm: '0.75rem' },
                  px: { xs: 0, sm: 0.5 },
                }}
              />
            )}
            <Chip
              icon={<connChip.Icon size={14} />}
              label={connChip.label}
              size="small"
              variant="outlined"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' },
                bgcolor: connChip.bgcolor,
                color: connChip.color,
                borderColor: connChip.borderColor,
                fontWeight: 700,
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, sm: 1 },
                borderRadius: 10,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                px: { xs: 1, sm: 2 },
                py: 0.75,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'text.secondary',
                  display: { xs: 'none', md: 'inline' },
                }}
              >
                Room
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                }}
              >
                {roomCode}
              </Typography>
              <Tooltip title={copied ? 'Copied!' : 'Copy room code'}>
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    color: copied ? 'success.main' : 'text.disabled',
                    '&:hover': { color: 'text.primary' },
                    p: { xs: 0.25, sm: 0.5 },
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </IconButton>
              </Tooltip>
            </Paper>
          </Box>
        </Box>

        <Chip
          icon={<connChip.Icon size={14} />}
          label={connChip.label}
          size="small"
          variant="outlined"
          sx={{
            display: { xs: 'inline-flex', sm: 'none' },
            bgcolor: connChip.bgcolor,
            color: connChip.color,
            borderColor: connChip.borderColor,
            fontWeight: 700,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            width: 'fit-content',
            mx: 'auto',
            '& .MuiChip-icon': { color: 'inherit' },
          }}
        />

        {error && !gameState ? (
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: alpha(theme.palette.error.main, 0.05),
              border: '1px solid',
              borderColor: alpha(theme.palette.error.main, 0.3),
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'error.light' }}>
              Room unavailable
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {error}
            </Typography>
            <Button
              component={Link}
              href="/lobby"
              variant="contained"
              sx={{
                mt: 1,
                bgcolor: 'text.primary',
                color: 'background.default',
                '&:hover': { bgcolor: alpha(theme.palette.text.primary, 0.8) },
                fontWeight: 700,
                borderRadius: 2,
                px: 3,
              }}
            >
              Back to Lobby
            </Button>
          </Paper>
        ) : !gameState ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 3 }}>
            <CircularProgress size={56} thickness={4} />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: 'primary.light',
                  mb: 1,
                }}
              >
                Waiting for opponent…
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Share room code{' '}
                <Typography component="span" sx={{ fontFamily: 'monospace', fontWeight: 700, color: 'text.primary' }}>
                  {roomCode}
                </Typography>{' '}
                to invite a friend
              </Typography>
            </Box>

            {room && (
              <Chip
                icon={<Users size={16} />}
                label={`${room.players.length}/${room.gameType === 'vegas' ? 5 : 2} players in room`}
                variant="outlined"
                sx={{
                  borderRadius: 10,
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  '& .MuiChip-icon': { color: 'success.main' },
                }}
              />
            )}

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleShare}
                startIcon={copied ? <CircularProgress size={16} color="inherit" /> : <Share2 size={16} />}
                sx={{
                  borderRadius: 3,
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.light',
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    borderColor: alpha(theme.palette.primary.main, 0.6),
                  },
                }}
              >
                {copied ? 'Code copied!' : 'Share room'}
              </Button>

              {isVegas && room && room.ownerId === mySocketId && room.players.length >= 2 && (
                <Button
                  variant="contained"
                  onClick={() => socket.emit('startGame', { room: roomCode })}
                  startIcon={<Play size={16} />}
                  sx={{
                    borderRadius: 3,
                    background: theme.palette.success.main,
                    color: 'white',
                    px: 3,
                    py: 1,
                    fontWeight: 700,
                    boxShadow: `0 4px 14px 0 ${alpha(theme.palette.success.main, 0.4)}`,
                    '&:hover': {
                      boxShadow: `0 6px 20px 0 ${alpha(theme.palette.success.main, 0.5)}`,
                      opacity: 0.9,
                    },
                  }}
                >
                  Start Game
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                px: 2,
                py: 1,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              {isPlayer ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: isMyTurn ? 'success.main' : 'text.disabled',
                      boxShadow: isMyTurn ? `0 0 8px ${theme.palette.success.main}` : 'none',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isMyTurn ? 'Your Turn' : "Opponent's Turn"}
                  </Typography>
                  {isMyTurn && (isBackgammon || isVegas) && !winnerId && (
                    <Button
                      size="small"
                      onClick={() => socket.emit('undo', { room: roomCode })}
                      startIcon={<Undo2 size={14} />}
                      sx={{
                        ml: 1,
                        py: 0.25,
                        px: 1.5,
                        borderRadius: 10,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        border: '1px solid',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': {
                          bgcolor: 'action.hover',
                          color: 'text.primary',
                        },
                      }}
                    >
                      Undo
                    </Button>
                  )}
                  {!winnerId && players.length === 1 && !isSpectator && (
                    <Button
                      size="small"
                      color="secondary"
                      variant="outlined"
                      onClick={() => socket.emit('add_ai_player', { room: roomCode })}
                      startIcon={<Bot size={14} />}
                      sx={{
                        ml: 1,
                        py: 0.25,
                        px: 1.5,
                        borderRadius: 10,
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        borderColor: alpha(theme.palette.secondary.main, 0.4),
                      }}
                    >
                      Play with AI
                    </Button>
                  )}
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'secondary.light' }}>
                  <Eye size={16} />
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Spectating
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: { xs: 'none', sm: 'inline' },
                      color: alpha(theme.palette.secondary.light, 0.7),
                    }}
                  >
                    — you&apos;re watching live
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {isMultiRoundMatch && (
                  <Chip
                    icon={<Trophy size={14} />}
                    label={`Matches ${scoreA} - ${scoreB}`}
                    size="small"
                    title={`Best of ${matchMaxRounds} — first to ${Math.ceil(matchMaxRounds / 2)}`}
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      bgcolor: alpha(theme.palette.warning.main, 0.12),
                      color: '#fbbf24',
                      border: '1px solid',
                      borderColor: alpha(theme.palette.warning.main, 0.3),
                      '& .MuiChip-icon': { color: 'inherit' },
                    }}
                  />
                )}
                {roundNotice && !matchOver && (
                  <Chip
                    label={roundNotice}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      bgcolor: alpha(theme.palette.success.main, 0.15),
                      color: 'success.light',
                      border: '1px solid',
                      borderColor: alpha(theme.palette.success.main, 0.3),
                    }}
                  />
                )}
                <Chip
                  label={isChess ? '♞ Chess' : isBackgammon ? '🎲 Backgammon' : isVegas ? '💵 Vegas' : 'Tic-Tac-Toe'}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.light',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                  }}
                />
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled' }}>
                  Turn {gameState.ctx.turn}
                </Typography>
              </Box>
            </Paper>

            <Box sx={{ position: 'relative' }}>
              {!isPlayer && (
                <Chip
                  icon={<Eye size={14} />}
                  label="Spectating"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    bgcolor: alpha(theme.palette.background.default, 0.85),
                    backdropFilter: 'blur(4px)',
                    border: '1px solid',
                    borderColor: alpha(theme.palette.secondary.main, 0.4),
                    color: 'secondary.light',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    pointerEvents: 'none',
                    boxShadow: theme.shadows[4],
                  }}
                />
              )}

              {isChess ? (
                <ChessBoard
                  fen={gameState.G.fen}
                  onMove={handleChessMove}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                  orientation={isPlayer ? (mySocketId === gameState.ctx.players[0] ? 'w' : 'b') : 'w'}
                />
              ) : isBackgammon ? (
                <BackgammonBoard
                  points={gameState.G.points}
                  bar={gameState.G.bar}
                  off={gameState.G.off}
                  dice={gameState.ctx.dice}
                  diceRemaining={gameState.G.diceRemaining}
                  onRoll={handleRollDice}
                  onMove={handleBackgammonMove}
                  onEndTurn={handleEndTurn}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                  isMyTurn={isMyTurn}
                  myColor={isPlayer ? (mySocketId === gameState.ctx.players[0] ? 'white' : 'black') : 'white'}
                  players={gameState.ctx.players}
                />
              ) : isVegas ? (
                <VegasBoard
                  casinos={gameState.G.casinos}
                  hand={vegasHand}
                  players={gameState.ctx.players}
                  names={playerNames}
                  currentPlayerId={mySocketId ?? ''}
                  onPlace={handleVegasPlace}
                  onRoll={handleRollDice}
                  onNextRound={isPlayer ? () => socket.emit('nextRound', { room: roomCode }) : undefined}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                  isMyTurn={isMyTurn}
                  phase={gameState.G.phase ?? 'playing'}
                  round={gameState.G.round ?? 1}
                  totalRounds={gameState.G.totalRounds ?? 5}
                  playerCash={gameState.G.playerCash ?? {}}
                  playerCards={gameState.G.playerCards ?? {}}
                  winnerId={winnerId}
                />
              ) : (
                <Board
                  cells={tttCells}
                  onCellClick={handleCellClick}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                />
              )}
            </Box>

            {isChess && chessData && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2,
                  textAlign: 'left',
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 2,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'text.secondary',
                    }}
                  >
                    Captured pieces
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <CapturedRow label="White" pieces={chessData.captured.white} />
                    <CapturedRow label="Black" pieces={chessData.captured.black} />
                  </Box>
                </Paper>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 224,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mb: 2,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'text.secondary',
                    }}
                  >
                    Move history
                  </Typography>
                  {historyPairs.length === 0 ? (
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                      No moves yet — White to move.
                    </Typography>
                  ) : (
                    <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, fontFamily: 'monospace' }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: '2.5rem 1fr 1fr', gap: 1.5 }}>
                        {historyPairs.map((pair) => (
                          <Fragment key={pair.number}>
                            <Typography variant="caption" sx={{ color: 'text.disabled', py: 0.5 }}>
                              {pair.number}.
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {pair.white ? (pair.white.san ?? `${pair.white.from}–${pair.white.to}`) : ''}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.625rem' }}>
                                {pair.white ? `${pair.white.from}–${pair.white.to}` : ''}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                {pair.black ? (pair.black.san ?? `${pair.black.from}–${pair.black.to}`) : ''}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '0.625rem' }}>
                                {pair.black ? `${pair.black.from}–${pair.black.to}` : ''}
                              </Typography>
                            </Box>
                          </Fragment>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Paper>
              </Box>
            )}

            {winnerLabel && matchOver && (
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  bgcolor: 'primary.main',
                  color: 'white',
                  borderRadius: 3,
                  boxShadow: `0 8px 32px 0 ${alpha(theme.palette.primary.main, 0.4)}`,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
                  {winnerLabel}
                </Typography>
                {isChess && chessData?.result && (
                  <Typography variant="body2" sx={{ fontWeight: 500, color: alpha('#fff', 0.8), mb: 2 }}>
                    {CHESS_RESULT_LABELS[chessData.result]}
                  </Typography>
                )}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                  {isPlayer && (
                    <Button
                      variant="contained"
                      onClick={() => socket.emit('newGame', { room: roomCode })}
                      startIcon={<RotateCcw size={18} />}
                      sx={{
                        bgcolor: 'success.main',
                        color: 'white',
                        fontWeight: 700,
                        '&:hover': { bgcolor: 'success.dark' },
                      }}
                    >
                      Play Again
                    </Button>
                  )}
                  <Button
                    component={Link}
                    href="/lobby"
                    variant="contained"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      fontWeight: 700,
                      '&:hover': { bgcolor: alpha('#fff', 0.9) },
                    }}
                  >
                    Back to Lobby
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        )}
      </Container>

      <ChatSidebar roomCode={roomCode} playerIds={ctxPlayers} myId={mySocketId} names={playerNames} />
    </Box>
  );
}
