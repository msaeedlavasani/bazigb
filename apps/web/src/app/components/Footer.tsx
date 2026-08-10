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
                  background: 'linear-gradient(to right, #F5A306, #B25D16)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
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

          {/* Links */}
          {footer.links.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, sm: 2.5 } }}>
              {footer.links.map((link) => (
                <Typography
                  key={`${link.label}-${link.href}`}
                  component={Link}
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': { color: 'primary.light' },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 2.5, borderColor: alpha('#BEBBAC', 0.1) }} />

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {footer.copyright}
        </Typography>
      </Container>
    </Box>
  );
}
