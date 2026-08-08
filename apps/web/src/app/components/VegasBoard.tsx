'use client';

import React from 'react';
import { Banknote, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Flame, Loader2, Trophy } from 'lucide-react';
import Dice3D from './Dice3D';
import { soundService } from '../../lib/sound-service';

const DiceIcons = [null, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

/** One color per seated player (up to 5) — dice, badges and won cards use it. */
const DICE_PALETTE = ['#f59e0b', '#3b82f6', '#10b981', '#a855f7', '#ef4444'];

function playerColor(pIdx: number): string {
  return DICE_PALETTE[pIdx % DICE_PALETTE.length];
}

export interface MoneyStackData {
  /** The 2 cards, sorted descending: [higher, lower]. */
  cards: number[];
  winnerIndex: string | null;
  runnerUpIndex: string | null;
  burned: boolean;
  swept: boolean;
}

export interface CasinoData {
  /** playerIndex -> dice count placed on this casino. */
  dice: Record<string, number>;
  stack: MoneyStackData | null;
}

interface VegasBoardProps {
  casinos: CasinoData[];
  hand: number[];
  players: string[];
  currentPlayerId: string;
  onPlace: (value: number) => void;
  onRoll?: () => void;
  onNextRound?: () => void;
  disabled?: boolean;
  isMyTurn: boolean;
  rolling?: boolean;
  phase: 'playing' | 'roundEnd';
  round: number;
  totalRounds: number;
  playerCash: Record<string, number>;
  playerCards: Record<string, number>;
  winnerId: string | null;
}

/** One money card of a casino stack. */
function MoneyCard({
  value,
  ownerIdx,
  resolved,
  swept,
}: {
  value: number;
  ownerIdx: string | null;
  resolved: boolean;
  swept: boolean;
}) {
  const color = ownerIdx !== null ? playerColor(parseInt(ownerIdx, 10)) : undefined;
  const burned = resolved && ownerIdx === null;
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-0.5 rounded-lg border px-2 py-1.5 shadow-sm transition-all ${
        swept ? 'shadow-[0_0_14px_rgba(250,204,21,0.45)]' : ''
      } ${burned ? 'opacity-40 grayscale' : ''}`}
      style={{
        backgroundColor: color ? `${color}1f` : 'rgba(16,185,129,0.08)',
        borderColor: color ? color : swept ? 'rgba(250,204,21,0.6)' : 'rgba(16,185,129,0.25)',
      }}
    >
      <Banknote className="w-3 h-3" style={{ color: color ?? '#34d399' }} />
      <span className="text-[10px] font-black leading-none" style={{ color: color ?? '#34d399' }}>
        ${value.toLocaleString()}
      </span>
      {burned && (
        <span className="absolute -top-1.5 -right-1.5 rounded-full bg-slate-700 p-0.5 text-slate-400" title="Burned">
          <Flame className="w-2.5 h-2.5" />
        </span>
      )}
    </div>
  );
}

export default function VegasBoard({
  casinos,
  hand,
  players,
  currentPlayerId,
  onPlace,
  onRoll,
  onNextRound,
  disabled = false,
  isMyTurn,
  rolling = false,
  phase,
  round,
  totalRounds,
  playerCash,
  playerCards,
  winnerId,
}: VegasBoardProps) {
  // Group hand dice by value.
  const handCounts: Record<number, number> = {};
  hand.forEach((v) => {
    handCounts[v] = (handCounts[v] || 0) + 1;
  });

  const playerIndex = players.indexOf(currentPlayerId);
  const currentPlayerColor = playerIndex !== -1 ? playerColor(playerIndex) : undefined;

  const handleValueClick = (value: number) => {
    if (disabled || !isMyTurn || phase !== 'playing' || hand.length === 0) return;
    soundService.play('move');
    onPlace(value);
  };

  const handleRollClick = () => {
    if (disabled || !isMyTurn || phase !== 'playing' || hand.length > 0) return;
    soundService.play('dice');
    onRoll?.();
  };

  // Leaderboard: players sorted by money (desc), then cards.
  const leaderboard = players
    .map((pId, pIdx) => ({
      pIdx,
      id: pId,
      cash: playerCash[pIdx.toString()] ?? 0,
      cards: playerCards[pIdx.toString()] ?? 0,
    }))
    .sort((a, b) => b.cash - a.cash || b.cards - a.cards);

  const isFinalRound = round >= totalRounds;

  return (
    <div className="flex flex-col gap-5 w-full max-w-4xl mx-auto p-3 sm:p-6 rounded-3xl bg-slate-800/50 border border-slate-700 shadow-2xl">
      {/* Round header + cash strip */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-300">
            Round {round}/{totalRounds}
          </span>
          {phase === 'roundEnd' && (
            <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Trophy className="w-3.5 h-3.5" />
              Round complete — payouts settled
            </span>
          )}
          {isFinalRound && phase === 'roundEnd' && (
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
              Final round!
            </span>
          )}
        </div>

        {/* Compact per-player money strip (always visible) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {leaderboard.map(({ pIdx, cash, cards }) => {
            const color = playerColor(pIdx);
            const isYou = players[pIdx] === currentPlayerId;
            return (
              <div
                key={pIdx}
                className="flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-xs"
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="font-bold text-slate-300">{isYou ? 'You' : `P${pIdx + 1}`}</span>
                <span className="font-black text-emerald-400">${cash.toLocaleString()}</span>
                {cards > 0 && <span className="text-[9px] font-semibold text-slate-500">{cards} 🃏</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Casinos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {casinos.map((casino, idx) => {
          const value = idx + 1;
          const DiceIcon = DiceIcons[value]!;
          const totalDice = Object.values(casino.dice).reduce((a, b) => a + b, 0);
          const resolved = phase === 'roundEnd';
          const stack = casino.stack;

          return (
            <div
              key={idx}
              className={`flex flex-col gap-3 p-3 sm:p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner relative overflow-hidden transition-colors min-h-[150px] ${
                stack === null ? 'opacity-60' : ''
              }`}
            >
              {/* Casino Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <DiceIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-bold text-slate-300">Casino {value}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {stack?.swept && (
                    <span className="rounded-full bg-yellow-500/20 border border-yellow-400/50 px-2 py-0.5 text-[9px] font-black text-yellow-300">
                      SWEEP!
                    </span>
                  )}
                  {stack?.burned && (
                    <span className="rounded-full bg-rose-500/15 border border-rose-400/40 px-2 py-0.5 text-[9px] font-black text-rose-400">
                      BURNED
                    </span>
                  )}
                  {totalDice > 0 && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                      <span className="text-[10px] font-black text-slate-400">{totalDice}</span>
                      <Dice6 className="w-3 h-3 text-slate-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Money stack: 2 offset cards (or empty state) */}
              <div className="min-h-[44px] flex items-center">
                {stack ? (
                  <div className="flex -space-x-2">
                    {stack.cards.map((cardVal, i) => {
                      const ownerIdx = i === 0 ? stack.winnerIndex : stack.runnerUpIndex;
                      // During play the stack is unrevealed-but-visible (plain); after
                      // resolution owners get their color, unearned cards burn.
                      const resolvedOwner = resolved ? ownerIdx : null;
                      return (
                        <MoneyCard
                          key={i}
                          value={cardVal}
                          ownerIdx={resolvedOwner}
                          resolved={resolved}
                          swept={stack.swept}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    No money this round
                  </span>
                )}
              </div>

              {/* Per-player dice stacks (keyed by player INDEX — server uses index keys) */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {players.map((pId, pIdx) => {
                  const count = casino.dice[pIdx.toString()] ?? casino.dice[pId] ?? 0;
                  if (count === 0) return null;
                  const color = playerColor(pIdx);
                  const isYou = pId === currentPlayerId;
                  return (
                    <div key={pId} className="flex flex-col items-center gap-1">
                      <span
                        className="rounded-full px-1.5 py-px text-[8px] font-black leading-tight"
                        style={{ backgroundColor: `${color}26`, color }}
                      >
                        {isYou ? 'You' : `P${pIdx + 1}`}
                      </span>
                      <div className="flex -space-x-1.5 flex-wrap max-w-[84px] justify-center">
                        {Array.from({ length: count }).map((_, i) => (
                          <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-sm border border-white/20 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-black" style={{ color }}>
                        {count}
                      </span>
                    </div>
                  );
                })}
                {totalDice === 0 && (
                  <span className="text-[10px] text-slate-600 italic">— no dice yet</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom panel: hand / roll OR round-end leaderboard + next round */}
      {phase === 'roundEnd' ? (
        <div className="flex flex-col gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Leaderboard</h3>
          </div>
          <div className="flex flex-col gap-1.5">
            {leaderboard.map(({ pIdx, cash, cards }, rank) => {
              const color = playerColor(pIdx);
              const isYou = players[pIdx] === currentPlayerId;
              return (
                <div
                  key={pIdx}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2 ${
                    rank === 0 ? 'border-amber-400/40 bg-amber-500/10' : 'border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <span className={`w-5 text-center text-sm font-black ${rank === 0 ? 'text-amber-300' : 'text-slate-500'}`}>
                    {rank + 1}
                  </span>
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span className="text-sm font-bold text-slate-200">
                    {isYou ? 'You' : `Player ${pIdx + 1}`}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">{cards} cards</span>
                  <span className="ml-auto text-sm font-black text-emerald-400">${cash.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
          {!winnerId && onNextRound && (
            <button
              type="button"
              onClick={onNextRound}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black shadow-lg shadow-emerald-500/20 hover:opacity-90 active:scale-[0.98] transition-all"
            >
              <Dice6 className="w-5 h-5" />
              {isFinalRound ? 'Final Results' : `Start Round ${round + 1}`}
            </button>
          )}
          {!winnerId && !onNextRound && (
            <p className="text-center text-xs text-slate-500 italic">Waiting for a player to start the next round…</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Your Hand</h3>
            {isMyTurn && hand.length > 0 && (
              <span
                className="animate-pulse text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${currentPlayerColor}20`, color: currentPlayerColor }}
              >
                Pick a value
              </span>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4 min-h-[100px] items-center w-full">
            {hand.length > 0 ? (
              Object.entries(handCounts)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([valStr, count]) => {
                  const val = Number(valStr);
                  return (
                    <button
                      key={val}
                      onClick={() => handleValueClick(val)}
                      disabled={disabled || !isMyTurn}
                      className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                      style={isMyTurn ? { borderColor: `${currentPlayerColor}40` } : {}}
                    >
                      <div className="flex -space-x-2">
                        {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                          <Dice3D key={i} value={val} size={32} color={currentPlayerColor} />
                        ))}
                        {count > 5 && (
                          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-white z-10 border border-slate-600">
                            +{count - 5}
                          </div>
                        )}
                      </div>
                      <span
                        className="text-xs font-bold text-slate-400 transition-colors"
                        style={isMyTurn ? { color: `${currentPlayerColor}cc` } : {}}
                      >
                        Place {count} × {val}
                      </span>
                    </button>
                  );
                })
            ) : isMyTurn ? (
              <button
                onClick={handleRollClick}
                disabled={disabled || rolling}
                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-br from-indigo-500 to-sky-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
              >
                {rolling ? <Loader2 className="w-6 h-6 animate-spin" /> : <Dice6 className="w-6 h-6" />}
                ROLL YOUR DICE
              </button>
            ) : (
              <div className="text-slate-600 font-medium italic flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Waiting for opponent...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
