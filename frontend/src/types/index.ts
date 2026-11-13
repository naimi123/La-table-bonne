/**
 * Types partagés du Front-End La Bonne Table.
 * Ces contrats sont alignés avec les User Stories du backlog Jira.
 */

export type PriceRange = '€' | '€€' | '€€€' | '€€€€';

export interface Restaurant {
  id: string;
  name: string;
  city: string;
  address: string;
  cuisine: string;
  priceRange: PriceRange;
  rating: number;
  reviewCount: number;
  description: string;
  imageUrl: string;
  tags: string[];
  openingHours: string;
  capacity: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export interface Session {
  user: User;
  token: string;
  issuedAt: string;
}

/** Résultat standard des appels de service (succès / échec métier). */
export interface ServiceResult<T> {
  data: T;
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface SearchFilters {
  city?: string;
  query?: string;
}
