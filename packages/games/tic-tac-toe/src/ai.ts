import { TicTacToeState } from './index';

/**
 * Board symbols. A "player" is either 'X' or 'O' (same strings used by the
 * move logic in index.ts).
 */
export type TicTacToeSymbol = 'X' | 'O';

/** Difficulty levels accepted by `getBestMove`. */
export type TicTacToeDifficulty = 'easy' | 'medium' | 'hard';

/** Winning lines: rows, columns, diagonals (cell indexes 0-8). */
const LINES: ReadonlyArray<readonly [number, number, number]> = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],             // diagonals
];

/**
 * Returns the winner symbol ('X' | 'O') or null when nobody has won yet.
 * A full board with no winner is a draw — callers detect it via
 * `cells.every(cell => cell !== null)`.
 */
export function findWinner(cells: (string | null)[]): TicTacToeSymbol | null {
  for (const [a, b, c] of LINES) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a] as TicTacToeSymbol;
    }
  }
  return null;
}

/** Empty cell indexes (0-8) in ascending order. */
function legalMoves(cells: (string | null)[]): number[] {
  return cells
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index >= 0);
}

/**
 * X always moves first, so it is X's turn exactly when both sides have
 * played the same number of checkers; otherwise it is O's turn.
 * Throws on impossible boards (move counts that real play can never reach).
 */
function nextPlayerFor(cells: (string | null)[]): TicTacToeSymbol {
  const xCount = cells.filter((cell) => cell === 'X').length;
  const oCount = cells.filter((cell) => cell === 'O').length;
  if (oCount > xCount || xCount - oCount > 1) {
    throw new Error('Invalid tic-tac-toe board: impossible move counts');
  }
  return xCount === oCount ? 'X' : 'O';
}

/** A uniformly random legal move, or null when the board is full. */
function randomMove(cells: (string | null)[]): number | null {
  const legal = legalMoves(cells);
  if (legal.length === 0) return null;
  return legal[Math.floor(Math.random() * legal.length)];
}

/**
 * Medium difficulty: 1-ply tactics with a human-like fallibility rate.
 *  1. 20% of the time, play a random legal move (creates openings for the
 *     player to win — a "blunder").
 *  2. Otherwise: take an immediate win if available.
 *  3. Otherwise: block the opponent's immediate win.
 *  4. Otherwise: play a random legal move.
 */
function tacticalMove(cells: (string | null)[], aiSymbol: TicTacToeSymbol): number | null {
  const legal = legalMoves(cells);
  if (legal.length === 0) return null;

  // Human-like fallibility: in 20% of turns the AI ignores tactics and
  // plays a random legal move, giving the opponent openings to win.
  if (Math.random() < 0.2) {
    return randomMove(cells);
  }

  const opponent: TicTacToeSymbol = aiSymbol === 'X' ? 'O' : 'X';

  // 1. Win immediately.
  for (const move of legal) {
    cells[move] = aiSymbol;
    const won = findWinner(cells) === aiSymbol;
    cells[move] = null;
    if (won) return move;
  }

  // 2. Block the opponent's immediate win.
  for (const move of legal) {
    cells[move] = opponent;
    const loses = findWinner(cells) === opponent;
    cells[move] = null;
    if (loses) return move;
  }

  // 3. Fall back to a random move.
  return randomMove(cells);
}

/**
 * Score of a terminal position from the perspective of `aiSymbol`:
 *  +10 - depth  -> the AI wins (prefer faster wins)
 *  -10 + depth  -> the opponent wins (prefer slower losses)
 *   0            -> draw
 */
function evaluate(
  cells: (string | null)[],
  aiSymbol: TicTacToeSymbol,
  depth: number,
): number {
  const winner = findWinner(cells);
  if (winner === aiSymbol) return 10 - depth;
  if (winner !== null) return depth - 10;
  return 0;
}

/**
 * Minimax with alpha-beta pruning. Returns the best achievable score for the
 * player about to move, assuming both sides play optimally.
 */
function minimax(
  cells: (string | null)[],
  current: TicTacToeSymbol,
  aiSymbol: TicTacToeSymbol,
  depth: number,
  alpha: number,
  beta: number,
): number {
  const winner = findWinner(cells);
  if (winner !== null || cells.every((cell) => cell !== null)) {
    return evaluate(cells, aiSymbol, depth);
  }

  const isMaximizing = current === aiSymbol;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (cells[i] !== null) continue;
      cells[i] = current;
      const score = minimax(
        cells,
        current === 'X' ? 'O' : 'X',
        aiSymbol,
        depth + 1,
        alpha,
        beta,
      );
      cells[i] = null;
      best = Math.max(best, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) break; // prune
    }
    return best;
  }

  let best = Infinity;
  for (let i = 0; i < 9; i++) {
    if (cells[i] !== null) continue;
    cells[i] = current;
    const score = minimax(
      cells,
      current === 'X' ? 'O' : 'X',
      aiSymbol,
      depth + 1,
      alpha,
      beta,
    );
    cells[i] = null;
    best = Math.min(best, score);
    beta = Math.min(beta, score);
    if (beta <= alpha) break; // prune
  }
  return best;
}

/**
 * Hard difficulty: full Minimax with alpha-beta pruning.
 * Ties are resolved deterministically in ascending cell order.
 */
function optimalMove(cells: (string | null)[], aiSymbol: TicTacToeSymbol): number | null {
  const legal = legalMoves(cells);
  if (legal.length === 0) return null;

  // Corner-opening optimization: on an empty board any move is symmetric.
  // Picking 0 keeps the search cheap and the choice deterministic.
  if (legal.length === 9) return 0;

  const work = [...cells];
  let bestScore = -Infinity;
  let bestMove: number | null = null;

  for (const move of legal) {
    work[move] = aiSymbol;
    const score = minimax(
      work,
      aiSymbol === 'X' ? 'O' : 'X',
      aiSymbol,
      1,
      -Infinity,
      Infinity,
    );
    work[move] = null;

    // Prefer the earliest winning move; ties resolved deterministically by
    // scanning legal moves in ascending cell order.
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  return bestMove;
}

/**
 * Computes the best move for `aiSymbol` on the given board.
 *
 * Difficulty levels:
 *  - 'easy'   : a random legal move,
 *  - 'medium' : human-like — 20% of turns play a random move, otherwise
 *               win if possible, else block, else random (default),
 *  - 'hard'   : optimal play via Minimax with alpha-beta pruning.
 *
 * @param state      The current tic-tac-toe state (or a bare `cells` array).
 * @param aiSymbol   The symbol the AI plays ('X' or 'O').
 * @param difficulty Difficulty level; defaults to 'medium'.
 * @returns The best cell index (0-8), or `null` when the board is full
 *          (no legal move left) or already decided.
 */
export function getBestMove(
  state: TicTacToeState | (string | null)[],
  aiSymbol: TicTacToeSymbol,
  difficulty: TicTacToeDifficulty = 'medium',
): number | null {
  const cells: (string | null)[] = Array.isArray(state) ? [...state] : [...state.cells];

  if (aiSymbol !== 'X' && aiSymbol !== 'O') {
    throw new Error(`Invalid AI symbol "${aiSymbol}" — must be 'X' or 'O'`);
  }
  if (cells.length !== 9) {
    throw new Error('Tic-tac-toe board must have exactly 9 cells');
  }
  if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
    throw new Error(
      `Invalid difficulty "${difficulty}" — must be 'easy', 'medium' or 'hard'`,
    );
  }

  // No moves left (full board) — return null so callers can handle the draw.
  if (legalMoves(cells).length === 0) return null;

  // Board already decided — there is nothing meaningful to play.
  if (findWinner(cells) !== null) return null;

  // The AI may only be asked to move when it is actually its turn.
  const nextPlayer = nextPlayerFor(cells);
  if (nextPlayer !== aiSymbol) {
    throw new Error(
      `It is ${nextPlayer}'s turn, not ${aiSymbol}'s — the AI can only move for the player to move`,
    );
  }

  switch (difficulty) {
    case 'easy':
      return randomMove(cells);
    case 'medium':
      return tacticalMove(cells, aiSymbol);
    case 'hard':
      return optimalMove(cells, aiSymbol);
    default:
      // Unreachable — guarded above. Kept for exhaustiveness.
      return null;
  }
}
