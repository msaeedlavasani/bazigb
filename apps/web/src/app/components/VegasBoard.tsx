'use client';

import React from 'react';
import { Banknote, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Loader2 } from 'lucide-react';
import Dice3D from './Dice3D';
import { soundService } from '../../lib/sound-service';

const DiceIcons = [null, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const PLAYER_COLORS = [
  { bg: 'bg-indigo-500', text: 'text-indigo-400', border: 'border-indigo-400/30' },
  { bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-400/30' },
  { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-400/30' },
  { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-400/30' },
];

export interface CasinoData {
  cash: number[];
  dice: Record<string, number>; // playerId -> count
}

interface VegasBoardProps {
  casinos: CasinoData[];
  hand: number[];
  players: string[];
  currentPlayerId: string;
  onPlace: (value: number) => void;
  onRoll?: () => void;
  disabled?: boolean;
  isMyTurn: boolean;
  rolling?: boolean;
}

export default function VegasBoard({
  casinos,
  hand,
  players,
  currentPlayerId,
  onPlace,
  onRoll,
  disabled = false,
  isMyTurn,
  rolling = false,
}: VegasBoardProps) {
  // Group hand dice by value
  const handCounts: Record<number, number> = {};
  hand.forEach((v) => {
    handCounts[v] = (handCounts[v] || 0) + 1;
  });

  const handleValueClick = (value: number) => {
    if (disabled || !isMyTurn || hand.length === 0) return;
    soundService.play('move');
    onPlace(value);
  };

  const handleRollClick = () => {
    if (disabled || !isMyTurn || hand.length > 0) return;
    soundService.play('dice');
    onRoll?.();
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl bg-slate-800/50 border border-slate-700 shadow-2xl">
      {/* Casinos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {casinos.map((casino, idx) => {
          const value = idx + 1;
          const DiceIcon = DiceIcons[value]!;
          return (
            <div
              key={idx}
              className="flex flex-col gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner relative overflow-hidden group hover:border-indigo-500/30 transition-colors min-h-[160px]"
            >
              {/* Casino Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <DiceIcon className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-300">Casino {value}</span>
                </div>
              </div>

              {/* Banknotes */}
              <div className="flex flex-wrap gap-1 min-h-[40px]">
                {(casino.cash ?? []).map((bill, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shadow-sm"
                  >
                    <Banknote className="w-3 h-3" />
                    ${bill.toLocaleString()}
                  </div>
                ))}
              </div>

              {/* Dice Stacks */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {players.map((pId, pIdx) => {
                  const count = casino.dice[pId] || 0;
                  if (count === 0) return null;
                  const colors = PLAYER_COLORS[pIdx % PLAYER_COLORS.length];
                  return (
                    <div key={pId} className="flex flex-col items-center gap-1">
                      <div className="flex -space-x-1.5 flex-wrap max-w-[80px] justify-center">
                        {Array.from({ length: count }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-3.5 h-3.5 rounded-sm ${colors.bg} border border-white/20 shadow-sm`}
                          />
                        ))}
                      </div>
                      <span className={`text-[9px] font-bold ${colors.text}`}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Player Hand / Actions */}
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-700/50">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Your Hand</h3>
          {isMyTurn && hand.length > 0 && (
            <span className="animate-pulse text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
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
                    className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-400/50 hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                        <Dice3D key={i} value={val} size={32} />
                      ))}
                      {count > 5 && (
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-white z-10 border border-slate-600">
                          +{count - 5}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-300">
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
    </div>
  );
}
