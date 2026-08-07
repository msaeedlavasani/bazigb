'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api, getStoredToken, storeToken } from '../lib/api';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  wins: number;
  losses: number;
  createdAt: string;
}

interface AuthResponse {
  accessToken: string;
  user: AuthUser;
}

export interface AuthContextValue {
  /** The authenticated user, or null when signed out. */
  user: AuthUser | null;
  /** The JWT access token, or null when signed out. */
  token: string | null;
  /** True while the persisted session is being restored on first mount. */
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (email: string, username: string, password: string) => Promise<AuthUser>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session on first mount: read the JWT from localStorage and
  // validate it against GET /auth/me.
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const stored = getStoredToken();
      if (!stored) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      setTokenState(stored);
      try {
        const me = await api.get<AuthUser>('/auth/me');
        if (!cancelled) setUser(me);
      } catch {
        // Token invalid or expired -> drop it.
        storeToken(null);
        if (!cancelled) {
          setTokenState(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<AuthResponse>('/auth/login', { email, password });
    storeToken(res.accessToken);
    setTokenState(res.accessToken);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(
    async (email: string, username: string, password: string) => {
      const res = await api.post<AuthResponse>('/auth/register', {
        email,
        username,
        password,
      });
      storeToken(res.accessToken);
      setTokenState(res.accessToken);
      setUser(res.user);
      return res.user;
    },
    [],
  );

  const logout = useCallback(() => {
    storeToken(null);
    setTokenState(null);
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, token, isLoading, login, register, logout }),
    [user, token, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
