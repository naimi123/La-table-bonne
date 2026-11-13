import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  getStoredSession,
  loginUser,
  logoutUser,
  registerUser,
  type RegisterPayload,
} from '../services/authService';
import type { Session, User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readInitialSession(): Session | null {
  try {
    return getStoredSession();
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(readInitialSession);

  useEffect(() => {
    // Synchronise l'onglet courant si la session est effacée dans un autre onglet.
    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key.includes('session')) {
        setSession(readInitialSession());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const nextSession = await loginUser(email, password);
    setSession(nextSession);
    return nextSession.user;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const nextSession = await registerUser(payload);
    setSession(nextSession);
    return nextSession.user;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      isAuthenticated: Boolean(session?.user),
      login,
      register,
      logout,
    }),
    [session, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l’intérieur de <AuthProvider>.');
  }
  return context;
}
