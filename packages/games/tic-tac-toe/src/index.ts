import { Game, Move, GameContext } from '@bazigb/engine';

interface TicTacToeState {
  cells: (string | null)[];
}

const clickCell: Move<TicTacToeState> = (G: TicTacToeState, ctx: GameContext, id: number) => {
  if (G.cells[id] !== null) return G;
  const cells = [...G.cells];
  cells[id] = ctx.currentPlayer;
  return { ...G, cells };
};

export const TicTacToe: Game<TicTacToeState> = {
  name: 'tic-tac-toe',
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  moves: {
    clickCell,
  },
  endIf: (G: TicTacToeState) => {
    return null;
  },
};
