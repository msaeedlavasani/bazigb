'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
}

const INPUT_BASE =
  'w-full rounded-lg bg-slate-900/60 border border-slate-700 px-4 py-2.5 text-sm text-white ' +
  'placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-400/60 ' +
  'focus:border-indigo-400/60 transition-colors';

const INPUT_ERROR = 'border-rose-500/60 focus:ring-rose-400/60 focus:border-rose-400/60';

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
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse">Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {serverError && (
        <div
          role="alert"
          className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/40 text-rose-300 text-sm"
        >
          {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 bg-slate-800/60 border border-slate-700 rounded-2xl p-6 shadow-xl"
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-sm font-semibold text-slate-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-invalid={!!fieldErrors.email}
            className={`${INPUT_BASE} ${fieldErrors.email ? INPUT_ERROR : ''}`}
          />
          {fieldErrors.email && (
            <p className="text-xs text-rose-400 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-sm font-semibold text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            aria-invalid={!!fieldErrors.password}
            className={`${INPUT_BASE} ${fieldErrors.password ? INPUT_ERROR : ''}`}
          />
          {fieldErrors.password && (
            <p className="text-xs text-rose-400 mt-1">{fieldErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 px-4 py-3 font-semibold text-white hover:from-indigo-400 hover:to-sky-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
          Create one
        </Link>
      </p>
    </div>
  );
}
