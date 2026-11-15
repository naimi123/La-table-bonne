import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';
import type { Restaurant } from '../types';

const { searchRestaurants } = vi.hoisted(() => ({
  searchRestaurants: vi.fn(),
}));

vi.mock('../services/restaurantService', () => ({
  searchRestaurants,
}));

const restaurant: Restaurant = {
  id: 'r-test',
  name: 'Table de Test',
  city: 'Marrakech',
  address: 'Rue du Test',
  cuisine: 'Marocaine',
  priceRange: '€€',
  rating: 4.5,
  reviewCount: 12,
  description: 'Restaurant utilisé pour vérifier le bouton Réessayer.',
  imageUrl: '',
  tags: ['Test'],
  openingHours: '12:00 – 23:00',
  capacity: 20,
};

function renderSearchRoute(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('SearchPage — état d’erreur', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
    searchRestaurants.mockReset();
  });

  it('affiche l’erreur puis recharge les résultats avec Réessayer', async () => {
    searchRestaurants
      .mockRejectedValueOnce(new Error('Le serveur est injoignable.'))
      .mockResolvedValueOnce([restaurant]);

    const user = userEvent.setup();
    renderSearchRoute('/recherche?city=Marrakech');

    expect(
      await screen.findByText(
        'Impossible de charger les restaurants',
        {},
        { timeout: 4000 },
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Le serveur est injoignable.')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Table de Test' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Réessayer' }));

    expect(
      await screen.findByRole('link', { name: 'Table de Test' }, { timeout: 4000 }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Impossible de charger les restaurants')).not.toBeInTheDocument();
    expect(searchRestaurants).toHaveBeenCalledTimes(2);
  });
});
