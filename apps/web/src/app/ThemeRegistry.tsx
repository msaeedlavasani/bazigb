'use client';

import React, { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * BaziGB brand theme — the ONLY palette in the app.
 *
 * Brand colors (user-approved):
 *   Autumn Ember #B25D16  -> primary (buttons, links, active states)
 *   Orange      #F5A306  -> primary.light (bright accents, gradient partner)
 *   Dark Teal   #114B5E  -> secondary
 *   Ash Grey    #BEBBAC  -> muted text / borders
 *   Ink Black   #030A15  -> background
 *
 * Rules:
 *  - No off-palette UI colors (indigo/sky/slate are gone).
 *  - error/warning/info/success stay at MUI defaults — never customized.
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#B25D16', // Autumn Ember
            light: '#F5A306', // Orange
            dark: '#8F470F',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#114B5E', // Dark Teal
            light: '#1B6B85',
            dark: '#0B3A4A',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#030A15', // Ink Black
            paper: '#0B1622', // Ink lifted one step
          },
          text: {
            secondary: '#BEBBAC', // Ash Grey
          },
          divider: 'rgba(190, 187, 172, 0.14)', // Ash Grey @ 14%
        },
        typography: {
          fontFamily: 'inherit',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: '8px',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
