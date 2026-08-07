'use client';

import React, { useState, useMemo } from 'react';
import { getLegalDestinations, getLegalMoves } from '@bazigb/game-backgammon';
import Dice3D from './Dice3D';
import { soundService } from '../../../lib/sound-service';

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
}

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
  diceRemaining = []
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

  const renderTokens = (count: number, isTop: boolean) => {
    if (count === 0) return null;
    const absCount = Math.abs(count);
    const color = count > 0 ? 'white' : 'black';
    const tokens = [];
    const maxVisible = 5;
    const displayCount = Math.min(absCount, maxVisible);

    for (let i = 0; i < displayCount; i++) {
      tokens.push(
        <div
          key={i}
          className={`w-8 h-8 rounded-full border-2 shadow-sm flex items-center justify-center text-[10px] font-bold
            ${color === 'white' 
              ? 'bg-slate-100 border-slate-300 text-slate-800' 
              : 'bg-slate-900 border-slate-700 text-slate-200'}
            ${isTop ? 'mb-[-1.5rem]' : 'mt-[-1.5rem]'}`}
          style={{ zIndex: i }}
        >
          {i === displayCount - 1 && absCount > maxVisible ? absCount : ''}
        </div>
      );
    }
    return tokens;
  };

  const isOrientationFlipped = myColor === 'black';

  const Point = ({ index }: { index: number }) => {
    const count = points[index];
    const isTop = index >= 13 && index <= 24;
    const isSelected = selectedPoint === index;
    const isTarget = legalDestinations.includes(index);
    const canDrag = isMyTurn && !disabled && (myColor === 'white' ? count > 0 : count < 0);
    
    // Check bar rule
    const isWhite = myColor === 'white';
    const myBarCount = isWhite ? bar.white : bar.black;
    const mustMoveFromBar = myBarCount > 0;
    
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
        className={`relative h-full flex flex-col items-center cursor-pointer transition-colors
          ${isTop ? 'justify-start pt-2' : 'justify-end pb-2'}
          ${isSelected ? 'bg-amber-500/20' : ''}
          ${isTarget ? 'bg-green-500/20 ring-2 ring-green-500/50 inset-0 z-20' : ''}`}
      >
        <div className={`w-0 h-0 border-l-[18px] border-r-[18px] border-l-transparent border-r-transparent 
          ${isTop 
            ? `border-t-[140px] ${index % 2 === 0 ? 'border-t-[#7a4b2a]' : 'border-t-[#c28e5c]'}` 
            : `border-b-[140px] ${index % 2 === 0 ? 'border-b-[#c28e5c]' : 'border-b-[#7a4b2a]'}`
          }`} 
        />
        <div className={`absolute ${isTop ? 'top-2' : 'bottom-2'} flex flex-col items-center`}>
          {renderTokens(count, isTop)}
        </div>
        <div className={`absolute ${isTop ? 'bottom-1' : 'top-1'} text-[8px] font-mono text-black/30`}>{index}</div>
      </div>
    );
  };

  const topPoints = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  const bottomPoints = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto p-4 sm:p-8 rounded-3xl bg-[#3d2b1f] border-8 border-[#2d1b0f] shadow-2xl">
      <div className="flex w-full aspect-[3/2] bg-[#e6b98e] relative border-4 border-[#2d1b0f] overflow-hidden rounded-lg">
        {/* Board Sections */}
        <div className="flex flex-1 flex-col">
          {/* Top Half */}
          <div className="flex-1 grid grid-cols-6 border-b-2 border-[#2d1b0f]">
            {topPoints.slice(0, 6).map(i => <Point key={i} index={i} />)}
          </div>
          {/* Bottom Half */}
          <div className="flex-1 grid grid-cols-6">
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
          className={`w-12 bg-[#2d1b0f] flex flex-col items-center justify-center gap-8 relative z-30 cursor-pointer
            ${selectedPoint === 0 || selectedPoint === 25 ? 'bg-[#4d3b2f]' : ''}`}
        >
          <div className="flex flex-col items-center">
             {renderTokens(-bar.black, true)}
          </div>
          <div className="h-px w-full bg-white/10" />
          <div className="flex flex-col items-center">
             {renderTokens(bar.white, false)}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          {/* Top Half Right */}
          <div className="flex-1 grid grid-cols-6 border-b-2 border-[#2d1b0f]">
            {topPoints.slice(6).map(i => <Point key={i} index={i} />)}
          </div>
          {/* Bottom Half Right */}
          <div className="flex-1 grid grid-cols-6">
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
              const offPos = myColor === 'white' ? 25 : 0;
              if (dests.includes(offPos)) handleMove(from, offPos);
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            const from = draggedPoint !== null ? draggedPoint : selectedPoint;
            if (from !== null) {
              const dests = getLegalDestinations({points, bar, off, diceRemaining: effectiveDice}, players[myColor==='white'?0:1], from, effectiveDice, players);
              if (dests.includes(myColor === 'white' ? 25 : 0)) e.dataTransfer.dropEffect = 'move';
            }
          }}
          className={`w-16 bg-[#2d1b0f]/50 border-l-4 border-[#2d1b0f] flex flex-col items-center justify-between py-4
            ${legalDestinations.includes(myColor === 'white' ? 25 : 0) ? 'bg-green-500/20' : ''}`}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-white/40 font-bold uppercase">Off B</span>
            {Array.from({ length: Math.abs(off.black) }).map((_, i) => (
              <div key={i} className="w-10 h-2 bg-slate-900 border border-slate-700 rounded-sm mb-[-4px]" />
            ))}
          </div>
          <div className="flex flex-col items-center gap-1">
            {Array.from({ length: off.white }).map((_, i) => (
              <div key={i} className="w-10 h-2 bg-slate-100 border border-slate-300 rounded-sm mt-[-4px]" />
            ))}
            <span className="text-[10px] text-white/40 font-bold uppercase">Off W</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full px-4">
        <div className="flex gap-6 items-center">
          {dice && dice.length > 0 ? (
            <div className="flex gap-4 items-center">
              {dice.map((d, i) => (
                <Dice3D key={i} value={d} size={48} />
              ))}
              {diceRemaining.length > 0 && diceRemaining.length !== (dice[0] === dice[1] ? 4 : 2) && (
                <div className="text-xs text-amber-500/60 font-mono ml-2">
                  Used: { (dice[0] === dice[1] ? 4 : 2) - diceRemaining.length }
                </div>
              )}
            </div>
          ) : (
            <div className="text-amber-500 font-bold tracking-widest uppercase animate-pulse text-sm">
              {isMyTurn ? "Your turn to roll" : "Waiting for opponent..."}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {isMyTurn && effectiveDice.length > 0 && (
            <button
              onClick={onEndTurn}
              disabled={disabled}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-lg transition-colors border border-slate-600"
            >
              END TURN
            </button>
          )}
          
          <button
            onClick={onRoll}
            disabled={disabled || !isMyTurn || (dice && dice.length > 0)}
            className="px-8 py-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
          >
            ROLL DICE
          </button>
        </div>
      </div>
    </div>
  );
}
