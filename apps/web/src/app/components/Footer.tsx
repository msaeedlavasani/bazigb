'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Container, Divider, Typography, alpha } from '@mui/material';
import {
  fetchSiteSettings,
  FooterContent,
  FOOTER_DEFAULTS,
} from '../../lib/site-settings';

/**
 * Site footer — rendered once by the AppShell on every page. Content comes
 * from the server (GET /site-settings) so the admin panel can edit it
 * without a redeploy; defaults are shown until the first fetch resolves.
 */
export default function Footer() {
  const [footer, setFooter] = useState<FooterContent>(FOOTER_DEFAULTS);

  useEffect(() => {
    let cancelled = false;
    fetchSiteSettings().then(({ footer }) => {
      if (!cancelled) setFooter(footer);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: alpha('#BEBBAC', 0.12),
        bgcolor: alpha('#0B1622', 0.6),
        py: { xs: 4, sm: 5 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Brand */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Image
                src="/brand/logo-icon.png"
                alt="BaziGB Logo"
                width={34}
                height={34}
                style={{ objectFit: 'contain' }}
              />
              <Typography
                component={Link}
                href="/"
                sx={{
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  letterSpacing: '-0.025em',
                  color: '#F5A306',
                  textDecoration: 'none',
                }}
              >
                BaziGB
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {footer.tagline}
            </Typography>
          </Box>

          {/* Links & Trust Seals */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              gap: 3,
            }}
          >
          </Box>
        </Box>

        <Divider sx={{ my: 2.5, borderColor: alpha('#BEBBAC', 0.1) }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.8 }}>
            {footer.copyright}
          </Typography>

          {/* Enamad - Elite discrete placement */}
          <Box
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.03)',
              p: 0.75,
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                borderColor: 'rgba(238, 172, 47, 0.3)' // Honey Bronze glow
              },
              '& img': { 
                display: 'block',
                filter: 'grayscale(0.4) contrast(0.9)', // Mute for dark mode harmony
                transition: 'filter 0.3s ease',
              },
              '&:hover img': {
                filter: 'grayscale(0) contrast(1)', // Full color on hover
              }
            }}
          >
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=7267311&Code=gFXuwV2xlgp1rBZVgH6aae2Vp4ynU4S6"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=7267311&Code=gFXuwV2xlgp1rBZVgH6aae2Vp4ynU4S6"
                alt="eNamad"
                style={{ height: 40, width: 'auto', cursor: 'pointer' }}
                // @ts-ignore
                code="gFXuwV2xlgp1rBZVgH6aae2Vp4ynU4S6"
              />
            </a>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
