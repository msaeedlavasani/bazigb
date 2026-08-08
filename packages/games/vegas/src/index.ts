import { Game, Move } from '@bazigb/engine';

/**
 * Vegas — Casino Dice Luck
 *
 * Based on the official "Vegas" game (alea 2012 / Ravensburger), with our
 * house rules:
 *
 * - Money deck: 54 cards — 6 copies of each denomination $10k … $90k.
 * - Each round the deck is shuffled and dealt into stacks of 2 random cards.
 *   The stacks are sorted by total value: the most valuable stack sits on
 *   casino 6, the least valuable on casino 1. Round 5 deals the last 6 cards
 *   as 3 stacks on casinos 6, 5, 4 (the deck is exhausted exactly at the end).
 * - Each player rolls their remaining dice on their turn, chooses ONE value
 *   and places ALL dice of that value on the matching casino.
 * - When every die is placed the round is resolved: on each casino the unique
 *   player with the most dice wins the higher card, the unique runner-up wins
 *   the lower card. Ties at a position burn those cards (they leave the game).
 * - House rule: a player who places all 8 dice on ONE casino sweeps it — they
 *   take BOTH cards and the runner-up gets nothing.
 * - After 5 rounds the player with the most money wins; tie-break is the
 *   number of cards won, then a draw.
 */

export interface MoneyStack {
  /** The 2 cards, sorted descending: [higher, lower]. */
  cards: number[];
  /** Player index (string) that earned the higher card. */
  winnerIndex: string | null;
  /** Player index (string) that earned the lower card. */
  runnerUpIndex: string | null;
  /** At least one card was unearned (tie / nobody bet) and is burned. */
  burned: boolean;
  /** The stack was swept via the all-8-dice house rule. */
  swept: boolean;
}

export interface Casino {
  /** playerIndex -> dice count placed on this casino. */
  dice: Record<string, number>;
  /** Money stack dealt to this casino (null = no money this round). */
  stack: MoneyStack | null;
}

export interface VegasState {
  casinos: Casino[];
  /** playerIndex -> total money won so far. */
  playerCash: Record<string, number>;
  /** playerIndex -> total money cards won so far (tie-break). */
  playerCards: Record<string, number>;
  /** playerIndex -> current roll (cleared after placing). */
  playerDice: Record<string, number[]>;
  /** playerIndex -> dice left to place this round. */
  playerDiceRemaining: Record<string, number>;
  round: number;
  totalRounds: number;
  /** 'playing' = dice are being placed; 'roundEnd' = resolved, leaderboard shown. */
  phase: 'playing' | 'roundEnd';
}

const DENOMS = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000];
const COPIES_PER_DENOM = 6; // 6 copies of each value -> 54 cards
const DECK_SIZE = DENOMS.length * COPIES_PER_DENOM; // 54
const CARDS_PER_ROUND = 12; // 6 stacks x 2 cards
const STACK_CARDS = 2;
const TOTAL_ROUNDS = 5; // 4 full rounds (12 cards each) + final round (6 cards)

/** Number of 2-card stacks dealt in a given round (round 5: only 6 cards left). */
function stacksForRound(round: number): number {
  const remaining = DECK_SIZE - CARDS_PER_ROUND * (round - 1);
  return Math.max(0, Math.min(6, Math.floor(remaining / STACK_CARDS)));
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): number[] {
  const deck: number[] = [];
  for (let i = 0; i < COPIES_PER_DENOM; i++) deck.push(...DENOMS);
  return shuffle(deck);
}

/** Deal `numStacks` stacks of 2 cards onto the 6 casinos (highest total -> casino 6). */
function dealRound(numStacks: number): Casino[] {
  const deck = buildDeck();
  const stacks: number[][] = [];
  for (let i = 0; i < numStacks; i++) {
    const a = deck[i * 2];
    const b = deck[i * 2 + 1];
    stacks.push([Math.max(a, b), Math.min(a, b)]);
  }
  // Sort by total value desc; equal totals -> the higher top card goes higher.
  stacks.sort((x, y) => y[0] + y[1] - (x[0] + x[1]) || y[0] - x[0]);

  const casinos: Casino[] = [];
  for (let i = 0; i < 6; i++) {
    const stackIdx = 5 - i; // casino 6 (index 5) gets the most valuable stack
    const stack = stacks[stackIdx];
    casinos.push({
      dice: {},
      stack:
        stack !== undefined
          ? { cards: stack, winnerIndex: null, runnerUpIndex: null, burned: false, swept: false }
          : null,
    });
  }
  return casinos;
}

function freshRound(
  playerCount: number,
  round: number,
): Pick<VegasState, 'casinos' | 'playerDice' | 'playerDiceRemaining' | 'phase'> {
  const playerDiceRemaining: Record<string, number> = {};
  for (let i = 0; i < playerCount; i++) playerDiceRemaining[i.toString()] = 8;
  return {
    casinos: dealRound(stacksForRound(round)),
    playerDice: {},
    playerDiceRemaining,
    phase: 'playing',
  };
}

/**
 * Payout a single casino, mutating the shared `playerCash` / `playerCards`
 * ledgers. Returns the resolved casino (with its stack annotated).
 */
function resolveCasino(
  casino: Casino,
  playerCash: Record<string, number>,
  playerCards: Record<string, number>,
): Casino {
  if (!casino.stack) return casino;
  const stack = { ...casino.stack };
  const entries = Object.entries(casino.dice).filter(([, c]) => c > 0);

  const pay = (pIdx: string, amount: number, cards: number) => {
    playerCash[pIdx] = (playerCash[pIdx] ?? 0) + amount;
    playerCards[pIdx] = (playerCards[pIdx] ?? 0) + cards;
  };

  if (entries.length === 0) {
    // Nobody bet on this casino — the whole stack burns.
    stack.burned = true;
    return { ...casino, stack };
  }

  entries.sort((a, b) => b[1] - a[1]);

  // House rule: all 8 dice on one casino sweeps both cards.
  const swept = entries.filter(([, c]) => c === 8);
  if (swept.length === 1) {
    const pIdx = swept[0][0];
    stack.swept = true;
    stack.winnerIndex = pIdx;
    pay(pIdx, stack.cards[0] + stack.cards[1], 2);
    return { ...casino, stack };
  }
  if (swept.length > 1) {
    // Two players each placed all 8 — tie, everything burns.
    stack.burned = true;
    return { ...casino, stack };
  }

  // Tie at the top -> nobody earned the stack, it burns.
  const topCount = entries[0][1];
  const topTied = entries.filter(([, c]) => c === topCount).length > 1;
  if (topTied) {
    stack.burned = true;
    return { ...casino, stack };
  }

  // Winner takes the higher card.
  const winner = entries[0][0];
  stack.winnerIndex = winner;
  pay(winner, stack.cards[0], 1);

  // Runner-up: the next unique count takes the lower card; ties burn it.
  const rest = entries.slice(1);
  if (rest.length > 0) {
    const runnerCount = rest[0][1];
    const runnerTied = rest.filter(([, c]) => c === runnerCount).length > 1;
    if (!runnerTied) {
      const runner = rest[0][0];
      stack.runnerUpIndex = runner;
      pay(runner, stack.cards[1], 1);
    } else {
      stack.burned = true; // lower card unclaimed
    }
  } else {
    stack.burned = true; // lower card unclaimed
  }

  return { ...casino, stack };
}

function resolveRound(G: VegasState): VegasState {
  const playerCash = { ...G.playerCash };
  const playerCards = { ...G.playerCards };
  const casinos = G.casinos.map((casino) => resolveCasino(casino, playerCash, playerCards));
  return { ...G, casinos, playerCash, playerCards, phase: 'roundEnd' };
}

const placeDice: Move<VegasState> = (G, ctx, value: number) => {
  const playerIndex = ctx.players.indexOf(ctx.currentPlayer);
  if (playerIndex < 0 || value < 1 || value > 6) return G;
  const pKey = playerIndex.toString();

  // Use ctx.dice if populated, otherwise fall back to G.playerDice (re-rolls).
  const dice = ctx.dice && ctx.dice.length > 0 ? ctx.dice : G.playerDice[pKey] || [];
  const count = dice.filter((d) => d === value).length;
  if (count === 0) return G;

  const nextG: VegasState = {
    ...G,
    casinos: G.casinos.map((c) => ({ ...c, dice: { ...c.dice } })),
    playerDiceRemaining: { ...G.playerDiceRemaining },
    playerDice: { ...G.playerDice, [pKey]: [] },
  };

  const casino = nextG.casinos[value - 1];
  casino.dice[pKey] = (casino.dice[pKey] || 0) + count;
  nextG.playerDiceRemaining[pKey] = (nextG.playerDiceRemaining[pKey] ?? 8) - count;

  const allDiceGone = Object.values(nextG.playerDiceRemaining).every((c) => c <= 0);
  if (allDiceGone) {
    return resolveRound(nextG);
  }
  return nextG;
};

const nextRound: Move<VegasState> = (G) => {
  if (G.phase !== 'roundEnd' || G.round >= G.totalRounds) return G;
  const round = G.round + 1;
  const playerCount = Object.keys(G.playerCash).length;
  const fresh = freshRound(playerCount, round);
  return {
    ...G,
    casinos: fresh.casinos,
    playerDice: fresh.playerDice,
    playerDiceRemaining: fresh.playerDiceRemaining,
    phase: fresh.phase,
    round,
  };
};

export const Vegas: Game<VegasState> = {
  name: 'vegas',
  setup: (numPlayers: number) => {
    const fresh = freshRound(numPlayers, 1);
    const playerCash: Record<string, number> = {};
    const playerCards: Record<string, number> = {};
    for (let i = 0; i < numPlayers; i++) {
      playerCash[i.toString()] = 0;
      playerCards[i.toString()] = 0;
    }
    return {
      ...fresh,
      playerCash,
      playerCards,
      round: 1,
      totalRounds: TOTAL_ROUNDS,
    };
  },
  moves: {
    placeDice,
    nextRound,
  },
  endIf: (G, ctx) => {
    if (G.phase !== 'roundEnd' || G.round < G.totalRounds) return null;

    // Winner = most money; tie-break: most cards won; still tied -> draw.
    let best = -1;
    let leaders: string[] = [];
    for (const pIdx of Object.keys(G.playerCash)) {
      const id = ctx.players[parseInt(pIdx, 10)];
      if (id === undefined) continue;
      const cash = G.playerCash[pIdx] ?? 0;
      if (cash > best) {
        best = cash;
        leaders = [id];
      } else if (cash === best) {
        leaders.push(id);
      }
    }

    if (leaders.length > 1) {
      let bestCards = -1;
      let cardLeaders: string[] = [];
      for (const id of leaders) {
        const cards = G.playerCards[ctx.players.indexOf(id).toString()] ?? 0;
        if (cards > bestCards) {
          bestCards = cards;
          cardLeaders = [id];
        } else if (cards === bestCards) {
          cardLeaders.push(id);
        }
      }
      return cardLeaders.length === 1 ? cardLeaders[0] : 'draw';
    }
    return leaders.length === 1 ? leaders[0] : 'draw';
  },
};
