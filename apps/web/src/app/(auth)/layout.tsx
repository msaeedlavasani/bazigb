import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

/**
 * Centered layout for the auth pages (login / register). Matches the app's
 * MUI dark theme instead of raw Tailwind classes so every page shares the
 * same design-system tokens.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 6,
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 448 }}>
        <Box component="header" sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            component={Link}
            href="/"
            variant="h1"
            sx={{
              display: 'inline-block',
              fontSize: '2.25rem',
              fontWeight: 800,
              letterSpacing: '-0.025em',
              background: 'linear-gradient(to right, #818cf8, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
            }}
          >
            BaziGB
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary', fontWeight: 500 }}>
            Online Board Game Platform
          </Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
