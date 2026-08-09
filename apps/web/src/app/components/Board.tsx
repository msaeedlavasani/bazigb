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
  'flex aspect-square items-center justify-center rounded-2xl text-5xl font-extrabold ' +
  'transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/60';

const EMPTY_CELL =
  'bg-white/10 border border-white/10 text-transparent cursor-pointer ' +
  'hover:bg-white/20 hover:border-indigo-300/30 hover:scale-[1.03] active:scale-95';

const X_CELL = 'bg-rose-500/15 border border-rose-400/40 text-rose-400 cursor-default';
const O_CELL = 'bg-sky-500/15 border border-sky-400/40 text-sky-400 cursor-default';

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
