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
            main: '#EEAC2F', // Honey Bronze
            light: '#F5C461',
            dark: '#C48A25',
            contrastText: '#030A15',
          },
          secondary: {
            main: '#061A2D', // Prussian Blue
            light: '#0A2D45',
            dark: '#03101C',
            contrastText: '#F8FAFC',
          },
          background: {
            default: '#030A15', // Ink Black
            paper: '#061A2D', // Prussian Blue (Surface)
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8', // Muted Gray
          },
          divider: '#392E24', // Dark Coffee
        },
        typography: {
          fontFamily: '"Vazirmatn", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 700 },
          h6: { fontWeight: 700 },
          button: { fontWeight: 500, letterSpacing: '0.02em' },
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
