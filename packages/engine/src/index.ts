import { Game, GameState, Move, GameContext } from './types';

export * from './types';

export class BaziGBEngine {
  static createInitialState<G>(game: Game<G>, players: string[]): GameState<G> {
    return {
      G: game.setup(players.length),
      ctx: {
        numPlayers: players.length,
        currentPlayer: players[0],
        turn: 1,
        players: players,
      },
    };
  }

  static processMove<G>(
    game: Game<G>,
    state: GameState<G>,
    moveName: string,
    playerID: string,
    ...args: any[]
  ): GameState<G> {
    // 1. Validate turn
    if (state.ctx.currentPlayer !== playerID) {
      throw new Error("It's not your turn!");
    }

    // 2. Validate move exists
    const moveFn = game.moves[moveName];
    if (!moveFn) {
      throw new Error(`Move ${moveName} not found`);
    }

    // 3. Apply move
    const nextG = moveFn(state.G, state.ctx, ...args);
    
    // 4. Update context (turn management)
    const currentPlayerIndex = state.ctx.players.indexOf(state.ctx.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % state.ctx.numPlayers;
    
    const nextCtx: GameContext = {
      ...state.ctx,
      currentPlayer: state.ctx.players[nextPlayerIndex],
      turn: state.ctx.turn + 1,
    };

    return {
      G: nextG,
      ctx: nextCtx,
    };
  }
}
