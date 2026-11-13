/**
 * Couche d'accès à l'authentification (US01, US02, US03).
 * Basculer `VITE_USE_MOCK_API` permet de passer des services simulés
 * aux appels HTTP réels sans modifier les composants.
 */
import { request } from './apiClient';
import { USE_MOCK_API } from './config';
import {
  mockLogin,
  mockRegister,
  mockRequestPasswordReset,
  mockResetPassword,
  type MockResetTicket,
  type RegisterPayload,
} from './mockAuthApi';
import { clearSession, readSession, saveSession } from './storage';
import type { Session } from '../types';

export type { RegisterPayload };

export async function registerUser(payload: RegisterPayload): Promise<Session> {
  const session = USE_MOCK_API
    ? await mockRegister(payload)
    : await request<Session>('/auth/register', { method: 'POST', body: payload });

  saveSession(session);
  return session;
}

export async function loginUser(email: string, password: string): Promise<Session> {
  const session = USE_MOCK_API
    ? await mockLogin(email, password)
    : await request<Session>('/auth/login', { method: 'POST', body: { email, password } });

  saveSession(session);
  return session;
}

export async function requestPasswordReset(email: string): Promise<MockResetTicket | null> {
  if (USE_MOCK_API) return mockRequestPasswordReset(email);

  await request<{ message: string }>('/auth/password-reset/request', {
    method: 'POST',
    body: { email },
  });
  return null;
}

export async function resetPassword(token: string, password: string): Promise<void> {
  if (USE_MOCK_API) return mockResetPassword(token, password);

  await request<{ message: string }>('/auth/password-reset/confirm', {
    method: 'POST',
    body: { token, password },
  });
}

export function logoutUser(): void {
  clearSession();
}

export function getStoredSession(): Session | null {
  return readSession();
}
