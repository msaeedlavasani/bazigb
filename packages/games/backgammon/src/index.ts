import { Game, Move, GameContext } from '@bazigb/engine';

/**
 * Backgammon state representation.
 * Points are 1-24. 0 is bar for White, 25 is bar for Black.
 */
export interface BackgammonState {
  points: number[]; // Positive for White, Negative for Black
  bar: { white: number; black: number };
  off: { white: number; black: number };
  diceRemaining: number[];
}

const setup = (): BackgammonState => {
  const points = Array(25).fill(0);
  // Initial setup
  points[1] = 2;   points[12] = 5;  points[17] = 3;  points[19] = 5; // White (+)
  points[24] = -2; points[13] = -5; points[8] = -3;  points[6] = -5;  // Black (-)
  
  return {
    points,
    bar: { white: 0, black: 0 },
    off: { white: 0, black: 0 },
    diceRemaining: [],
  };
};

const movePiece: Move<BackgammonState> = (G, ctx, { from, to }) => {
  // Logic for moving piece... (simplified for this batch)
  const nextPoints = [...G.points];
  const isWhite = ctx.currentPlayer === ctx.players[0];
  const direction = isWhite ? 1 : -1;
  
  // Update state
  nextPoints[from] -= direction;
  nextPoints[to] += direction;
  
  return { ...G, points: nextPoints };
};

export const Backgammon: Game<BackgammonState> = {
  name: 'backgammon',
  setup,
  moves: {
    movePiece,
  },
  endIf: (G) => {
    if (G.off.white === 15) return 'white';
    if (G.off.black === 15) return 'black';
    return null;
  },
};
