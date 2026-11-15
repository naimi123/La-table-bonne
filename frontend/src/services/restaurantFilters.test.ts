import { describe, expect, it } from 'vitest';
import { extractCities, filterRestaurants } from './restaurantFilters';
import { CITIES, MOCK_RESTAURANTS } from '../data/restaurants';
import type { Restaurant } from '../types';

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Le Jardin d’Hiver',
    city: 'Casablanca',
    address: 'Rue A',
    cuisine: 'Française',
    priceRange: '€€€',
    rating: 4.8,
    reviewCount: 10,
    description: '',
    imageUrl: '',
    tags: ['Terrasse'],
    openingHours: '',
    capacity: 40,
  },
  {
    id: '2',
    name: 'Dar Zellij',
    city: 'Marrakech',
    address: 'Derb B',
    cuisine: 'Marocaine',
    priceRange: '€€',
    rating: 4.6,
    reviewCount: 20,
    description: '',
    imageUrl: '',
    tags: ['Tajine'],
    openingHours: '',
    capacity: 60,
  },
  {
    id: '3',
    name: 'Osteria Nera',
    city: 'Rabat',
    address: 'Avenue C',
    cuisine: 'Italienne',
    priceRange: '€€',
    rating: 4.5,
    reviewCount: 30,
    description: '',
    imageUrl: '',
    tags: ['Pâtes fraîches'],
    openingHours: '',
    capacity: 50,
  },
];

describe('filterRestaurants', () => {
  it('renvoie tout le catalogue sans filtre', () => {
    expect(filterRestaurants(restaurants, {})).toHaveLength(3);
  });

  it('filtre par ville', () => {
    const result = filterRestaurants(restaurants, { city: 'Marrakech' });
    expect(result.map((item) => item.name)).toEqual(['Dar Zellij']);
  });

  it('ignore la casse et les accents sur la ville', () => {
    expect(filterRestaurants(restaurants, { city: '  marrakech ' })).toHaveLength(1);
  });

  it('filtre par nom ou cuisine', () => {
    expect(filterRestaurants(restaurants, { query: 'osteria' })).toHaveLength(1);
    expect(filterRestaurants(restaurants, { query: 'française' })).toHaveLength(1);
    expect(filterRestaurants(restaurants, { query: 'francaise' })).toHaveLength(1);
  });

  it('combine ville et mot-clé', () => {
    expect(filterRestaurants(restaurants, { city: 'Rabat', query: 'jardin' })).toHaveLength(0);
  });

  it('renvoie un tableau vide si aucune correspondance', () => {
    expect(filterRestaurants(restaurants, { city: 'Agadir' })).toEqual([]);
  });
});

describe('filterRestaurants — catalogue de démonstration (US04)', () => {
  it('ne renvoie que les restaurants de la ville demandée, pour chaque ville', () => {
    for (const city of CITIES) {
      const results = filterRestaurants(MOCK_RESTAURANTS, { city });
      expect(results.length).toBeGreaterThan(0);
      expect(results.every((restaurant) => restaurant.city === city)).toBe(true);
    }
  });

  it('met à jour les résultats quand la ville change', () => {
    const marrakech = filterRestaurants(MOCK_RESTAURANTS, { city: 'Marrakech' });
    const casablanca = filterRestaurants(MOCK_RESTAURANTS, { city: 'Casablanca' });

    expect(marrakech.map((restaurant) => restaurant.id)).toEqual(['r-002', 'r-008']);
    expect(casablanca.map((restaurant) => restaurant.id)).toEqual(['r-001', 'r-007']);

    const marrakechIds = new Set(marrakech.map((restaurant) => restaurant.id));
    expect(casablanca.some((restaurant) => marrakechIds.has(restaurant.id))).toBe(false);
  });

  it('renvoie un état vide pour une ville absente du catalogue', () => {
    expect(filterRestaurants(MOCK_RESTAURANTS, { city: 'Agadir', query: 'Jardin' })).toEqual([]);
  });

  it('trouve une ville quel que soit l’accent ou la casse', () => {
    const reference = filterRestaurants(MOCK_RESTAURANTS, { city: 'Fès' });
    expect(reference).toHaveLength(2);
    expect(filterRestaurants(MOCK_RESTAURANTS, { city: 'fes' })).toEqual(reference);
    expect(filterRestaurants(MOCK_RESTAURANTS, { city: 'FÈS' })).toEqual(reference);
  });
});

describe('extractCities', () => {
  it('renvoie les villes uniques triées', () => {
    expect(extractCities(restaurants)).toEqual(['Casablanca', 'Marrakech', 'Rabat']);
  });

  it('correspond aux six villes annoncées par le catalogue', () => {
    expect(extractCities(MOCK_RESTAURANTS)).toEqual([...CITIES].sort((a, b) => a.localeCompare(b, 'fr')));
  });
});
