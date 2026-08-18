import { Game, Move, GameContext } from '@bazigb/engine';

export * from './ai';

export interface BackgammonState {
  points: number[]; // 1-24. Positive for White, Negative for Black
  bar: { white: number; black: number };
  off: { white: number; black: number };
  diceRemaining: number[];
}

const setup = (): BackgammonState => {
  const points = Array(25).fill(0);
  // Initial setup: White (+), Black (-)
  // Points 1-24
  points[1] = 2;   points[12] = 5;  points[17] = 3;  points[19] = 5; // White
  points[24] = -2; points[13] = -5; points[8] = -3;  points[6] = -5;  // Black
  
  return {
    points,
    bar: { white: 0, black: 0 },
    off: { white: 0, black: 0 },
    diceRemaining: [],
  };
};

export function getLegalDestinations(
  state: BackgammonState,
  playerId: string,
  from: number,
  dice: number[],
  ctxPlayers: string[]
): number[] {
  const isWhite = playerId === ctxPlayers[0];
  const direction = isWhite ? 1 : -1;
  const destinations: number[] = [];

  // If pieces are on bar, 'from' must be the bar
  const hasBar = isWhite ? state.bar.white > 0 : state.bar.black > 0;
  const barPos = isWhite ? 0 : 25;
  if (hasBar && from !== barPos) return [];

  const uniqueDice = Array.from(new Set(dice));

  for (const die of uniqueDice) {
    const to = from + (die * direction);
    
    // Check hit/entry/bear-off
    if (isWhite) {
      if (to >= 1 && to <= 24) {
        // Normal move or entry
        if (state.points[to] >= -1) destinations.push(to);
      } else if (to >= 25) {
        // Bear off
        if (canBearOff(state, true)) {
          // Exactly the number needed, or higher if no pieces further back
          const furthest = getFurthestPiece(state, true);
          if (to === 25 || (to > 25 && from === furthest)) {
            destinations.push(25);
          }
        }
      }
    } else {
      if (to >= 1 && to <= 24) {
        if (state.points[to] <= 1) destinations.push(to);
      } else if (to <= 0) {
        if (canBearOff(state, false)) {
          const furthest = getFurthestPiece(state, false);
          if (to === 0 || (to < 0 && from === furthest)) {
            destinations.push(0);
          }
        }
      }
    }
  }

  return Array.from(new Set(destinations));
}

export function canBearOff(state: BackgammonState, isWhite: boolean): boolean {
  if (isWhite) {
    if (state.bar.white > 0) return false;
    for (let i = 1; i <= 18; i++) {
      if (state.points[i] > 0) return false;
    }
  } else {
    if (state.bar.black > 0) return false;
    for (let i = 7; i <= 24; i++) {
      if (state.points[i] < 0) return false;
    }
  }
  return true;
}

function getFurthestPiece(state: BackgammonState, isWhite: boolean): number {
  if (isWhite) {
    for (let i = 19; i <= 24; i++) {
      if (state.points[i] > 0) return i;
    }
  } else {
    for (let i = 6; i >= 1; i--) {
      if (state.points[i] < 0) return i;
    }
  }
  return isWhite ? 25 : 0;
}

export function getLegalMoves(
  state: BackgammonState,
  playerId: string,
  dice: number[],
  ctxPlayers: string[]
): { from: number; to: number }[] {
  const moves: { from: number; to: number }[] = [];
  const isWhite = playerId === ctxPlayers[0];
  
  if (isWhite) {
    if (state.bar.white > 0) {
      const dests = getLegalDestinations(state, playerId, 0, dice, ctxPlayers);
      dests.forEach(to => moves.push({ from: 0, to }));
    } else {
      for (let i = 1; i <= 24; i++) {
        if (state.points[i] > 0) {
          const dests = getLegalDestinations(state, playerId, i, dice, ctxPlayers);
          dests.forEach(to => moves.push({ from: i, to }));
        }
      }
    }
  } else {
    if (state.bar.black > 0) {
      const dests = getLegalDestinations(state, playerId, 25, dice, ctxPlayers);
      dests.forEach(to => moves.push({ from: 25, to }));
    } else {
      for (let i = 1; i <= 24; i++) {
        if (state.points[i] < 0) {
          const dests = getLegalDestinations(state, playerId, i, dice, ctxPlayers);
          dests.forEach(to => moves.push({ from: i, to }));
        }
      }
    }
  }
  return moves;
}

/* ---------------------------------------------------------------------------
 * Move hints (visual guidance for the board UI)
 * ------------------------------------------------------------------------- */

/** A destination a checker on a selected point could reach.
 *  - `single`: one die applied once (bar entry / ordinary move / bear-off)
 *  - `sum`:    both dice as a single combined move (non-doubles only)
 *  - `double`: an intermediate step of a doubles roll (2nd/3rd/4th die) */
export interface BackgammonMoveHint {
  to: number;
  kind: 'single' | 'sum' | 'double';
}

/**
 * Computes every point reachable from the checker on `from`, including
 * combined-dice moves (`sum`) and the intermediate steps of doubles rolls.
 *
 * Only legal landing squares are returned: no square holding 2+ opponent
 * checkers, no illegal bear-offs, and when checkers are on the bar every hint
 * starts from the bar. The result powers the click-to-move hint overlay on the
 * board (direct targets are exactly what `getLegalDestinations` reports, so
 * clicking a hint never produces an illegal move).
 */
export function getMoveHints(
  state: BackgammonState,
  playerId: string,
  from: number,
  dice: number[],
  ctxPlayers: string[]
): BackgammonMoveHint[] {
  const isWhite = playerId === ctxPlayers[0];
  const direction = isWhite ? 1 : -1;
  const barPos = isWhite ? 0 : 25;
  const offPos = isWhite ? 25 : 0;

  // While checkers sit on the bar every move must start from the bar.
  const hasBar = isWhite ? state.bar.white > 0 : state.bar.black > 0;
  if (hasBar && from !== barPos) return [];

  const hints: BackgammonMoveHint[] = [];
  const push = (to: number, kind: BackgammonMoveHint['kind']) => {
    if (!hints.some(h => h.to === to)) hints.push({ to, kind });
  };

  // Can the checker land on a board point `to` (1-24)?
  const canLand = (to: number): boolean =>
    to >= 1 && to <= 24 && (isWhite ? state.points[to] >= -1 : state.points[to] <= 1);

  // Can the checker bear off to `offPos` using exactly `die`? An exact roll
  // always works; a larger die only works for the furthest checker from home.
  const canBearOffFrom = (die: number): boolean => {
    if (!canBearOff(state, isWhite)) return false;
    const distance = Math.abs(offPos - from);
    if (distance === die) return true;
    return distance < die && from === getFurthestPiece(state, isWhite);
  };

  const destFor = (point: number, die: number): number => point + die * direction;
  const uniqueDice = Array.from(new Set(dice));
  const isDoubles = uniqueDice.length === 1 && dice.length >= 2;

  // 1) Single-die destinations (one die at a time).
  for (const die of uniqueDice) {
    const to = destFor(from, die);
    if (canLand(to)) {
      push(to, 'single');
    } else if ((isWhite ? to >= offPos : to <= offPos) && canBearOffFrom(die)) {
      push(offPos, 'single');
    }
  }

  // 2) Doubles: intermediate steps after the 2nd/3rd/4th die. Each step must
  //    be a legal landing square in sequence — a blocked step breaks the chain.
  if (isDoubles && uniqueDice.length === 1) {
    const die = uniqueDice[0];
    let reachable = true;
    for (let k = 2; k <= Math.min(dice.length, 4) && reachable; k++) {
      const to = destFor(from, die * k);
      if (canLand(to)) {
        push(to, 'double');
      } else if ((isWhite ? to >= offPos : to <= offPos) && canBearOffFrom(die)) {
        push(offPos, 'double');
      } else {
        reachable = false;
      }
    }
  }

  // 3) Sum of both dice as one combined move (non-doubles only — with doubles
  //    the intermediate steps above already cover every reachable point).
  if (!isDoubles && uniqueDice.length === 2 && !hasBar) {
    const [d1, d2] = uniqueDice;
    const sumTo = destFor(from, d1 + d2);
    // A combined move is legal only when at least one die-by-die order is
    // playable end-to-end (every intermediate square must also be open).
    const orderLegal = (a: number, b: number): boolean => {
      const mid = destFor(from, a);
      if (!canLand(mid)) return false;
      const end = destFor(mid, b);
      return canLand(end) || ((isWhite ? end >= offPos : end <= offPos) && canBearOffFrom(b));
    };
    if (canLand(sumTo) && (orderLegal(d1, d2) || orderLegal(d2, d1))) {
      push(sumTo, 'sum');
    }
  }

  return hints;
}

export const movePiece: Move<BackgammonState> = (G, ctx, { from, to }) => {  let { points, bar, off, diceRemaining } = {
    ...G,
    points: [...G.points],
    bar: { ...G.bar },
    off: { ...G.off },
    diceRemaining: [...G.diceRemaining]
  };

  // Lazy-init dice
  if (diceRemaining.length === 0 && ctx.dice && ctx.dice.length > 0) {
    diceRemaining = [...ctx.dice];
    // Backgammon doubles rule
    if (diceRemaining.length === 2 && diceRemaining[0] === diceRemaining[1]) {
      diceRemaining = [diceRemaining[0], diceRemaining[0], diceRemaining[0], diceRemaining[0]];
    }
  }

  const isWhite = ctx.currentPlayer === ctx.players[0];
  const direction = isWhite ? 1 : -1;
  const distance = Math.abs(to - from);

  // Validate and find which die was used
  // For bear-off, we might use a larger die
  let dieUsedIndex = -1;
  
  // Normal move or exact bear off
  dieUsedIndex = diceRemaining.indexOf(distance);
  
  // Special bear-off case: using a larger die for the furthest piece
  if (dieUsedIndex === -1 && ((isWhite && to === 25) || (!isWhite && to === 0))) {
    const furthest = getFurthestPiece(G, isWhite);
    if (from === furthest) {
      // Find smallest die that is >= distance
      let minLargerDie = Infinity;
      let minLargerIdx = -1;
      for (let i = 0; i < diceRemaining.length; i++) {
        if (diceRemaining[i] >= distance && diceRemaining[i] < minLargerDie) {
          minLargerDie = diceRemaining[i];
          minLargerIdx = i;
        }
      }
      dieUsedIndex = minLargerIdx;
    }
  }

  if (dieUsedIndex === -1) {
    // If invalid, return G unchanged (or throw)
    return G;
  }

  // Consume die
  diceRemaining.splice(dieUsedIndex, 1);

  // Execute move
  if (isWhite) {
    // From
    if (from === 0) bar.white--;
    else points[from]--;

    // To
    if (to === 25) off.white++;
    else if (points[to] === -1) {
      // Hit!
      points[to] = 1;
      bar.black++;
    } else {
      points[to]++;
    }
  } else {
    // From
    if (from === 25) bar.black--;
    else points[from]++;

    // To
    if (to === 0) off.black++;
    else if (points[to] === 1) {
      // Hit!
      points[to] = -1;
      bar.white++;
    } else {
      points[to]--;
    }
  }

  return { points, bar, off, diceRemaining };
};

/**
 * Copies the freshly rolled dice (`ctx.dice`) into the game state
 * (`G.diceRemaining`), expanding doubles to four dice. The gateway calls this
 * right after the engine rolls, so `diceRemaining` is ALWAYS the source of
 * truth for how many dice are still playable this turn — `endTurn` can then
 * rely on it alone (previously `ctx.dice` lingered after the dice were used,
 * which made endTurn always fail and locked the turn forever).
 */
const rollDiceMove: Move<BackgammonState> = (G, ctx) => {
  if (G.diceRemaining.length > 0) {
    throw new Error('Dice already rolled this turn');
  }
  const dice = Array.isArray(ctx.dice) ? ctx.dice : [];
  let remaining = [...dice];
  // Backgammon doubles rule: [4,4] -> [4,4,4,4]
  if (remaining.length === 2 && remaining[0] === remaining[1]) {
    remaining = [remaining[0], remaining[0], remaining[0], remaining[0]];
  }
  return { ...G, diceRemaining: remaining };
};

const endTurn: Move<BackgammonState> = (G, ctx) => {
  // A turn may only be ended when every die has been played (or no legal move
  // exists with the remaining dice). `diceRemaining` is the source of truth —
  // it is synced at roll time and consumed by each move.
  if (G.diceRemaining.length > 0) {
    const moves = getLegalMoves(G, ctx.currentPlayer, G.diceRemaining, ctx.players);
    if (moves.length > 0) {
      throw new Error('You still have dice to play — use them before ending your turn');
    }
  }
  return { ...G, diceRemaining: [] };
};

export const Backgammon: Game<BackgammonState> = {
  name: 'backgammon',
  setup,
  moves: {
    rollDice: rollDiceMove,
    movePiece,
    endTurn,
  },
  endIf: (G, ctx) => {
    // Return the winning PLAYER id (not a color string) so the winner is
    // recorded against the actual user account in the leaderboard/history.
    if (G.off.white === 15) return ctx.players[0];
    if (G.off.black === 15) return ctx.players[1];
    return null;
  },
};
