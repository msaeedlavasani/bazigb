import { GameContext } from '@bazigb/engine';
import { BackgammonState, getLegalMoves, movePiece } from './index';

/** A single checker move: `from`/`to` use the same coordinate convention as
 *  the game logic — 1-24 are board points, 0 is White's bar, 25 is Black's
 *  bar, 25/0 are White's/Black's off-areas respectively. */
export interface BackgammonAIMove {
  from: number;
  to: number;
}

/** Difficulty levels accepted by the backgammon AI. */
export type BackgammonDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Normalizes a raw dice roll for AI planning:
 *  - filters out non-die values (defensive),
 *  - expands doubles ([3,3] -> [3,3,3,3]) so all four moves are considered.
 */
function normalizeDice(dice: number[] | undefined | null): number[] {
  const valid = (dice ?? []).filter(
    (d) => Number.isInteger(d) && d >= 1 && d <= 6,
  );
  if (valid.length === 2 && valid[0] === valid[1]) {
    return [valid[0], valid[0], valid[0], valid[0]];
  }
  return valid;
}

/** Deep-enough clone of the game state for move simulation. */
function cloneState(state: BackgammonState): BackgammonState {
  return {
    points: [...state.points],
    bar: { ...state.bar },
    off: { ...state.off },
    diceRemaining: [...state.diceRemaining],
  };
}

/** Engine context used by `movePiece` simulations (only color + players matter). */
function makeCtx(playerId: string, ctxPlayers: string[]): GameContext {
  return {
    numPlayers: 2,
    currentPlayer: playerId,
    turn: 0,
    players: ctxPlayers,
  };
}

/** Shared pre-flight checks; returns the normalized dice or null to bail. */
function prepare(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
): number[] | null {
  if (!ctxPlayers || ctxPlayers.length < 2) return null;
  if (!ctxPlayers.includes(playerId)) return null;
  const remaining = normalizeDice(dice ?? state.diceRemaining);
  return remaining.length === 0 ? null : remaining;
}

/**
 * True when a lone checker of `isWhite` standing on `point` can be hit by the
 * opponent with a single die (a blot in range, or in range of the bar).
 */
function isExposed(state: BackgammonState, point: number, isWhite: boolean): boolean {
  const { points, bar } = state;
  if (isWhite) {
    // Black hits a White blot at `point` from a Black checker q where
    // q - point is 1..6 (Black moves toward 0), or from Black's bar when the
    // blot is within 1-6 of Black's entry zone (points 1-6).
    if (bar.black > 0 && point <= 6) return true;
    for (let q = point + 1; q <= Math.min(point + 6, 24); q++) {
      if (points[q] < 0) return true;
    }
    return false;
  }
  // White hits a Black blot at `point` from a White checker q where
  // point - q is 1..6 (White moves toward 25), or from White's bar when the
  // blot is within 1-6 of White's entry zone (points 19-24).
  if (bar.white > 0 && point >= 19) return true;
  for (let q = Math.max(point - 6, 1); q < point; q++) {
    if (points[q] > 0) return true;
  }
  return false;
}

/**
 * Heuristic score of a single legal move from the current position.
 *
 * Priorities (highest first):
 *  1. Hitting an opponent blot            (+120)
 *  2. Re-entering from the bar            (+60)
 *  3. Making a point (2+ checkers)        (+50, +15 extra in the home board)
 *  4. Bearing off                         (+45)
 *  5. Safety: leaving a blot behind       (+15)
 *  6. Progress toward home                (+2 per pip)
 *  7. Exposure penalty: creating a fresh
 *     blot inside the opponent's range    (-30)
 */
function scoreMove(
  state: BackgammonState,
  move: BackgammonAIMove,
  isWhite: boolean,
): number {
  const { points } = state;
  let score = 0;

  const onBoard = move.to >= 1 && move.to <= 24;
  const barPos = isWhite ? 0 : 25;

  // 1. Hitting an opponent blot.
  if (onBoard) {
    if (isWhite && points[move.to] === -1) score += 120;
    if (!isWhite && points[move.to] === 1) score += 120;
  }

  // 2. Re-entering from the bar.
  if (move.from === barPos) score += 60;

  // 3. Making a point: landing on the player's own single checker.
  if (onBoard) {
    if (isWhite && points[move.to] === 1) {
      score += 50;
      if (move.to >= 19 && move.to <= 24) score += 15; // White's home board
    }
    if (!isWhite && points[move.to] === -1) {
      score += 50;
      if (move.to >= 1 && move.to <= 6) score += 15; // Black's home board
    }
  }

  // 4. Bearing off.
  if ((isWhite && move.to === 25) || (!isWhite && move.to === 0)) {
    score += 45;
  }

  // 5. Safety: moving the last checker off a point removes a blot.
  if (move.from !== barPos) {
    const fromCount = points[move.from];
    if ((isWhite && fromCount === 1) || (!isWhite && fromCount === -1)) {
      score += 15;
    }
  }

  // 6. Progress toward home.
  const pips = isWhite ? move.to - move.from : move.from - move.to;
  if (pips > 0 && pips <= 6) score += pips * 2;

  // 7. Exposure penalty: landing on an empty point creates a singleton blot.
  if (onBoard) {
    const destOwnCount = isWhite ? points[move.to] : -points[move.to];
    if (destOwnCount === 0 && isExposed(state, move.to, isWhite)) {
      score -= 30;
    }
  }

  return score;
}

/** Deterministic tie-break key so equal-scoring moves pick a stable winner. */
function tieKey(move: BackgammonAIMove): number {
  return move.from * 100 + move.to;
}

/* ---------------------------------------------------------------------------
 * Difficulty strategies
 * ------------------------------------------------------------------------- */

/**
 * EASY — random legal sequence: at every step pick a uniformly random legal
 * move until every die is played or nothing can move.
 */
function randomSequence(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
): BackgammonAIMove[] {
  const remaining = prepare(state, playerId, ctxPlayers, dice);
  if (!remaining) return [];

  let sim = cloneState(state);
  sim.diceRemaining = remaining;
  const ctx = makeCtx(playerId, ctxPlayers);
  const sequence: BackgammonAIMove[] = [];

  while (sim.diceRemaining.length > 0) {
    const legal = getLegalMoves(sim, playerId, sim.diceRemaining, ctxPlayers);
    if (legal.length === 0) break;

    const move = legal[Math.floor(Math.random() * legal.length)];
    const next = movePiece(sim, ctx, move);
    // Safety net: a failed move would not consume a die — stop instead of
    // looping forever.
    if (next.diceRemaining.length >= sim.diceRemaining.length) break;

    sequence.push(move);
    sim = next;
  }

  return sequence;
}

/**
 * MEDIUM — greedy best-first search (1-ply): repeatedly play the
 * highest-scoring legal move per the `scoreMove` heuristic until every die
 * is played or no legal move remains.
 */
function greedySequence(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
): BackgammonAIMove[] {
  const remaining = prepare(state, playerId, ctxPlayers, dice);
  if (!remaining) return [];

  const isWhite = playerId === ctxPlayers[0];
  let sim = cloneState(state);
  sim.diceRemaining = remaining;
  const ctx = makeCtx(playerId, ctxPlayers);
  const sequence: BackgammonAIMove[] = [];

  while (sim.diceRemaining.length > 0) {
    const legal = getLegalMoves(sim, playerId, sim.diceRemaining, ctxPlayers);
    if (legal.length === 0) break;

    let bestMove: BackgammonAIMove | null = null;
    let bestScore = -Infinity;
    let bestKey = Infinity;

    for (const move of legal) {
      const score = scoreMove(sim, move, isWhite);
      const key = tieKey(move);
      if (score > bestScore || (score === bestScore && key < bestKey)) {
        bestScore = score;
        bestMove = move;
        bestKey = key;
      }
    }

    if (!bestMove) break;

    const next = movePiece(sim, ctx, bestMove);
    if (next.diceRemaining.length >= sim.diceRemaining.length) break;

    sequence.push(bestMove);
    sim = next;
  }

  return sequence;
}

/* --------------------------- HARD: 2-ply -------------------------------- */

/** All 21 distinct roll outcomes with their weights (out of 36). */
const ROLL_OUTCOMES: ReadonlyArray<{ dice: readonly [number, number]; weight: number }> = (() => {
  const outcomes: { dice: [number, number]; weight: number }[] = [];
  for (let a = 1; a <= 6; a++) {
    for (let b = a; b <= 6; b++) {
      outcomes.push({ dice: [a, b], weight: a === b ? 1 : 2 });
    }
  }
  return outcomes;
})();

/**
 * Static positional evaluation from `isWhite`'s perspective (higher = better
 * for `isWhite`). Weights the things that decide backgammon games:
 *  - checkers borne off                (+50 each)
 *  - opponent checkers on the bar      (+40 each) / own on bar (-40 each)
 *  - own blots                         (-12 each, exposed blots extra -20)
 *  - opponent blots (future targets)   (+6 each)
 *  - made points (2+ checkers)         (+8 each) / opponent's (-4 each)
 *  - pip count race                    (-0.5 per pip behind)
 */
function evaluatePosition(state: BackgammonState, isWhite: boolean): number {
  const { points, bar, off } = state;
  let score = 0;

  let myPips = 0;
  let oppPips = 0;
  let myBlots = 0;
  let oppBlots = 0;
  let myPoints = 0;
  let oppPoints = 0;

  for (let i = 1; i <= 24; i++) {
    const count = points[i];
    if (count === 0) continue;
    const abs = Math.abs(count);
    const isMine = (count > 0) === isWhite;

    if (isMine) {
      myPips += (isWhite ? 25 - i : i) * abs;
      if (abs === 1) {
        myBlots++;
        if (isExposed(state, i, isWhite)) score -= 20;
      } else {
        myPoints++;
      }
    } else {
      oppPips += (isWhite ? i : 25 - i) * abs;
      if (abs === 1) oppBlots++;
      else oppPoints++;
    }
  }

  const myBar = isWhite ? bar.white : bar.black;
  const oppBar = isWhite ? bar.black : bar.white;
  const myOff = isWhite ? off.white : off.black;
  const oppOff = isWhite ? off.black : off.white;

  myPips += myBar * 25;
  oppPips += oppBar * 25;

  score += (myOff - oppOff) * 50;
  score += (oppBar - myBar) * 40;
  score -= myBlots * 12;
  score += oppBlots * 6;
  score += myPoints * 8;
  score -= oppPoints * 4;
  score -= (myPips - oppPips) * 0.5;

  return score;
}

/**
 * Expected value (over all 21 rolls, properly weighted) of the position
 * after the OPPONENT plays their best greedy reply to `state`. This is the
 * 2-ply look-ahead: a move is only good if it stays good after the opponent
 * gets to answer it.
 */
function opponentExpectedReply(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  isWhite: boolean,
): number {
  const opponentId = ctxPlayers[0] === playerId ? ctxPlayers[1] : ctxPlayers[0];
  const oppCtx = makeCtx(opponentId, ctxPlayers);
  let total = 0;

  for (const { dice, weight } of ROLL_OUTCOMES) {
    let sim = cloneState(state);
    sim.diceRemaining = normalizeDice([...dice]);
    const reply = greedySequence(sim, opponentId, ctxPlayers);
    for (const move of reply) {
      sim = movePiece(sim, oppCtx, move);
    }
    total += weight * evaluatePosition(sim, isWhite);
  }

  return total / 36;
}

/**
 * HARD — 2-ply look-ahead: at every step pick the move that maximizes the
 * expected position value after the opponent's best reply (averaged over all
 * possible dice rolls), then continue with the remaining dice.
 */
function lookaheadSequence(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
): BackgammonAIMove[] {
  const remaining = prepare(state, playerId, ctxPlayers, dice);
  if (!remaining) return [];

  const isWhite = playerId === ctxPlayers[0];
  let sim = cloneState(state);
  sim.diceRemaining = remaining;
  const ctx = makeCtx(playerId, ctxPlayers);
  const sequence: BackgammonAIMove[] = [];

  while (sim.diceRemaining.length > 0) {
    const legal = getLegalMoves(sim, playerId, sim.diceRemaining, ctxPlayers);
    if (legal.length === 0) break;

    let bestMove: BackgammonAIMove | null = null;
    let bestScore = -Infinity;
    let bestKey = Infinity;

    for (const move of legal) {
      const afterMove = movePiece(sim, ctx, move);
      const score = opponentExpectedReply(afterMove, playerId, ctxPlayers, isWhite);
      const key = tieKey(move);
      if (score > bestScore || (score === bestScore && key < bestKey)) {
        bestScore = score;
        bestMove = move;
        bestKey = key;
      }
    }

    if (!bestMove) break;

    const next = movePiece(sim, ctx, bestMove);
    if (next.diceRemaining.length >= sim.diceRemaining.length) break;

    sequence.push(bestMove);
    sim = next;
  }

  return sequence;
}

/* ------------------------------ Public API ------------------------------ */

/**
 * Plans the AI's whole turn for the requested difficulty.
 *
 * Edge cases handled (all difficulties):
 *  - doubles: dice are expanded to four before planning,
 *  - no dice rolled / no legal moves: returns [] (caller may end the turn),
 *  - partially playable turn: stops as soon as the remaining dice are
 *    unusable and returns the moves played so far.
 *
 * @param state      Current backgammon state (must contain `diceRemaining`,
 *                   which the gateway syncs at roll time).
 * @param playerId   The AI's player id (one of `ctxPlayers`).
 * @param ctxPlayers Ordered player ids; `ctxPlayers[0]` is White.
 * @param dice       Optional dice override — defaults to `state.diceRemaining`.
 * @param difficulty 'easy' (random), 'medium' (greedy 1-ply heuristic,
 *                   default) or 'hard' (2-ply look-ahead over all rolls).
 */
export function getBestMoveSequence(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
  difficulty: BackgammonDifficulty = 'medium',
): BackgammonAIMove[] {
  switch (difficulty) {
    case 'easy':
      return randomSequence(state, playerId, ctxPlayers, dice);
    case 'medium':
      return greedySequence(state, playerId, ctxPlayers, dice);
    case 'hard':
      return lookaheadSequence(state, playerId, ctxPlayers, dice);
    default:
      throw new Error(
        `Invalid difficulty "${difficulty}" — must be 'easy', 'medium' or 'hard'`,
      );
  }
}

/**
 * Convenience wrapper for the server gateway: returns the single best next
 * move, or null when there is nothing playable (turn must end).
 */
export function getBestMove(
  state: BackgammonState,
  playerId: string,
  ctxPlayers: string[],
  dice?: number[],
  difficulty: BackgammonDifficulty = 'medium',
): BackgammonAIMove | null {
  const sequence = getBestMoveSequence(state, playerId, ctxPlayers, dice, difficulty);
  return sequence.length > 0 ? sequence[0] : null;
}
