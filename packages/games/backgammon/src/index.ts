import { Game, Move, GameContext } from '@bazigb/engine';

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

function canBearOff(state: BackgammonState, isWhite: boolean): boolean {
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

const movePiece: Move<BackgammonState> = (G, ctx, { from, to }) => {
  let { points, bar, off, diceRemaining } = {
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

const endTurn: Move<BackgammonState> = (G) => {
  return { ...G, diceRemaining: [] };
};

export const Backgammon: Game<BackgammonState> = {
  name: 'backgammon',
  setup,
  moves: {
    movePiece,
    endTurn,
  },
  endIf: (G) => {
    if (G.off.white === 15) return 'white';
    if (G.off.black === 15) return 'black';
    return null;
  },
};
