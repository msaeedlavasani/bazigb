'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from '@mui/material';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already authenticated -> go home (also runs after a successful login).
  useEffect(() => {
    if (user && !isLoading) router.replace('/');
  }, [user, isLoading, router]);

  function validate(): FormErrors {
    const errors: FormErrors = {};
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      errors.email = 'Email is required';
    } else if (!EMAIL_RE.test(trimmedEmail)) {
      errors.email = 'Enter a valid email address';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      router.replace('/');
    } catch (error: unknown) {
      setServerError(
        error instanceof Error ? error.message : 'Login failed. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
        <CircularProgress size={48} thickness={4} color="primary" />
        <Typography color="text.secondary">Checking your session...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {serverError && (
        <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
          {serverError}
        </Alert>
      )}

      <Paper
        component="form"
        onSubmit={handleSubmit}
        noValidate
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: 'rgba(30, 41, 59, 0.6)',
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }} color="text.secondary">
            Email
          </Typography>
          <TextField
            fullWidth
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: 2,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }} color="text.secondary">
            Password
          </Typography>
          <TextField
            fullWidth
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
            variant="outlined"
            size="small"
            slotProps={{
              input: {
                sx: {
                  bgcolor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: 2,
                },
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          disabled={submitting}
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            background: 'linear-gradient(to right, #6366f1, #0ea5e9)',
            '&:hover': {
              background: 'linear-gradient(to right, #4f46e5, #0284c7)',
            },
          }}
        >
          {submitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>
      </Paper>

      <Typography variant="body2" align="center" color="text.secondary">
        Don&apos;t have an account?{' '}
        <MuiLink
          component={Link}
          href="/register"
          underline="hover"
          sx={{ fontWeight: 600 }}
          color="primary.light"
        >
          Create one
        </MuiLink>
      </Typography>
    </Box>
  );
}
