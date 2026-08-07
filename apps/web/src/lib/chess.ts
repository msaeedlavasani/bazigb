import { Chess } from 'chess.js';

/**
 * Pure helpers for the chess UI: captured-piece trays and move history,
 * both derived from the persisted game state (`G.fen` / `G.moves`).
 */

/** Unicode glyphs used to render pieces (lowercase = black, uppercase = white). */
export const PIECE_GLYPHS: Record<string, string> = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔',
};

/** Starting counts per piece (kings included so the diff math stays valid). */
const INITIAL_COUNTS: Record<string, number> = {
  p: 8, n: 2, b: 2, r: 2, q: 1, k: 1,
  P: 8, N: 2, B: 2, R: 2, Q: 1, K: 1,
};

/** Rough material values for the advantage chip. */
const MATERIAL_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9 };

/** Display order — most valuable captures first. */
const CAPTURE_ORDER: Record<string, number> = { q: 0, r: 1, b: 2, n: 3, p: 4, k: 5 };

export interface CapturedPieces {
  /** Black pieces White has captured — shown next to White. */
  white: string[];
  /** White pieces Black has captured — shown next to Black. */
  black: string[];
}

/**
 * Compute captured pieces by diffing the current FEN placement against the
 * starting position. Degrades gracefully under promotions (a missing pawn may
 * show up as a missing capture while the promoted piece stays on the board).
 */
export function getCapturedPieces(fen: string): CapturedPieces {
  const counts: Record<string, number> = { ...INITIAL_COUNTS };
  const placement = fen.split(' ')[0];

  for (const ch of placement) {
    if (/[a-zA-Z]/.test(ch) && ch in counts) {
      counts[ch] -= 1;
    }
  }

  const byValue = (a: string, b: string) => CAPTURE_ORDER[a.toLowerCase()] - CAPTURE_ORDER[b.toLowerCase()];

  const white: string[] = [];
  const black: string[] = [];
  for (const [ch, remaining] of Object.entries(counts)) {
    // Kings can never actually be captured; skip them.
    if (ch.toLowerCase() === 'k') continue;
    for (let i = 0; i < remaining; i++) {
      // A black piece missing from the board was captured by White.
      (ch === ch.toLowerCase() ? white : black).push(ch);
    }
  }

  return { white: white.sort(byValue), black: black.sort(byValue) };
}

/** Material advantage in points of the given captured set (for the +N chip). */
export function materialValue(pieces: string[]): number {
  return pieces.reduce((sum, ch) => sum + (MATERIAL_VALUES[ch.toLowerCase()] ?? 0), 0);
}

export interface HistoryMove {
  /** Move number (1-based; both sides share the same number per ply pair). */
  number: number;
  from: string;
  to: string;
  /** Standard Algebraic Notation when derivable (e.g. "Nf3", "exd5"). */
  san?: string;
  color: 'w' | 'b';
}

export type ChessResult =
  | 'checkmate'
  | 'stalemate'
  | 'insufficient'
  | 'threefold'
  | 'draw'
  | null;

/** Human-readable labels for `getChessResult`. */
export const CHESS_RESULT_LABELS: Record<Exclude<ChessResult, null>, string> = {
  checkmate: 'Checkmate',
  stalemate: 'Stalemate',
  insufficient: 'Draw — insufficient material',
  threefold: 'Draw — threefold repetition',
  draw: 'Draw',
};

/**
 * Replay `G.moves` from the starting position and return a simple from-to
 * history, annotated with SAN when the replay stays legal.
 */
export function getMoveHistory(moves: { from: string; to: string }[]): HistoryMove[] {
  const game = new Chess();
  const history: HistoryMove[] = [];

  for (const move of moves) {
    const number = Math.ceil((history.length + 1) / 2);
    try {
      const result = game.move({ from: move.from, to: move.to });
      history.push({
        number,
        from: move.from,
        to: move.to,
        san: result.san,
        color: result.color,
      });
    } catch {
      // The persisted history is ahead of what we can replay (e.g. server-side
      // validation changed); fall back to a plain from-to entry.
      history.push({ number, from: move.from, to: move.to, color: game.turn() });
    }
  }

  return history;
}

/** Classify the current position's outcome, for the winner banner. */
export function getChessResult(fen: string): ChessResult {
  const game = new Chess(fen);
  if (game.isCheckmate()) return 'checkmate';
  if (game.isStalemate()) return 'stalemate';
  if (game.isInsufficientMaterial()) return 'insufficient';
  if (game.isThreefoldRepetition()) return 'threefold';
  if (game.isDraw()) return 'draw';
  return null;
}
