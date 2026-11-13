import { API_BASE_URL } from './config';

/** Erreur applicative normalisée, utilisable par tous les composants. */
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

/**
 * Client HTTP minimaliste (fetch). Aucun token n'est journalisé.
 * Utilisé dès que `VITE_USE_MOCK_API=false`.
 */
export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Le serveur est injoignable. Vérifiez votre connexion puis réessayez.');
  }

  const isJson = response.headers.get('content-type')?.includes('application/json');
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message =
      (payload && typeof payload === 'object' && 'message' in payload && String(payload.message)) ||
      'Une erreur est survenue. Merci de réessayer.';
    throw new ApiError(message, response.status);
  }

  return payload as T;
}
