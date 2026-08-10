'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Banknote, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Flame, Loader2, Trophy } from 'lucide-react';
import Dice3D from './Dice3D';
import { soundService } from '../../lib/sound-service';

const DiceIcons = [null, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

/** One color per seated player (up to 5) — dice, badges and won cards use it. */
const DICE_PALETTE = ['#f59e0b', '#3b82f6', '#10b981', '#a855f7', '#ef4444'];

function playerColor(pIdx: number): string {
  return DICE_PALETTE[pIdx % DICE_PALETTE.length];
}

export interface MoneyStackData {
  /** The 2 cards, sorted descending: [higher, lower]. */
  cards: number[];
  winnerIndex: string | null;
  runnerUpIndex: string | null;
  burned: boolean;
  swept: boolean;
}

export interface CasinoData {
  /** playerIndex -> dice count placed on this casino. */
  dice: Record<string, number>;
  stack: MoneyStackData | null;
}

interface VegasBoardProps {
  casinos: CasinoData[];
  hand: number[];
  players: string[];
  currentPlayerId: string;
  onPlace: (value: number) => void;
  onRoll?: () => void;
  onNextRound?: () => void;
  disabled?: boolean;
  isMyTurn: boolean;
  rolling?: boolean;
  phase: 'playing' | 'roundEnd';
  round: number;
  totalRounds: number;
  playerCash: Record<string, number>;
  playerCards: Record<string, number>;
  winnerId: string | null;
  names?: Record<string, string>;
}

/** One money card of a casino stack. */
function MoneyCard({
  value,
  ownerIdx,
  resolved,
  swept,
}: {
  value: number;
  ownerIdx: string | null;
  resolved: boolean;
  swept: boolean;
}) {
  const color = ownerIdx !== null ? playerColor(parseInt(ownerIdx, 10)) : undefined;
  const burned = resolved && ownerIdx === null;
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        borderRadius: 2,
        border: '1px solid',
        px: 2,
        py: 1.5,
        boxShadow: swept ? '0 0 14px rgba(250,204,21,0.45)' : 1,
        transition: 'all 0.2s',
        opacity: burned ? 0.4 : 1,
        filter: burned ? 'grayscale(1)' : 'none',
        bgcolor: color ? `${color}1f` : 'rgba(16,185,129,0.08)',
        borderColor: color ? color : swept ? 'rgba(250,204,21,0.6)' : 'rgba(16,185,129,0.25)',
      }}
    >
      <Banknote size={12} style={{ color: color ?? '#34d399' }} />
      <Typography
        variant="caption"
        sx={{ fontSize: '10px', fontWeight: 900, lineHeight: 1, color: color ?? '#34d399' }}
      >
        ${value.toLocaleString()}
      </Typography>
      {burned && (
        <Box
          sx={{
            position: 'absolute',
            top: -6,
            right: -6,
            borderRadius: '50%',
            bgcolor: 'rgb(44, 58, 69)', // slate-700
            p: 0.5,
            color: 'rgb(148, 163, 184)', // slate-400
            display: 'flex',
          }}
          title="Burned"
        >
          <Flame size={10} />
        </Box>
      )}
    </Box>
  );
}

export default function VegasBoard({
  casinos,
  hand,
  players,
  currentPlayerId,
  onPlace,
  onRoll,
  onNextRound,
  disabled = false,
  isMyTurn,
  rolling = false,
  phase,
  round,
  totalRounds,
  playerCash,
  playerCards,
  winnerId,
  names,
}: VegasBoardProps) {
  // Group hand dice by value.
  const handCounts: Record<number, number> = {};
  hand.forEach((v) => {
    handCounts[v] = (handCounts[v] || 0) + 1;
  });

  const playerIndex = players.indexOf(currentPlayerId);
  const currentPlayerColor = playerIndex !== -1 ? playerColor(playerIndex) : undefined;

  const handleValueClick = (value: number) => {
    if (disabled || !isMyTurn || phase !== 'playing' || hand.length === 0) return;
    soundService.play('move');
    onPlace(value);
  };

  const handleRollClick = () => {
    if (disabled || !isMyTurn || phase !== 'playing' || hand.length > 0) return;
    soundService.play('dice');
    onRoll?.();
  };

  // Leaderboard: players sorted by money (desc), then cards.
  const leaderboard = players
    .map((pId, pIdx) => ({
      pIdx,
      id: pId,
      cash: playerCash[pIdx.toString()] ?? 0,
      cards: playerCards[pIdx.toString()] ?? 0,
    }))
    .sort((a, b) => b.cash - a.cash || b.cards - a.cards);

  const isFinalRound = round >= totalRounds;

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        width: '100%',
        maxWidth: '4xl',
        mx: 'auto',
        p: { xs: 1.5, sm: 3 },
        borderRadius: 6,
        bgcolor: 'rgba(11, 22, 34, 0.5)',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 24,
      }}
    >
      {/* Round header + cash strip */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Chip
            label={`Round ${round}/${totalRounds}`}
            size="small"
            sx={{
              fontWeight: 'bold',
              bgcolor: 'rgba(178, 93, 22, 0.12)',
              color: '#F5A306',
              borderColor: 'rgba(245, 163, 6, 0.3)',
            }}
            variant="outlined"
          />
          {phase === 'roundEnd' && (
            <Chip
              icon={<Trophy size={14} />}
              label="Round complete — payouts settled"
              size="small"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'rgba(245, 158, 11, 0.1)',
                color: '#FBBF24',
                borderColor: 'rgba(251, 191, 36, 0.4)',
              }}
              variant="outlined"
            />
          )}
          {isFinalRound && phase === 'roundEnd' && (
            <Chip
              label="Final round!"
              size="small"
              sx={{
                fontWeight: 'bold',
                bgcolor: 'rgba(16, 185, 129, 0.1)',
                color: '#34D399',
                borderColor: 'rgba(52, 211, 153, 0.4)',
              }}
              variant="outlined"
            />
          )}
        </Box>

        {/* Compact per-player money strip (always visible) */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {leaderboard.map(({ pIdx, cash, cards }) => {
            const color = playerColor(pIdx);
            const isYou = players[pIdx] === currentPlayerId;
            return (
              <Chip
                key={pIdx}
                variant="outlined"
                size="small"
                avatar={<Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, ml: 1 }} />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                      {isYou ? 'You' : names?.[players[pIdx]] ?? `P${pIdx + 1}`}
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 900, color: 'success.light' }}>
                      ${cash.toLocaleString()}
                    </Typography>
                    {cards > 0 && (
                      <Typography variant="caption" sx={{ fontSize: '9px', fontWeight: 600, color: 'text.disabled' }}>
                        {cards} cards
                      </Typography>
                    )}
                  </Box>
                }
                sx={{
                  bgcolor: 'rgba(3, 10, 21, 0.7)',
                  borderColor: 'divider',
                  px: 0.5,
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Casinos Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {casinos.map((casino, idx) => {
          const value = idx + 1;
          const DiceIcon = DiceIcons[value]!;
          const totalDice = Object.values(casino.dice).reduce((a, b) => a + b, 0);
          const resolved = phase === 'roundEnd';
          const stack = casino.stack;

          return (
            <Paper
              key={idx}
              elevation={0}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                p: 2,
                borderRadius: 4,
                bgcolor: 'rgba(3, 10, 21, 0.6)',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'colors 0.2s',
                minHeight: 150,
                opacity: stack === null ? 0.6 : 1,
              }}
            >
              {/* Casino Header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      p: 0.75,
                      borderRadius: 2,
                      bgcolor: 'rgba(178, 93, 22, 0.12)',
                      color: '#F5A306',
                      display: 'flex',
                    }}
                  >
                    <DiceIcon size={24} />
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    Casino {value}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  {stack?.swept && (
                    <Chip
                      label="SWEEP!"
                      size="small"
                      sx={{
                        fontSize: '9px',
                        fontWeight: 900,
                        bgcolor: 'rgba(245, 158, 11, 0.2)',
                        color: '#FBBF24',
                        borderColor: 'rgba(251, 191, 36, 0.5)',
                        height: 20,
                      }}
                      variant="outlined"
                    />
                  )}
                  {stack?.burned && (
                    <Chip
                      label="BURNED"
                      size="small"
                      sx={{
                        fontSize: '9px',
                        fontWeight: 900,
                        bgcolor: 'rgba(244, 63, 94, 0.15)',
                        color: '#FB7185',
                        borderColor: 'rgba(251, 113, 133, 0.4)',
                        height: 20,
                      }}
                      variant="outlined"
                    />
                  )}
                  {totalDice > 0 && (
                    <Chip
                      icon={<Dice6 size={12} />}
                      label={totalDice}
                      size="small"
                      sx={{
                        fontSize: '10px',
                        fontWeight: 900,
                        bgcolor: 'background.paper',
                        borderColor: 'divider',
                        height: 20,
                        '& .MuiChip-icon': { color: 'text.disabled' },
                      }}
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>

              {/* Money stack: 2 offset cards (or empty state) */}
              <Box sx={{ minHeight: 44, display: 'flex', alignItems: 'center' }}>
                {stack ? (
                  <Box sx={{ display: 'flex', '& > * + *': { ml: -1 } }}>
                    {stack.cards.map((cardVal, i) => {
                      const ownerIdx = i === 0 ? stack.winnerIndex : stack.runnerUpIndex;
                      const resolvedOwner = resolved ? ownerIdx : null;
                      return (
                        <MoneyCard
                          key={i}
                          value={cardVal}
                          ownerIdx={resolvedOwner}
                          resolved={resolved}
                          swept={stack.swept}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'text.disabled',
                    }}
                  >
                    No money this round
                  </Typography>
                )}
              </Box>

              {/* Per-player dice stacks */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 'auto' }}>
                {players.map((pId, pIdx) => {
                  const count = casino.dice[pIdx.toString()] ?? casino.dice[pId] ?? 0;
                  if (count === 0) return null;
                  const color = playerColor(pIdx);
                  const isYou = pId === currentPlayerId;
                  return (
                    <Box key={pId} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Chip
                        label={isYou ? 'You' : names?.[pId] ?? `P${pIdx + 1}`}
                        size="small"
                        sx={{
                          height: 16,
                          fontSize: '8px',
                          fontWeight: 900,
                          bgcolor: `${color}26`,
                          color: color,
                          border: 'none',
                          '& .MuiChip-label': { px: 1 },
                        }}
                      />
                      <Box
                        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.25, maxWidth: 84 }}
                      >
                        {Array.from({ length: count }).map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: 14,
                              height: 14,
                              borderRadius: 0.5,
                              border: '1px solid rgba(255,255,255,0.2)',
                              boxShadow: 1,
                              bgcolor: color,
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="caption" sx={{ fontSize: '10px', fontWeight: 900, color }}>
                        {count}
                      </Typography>
                    </Box>
                  );
                })}
                {totalDice === 0 && (
                  <Typography variant="caption" sx={{ fontSize: '10px', color: 'text.disabled', fontStyle: 'italic' }}>
                    — no dice yet
                  </Typography>
                )}
              </Box>
            </Paper>
          );
        })}
      </Box>

      {/* Bottom panel: hand / roll OR round-end leaderboard + next round */}
      {phase === 'roundEnd' ? (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            bgcolor: 'rgba(3, 10, 21, 0.5)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Trophy size={20} color="#fbbf24" />
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.disabled' }}
            >
              Leaderboard
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {leaderboard.map(({ pIdx, cash, cards }, rank) => {
              const color = playerColor(pIdx);
              const isYou = players[pIdx] === currentPlayerId;
              return (
                <Paper
                  key={pIdx}
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    borderRadius: 3,
                    border: '1px solid',
                    px: 2,
                    py: 1.5,
                    bgcolor: rank === 0 ? 'rgba(245, 158, 11, 0.1)' : 'rgba(3, 10, 21, 0.6)',
                    borderColor: rank === 0 ? 'rgba(251, 191, 36, 0.4)' : 'divider',
                  }}
                >
                  <Typography
                    sx={{
                      width: 20,
                      textAlign: 'center',
                      fontWeight: 900,
                      color: rank === 0 ? '#FBBF24' : 'text.disabled',
                    }}
                  >
                    {rank + 1}
                  </Typography>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: color }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                    {isYou ? 'You' : names?.[players[pIdx]] ?? `Player ${pIdx + 1}`}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.disabled' }}>
                    {cards} cards
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 'auto', fontWeight: 900, color: 'success.light' }}>
                    ${cash.toLocaleString()}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
          {!winnerId && onNextRound && (
            <Button
              fullWidth
              onClick={onNextRound}
              variant="contained"
              size="large"
              startIcon={<Dice6 size={20} />}
              sx={{
                py: 1.5,
                fontWeight: 900,
                borderRadius: 3,
                background: 'linear-gradient(to right, #F5A306, #B25D16)',
                boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.2)',
                '&:hover': {
                  background: 'linear-gradient(to right, #B25D16, #8F470F)',
                  opacity: 0.9,
                },
                textTransform: 'none',
              }}
            >
              {isFinalRound ? 'Final Results' : `Start Round ${round + 1}`}
            </Button>
          )}
          {!winnerId && !onNextRound && (
            <Typography
              variant="caption"
              sx={{ textAlign: 'center', fontStyle: 'italic', color: 'text.disabled', display: 'block' }}
            >
              Waiting for a player to start the next round…
            </Typography>
          )}
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            bgcolor: 'rgba(3, 10, 21, 0.5)',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.disabled' }}
            >
              Your Hand
            </Typography>
            {isMyTurn && hand.length > 0 && (
              <Chip
                label="Pick a value"
                size="small"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  bgcolor: `${currentPlayerColor}20`,
                  color: currentPlayerColor,
                  border: 'none',
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                  },
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
              minHeight: 100,
              alignItems: 'center',
              width: '100%',
            }}
          >
            {hand.length > 0 ? (
              Object.entries(handCounts)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([valStr, count]) => {
                  const val = Number(valStr);
                  return (
                    <Button
                      key={val}
                      onClick={() => handleValueClick(val)}
                      disabled={disabled || !isMyTurn}
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: 'rgba(11, 22, 34, 0.8)',
                        borderColor: isMyTurn ? `${currentPlayerColor}40` : 'divider',
                        '&:hover': {
                          bgcolor: 'rgba(44, 58, 69, 0.8)',
                          borderColor: isMyTurn ? currentPlayerColor : 'divider',
                        },
                        '&:disabled': { opacity: 0.5 },
                        textTransform: 'none',
                        minWidth: 'auto',
                      }}
                    >
                      <Box sx={{ display: 'flex', '& > * + *': { ml: -1 } }}>
                        {Array.from({ length: Math.min(count, 5) }).map((_, i) => (
                          <Dice3D key={i} value={val} size={32} color={currentPlayerColor} />
                        ))}
                        {count > 5 && (
                          <Box
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 2,
                              bgcolor: 'rgb(44, 58, 69)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              color: 'white',
                              zIndex: 10,
                              border: '1px solid',
                              borderColor: 'rgb(71, 85, 105)',
                            }}
                          >
                            +{count - 5}
                          </Box>
                        )}
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 'bold',
                          color: isMyTurn ? `${currentPlayerColor}cc` : 'text.disabled',
                          transition: 'color 0.2s',
                        }}
                      >
                        Place {count} × {val}
                      </Typography>
                    </Button>
                  );
                })
            ) : isMyTurn ? (
              <Button
                onClick={handleRollClick}
                disabled={disabled || rolling}
                variant="contained"
                size="large"
                startIcon={rolling ? <CircularProgress size={24} color="inherit" /> : <Dice6 size={24} />}
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: 4,
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(to bottom right, #F5A306, #B25D16)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                  transition: 'all 0.2s',
                  '&:disabled': { opacity: 0.5, filter: 'grayscale(1)' },
                  textTransform: 'none',
                }}
              >
                ROLL YOUR DICE
              </Button>
            ) : (
              <Box
                sx={{
                  color: 'text.disabled',
                  fontWeight: 500,
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CircularProgress size={16} color="inherit" />
                Waiting for opponent...
              </Box>
            )}
          </Box>
        </Paper>
      )}
    </Paper>
  );
}
