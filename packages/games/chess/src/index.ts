import { Game, Move, GameContext } from '@bazigb/engine';
import { Chess } from 'chess.js';

/**
 * Chess game plugin for the BaziGB engine.
 *
 * The board is persisted as a FEN string inside `G`.
 * Moves use the shape `{ from, to, promotion? }`.
 */

export interface ChessMove {
  from: string;
  to: string;
  promotion?: string;
}

export interface ChessState {
  fen: string;
  moves: ChessMove[];
  winner?: string | null;
}

export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const chessMove: Move<ChessState> = (G: ChessState, ctx: GameContext, payload: ChessMove) => {
  const { from, to, promotion } = payload;
  const chess = new Chess(G.fen);
  
  let moveResult;
  try {
    moveResult = chess.move({ from, to, promotion });
  } catch (e) {
    moveResult = null;
  }

  if (!moveResult) {
    throw new Error(`Illegal move: ${from} -> ${to}`);
  }

  const isGameOver = chess.isGameOver();
  const winner = chess.isCheckmate() ? ctx.currentPlayer : (isGameOver ? 'draw' : undefined);

  return {
    fen: chess.fen(),
    moves: [...G.moves, { from, to, promotion }],
    winner,
  };
};

export const ChessGame: Game<ChessState> = {
  name: 'chess',
  setup: () => ({
    fen: INITIAL_FEN,
    moves: [],
  }),
  moves: {
    move: chessMove,
  },
  endIf: (G: ChessState) => G.winner ?? null,
};
