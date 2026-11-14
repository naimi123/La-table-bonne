import { describe, expect, it } from 'vitest';
import { extractCities, filterRestaurants } from './restaurantFilters';
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

describe('extractCities', () => {
  it('renvoie les villes uniques triées', () => {
    expect(extractCities(restaurants)).toEqual(['Casablanca', 'Marrakech', 'Rabat']);
  });
});
