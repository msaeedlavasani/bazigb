'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Gamepad2,
  Swords,
  Trophy,
  User,
  Volume2,
  VolumeX,
} from 'lucide-react';
import Image from 'next/image';
import { useSoundSettings } from '../../hooks/useSoundSettings';

const NAV_LINKS = [
  { href: '/lobby', label: 'Lobby', icon: Gamepad2 },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/tournaments', label: 'Tournaments', icon: Swords },
];

export default function Nav() {
  const pathname = usePathname();
  const theme = useTheme();
  const { muted, toggleMute } = useSoundSettings();

  return (
    <AppBar
      position="sticky"
      sx={{
        top: 0,
        zIndex: 40,
        bgcolor: alpha(theme.palette.background.default, 0.85),
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid',
        borderColor: alpha(theme.palette.divider, 0.1),
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 56, sm: 64 },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing(1),
              marginRight: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: { xs: 28, sm: 32 },
                width: { xs: 28, sm: 32 },
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <Image
                src="/brand/logo-icon.png"
                alt="BaziGB Logo"
                fill
                className="object-contain transition-transform hover:scale-110"
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', sm: '1.25rem' },
                fontWeight: 900,
                letterSpacing: '-0.025em',
                background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                '&:hover': {
                  WebkitTextFillColor: theme.palette.common.white,
                },
                transition: 'all 0.2s',
              }}
            >
              BaziGB
            </Typography>
          </Link>

          {/* Main Nav Links */}
          <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Button
                  key={link.href}
                  component={Link}
                  href={link.href}
                  startIcon={<link.icon size={16} />}
                  sx={{
                    px: { xs: 1, sm: 1.5 },
                    py: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    fontWeight: 500,
                    color: active ? 'primary.light' : 'text.secondary',
                    bgcolor: active ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
                    '&:hover': {
                      bgcolor: active
                        ? alpha(theme.palette.primary.main, 0.2)
                        : alpha(theme.palette.text.primary, 0.05),
                      color: active ? 'primary.light' : 'text.primary',
                    },
                    '& .MuiButton-startIcon': {
                      marginRight: { xs: 0, sm: 1 },
                    },
                    borderRadius: 2,
                  }}
                >
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    {link.label}
                  </Box>
                </Button>
              );
            })}
          </Box>

          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={toggleMute}
              startIcon={muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              sx={{
                borderColor: alpha(theme.palette.divider, 0.2),
                color: muted ? 'text.disabled' : 'text.secondary',
                '&:hover': {
                  borderColor: alpha(theme.palette.divider, 0.4),
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  color: 'text.primary',
                },
                px: { xs: 1, sm: 1.5 },
                borderRadius: 2,
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {muted ? 'Muted' : 'Sound'}
              </Box>
            </Button>

            <Button
              variant="outlined"
              size="small"
              component={Link}
              href="/profile"
              startIcon={<User size={16} />}
              sx={{
                borderColor: alpha(theme.palette.divider, 0.2),
                color: 'text.secondary',
                '&:hover': {
                  borderColor: alpha(theme.palette.divider, 0.4),
                  bgcolor: alpha(theme.palette.text.primary, 0.05),
                  color: 'text.primary',
                },
                px: { xs: 1, sm: 1.5 },
                borderRadius: 2,
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Profile
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
