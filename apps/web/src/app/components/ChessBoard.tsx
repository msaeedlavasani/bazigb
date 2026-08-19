'use client';

import React, { useCallback, useRef } from 'react';
import { Paper } from '@mui/material';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { soundService } from '../../lib/sound-service';

export interface ChessMoveInput {
  from: string;
  to: string;
  promotion?: string;
}

interface ChessBoardProps {
  /** Current position as a FEN string. */
  fen: string;
  /** Called with the standard `{ from, to, promotion }` move object. */
  onMove: (move: ChessMoveInput) => void;
  /** Disable dragging (e.g. not your turn or game over). */
  disabled?: boolean;
  /** Which side sits at the bottom of the board. */
  orientation?: 'w' | 'b';
}

/**
 * Interactive chess board built on react-chessboard.
 *
 * Moves are validated locally with chess.js before being emitted so the UI
 * feels instant; the server re-validates and broadcasts the authoritative
 * position. Promotions open the built-in picker and are emitted with the
 * standard `{ from, to, promotion }` shape.
 */
export default function ChessBoard({ fen, onMove, disabled = false, orientation = 'w' }: ChessBoardProps) {
  // react-chessboard re-invokes onPieceDrop with the promoted piece after the
  // promotion dialog resolves. We already emitted the move from
  // onPromotionPieceSelect, so this flag stops us from emitting it twice.
  const promotionEmittedRef = useRef(false);

  const handlePieceDrop = useCallback(
    (sourceSquare: any, targetSquare: any, piece: string): boolean => {
      if (disabled) return false;

      // Promotion follow-up: the move was already sent, just accept the drop.
      if (promotionEmittedRef.current) {
        promotionEmittedRef.current = false;
        return true;
      }

      // Validate against the latest FEN locally for instant feedback.
      const game = new Chess(fen);
      let result;
      try {
        result = game.move({ from: sourceSquare, to: targetSquare });
      } catch {
        result = null;
      }
      if (!result) return false;

      onMove({ from: sourceSquare, to: targetSquare });
      soundService.play(result.captured ? 'capture' : 'move');
      return true;
    },
    [disabled, fen, onMove],
  );

  const handlePromotionPieceSelect = useCallback(
    (piece?: string, promoteFromSquare?: any, promoteToSquare?: any): boolean => {
      if (piece && promoteFromSquare && promoteToSquare) {
        promotionEmittedRef.current = true;
        onMove({
          from: promoteFromSquare,
          to: promoteToSquare,
          promotion: piece[1].toLowerCase(),
        });
        // A promotion captures when the destination square is occupied.
        const captures = !!new Chess(fen).get(promoteToSquare);
        soundService.play(captures ? 'capture' : 'move');
      }
      return true;
    },
    [fen, onMove],
  );

  return (
    <Paper
      elevation={24}
      sx={{
        width: '100%',
        borderRadius: 4,
        background: '#6B4423',
        p: { xs: 1, sm: 1.5 },
        border: '1px solid rgba(245, 158, 11, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      <Chessboard
        id="bazigb-chess"
        position={fen}
        boardOrientation={orientation === 'b' ? 'black' : 'white'}
        onPieceDrop={handlePieceDrop}
        onPromotionPieceSelect={handlePromotionPieceSelect}
        arePiecesDraggable={!disabled}
        isDraggablePiece={() => !disabled}
        areArrowsAllowed={false}
        dropOffBoardAction="snapback"
        animationDuration={250}
        customBoardStyle={{
          borderRadius: '8px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.55)',
        }}
        customNotationStyle={{ fontSize: '11px', fontWeight: 600 }}
      />
    </Paper>
  );
}
