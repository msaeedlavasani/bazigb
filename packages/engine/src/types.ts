export interface GameContext {
  numPlayers: number;
  currentPlayer: string;
  turn: number;
}

export interface GameState<G = any> {
  G: G;
  ctx: GameContext;
}

export type Move<G = any> = (G: G, ctx: GameContext, ...args: any[]) => G;

export interface Game<G = any> {
  name: string;
  setup: (numPlayers: number) => G;
  moves: Record<string, Move<G>>;
  endIf?: (G: G, ctx: GameContext) => any;
}
