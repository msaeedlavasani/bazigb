import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Nav from './components/Nav';
import { Box, Container, Typography, Button, alpha, useTheme } from '@mui/material';

export default function Home() {
  return (
    <>
      <Nav />
      <Box
        component="main"
        sx={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          bgcolor: '#0f172a',
          color: 'white',
          overflow: 'hidden',
        }}
      >
        {/* Banner Background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            opacity: 0.2,
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
          }}
        >
          <Image
            src="/brand/banner.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            maxWidth: 'sm',
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box
              sx={{
                position: 'relative',
                mx: 'auto',
                filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.5))',
                width: 128,
                height: 128,
              }}
            >
              <Image
                src="/brand/logo-512.webp"
                alt="BaziG3 Logo"
                fill
                className="object-contain"
                priority
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3.5rem', sm: '4.5rem' },
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  background: 'linear-gradient(to right, #a5b4fc, #7dd3fc, #6ee7b7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                BaziG3
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: alpha('#6366f1', 0.9),
                  textTransform: 'uppercase',
                }}
              >
                بازی جیبی
              </Typography>
              <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
                همه‌ی بازی‌ها، توی جیبت
              </Typography>
            </Box>
          </Box>

          <Box sx={{ maxWidth: 400, mx: 'auto', width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              component={Link}
              href="/lobby"
              variant="contained"
              size="large"
              endIcon={<ArrowRight size={24} />}
              sx={{
                py: 2.5,
                borderRadius: 4,
                background: 'linear-gradient(to right, #6366f1, #4f46e5, #0284c7)',
                fontSize: '1.25rem',
                fontWeight: 900,
                boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.2)',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  background: 'linear-gradient(to right, #4f46e5, #4338ca, #0369a1)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Enter Lobby
            </Button>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              <Button
                component={Link}
                href="/leaderboard"
                variant="outlined"
                sx={{
                  py: 2,
                  borderRadius: 4,
                  borderColor: 'divider',
                  bgcolor: alpha('#1e293b', 0.4),
                  backdropFilter: 'blur(4px)',
                  color: 'text.secondary',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: alpha('#1e293b', 0.8),
                    color: 'white',
                    borderColor: 'text.disabled',
                  },
                }}
              >
                Leaderboard
              </Button>
              <Button
                component={Link}
                href="/tournaments"
                variant="outlined"
                sx={{
                  py: 2,
                  borderRadius: 4,
                  borderColor: 'divider',
                  bgcolor: alpha('#1e293b', 0.4),
                  backdropFilter: 'blur(4px)',
                  color: 'text.secondary',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: alpha('#1e293b', 0.8),
                    color: 'white',
                    borderColor: 'text.disabled',
                  },
                }}
              >
                Tournaments
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
