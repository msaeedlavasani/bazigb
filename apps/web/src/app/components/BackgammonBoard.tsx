'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { getLegalDestinations, getLegalMoves, getMoveHints, canBearOff } from '@bazigb/game-backgammon';
import Dice3D from './Dice3D';
import { soundService } from '../../lib/sound-service';

interface BackgammonBoardProps {
  points: number[];
  bar: { white: number; black: number };
  off: { white: number; black: number };
  dice?: number[];
  onRoll: () => void;
  onMove: (from: number, to: number) => void;
  onEndTurn: () => void;
  disabled?: boolean;
  isMyTurn: boolean;
  myColor: 'white' | 'black';
  players: string[];
  diceRemaining?: number[];
  /** Optional AI-planned sequence of moves to play back automatically (e.g.
   *  the output of `getBestMoveSequence` from `@bazigb/game-backgammon`).
   *  The board plays the moves one at a time while it is this player's turn. */
  aiMoves?: Array<{ from: number; to: number }>;
}

type CheckerColor = 'white' | 'black';

/* ------------------------------------------------------------------ */
/*  Textures (pure CSS — layered gradients, no external assets needed) */
/* ------------------------------------------------------------------ */

// Deep walnut wood frame with subtle grain lines
const WOOD_BG = [
  'repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0px, rgba(0,0,0,0.12) 2px, transparent 2px, transparent 7px)',
  'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 11px)',
  'linear-gradient(155deg, #6e3c1d 0%, #4e2912 40%, #331a0b 72%, #241105 100%)',
].join(', ');

// Green leather / felt playing surface with vignette + stippled noise
const LEATHER_BG = [
  'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%)',
  'radial-gradient(130% 120% at 50% 115%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 55%)',
  'repeating-linear-gradient(45deg, rgba(0,0,0,0.045) 0px, rgba(0,0,0,0.045) 1px, transparent 1px, transparent 5px)',
  'repeating-linear-gradient(-45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 5px)',
  'radial-gradient(ellipse 150% 110% at 50% 50%, #38543f 0%, #26392c 55%, #152319 100%)',
].join(', ');

// Dark wood bar / off columns
const BAR_BG = [
  'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 7px)',
  'linear-gradient(180deg, #4c2c13 0%, #3a2110 50%, #2b1509 100%)',
].join(', ');

/* ------------------------------------------------------------------ */
/*  Shared SVG defs (gradients for the wooden points)                  */
/* ------------------------------------------------------------------ */

function PointDefs() {
  return (
    <svg width={0} height={0} className="absolute" aria-hidden="true" focusable="false">
      <defs>
        {/* dark walnut point */}
        <linearGradient id="bgPtDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5a30" />
          <stop offset="45%" stopColor="#6b3f1e" />
          <stop offset="100%" stopColor="#45260f" />
        </linearGradient>
        {/* light cream / tan point */}
        <linearGradient id="bgPtLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5e0b2" />
          <stop offset="45%" stopColor="#dfbd85" />
          <stop offset="100%" stopColor="#bf9257" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Checker token                                                   */
/* ------------------------------------------------------------------ */

const checkerStyles: Record<CheckerColor, React.CSSProperties> = {
  white: {
    background:
      'radial-gradient(circle at 32% 28%, #ffffff 0%, #f4f6f8 20%, #e2e8f0 46%, #c9d2dc 72%, #8fa0b0 100%)',
    boxShadow: [
      'inset 0 2px 3px rgba(255,255,255,0.95)',      // top inner highlight
      'inset 0 -3px 6px rgba(15,23,42,0.35)',        // bottom inner shade
      'inset 0 0 0 2px rgba(255,255,255,0.55)',      // rim light
      'inset 0 0 10px rgba(0,0,0,0.10)',             // soft core
      '0 2px 2px rgba(0,0,0,0.45)',                  // contact shadow
      '0 6px 10px rgba(0,0,0,0.30)',                 // mid drop
      '0 12px 18px rgba(0,0,0,0.18)',                // ambient drop
    ].join(', '),
  },
  black: {
    background:
      'radial-gradient(circle at 32% 28%, #64748b 0%, #334155 20%, #1e293b 48%, #0f172a 78%, #020617 100%)',
    boxShadow: [
      'inset 0 2px 3px rgba(255,255,255,0.28)',      // top inner highlight
      'inset 0 -3px 6px rgba(0,0,0,0.65)',           // bottom inner shade
      'inset 0 0 0 2px rgba(255,255,255,0.08)',      // rim light
      'inset 0 0 10px rgba(0,0,0,0.35)',             // soft core
      '0 2px 2px rgba(0,0,0,0.55)',                  // contact shadow
      '0 6px 10px rgba(0,0,0,0.38)',                 // mid drop
      '0 12px 18px rgba(0,0,0,0.26)',                // ambient drop
    ].join(', '),
  },
};

function Checker3D({
  color,
  className = '',
  label,
  zIndex,
}: {
  color: CheckerColor;
  className?: string;
  label?: string | null;
  zIndex?: number;
}) {
  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0, transition: { duration: 0.12 } }}
      transition={{ type: 'spring', stiffness: 380, damping: 26 }}
      className={`relative shrink-0 rounded-full ${className}`}
      style={{ ...checkerStyles[color], zIndex }}
    >
      {label != null && (
        <span
          className="absolute inset-0 flex items-center justify-center font-bold leading-none text-[9px] sm:text-[11px]"
          style={{
            color: color === 'white' ? '#1e293b' : '#f1f5f9',
            textShadow:
              color === 'white'
                ? '0 1px 0 rgba(255,255,255,0.6)'
                : '0 1px 2px rgba(0,0,0,0.9)',
          }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function BackgammonBoard({
  points,
  bar,
  off,
  dice,
  onRoll,
  onMove,
  onEndTurn,
  disabled = false,
  isMyTurn,
  myColor,
  players,
  diceRemaining = [],
  aiMoves = []
}: BackgammonBoardProps) {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
  const [draggedPoint, setDraggedPoint] = useState<number | null>(null);

  const effectiveDice = (diceRemaining.length > 0) ? diceRemaining : (dice || []);
  const legalMoves = useMemo(() => {
    if (!isMyTurn || disabled || effectiveDice.length === 0) return [];
    return getLegalMoves({ points, bar, off, diceRemaining: effectiveDice }, players[myColor === 'white' ? 0 : 1], effectiveDice, players);
  }, [points, bar, off, effectiveDice, isMyTurn, disabled, myColor, players]);

  const legalDestinations = useMemo(() => {
    if (selectedPoint === null) return [];
    return getLegalDestinations(
      { points, bar, off, diceRemaining: effectiveDice },
      players[myColor === 'white' ? 0 : 1],
      selectedPoint,
      effectiveDice,
      players
    );
  }, [selectedPoint, points, bar, off, effectiveDice, players, myColor]);

  // Extended hint set for the selected point: direct die targets, the combined
  // (sum) destination, and the intermediate steps of doubles rolls. These are
  // purely visual guides layered on top of `legalDestinations`.
  const moveHints = useMemo(() => {
    if (selectedPoint === null) return [];
    return getMoveHints(
      { points, bar, off, diceRemaining: effectiveDice },
      players[myColor === 'white' ? 0 : 1],
      selectedPoint,
      effectiveDice,
      players
    );
  }, [selectedPoint, points, bar, off, effectiveDice, players, myColor]);

  // Serialized snapshot of the current turn state — used to guard automatic
  // plays so the exact same state is never acted on twice.
  const stateKey = [
    points.join(','),
    `${bar.white},${bar.black}`,
    `${off.white},${off.black}`,
    effectiveDice.join(','),
  ].join('|');

  // --- Automatic play refs --------------------------------------------------
  const forcedPlayedKeyRef = useRef<string | null>(null);
  const aiIndexRef = useRef(0);
  const aiSeqKeyRef = useRef<string | null>(null);

  // --- Auto-moves -----------------------------------------------------------
  // 1) The player sits on the bar with exactly ONE legal move → play it.
  // 2) Bearing-off end-game (all checkers in home) where the roll only allows
  //    removing checkers without any choice (e.g. double 6 with 4 left) →
  //    play each forced removal automatically.
  useEffect(() => {
    if (disabled || !isMyTurn || effectiveDice.length === 0) return;
    // If an AI sequence is being played back, let it drive the turn instead.
    if (aiMoves.length > 0 && aiIndexRef.current < aiMoves.length) return;
    if (forcedPlayedKeyRef.current === stateKey) return;

    const myBarCount = myColor === 'white' ? bar.white : bar.black;
    const allInHome = canBearOff(
      { points, bar, off, diceRemaining: effectiveDice },
      myColor === 'white'
    );

    if ((myBarCount > 0 || allInHome) && legalMoves.length === 1) {
      forcedPlayedKeyRef.current = stateKey;
      onMove(legalMoves[0].from, legalMoves[0].to);
    }
  }, [stateKey, legalMoves, onMove, disabled, isMyTurn, effectiveDice, aiMoves, myColor, points, bar, off]);

  // --- AI integration -------------------------------------------------------
  // Receives an AI move sequence (e.g. from `getBestMoveSequence`) and plays it
  // back one move per state update, with a short delay so the checkers animate.
  useEffect(() => {
    if (disabled || !isMyTurn) {
      aiIndexRef.current = 0; // turn ended / not ours — re-arm for a fresh pass
      return;
    }
    if (aiMoves.length === 0 || effectiveDice.length === 0) return;

    const seqKey = aiMoves.map(m => `${m.from}-${m.to}`).join(',');
    if (aiSeqKeyRef.current !== seqKey) {
      aiSeqKeyRef.current = seqKey;
      aiIndexRef.current = 0;
    }

    const idx = aiIndexRef.current;
    if (idx >= aiMoves.length) return;

    const planned = aiMoves[idx];
    // Only play a move that is still legal on the current board; if the
    // position changed underneath us (manual interference, rejected move)
    // drop the stale move and continue with the rest of the sequence.
    const stillLegal = legalMoves.some(m => m.from === planned.from && m.to === planned.to);
    aiIndexRef.current = idx + 1;
    if (!stillLegal) return;

    const timer = setTimeout(() => onMove(planned.from, planned.to), 250);
    return () => clearTimeout(timer);
  }, [aiMoves, stateKey, legalMoves, onMove, disabled, isMyTurn, effectiveDice]);

  const handleMove = (from: number, to: number) => {
    if (disabled || !isMyTurn) return;

    // Check if it's a capture (Hit)
    const isHit = (myColor === 'white' && points[to] === -1) || (myColor === 'black' && points[to] === 1);

    onMove(from, to);
    setSelectedPoint(null);
    setDraggedPoint(null);

    if (isHit) {
      soundService.play('capture');
    } else {
      soundService.play('move');
    }
  };

  const handlePointClick = (index: number) => {
    if (disabled || !isMyTurn) return;

    if (selectedPoint === index) {
      setSelectedPoint(null);
    } else if (legalDestinations.includes(index)) {
      handleMove(selectedPoint!, index);
    } else {
      // Check if this point has my pieces
      const isWhite = myColor === 'white';
      const hasMyPieces = isWhite ? points[index] > 0 : points[index] < 0;

      // If pieces on bar, must move from bar
      const myBarCount = isWhite ? bar.white : bar.black;
      if (myBarCount > 0) {
        // Only allow selecting bar
        return;
      }

      if (hasMyPieces) {
        setSelectedPoint(index);
      } else {
        setSelectedPoint(null);
      }
    }
  };

  const handleBarClick = () => {
    if (disabled || !isMyTurn) return;
    const isWhite = myColor === 'white';
    const myBarCount = isWhite ? bar.white : bar.black;
    if (myBarCount > 0) {
      setSelectedPoint(isWhite ? 0 : 25);
    }
  };

  const handleOffClick = () => {
    if (selectedPoint !== null && legalDestinations.includes(myColor === 'white' ? 25 : 0)) {
      handleMove(selectedPoint, myColor === 'white' ? 25 : 0);
    }
  };

  /**
   * Renders a stack of 3D checkers.
   * `isTop` controls the overlap direction so stacks build downward
   * (top half / bar-black) or upward (bottom half / bar-white).
   */
  const renderTokens = (
    count: number,
    isTop: boolean,
    keyPrefix: string,
    isBar = false
  ) => {
    if (count === 0) return null;
    const absCount = Math.abs(count);
    const color: CheckerColor = count > 0 ? 'white' : 'black';
    const maxVisible = 5;
    const displayCount = Math.min(absCount, maxVisible);
    const tokens = [];

    for (let i = 0; i < displayCount; i++) {
      tokens.push(
        <Checker3D
          key={`${keyPrefix}-${i}`}
          color={color}
          zIndex={i + 1}
          label={i === displayCount - 1 && absCount > maxVisible ? String(absCount) : undefined}
          className={
            isBar
              ? `w-7 sm:w-9 ${isTop ? 'mb-[-40%]' : 'mt-[-40%]'}`
              : `w-[88%] min-w-[20px] max-w-[64px] aspect-square ${isTop ? 'mb-[-45%]' : 'mt-[-45%]'}`
          }
        />
      );
    }
    return tokens;
  };

  const isOrientationFlipped = myColor === 'black';

  const Point = ({ index }: { index: number }) => {
    const count = points[index];
    const isTop = index >= 13 && index <= 24;
    const isDark = (index % 2 === 0) === isTop;
    const isSelected = selectedPoint === index;
    const isTarget = legalDestinations.includes(index);
    const hint = moveHints.find(h => h.to === index);
    const hintKind = hint?.kind;
    const canDrag = isMyTurn && !disabled && (myColor === 'white' ? count > 0 : count < 0);

    // Check bar rule
    const isWhite = myColor === 'white';
    const myBarCount = isWhite ? bar.white : bar.black;
    const mustMoveFromBar = myBarCount > 0;

    // Top-half points taper toward the center bar; bottom-half point up.
    const path = isTop ? 'M 3 0 L 18 100 L 33 0 Z' : 'M 3 100 L 18 0 L 33 100 Z';
    const fill = isDark ? 'url(#bgPtDark)' : 'url(#bgPtLight)';
    const stroke = isDark ? '#3e220c' : '#a97f45';

    return (
      <div
        onClick={() => handlePointClick(index)}
        onDragStart={() => canDrag && !mustMoveFromBar && setDraggedPoint(index)}
        onDragOver={(e) => {
          e.preventDefault();
          if (selectedPoint !== null && legalDestinations.includes(index)) {
            e.dataTransfer.dropEffect = 'move';
          } else if (draggedPoint !== null && getLegalDestinations({points, bar, off, diceRemaining: effectiveDice}, players[isWhite?0:1], draggedPoint, effectiveDice, players).includes(index)) {
            e.dataTransfer.dropEffect = 'move';
          }
        }}
        onDrop={(e) => {
          e.preventDefault();
          if (draggedPoint !== null) {
            const dests = getLegalDestinations({points, bar, off, diceRemaining: effectiveDice}, players[isWhite?0:1], draggedPoint, effectiveDice, players);
            if (dests.includes(index)) handleMove(draggedPoint, index);
          } else if (selectedPoint !== null && legalDestinations.includes(index)) {
            handleMove(selectedPoint, index);
          }
        }}
        draggable={canDrag && !mustMoveFromBar}
        className="relative h-full cursor-pointer touch-manipulation"
      >
        {/* High-quality SVG point (scales with the grid cell) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 36 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={path} fill={fill} stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" />
          {/* subtle left-edge highlight for a carved, 3D feel */}
          <path
            d={path}
            fill="none"
            stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.5)'}
            strokeWidth={1}
            strokeLinejoin="round"
            transform="translate(-1.5 0)"
          />
        </svg>

        {/* Checker stack */}
        <motion.div
          className={`absolute inset-x-0 z-10 flex flex-col items-center ${isTop ? 'top-0.5' : 'bottom-0.5'}`}
          animate={{ scale: isSelected ? 1.06 : 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {renderTokens(count, isTop, String(index))}
          </AnimatePresence>
        </motion.div>

        {/* Selection / target overlays */}
        {isSelected && <div className="pointer-events-none absolute inset-0 z-20 bg-amber-400/25 shadow-[inset_0_0_0_2px_rgba(245,158,11,0.7)]" />}
        {isTarget && <div className="pointer-events-none absolute inset-0 z-20 animate-pulse bg-green-500/25 shadow-[inset_0_0_0_2px_rgba(34,197,94,0.6)]" />}

        {/* Extended hint overlays (combined-dice sum / doubles intermediate
            steps) — a soft glow plus a small glowing dot near the point tip */}
        {hintKind === 'sum' && (
          <div className="pointer-events-none absolute inset-0 z-20 bg-sky-400/20 shadow-[inset_0_0_0_2px_rgba(56,189,248,0.5)]" />
        )}
        {hintKind === 'double' && (
          <div className="pointer-events-none absolute inset-0 z-20 bg-cyan-400/15 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.45)]" />
        )}
        {(hintKind === 'sum' || hintKind === 'double') && (
          <span
            className={`pointer-events-none absolute left-1/2 z-20 h-2 w-2 -translate-x-1/2 rounded-full sm:h-2.5 sm:w-2.5 ${isTop ? 'bottom-1.5' : 'top-1.5'} ${
              hintKind === 'sum'
                ? 'bg-sky-400 shadow-[0_0_7px_2px_rgba(56,189,248,0.85)]'
                : 'bg-cyan-300 shadow-[0_0_7px_2px_rgba(34,211,238,0.85)]'
            }`}
          />
        )}

        {/* Point index label (tucked in the tip, near the bar) */}
        <span
          className={`pointer-events-none absolute left-0 right-0 z-20 text-center font-mono leading-none text-[7px] sm:text-[9px] ${isTop ? 'bottom-0.5' : 'top-0.5'} ${isDark ? 'text-white/50' : 'text-amber-950/50'}`}
        >
          {index}
        </span>
      </div>
    );
  };

  const topPoints = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const bottomPoints = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const offPos = myColor === 'white' ? 25 : 0;

  return (
    <Paper
      elevation={24}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, sm: 3 },
        width: '100%',
        maxWidth: '1024px',
        mx: 'auto',
        p: { xs: 1, sm: 4 },
        borderRadius: 6,
        border: { xs: '6px solid #2a1408', sm: '10px solid #2a1408' },
        background: WOOD_BG,
        boxShadow: '0 30px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {/*
        Board sizing: each half is an aspect-[7/4] grid of 6 columns, so the
        triangle height scales from the point width. Checkers are sized as a
        percentage of their column, keeping everything proportional (and
        fully visible) down to 360px viewports.
      */}
      <div
        className="relative flex w-full select-none overflow-hidden rounded-xl border-4 border-[#2b1509]"
        style={{ background: LEATHER_BG }}
      >
        <PointDefs />

        {/* Board Sections — Left */}
        <div className="flex flex-1 flex-col">
          <div className="grid aspect-[5/4] w-full grid-cols-6 border-b-2 border-[#2b1509]/80">
            {topPoints.slice(0, 6).map(i => <Point key={i} index={i} />)}
          </div>
          <div className="grid aspect-[5/4] w-full grid-cols-6">
            {bottomPoints.slice(0, 6).map(i => <Point key={i} index={i} />)}
          </div>
        </div>

        {/* Bar */}
        <div
          onClick={handleBarClick}
          onDragStart={() => {
            const isWhite = myColor === 'white';
            const count = isWhite ? bar.white : bar.black;
            if (count > 0) setDraggedPoint(isWhite ? 0 : 25);
          }}
          onDragOver={(e) => e.preventDefault()}
          draggable={myColor === 'white' ? bar.white > 0 : bar.black > 0}
          className="relative z-30 flex w-8 cursor-pointer flex-col items-center justify-between border-x-2 border-[#2b1509] py-1.5 sm:w-14"
          style={{
            background: selectedPoint === 0 || selectedPoint === 25
              ? 'rgba(180, 83, 9, 0.3)'
              : BAR_BG,
          }}
        >
          <div className="flex flex-col items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {renderTokens(-bar.black, true, 'bar-black', true)}
            </AnimatePresence>
          </div>
          <div className="h-px w-3/4 bg-white/15" />
          <div className="flex flex-col items-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {renderTokens(bar.white, false, 'bar-white', true)}
            </AnimatePresence>
          </div>
        </div>

        {/* Board Sections — Right */}
        <div className="flex flex-1 flex-col">
          <div className="grid aspect-[5/4] w-full grid-cols-6 border-b-2 border-[#2b1509]/80">
            {topPoints.slice(6).map(i => <Point key={i} index={i} />)}
          </div>
          <div className="grid aspect-[5/4] w-full grid-cols-6">
            {bottomPoints.slice(6).map(i => <Point key={i} index={i} />)}
          </div>
        </div>

        {/* Off Board Area */}
        <div
          onClick={handleOffClick}
          onDrop={(e) => {
            e.preventDefault();
            const from = draggedPoint !== null ? draggedPoint : selectedPoint;
            if (from !== null) {
              const dests = getLegalDestinations({points, bar, off, diceRemaining: effectiveDice}, players[myColor==='white'?0:1], from, effectiveDice, players);
              if (dests.includes(offPos)) handleMove(from, offPos);
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            const from = draggedPoint !== null ? draggedPoint : selectedPoint;
            if (from !== null) {
              const dests = getLegalDestinations({points, bar, off, diceRemaining: effectiveDice}, players[myColor==='white'?0:1], from, effectiveDice, players);
              if (dests.includes(offPos)) e.dataTransfer.dropEffect = 'move';
            }
          }}
          className="relative z-30 flex w-10 flex-col items-center justify-between border-l-2 border-[#2b1509] py-2 sm:w-16"
          style={{
            background: legalDestinations.includes(offPos)
              ? 'rgba(34, 197, 94, 0.25)'
              : moveHints.some(h => h.to === offPos)
                ? 'rgba(34, 211, 238, 0.18)'
                : BAR_BG,
          }}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[8px] font-bold uppercase tracking-wider text-white/40 sm:text-[10px]">Off B</span>
            {Array.from({ length: Math.abs(off.black) }).map((_, i) => (
              <div key={i} className="h-1.5 w-8 rounded-sm border border-slate-600 bg-gradient-to-b from-slate-500 to-slate-900 shadow-[0_1px_1px_rgba(0,0,0,0.6)] sm:h-2 sm:w-12" />
            ))}
          </div>
          <div className="flex flex-col items-center gap-0.5">
            {Array.from({ length: off.white }).map((_, i) => (
              <div key={i} className="h-1.5 w-8 rounded-sm border border-slate-400 bg-gradient-to-b from-white to-slate-300 shadow-[0_1px_1px_rgba(0,0,0,0.5)] sm:h-2 sm:w-12" />
            ))}
            <span className="text-[8px] font-bold uppercase tracking-wider text-white/40 sm:text-[10px]">Off W</span>
          </div>
        </div>

        {/* Vignette overlay for depth (non-interactive) */}
        <div className="pointer-events-none absolute inset-0 z-40 rounded-xl shadow-[inset_0_0_70px_rgba(0,0,0,0.55)]" />
      </div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 1.5, px: { xs: 0.5, sm: 2 } }}>
        <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 3 }, alignItems: 'center' }}>
          {dice && dice.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: 1, sm: 2 }, alignItems: 'center' }}>
              <div className="flex origin-left scale-[0.8] items-center gap-2 sm:scale-100">
                {dice.map((d, i) => (
                  <Dice3D key={i} value={d} size={48} />
                ))}
              </div>
              {diceRemaining.length > 0 && diceRemaining.length !== (dice[0] === dice[1] ? 4 : 2) && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`Used: ${(dice[0] === dice[1] ? 4 : 2) - diceRemaining.length}`}
                  sx={{
                    display: { xs: 'none', sm: 'inline-flex' },
                    color: '#f59e0b',
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    height: 20,
                  }}
                />
              )}
            </Box>
          ) : (
            <Typography
              variant="overline"
              sx={{
                color: '#f59e0b',
                fontWeight: 'bold',
                letterSpacing: '0.15em',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                fontSize: { xs: '0.72rem', sm: '0.875rem' },
                lineHeight: 1.2,
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 },
                },
              }}
            >
              {isMyTurn ? "Your turn to roll" : "Waiting for opponent..."}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
          {isMyTurn && effectiveDice.length > 0 && (
            <Button
              variant="contained"
              onClick={onEndTurn}
              disabled={disabled}
              sx={{
                px: { xs: 1.5, sm: 3 },
                bgcolor: '#2C3A45',
                '&:hover': { bgcolor: '#5B6570' },
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: '0.68rem', sm: '0.75rem' },
                borderRadius: 2,
              }}
            >
              END TURN
            </Button>
          )}

          <Button
            variant="contained"
            onClick={onRoll}
            disabled={disabled || !isMyTurn || (dice && dice.length > 0)}
            sx={{
              px: { xs: 2, sm: 4 },
              py: 1.5,
              background: '#EA580C',
              color: 'white',
              fontWeight: 900,
              fontSize: { xs: '0.7rem', sm: '0.875rem' },
              borderRadius: 3,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                background: '#F97316',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
              '&.Mui-disabled': {
                opacity: 0.5,
                filter: 'grayscale(1)',
                color: 'rgba(255, 255, 255, 0.7)',
              }
            }}
          >
            ROLL DICE
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
