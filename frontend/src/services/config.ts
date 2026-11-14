/**
 * Configuration Front-End.
 * Aucun secret n'est stocké ici : uniquement des valeurs publiques
 * injectées par Vite au build (voir `.env.example`).
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '/api';

/**
 * Sprint 1 : l'API Back-End n'est pas encore disponible.
 * `VITE_USE_MOCK_API=false` bascule les services sur les appels HTTP réels.
 */
export const USE_MOCK_API: boolean =
  (import.meta.env.VITE_USE_MOCK_API ?? 'true').toLowerCase() !== 'false';

/** Latence simulée pour rendre visibles les états de chargement. */
export const MOCK_LATENCY_MS = 450;
