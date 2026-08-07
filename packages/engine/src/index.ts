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
        phase: 'initial',
      },
    };
  }

  static rollDice(state: GameState, count: number = 2): GameState {
    const dice = Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
    return {
      ...state,
      ctx: {
        ...state.ctx,
        dice,
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
    // By default, a move ends the turn. Games like Backgammon will need to 
    // manage this themselves if they need multiple moves.
    const currentPlayerIndex = state.ctx.players.indexOf(state.ctx.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % state.ctx.numPlayers;
    
    const nextCtx: GameContext = {
      ...state.ctx,
      currentPlayer: state.ctx.players[nextPlayerIndex],
      turn: state.ctx.turn + 1,
      dice: undefined, // Clear dice after turn ends
    };

    return {
      G: nextG,
      ctx: nextCtx,
    };
  }

  /**
   * Special method for games where a move doesn't necessarily end the turn.
   */
  static applyAction<G>(
    game: Game<G>,
    state: GameState<G>,
    moveName: string,
    playerID: string,
    endTurn: boolean = true,
    ...args: any[]
  ): GameState<G> {
    if (state.ctx.currentPlayer !== playerID) {
      throw new Error("It's not your turn!");
    }

    const moveFn = game.moves[moveName];
    if (!moveFn) throw new Error(`Move ${moveName} not found`);

    const nextG = moveFn(state.G, state.ctx, ...args);
    
    if (!endTurn) {
      return { ...state, G: nextG };
    }

    const currentPlayerIndex = state.ctx.players.indexOf(state.ctx.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % state.ctx.numPlayers;

    return {
      G: nextG,
      ctx: {
        ...state.ctx,
        currentPlayer: state.ctx.players[nextPlayerIndex],
        turn: state.ctx.turn + 1,
        dice: undefined,
      },
    };
  }
}
