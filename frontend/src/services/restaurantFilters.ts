/**
 * Filtrage des restaurants (US04) — fonction pure, testée unitairement.
 * La recherche est insensible à la casse et aux accents.
 */
import type { Restaurant, SearchFilters } from '../types';
import { normalizeSearchTerm } from '../utils/validation';

export function normalizeForComparison(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

export function filterRestaurants(restaurants: Restaurant[], filters: SearchFilters): Restaurant[] {
  const city = normalizeForComparison(normalizeSearchTerm(filters.city));
  const query = normalizeForComparison(normalizeSearchTerm(filters.query));

  return restaurants.filter((restaurant) => {
    const matchesCity = city ? normalizeForComparison(restaurant.city) === city : true;
    const matchesQuery = query
      ? normalizeForComparison(
          `${restaurant.name} ${restaurant.cuisine} ${restaurant.city} ${restaurant.tags.join(' ')}`,
        ).includes(query)
      : true;
    return matchesCity && matchesQuery;
  });
}

/** Villes réellement présentes dans le catalogue, triées alphabétiquement. */
export function extractCities(restaurants: Restaurant[]): string[] {
  return Array.from(new Set(restaurants.map((restaurant) => restaurant.city))).sort((a, b) =>
    a.localeCompare(b, 'fr'),
  );
}
