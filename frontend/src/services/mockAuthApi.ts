/**
 * ⚠️ SERVICE SIMULÉ — US01 / US02 / US03.
 *
 * Ce module reproduit le comportement attendu de l'API d'authentification
 * afin de permettre au Front-End d'être testé avant la livraison du Back-End.
 * - Les comptes sont stockés dans `localStorage` (navigateur uniquement).
 * - Les mots de passe ne sont jamais stockés en clair (SHA-256 + sel).
 * - Ce n'est PAS une authentification réelle : aucun jeton serveur, aucune session
 *   partagée entre appareils. À remplacer par l'API dès qu'elle est disponible.
 */
import { ApiError, delay } from './apiClient';
import { MOCK_LATENCY_MS } from './config';
import { readUsers, writeUsers, type StoredUser } from './storage';
import type { Session, User } from '../types';

const RESET_TOKEN_TTL_MINUTES = 15;

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function randomHex(bytes = 16): string {
  const buffer = new Uint8Array(bytes);
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    globalThis.crypto.getRandomValues(buffer);
  } else {
    for (let index = 0; index < bytes; index += 1) {
      buffer[index] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(buffer)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256Hex(value: string): Promise<string> {
  if (typeof globalThis.crypto?.subtle === 'object') {
    const encoded = new TextEncoder().encode(value);
    const digest = await globalThis.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  // Repli utilisé uniquement hors contexte sécurisé : ce n'est pas un algorithme
  // cryptographique, il ne sert qu'à éviter le stockage en clair dans la démo.
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fallback-${hash.toString(16).padStart(8, '0')}`;
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256Hex(`${salt}:${password}`);
}

function toPublicUser(stored: StoredUser): User {
  return {
    id: stored.id,
    firstName: stored.firstName,
    lastName: stored.lastName,
    email: stored.email,
    createdAt: stored.createdAt,
  };
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function mockRegister(payload: RegisterPayload): Promise<Session> {
  await delay(MOCK_LATENCY_MS);

  const email = normalizeEmail(payload.email);
  const users = readUsers();
  if (users.some((user) => user.email === email)) {
    throw new ApiError('Un compte existe déjà avec cette adresse e-mail.', 409);
  }

  const salt = randomHex(12);
  const stored: StoredUser = {
    id: `u-${randomHex(8)}`,
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    email,
    createdAt: new Date().toISOString(),
    salt,
    passwordHash: await hashPassword(payload.password, salt),
  };

  writeUsers([...users, stored]);

  return {
    user: toPublicUser(stored),
    token: `mock_${randomHex(24)}`,
    issuedAt: new Date().toISOString(),
  };
}

export async function mockLogin(emailInput: string, password: string): Promise<Session> {
  await delay(MOCK_LATENCY_MS);

  const email = normalizeEmail(emailInput);
  const user = readUsers().find((candidate) => candidate.email === email);
  if (!user) {
    throw new ApiError('Adresse e-mail ou mot de passe incorrect.', 401);
  }

  const candidateHash = await hashPassword(password, user.salt);
  if (candidateHash !== user.passwordHash) {
    throw new ApiError('Adresse e-mail ou mot de passe incorrect.', 401);
  }

  return {
    user: toPublicUser(user),
    token: `mock_${randomHex(24)}`,
    issuedAt: new Date().toISOString(),
  };
}

export interface MockResetTicket {
  /** Jeton affiché uniquement en mode démonstration (jamais en production). */
  token: string;
  expiresAt: string;
}

export async function mockRequestPasswordReset(emailInput: string): Promise<MockResetTicket | null> {
  await delay(MOCK_LATENCY_MS);

  const email = normalizeEmail(emailInput);
  const users = readUsers();
  const user = users.find((candidate) => candidate.email === email);

  // Anti-énumération : on ne révèle pas si le compte existe.
  if (!user) return null;

  const token = randomHex(16);
  const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60_000).toISOString();

  user.reset = { tokenHash: await sha256Hex(token), expiresAt };
  writeUsers(users);

  // En production, ce jeton serait envoyé par e-mail — jamais renvoyé au client.
  return { token, expiresAt };
}

export async function mockResetPassword(token: string, password: string): Promise<void> {
  await delay(MOCK_LATENCY_MS);

  const tokenHash = await sha256Hex(token.trim());
  const users = readUsers();
  const user = users.find((candidate) => candidate.reset?.tokenHash === tokenHash);

  if (!user || !user.reset) {
    throw new ApiError('Ce lien de réinitialisation est invalide.', 400);
  }
  if (new Date(user.reset.expiresAt).getTime() < Date.now()) {
    throw new ApiError('Ce lien de réinitialisation a expiré. Veuillez en demander un nouveau.', 400);
  }

  const salt = randomHex(12);
  user.salt = salt;
  user.passwordHash = await hashPassword(password, salt);
  delete user.reset;
  writeUsers(users);
}
