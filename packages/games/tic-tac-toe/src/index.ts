import { Game, Move, GameContext } from '@bazigb/engine';

export * from './ai';

export interface TicTacToeState {
  cells: (string | null)[];
}

const clickCell: Move<TicTacToeState> = (G: TicTacToeState, ctx: GameContext, id: number) => {
  if (id < 0 || id > 8) {
    throw new Error('Invalid cell ID');
  }
  if (G.cells[id] !== null) {
    throw new Error('Cell is already occupied');
  }
  const cells = [...G.cells];
  cells[id] = ctx.currentPlayer;
  return { ...G, cells };
};

function checkWinner(cells: (string | null)[]) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export const TicTacToe: Game<TicTacToeState> = {
  name: 'tic-tac-toe',
  setup: () => ({
    cells: Array(9).fill(null),
  }),
  moves: {
    clickCell,
  },
  endIf: (G: TicTacToeState) => {
    const winner = checkWinner(G.cells);
    if (winner) return winner;
    if (G.cells.every(cell => cell !== null)) return 'draw';
    return null;
  },
};
