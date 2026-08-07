'use client';

import React from 'react';

interface BackgammonBoardProps {
  points: number[];
  onMove: (from: number, to: number) => void;
  disabled?: boolean;
  dice?: number[];
  onRoll: () => void;
  isMyTurn: boolean;
}

export default function BackgammonBoard({ 
  points, 
  onMove, 
  disabled = false, 
  dice, 
  onRoll,
  isMyTurn
}: BackgammonBoardProps) {
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto p-8 rounded-3xl bg-[#3d2b1f] border-8 border-[#2d1b0f] shadow-2xl shadow-black">
      {/* Upper Board */}
      <div className="grid grid-cols-12 gap-0 w-full aspect-[2/1] bg-[#e6b98e] relative border-4 border-[#2d1b0f]">
        {/* Middle Bar */}
        <div className="absolute inset-y-0 left-1/2 w-8 -ml-4 bg-[#2d1b0f] z-10 shadow-lg flex items-center justify-center">
          <div className="h-full w-1 bg-[#1d0b00]" />
        </div>

        {/* Triangles (Points) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={`h-full flex flex-col items-center justify-start py-2 ${i % 2 === 0 ? 'bg-[#c28e5c]' : 'bg-[#7a4b2a]'}`}
          >
            <div className={`w-0 h-0 border-l-[15px] border-r-[15px] border-l-transparent border-r-transparent ${i % 2 === 0 ? 'border-t-[120px] border-t-[#7a4b2a]' : 'border-t-[120px] border-t-[#c28e5c]'}`} />
            <div className="mt-2 text-white/50 text-xs font-mono">{13 + i}</div>
          </div>
        ))}
        
        {/* Lower Board (Simulated by layout flex-row-reverse for points 1-12) */}
      </div>

      {/* Control Area */}
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-4 items-center">
          {dice && dice.length > 0 ? (
            <div className="flex gap-3 animate-in fade-in zoom-in duration-300">
              {dice.map((d, i) => (
                <div key={i} className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-slate-900 text-2xl font-bold shadow-lg border-2 border-slate-200">
                  {d}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-amber-500 font-bold tracking-widest uppercase animate-pulse">
              {isMyTurn ? "Your turn to roll" : "Waiting for opponent..."}
            </div>
          )}
        </div>

        <button
          onClick={onRoll}
          disabled={disabled || !isMyTurn || (dice && dice.length > 0)}
          className="px-8 py-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
        >
          ROLL DICE
        </button>
      </div>

      <p className="text-amber-200/40 text-[10px] uppercase font-bold tracking-widest">
        Full movement interaction coming in next update
      </p>
    </div>
  );
}
