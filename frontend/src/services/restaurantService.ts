/**
 * Couche d'accès aux restaurants (US04).
 * Sprint 1 : catalogue simulé. L'API réelle est attendue sur `GET /restaurants`.
 */
import { ApiError, delay, request } from './apiClient';
import { MOCK_LATENCY_MS, USE_MOCK_API } from './config';
import { MOCK_RESTAURANTS } from '../data/restaurants';
import { filterRestaurants } from './restaurantFilters';
import type { Restaurant, SearchFilters } from '../types';

export async function searchRestaurants(filters: SearchFilters): Promise<Restaurant[]> {
  await delay(MOCK_LATENCY_MS);

  if (!USE_MOCK_API) {
    const params = new URLSearchParams();
    if (filters.city) params.set('city', filters.city);
    if (filters.query) params.set('q', filters.query);
    return request<Restaurant[]>(`/restaurants?${params.toString()}`, { method: 'GET' });
  }

  return filterRestaurants(MOCK_RESTAURANTS, filters);
}

export async function getRestaurantById(id: string): Promise<Restaurant> {
  await delay(MOCK_LATENCY_MS);

  if (!USE_MOCK_API) {
    return request<Restaurant>(`/restaurants/${encodeURIComponent(id)}`, { method: 'GET' });
  }

  const restaurant = MOCK_RESTAURANTS.find((candidate) => candidate.id === id);
  if (!restaurant) {
    throw new ApiError('Ce restaurant est introuvable.', 404);
  }
  return restaurant;
}

export async function getFeaturedRestaurants(limit = 3): Promise<Restaurant[]> {
  await delay(MOCK_LATENCY_MS);

  const source = USE_MOCK_API
    ? MOCK_RESTAURANTS
    : await request<Restaurant[]>('/restaurants?featured=true', { method: 'GET' });

  return [...source].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
