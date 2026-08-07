'use client';

import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Eye, Loader2, Users, Wifi, WifiOff } from 'lucide-react';
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
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="w-16 shrink-0 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <span className="flex min-h-6 flex-1 flex-wrap items-center gap-1 text-xl leading-none">
        {pieces.length === 0 ? (
          <span className="text-xs text-slate-600">—</span>
        ) : (
          pieces.map((piece, i) => (
            <span key={i} className="drop-shadow">
              {PIECE_GLYPHS[piece] ?? piece}
            </span>
          ))
        )}
      </span>
      {value > 0 && (
        <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
          +{value}
        </span>
      )}
    </div>
  );
}

export default function GamePage() {
  const { roomId } = useParams<{ roomId: string }>();
  const roomCode = useMemo(() => (roomId ?? '').trim().toUpperCase(), [roomId]);

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [connStatus, setConnStatus] = useState<ConnStatus>('connecting');

  // Shared computed variables (declared early so callbacks can use them)
  const mySocketId = socket.id ?? null;
  const ctxPlayers = gameState?.ctx.players ?? [];
  const isPlayer = !!mySocketId && (ctxPlayers.includes(mySocketId) || (room?.players?.includes(mySocketId) ?? false));
  const isMyTurn = isPlayer && !!gameState && gameState.ctx.currentPlayer === mySocketId;
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
      if (isBackgammon) {
        const dice = Array.isArray(G.ctx?.dice) ? G.ctx.dice.join(',') : '';
        const prevDice = prevDiceRef.current;
        prevDiceRef.current = dice;
        if (prevDice !== '' && dice !== '' && prevDice !== dice) {
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
    const onGameOver = ({ state, winner: w }: { state: GameState; winner: string }) => {
      if (cancelled) return;
      setGameState(state);
      setWinner(w);
      handleStateChange(state);
    };
    const onError = (err: any) => {
      if (cancelled) return;
      setError(err?.message || 'An unknown error occurred');
    };
    const onRoomUpdate = (update: { code?: string; players?: string[]; status?: Room['status'] }) => {
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
    };

    socket.on('gameState', onGameState);
    socket.on('gameOver', onGameOver);
    socket.on('error', onError);
    socket.on('connect', onConnect);
    socket.on('connect_error', onConnectError);
    socket.on('disconnect', onDisconnect);
    socket.on('roomUpdate', onRoomUpdate);

    if (socket.connected) onConnect();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
      socket.off('gameState', onGameState);
      socket.off('gameOver', onGameOver);
      socket.off('error', onError);
      socket.off('connect', onConnect);
      socket.off('connect_error', onConnectError);
      socket.off('disconnect', onDisconnect);
      socket.off('roomUpdate', onRoomUpdate);
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
    const playerIndex = gameState.ctx.players.indexOf(mySocketId ?? '');
    const count = gameState.G.playerDiceRemaining?.[playerIndex.toString()] || 8;
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

  const gameType = room?.gameType ?? (gameState?.G?.casinos ? 'vegas' : gameState?.G?.fen ? 'chess' : 'tic-tac-toe');
  const isChess = gameType === 'chess';
  const isBackgammon = gameType === 'backgammon';
  const isVegas = gameType === 'vegas';

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

  const connChip =
    connStatus === 'connected'
      ? { label: 'Connected', Icon: Wifi, cls: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' }
      : {
          label: connStatus === 'reconnecting' ? 'Reconnecting…' : 'Connecting…',
          Icon: WifiOff,
          cls: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-900 text-white">
      <div className={`w-full ${isVegas ? 'max-w-4xl' : isChess ? 'max-w-2xl' : 'max-w-md'} text-center space-y-6`}>
        <header className="flex items-center justify-between gap-2">
          <Link
            href="/lobby"
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Lobby
          </Link>
          <div className="flex items-center gap-2">
            <span
              className={`hidden sm:flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${connChip.cls}`}
            >
              <connChip.Icon className="w-3.5 h-3.5" />
              {connChip.label}
            </span>
            <div className="flex items-center gap-2 rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Room</span>
              <span className="font-mono font-bold tracking-widest">{roomCode}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Copy room code"
              >
                {copied ? (
                  <span className="text-xs text-emerald-400 font-semibold">Copied!</span>
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </header>

        <div className={`sm:hidden flex items-center justify-center gap-1.5 text-xs font-semibold ${connChip.cls} rounded-full border px-3 py-1 w-fit mx-auto`}>
          <connChip.Icon className="w-3.5 h-3.5" />
          {connChip.label}
        </div>

        {error && !gameState ? (
          <div className="space-y-4 p-6 rounded-2xl bg-slate-800 border border-rose-500/40">
            <h2 className="text-xl font-bold text-rose-400">Room unavailable</h2>
            <p className="text-slate-400 text-sm">{error}</p>
            <Link
              href="/lobby"
              className="inline-block px-6 py-2 rounded-xl bg-white text-indigo-600 font-bold hover:bg-slate-100 transition-colors"
            >
              Back to Lobby
            </Link>
          </div>
        ) : !gameState ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="w-14 h-14 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-r from-indigo-300 to-sky-300">
                Waiting for opponent…
              </p>
              <p className="text-slate-500 text-sm">
                Share room code <span className="font-mono font-bold tracking-widest text-slate-300">{roomCode}</span>{' '}
                to invite a friend
              </p>
            </div>
            {room && (
              <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800 rounded-full border border-slate-700 px-4 py-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                {room.players.length}/2 players in room
              </div>
            )}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 font-semibold hover:bg-indigo-500/30 transition-colors"
            >
              {copied ? <Loader2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Code copied!' : 'Copy room code'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-800 rounded-lg border border-slate-700">
              {isPlayer ? (
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isMyTurn ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-slate-600'
                    }`}
                  />
                  <span className="text-sm font-semibold uppercase tracking-wider">
                    {isMyTurn ? 'Your Turn' : "Opponent's Turn"}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-violet-300">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-bold uppercase tracking-wider">Spectating</span>
                  <span className="hidden sm:inline text-xs font-normal text-violet-300/70 normal-case">
                    — you&apos;re watching live
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 rounded-full px-2.5 py-0.5">
                  {isChess ? '♞ Chess' : isBackgammon ? '🎲 Backgammon' : isVegas ? '💵 Vegas' : 'Tic-Tac-Toe'}
                </span>
                <span className="text-xs font-mono text-slate-500">Turn {gameState.ctx.turn}</span>
              </div>
            </div>

            <div className="relative">
              {!isPlayer && (
                <div className="pointer-events-none absolute left-1/2 top-3 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-violet-400/50 bg-slate-900/85 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-200 shadow-lg backdrop-blur">
                  <Eye className="h-3.5 w-3.5" />
                  Spectating
                </div>
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
                  hand={
                    (gameState.G.playerDice?.[mySocketId ?? '']?.length > 0)
                      ? gameState.G.playerDice[mySocketId ?? '']
                      : (isMyTurn ? (gameState.ctx.dice || []) : [])
                  }
                  players={gameState.ctx.players}
                  currentPlayerId={mySocketId ?? ''}
                  onPlace={handleVegasPlace}
                  onRoll={handleRollDice}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                  isMyTurn={isMyTurn}
                />
              ) : (
                <Board
                  cells={gameState.G.cells}
                  onCellClick={handleCellClick}
                  disabled={!isPlayer || !isMyTurn || !!winnerId}
                />
              )}
            </div>

            {isChess && chessData && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-left">
                <div className="rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Captured pieces
                  </h3>
                  <div className="space-y-2.5">
                    <CapturedRow label="White" pieces={chessData.captured.white} />
                    <CapturedRow label="Black" pieces={chessData.captured.black} />
                  </div>
                </div>

                <div className="flex max-h-56 flex-col rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
                  <h3 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Move history
                  </h3>
                  {historyPairs.length === 0 ? (
                    <p className="text-sm text-slate-500">No moves yet — White to move.</p>
                  ) : (
                    <div className="min-h-0 flex-1 overflow-y-auto pr-1 font-mono">
                      <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-x-2 gap-y-1.5">
                        {historyPairs.map((pair) => (
                          <Fragment key={pair.number}>
                            <span className="text-xs text-slate-500">{pair.number}.</span>
                            <span className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-100">
                                {pair.white ? (pair.white.san ?? `${pair.white.from}–${pair.white.to}`) : ''}
                              </span>
                              <span className="text-[10px] text-slate-500">
                                {pair.white ? `${pair.white.from}–${pair.white.to}` : ''}
                              </span>
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-semibold text-slate-300">
                                {pair.black ? (pair.black.san ?? `${pair.black.from}–${pair.black.to}`) : ''}
                              </span>
                              <span className="text-[10px] text-slate-600">
                                {pair.black ? `${pair.black.from}–${pair.black.to}` : ''}
                              </span>
                            </span>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {winnerLabel && (
              <div className="p-4 bg-indigo-600 rounded-xl shadow-xl">
                <h2 className="text-2xl font-bold">{winnerLabel}</h2>
                {isChess && chessData?.result && (
                  <p className="mt-1 text-sm font-medium text-indigo-200">
                    {CHESS_RESULT_LABELS[chessData.result]}
                  </p>
                )}
                <Link
                  href="/lobby"
                  className="mt-4 inline-block px-6 py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Back to Lobby
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatSidebar roomCode={roomCode} playerIds={ctxPlayers} myId={mySocketId} />
    </main>
  );
}
