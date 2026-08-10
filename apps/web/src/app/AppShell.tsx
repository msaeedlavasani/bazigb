'use client';

import React from 'react';
import { Box } from '@mui/material';
import Nav from './components/Nav';
import Footer from './components/Footer';

/**
 * Shared app shell: sticky header + flexible main + footer slot.
 *
 * Every page renders inside this shell so the header/main/footer structure is
 * consistent across the app and the footer always sits at the bottom of the
 * viewport (minHeight 100vh + flex column + flex:1 main = sticky footer).
 *
 * Pages render their own content (often a full-bleed Box with `flex: 1`) and
 * must NOT render <Nav /> themselves — it lives here, once.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
      }}
    >
      <Nav />
      <Box
        component="main"
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}
