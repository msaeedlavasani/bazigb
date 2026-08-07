'use client';

import React, { useCallback, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

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
      }
      return true;
    },
    [onMove],
  );

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-amber-700/50 via-amber-900/30 to-slate-800/40 p-2 sm:p-3 border border-amber-500/20 shadow-2xl shadow-black/50">
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
    </div>
  );
}
