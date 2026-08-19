'use client';

import React from 'react';
import { Box } from '@mui/material';
import { soundService } from '../../lib/sound-service';

interface BoardProps {
  cells: (string | null)[];
  onCellClick: (index: number) => void;
  disabled?: boolean;
}

const CELL_BASE =
  'flex aspect-square items-center justify-center rounded-2xl text-6xl font-black ' +
  'transition-all duration-200 focus:outline-none';

const EMPTY_CELL =
  'bg-[#030A15]/40 border-2 border-[#392E24] text-transparent cursor-pointer ' +
  'shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] ' +
  'hover:bg-[#EEAC2F]/5 hover:border-[#EEAC2F]/30 hover:scale-[1.02] active:scale-95';

const X_CELL = 'bg-[#061A2D] border-2 border-[#EEAC2F]/40 text-[#EEAC2F] cursor-default ' +
  'shadow-[0_8px_16px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(255,255,255,0.1)] ' +
  'animate-in zoom-in-75 duration-300';

const O_CELL = 'bg-[#061A2D] border-2 border-[#94A3B8]/40 text-[#F8FAFC] cursor-default ' +
  'shadow-[0_8px_16px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(255,255,255,0.1)] ' +
  'animate-in zoom-in-75 duration-300';

/**
 * 3x3 Tic-Tac-Toe board. Renders the current `cells` and reports
 * clicks on empty cells through `onCellClick`.
 */
export default function Board({ cells, onCellClick, disabled = false }: BoardProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        maxWidth: 384,
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: { xs: 1, sm: 1.5 },
      }}
      role="grid"
      aria-label="Tic-Tac-Toe board"
    >
      {(cells ?? []).map((cell, index) => {
        const cellClass =
          cell === 'X'
            ? X_CELL
            : cell === 'O'
              ? O_CELL
              : EMPTY_CELL;

        return (
          <button
            key={index}
            type="button"
            role="gridcell"
            aria-label={`Cell ${index + 1}${cell ? `, ${cell}` : ', empty'}`}
            onClick={() => {
              // Only reachable for empty, enabled cells — a valid move.
              soundService.play('move');
              onCellClick(index);
            }}
            disabled={disabled || cell !== null}
            className={`${CELL_BASE} ${cellClass} disabled:cursor-not-allowed`}
          >
            {cell}
          </button>
        );
      })}
    </Box>
  );
}
