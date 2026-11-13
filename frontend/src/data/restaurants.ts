/**
 * Données de démonstration (mock) — Sprint 1, US04.
 * Aucune de ces données ne provient d'une base de données :
 * elles seront remplacées par l'API Back-End (`GET /restaurants`).
 */
import type { Restaurant } from '../types';

export const CITIES = [
  'Casablanca',
  'Rabat',
  'Marrakech',
  'Fès',
  'Tanger',
  'Agadir',
] as const;

export const CUISINES = [
  'Française',
  'Marocaine',
  'Italienne',
  'Méditerranéenne',
  'Japonaise',
  'Indienne',
  'Fusion',
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 'r-001',
    name: 'Le Jardin d’Hiver',
    city: 'Casablanca',
    address: '12 rue Ahmed Chaouki, Gauthier',
    cuisine: 'Française',
    priceRange: '€€€',
    rating: 4.8,
    reviewCount: 214,
    description:
      'Une table intimiste aux accents français, installée dans une villa Art déco. Cuisine de saison, service attentionné et carte des vins travaillée.',
    imageUrl:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    tags: ['Terrasse', 'Cuisine de saison', 'Vins'],
    openingHours: '12:00 – 14:30 · 19:00 – 23:00',
    capacity: 48,
  },
  {
    id: 'r-002',
    name: 'Dar Zellij',
    city: 'Marrakech',
    address: '6 derb Sidi Bouloukat, Médina',
    cuisine: 'Marocaine',
    priceRange: '€€',
    rating: 4.6,
    reviewCount: 389,
    description:
      'Un riad restauré où la cuisine marocaine traditionnelle rencontre une présentation contemporaine. Tajines mijotés et pâtisseries maison.',
    imageUrl:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    tags: ['Riad', 'Tajine', 'Végétarien'],
    openingHours: '12:00 – 15:00 · 19:00 – 23:30',
    capacity: 60,
  },
  {
    id: 'r-003',
    name: 'Osteria Nera',
    city: 'Rabat',
    address: '45 avenue Mohammed V, Hassan',
    cuisine: 'Italienne',
    priceRange: '€€',
    rating: 4.5,
    reviewCount: 156,
    description:
      'Pâtes fraîches faites maison, four à bois et ambiance chaleureuse. Une adresse simple et généreuse au cœur de la capitale.',
    imageUrl:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    tags: ['Pâtes fraîches', 'Four à bois', 'Familial'],
    openingHours: '12:00 – 15:00 · 18:30 – 23:00',
    capacity: 52,
  },
  {
    id: 'r-004',
    name: 'Maison Bahia',
    city: 'Fès',
    address: '18 rue Talaa Kebira',
    cuisine: 'Marocaine',
    priceRange: '€€€',
    rating: 4.7,
    reviewCount: 271,
    description:
      'Dans une demeure du XIXe siècle, une cuisine marocaine raffinée servie sous les arcades d’un patio de mosaïques.',
    imageUrl:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
    tags: ['Patio', 'Cérémonial du thé', 'Poisson'],
    openingHours: '12:30 – 15:30 · 19:30 – 23:00',
    capacity: 70,
  },
  {
    id: 'r-005',
    name: 'Rive Nord',
    city: 'Tanger',
    address: '3 boulevard Pasteur',
    cuisine: 'Méditerranéenne',
    priceRange: '€€€',
    rating: 4.4,
    reviewCount: 132,
    description:
      'Face au détroit, une cuisine méditerranéenne lumineuse : poissons grillés, légumes confits et huiles d’olive de la région.',
    imageUrl:
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=900&q=80',
    tags: ['Vue mer', 'Poissons', 'Terrasse'],
    openingHours: '12:00 – 15:00 · 19:00 – 23:00',
    capacity: 44,
  },
  {
    id: 'r-006',
    name: 'Atlas Grill',
    city: 'Agadir',
    address: 'Marina, boulevard du 20 Août',
    cuisine: 'Fusion',
    priceRange: '€€',
    rating: 4.2,
    reviewCount: 198,
    description:
      'Grillades au feu de bois et assaisonnements du Souss. Une carte courte, des produits locaux et une terrasse ensoleillée.',
    imageUrl:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
    tags: ['Grillades', 'Bord de mer', 'Sans gluten'],
    openingHours: '12:00 – 23:00',
    capacity: 90,
  },
  {
    id: 'r-007',
    name: 'Sakura Comptoir',
    city: 'Casablanca',
    address: '8 rue Ibn Batouta, Gauthier',
    cuisine: 'Japonaise',
    priceRange: '€€€€',
    rating: 4.9,
    reviewCount: 87,
    description:
      'Comptoir de douze places autour d’un chef. Sushis, sashimis et petits plats japonais dans une atmosphère épurée.',
    imageUrl:
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
    tags: ['Comptoir', 'Poisson cru', 'Omakase'],
    openingHours: '19:00 – 23:00',
    capacity: 12,
  },
  {
    id: 'r-008',
    name: 'La Table du Souk',
    city: 'Marrakech',
    address: 'Place Jemaa el-Fna, entrée nord',
    cuisine: 'Marocaine',
    priceRange: '€',
    rating: 4.1,
    reviewCount: 512,
    description:
      'Une adresse populaire et généreuse : brochettes, harira et salades cuites, servies jusqu’à tard sur la place.',
    imageUrl:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=900&q=80',
    tags: ['Populaire', 'Terrasse', 'Ouvert tard'],
    openingHours: '11:00 – 00:30',
    capacity: 80,
  },
  {
    id: 'r-009',
    name: 'Épices & Braises',
    city: 'Rabat',
    address: '22 rue Oued Fès, Agdal',
    cuisine: 'Indienne',
    priceRange: '€€',
    rating: 4.3,
    reviewCount: 164,
    description:
      'Biryanis, currys parfumés et naans au tandoor. Une cuisine indienne franche, dans une salle aux tons chauds.',
    imageUrl:
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80',
    tags: ['Épicé', 'Tandoor', 'Végétarien'],
    openingHours: '12:00 – 15:00 · 19:00 – 23:00',
    capacity: 56,
  },
  {
    id: 'r-010',
    name: 'Le Comptoir de Fès',
    city: 'Fès',
    address: '5 avenue Hassan II, Ville nouvelle',
    cuisine: 'Française',
    priceRange: '€€€€',
    rating: 4.6,
    reviewCount: 121,
    description:
      'Bistrot gastronomique : produits du terroir, sauces travaillées et pâtisserie maison. Une valeur sûre pour un dîner soigné.',
    imageUrl:
      'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=900&q=80',
    tags: ['Gastronomique', 'Bistrot', 'Réservation conseillée'],
    openingHours: '12:00 – 14:00 · 19:30 – 22:30',
    capacity: 38,
  },
];
