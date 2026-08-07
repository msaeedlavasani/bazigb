export interface GameContext {
  numPlayers: number;
  currentPlayer: string;
  turn: number;
  /** Ordered list of seated player ids. Turn cycles through this list. */
  players: string[];
  /** Current dice values (if applicable). */
  dice?: number[];
  /** Current phase of the game (e.g., 'rolling', 'moving'). */
  phase?: string;
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
