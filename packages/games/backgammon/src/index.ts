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

  const hasBar = isWhite ? state.bar.white > 0 : state.bar.black > 0;
  const barPos = isWhite ? 0 : 25;
  if (hasBar && from !== barPos) return [];

  const uniqueDice = Array.from(new Set(dice));

  for (const die of uniqueDice) {
    const to = from + (die * direction);
    if (isWhite) {
      if (to >= 1 && to <= 24) {
        if (state.points[to] >= -1) destinations.push(to);
      } else if (to >= 25 && canBearOff(state, true)) {
        if (to === 25 || from === getFurthestPiece(state, true)) destinations.push(25);
      }
    } else {
      if (to >= 1 && to <= 24) {
        if (state.points[to] <= 1) destinations.push(to);
      } else if (to <= 0 && canBearOff(state, false)) {
        if (to === 0 || from === getFurthestPiece(state, false)) destinations.push(0);
      }
    }
  }
  return Array.from(new Set(destinations));
}

/**
 * All legal single-checker moves for `playerId` with the given `dice`.
 * A move is `{ from, to }` using the standard coordinates: 1-24 are board
 * points, 0 is White's bar / 25 is Black's bar, and 25/0 are White's/Black's
 * off-areas when bearing off.
 *
 * When the player has a checker on the bar, only re-entry moves are legal.
 * Doubles are handled naturally: each die value is considered once per call
 * and `movePiece` consumes one die at a time, so a doubled roll is played as
 * up to four separate moves.
 */
export function getLegalMoves(
  state: BackgammonState,
  playerId: string,
  dice: number[],
  ctxPlayers: string[]
): { from: number; to: number }[] {
  const isWhite = playerId === ctxPlayers[0];
  const hasBar = isWhite ? state.bar.white > 0 : state.bar.black > 0;
  const barPos = isWhite ? 0 : 25;
  const uniqueDice = Array.from(new Set(dice));
  const moves: { from: number; to: number }[] = [];

  // A checker on the bar must re-enter first; no other moves are legal.
  if (hasBar) {
    for (const die of uniqueDice) {
      const to = barPos + (isWhite ? die : -die);
      if (to >= 1 && to <= 24 && (isWhite ? state.points[to] >= -1 : state.points[to] <= 1)) {
        moves.push({ from: barPos, to });
      }
    }
    return moves;
  }

  // No bar: every checker of the player on the board is a candidate.
  for (let from = 1; from <= 24; from++) {
    const count = state.points[from];
    if ((isWhite && count > 0) || (!isWhite && count < 0)) {
      for (const to of getLegalDestinations(state, playerId, from, dice, ctxPlayers)) {
        moves.push({ from, to });
      }
    }
  }
  return moves;
}

export function canBearOff(state: BackgammonState, isWhite: boolean): boolean {
  if (isWhite) {
    if (state.bar.white > 0) return false;
    for (let i = 1; i <= 18; i++) if (state.points[i] > 0) return false;
  } else {
    if (state.bar.black > 0) return false;
    for (let i = 7; i <= 24; i++) if (state.points[i] < 0) return false;
  }
  return true;
}

function getFurthestPiece(state: BackgammonState, isWhite: boolean): number {
  if (isWhite) {
    for (let i = 19; i <= 24; i++) if (state.points[i] > 0) return i;
  } else {
    for (let i = 6; i >= 1; i--) if (state.points[i] < 0) return i;
  }
  return isWhite ? 25 : 0;
}

export interface BackgammonMoveHint {
  to: number;
  kind: 'single' | 'sum' | 'double';
  sequence: { from: number; to: number }[];
}

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

  const hasBar = isWhite ? state.bar.white > 0 : state.bar.black > 0;
  if (hasBar && from !== barPos) return [];

  const hints: BackgammonMoveHint[] = [];
  const canLand = (to: number): boolean =>
    to >= 1 && to <= 24 && (isWhite ? state.points[to] >= -1 : state.points[to] <= 1);

  const canBearOffFrom = (die: number, start: number): boolean => {
    if (!canBearOff(state, isWhite)) return false;
    const distance = Math.abs(offPos - start);
    return distance === die || (distance < die && start === getFurthestPiece(state, isWhite));
  };

  const destFor = (p: number, d: number): number => p + d * direction;
  const uniqueDice = Array.from(new Set(dice));

  // 1) Single
  for (const die of uniqueDice) {
    const to = destFor(from, die);
    if (canLand(to)) {
      hints.push({ to, kind: 'single', sequence: [{ from, to }] });
    } else if ((isWhite ? to >= offPos : to <= offPos) && canBearOffFrom(die, from)) {
      hints.push({ to: offPos, kind: 'single', sequence: [{ from, to: offPos }] });
    }
  }

  // 2) Doubles & Sums (Simplified sequence generator)
  // For the sake of brevity and robustness, sum/double logic follows:
  if (dice.length >= 2) {
    const d1 = dice[0], d2 = dice[1];
    if (d1 === d2) {
      // Doubles
      for (let k = 2; k <= dice.length; k++) {
        const to = destFor(from, d1 * k);
        const seq = [];
        let ok = true;
        for(let j=1; j<=k; j++) {
          const stepFrom = destFor(from, d1 * (j-1));
          const stepTo = destFor(from, d1 * j);
          if (!canLand(stepTo) && !((isWhite ? stepTo >= offPos : stepTo <= offPos) && canBearOffFrom(d1, stepFrom))) { ok = false; break; }
          seq.push({ from: stepFrom, to: Math.min(Math.max(stepTo, 0), 25) });
        }
        if (ok) hints.push({ to: seq[seq.length-1].to, kind: 'double', sequence: seq });
      }
    } else {
      // Sum
      const order1 = [d1, d2], order2 = [d2, d1];
      [order1, order2].forEach(order => {
        const mid = destFor(from, order[0]);
        if (canLand(mid)) {
          const end = destFor(mid, order[1]);
          if (canLand(end) || ((isWhite ? end >= offPos : end <= offPos) && canBearOffFrom(order[1], mid))) {
            const finalTo = Math.min(Math.max(end, 0), 25);
            if (!hints.some(h => h.to === finalTo)) {
              hints.push({ to: finalTo, kind: 'sum', sequence: [{ from, to: mid }, { from: mid, to: finalTo }] });
            }
          }
        }
      });
    }
  }

  return hints;
}

export const movePiece: Move<BackgammonState> = (G, ctx, { from, to }) => {
  let { points, bar, off, diceRemaining }: BackgammonState = JSON.parse(JSON.stringify(G));
  const isWhite = ctx.currentPlayer === ctx.players[0];
  const distance = Math.abs(to - from);

  let dieIdx = diceRemaining.indexOf(distance);
  if (dieIdx === -1 && ((isWhite && to === 25) || (!isWhite && to === 0))) {
    const furthest = getFurthestPiece(G, isWhite);
    if (from === furthest) {
      dieIdx = diceRemaining.findIndex(d => d >= distance);
    }
  }

  if (dieIdx === -1) return G;
  diceRemaining.splice(dieIdx, 1);

  if (isWhite) {
    if (from === 0) bar.white--; else points[from]--;
    if (to === 25) off.white++;
    else if (points[to] === -1) { points[to] = 1; bar.black++; }
    else points[to]++;
  } else {
    if (from === 25) bar.black--; else points[from]++;
    if (to === 0) off.black++;
    else if (points[to] === 1) { points[to] = -1; bar.white++; }
    else points[to]--;
  }
  return { ...G, points, bar, off, diceRemaining };
};

export const Backgammon: Game<BackgammonState> = {
  name: 'backgammon',
  setup,
  moves: {
    rollDice: (G, ctx) => {
      const d = Array.isArray(ctx.dice) ? [...ctx.dice] : [];
      return { ...G, diceRemaining: d[0] === d[1] ? [d[0],d[0],d[0],d[0]] : d };
    },
    movePiece,
    endTurn: (G) => ({ ...G, diceRemaining: [] }),
  },
  endIf: (G, ctx) => (G.off.white === 15 ? ctx.players[0] : G.off.black === 15 ? ctx.players[1] : null),
};
