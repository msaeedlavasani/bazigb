import { Game, Move } from '@bazigb/engine';

export interface Casino {
  dice: Record<string, number>; // playerIndex -> count
  cash: number[];
}

export interface VegasState {
  casinos: Casino[];
  playerCash: Record<string, number>; // playerIndex -> total
  playerDice: Record<string, number[]>; // current roll
  playerDiceRemaining: Record<string, number>; // total dice left for this round
  round: number;
}

const BANKNOTES = [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000];

function rollDice(count: number): number[] {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
}

function setupRoundData(numPlayers: number) {
  const casinos: Casino[] = [];
  const deck: number[] = [];
  for (let i = 0; i < 5; i++) deck.push(...BANKNOTES);
  
  // Shuffle deck
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  for (let i = 0; i < 6; i++) {
    const cash: number[] = [];
    let sum = 0;
    while (sum < 50000 && deck.length > 0) {
      const note = deck.pop()!;
      cash.push(note);
      sum += note;
    }
    cash.sort((a, b) => b - a);
    casinos.push({ dice: {}, cash });
  }

  const playerDiceRemaining: Record<string, number> = {};
  for (let i = 0; i < numPlayers; i++) {
    playerDiceRemaining[i.toString()] = 8;
  }

  return { casinos, playerDiceRemaining };
}

function resolveRound(G: VegasState): Record<string, number> {
  const newPlayerCash = { ...G.playerCash };
  G.casinos.forEach(casino => {
    const playerIndices = Object.keys(casino.dice);
    if (playerIndices.length === 0) return;

    // Tie-cancels-out rule: Group players by dice count
    const countGroups: Record<number, string[]> = {};
    playerIndices.forEach(pIdx => {
      const c = casino.dice[pIdx];
      if (!countGroups[c]) countGroups[c] = [];
      countGroups[c].push(pIdx);
    });

    // Players who are NOT tied with anyone else for that specific count
    const eligibleIndices = playerIndices.filter(pIdx => countGroups[casino.dice[pIdx]].length === 1);
    
    // Sort by dice count descending
    eligibleIndices.sort((a, b) => casino.dice[b] - casino.dice[a]);

    // Distribute cash
    eligibleIndices.forEach((pIdx, i) => {
      if (casino.cash[i]) {
        newPlayerCash[pIdx] = (newPlayerCash[pIdx] || 0) + casino.cash[i];
      }
    });
  });
  return newPlayerCash;
}

const placeDice: Move<VegasState> = (G, ctx, value: number) => {
  const playerID = ctx.currentPlayer;
  const playerIndex = ctx.players.indexOf(playerID);
  const pKey = playerIndex.toString();

  // Use ctx.dice if populated, otherwise fallback to G.playerDice (re-rolls)
  const dice = (ctx.dice && ctx.dice.length > 0) ? ctx.dice : (G.playerDice[pKey] || []);
  const count = dice.filter(d => d === value).length;

  if (count === 0) return G;

  const nextG = { ...G };
  
  // Update casinos
  const newCasinos = [...G.casinos];
  const casinoIndex = value - 1;
  const casino = { ...newCasinos[casinoIndex] };
  casino.dice = { ...casino.dice, [pKey]: (casino.dice[pKey] || 0) + count };
  newCasinos[casinoIndex] = casino;
  nextG.casinos = newCasinos;

  // Update player dice count
  const newPlayerDiceRemaining = { ...G.playerDiceRemaining };
  newPlayerDiceRemaining[pKey] -= count;
  nextG.playerDiceRemaining = newPlayerDiceRemaining;

  // Clear current roll
  const newPlayerDice = { ...G.playerDice };
  newPlayerDice[pKey] = []; 
  nextG.playerDice = newPlayerDice;

  // Check if round should end
  const allDiceGone = Object.values(newPlayerDiceRemaining).every(c => c === 0);
  if (allDiceGone) {
    const resolvedCash = resolveRound(nextG);
    if (nextG.round < 4) {
      const nextRound = setupRoundData(ctx.numPlayers);
      return {
        ...nextG,
        casinos: nextRound.casinos,
        playerDiceRemaining: nextRound.playerDiceRemaining,
        playerDice: {},
        playerCash: resolvedCash,
        round: nextG.round + 1,
      };
    } else {
      return {
        ...nextG,
        playerCash: resolvedCash,
      };
    }
  }

  return nextG;
};

export const Vegas: Game<VegasState> = {
  name: 'vegas',
  setup: (numPlayers: number) => {
    const { casinos, playerDiceRemaining } = setupRoundData(numPlayers);
    const playerCash: Record<string, number> = {};
    for (let i = 0; i < numPlayers; i++) playerCash[i.toString()] = 0;
    return {
      casinos,
      playerCash,
      playerDice: {},
      playerDiceRemaining,
      round: 1,
    };
  },
  moves: {
    placeDice,
  },
  endIf: (G, ctx) => {
    const allDiceGone = Object.values(G.playerDiceRemaining).every(c => c === 0);
    if (G.round >= 4 && allDiceGone) {
      // Find winner
      let maxCash = -1;
      let winner = null;
      Object.entries(G.playerCash).forEach(([pIdx, cash]) => {
        if (cash > maxCash) {
          maxCash = cash;
          winner = ctx.players[parseInt(pIdx)];
        }
      });
      return winner;
    }
    return null;
  },
};
