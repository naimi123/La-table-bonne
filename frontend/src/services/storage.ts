/**
 * Persistance locale du MODE DÉMONSTRATION uniquement.
 * Aucune donnée n'est envoyée à un serveur : ce stockage remplace temporairement
 * l'API Back-End et sera supprimé lors du branchement de celle-ci.
 */
import type { Session, User } from '../types';

export const USERS_STORAGE_KEY = 'lbt.mock.users.v1';
export const SESSION_STORAGE_KEY = 'lbt.mock.session.v1';

export interface StoredUser extends User {
  passwordHash: string;
  salt: string;
  reset?: {
    tokenHash: string;
    expiresAt: string;
  };
}

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readUsers(): StoredUser[] {
  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  const parsed = safeParse<unknown>(raw, []);
  return Array.isArray(parsed) ? (parsed as StoredUser[]) : [];
}

export function writeUsers(users: StoredUser[]): void {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function readSession(): Session | null {
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  const parsed = safeParse<Session | null>(raw, null);
  if (!parsed || typeof parsed !== 'object' || !parsed.user || !parsed.token) return null;
  return parsed;
}

export function saveSession(session: Session): void {
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}
