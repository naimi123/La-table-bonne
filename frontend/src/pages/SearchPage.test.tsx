import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

function renderSearchRoute(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

const RESULTS_TIMEOUT = 4000;

describe('SearchPage — résultats et filtres US04', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('ne renvoie que les restaurants de la ville demandée', async () => {
    renderSearchRoute('/recherche?city=Marrakech');

    expect(
      await screen.findByText(
        '2 restaurants trouvés à Marrakech',
        {},
        { timeout: RESULTS_TIMEOUT },
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: 'Dar Zellij' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'La Table du Souk' })).toBeInTheDocument();
    // Aucun restaurant d'une autre ville ne doit apparaître.
    expect(screen.queryByRole('link', { name: 'Le Jardin d’Hiver' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Osteria Nera' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Atlas Grill' })).not.toBeInTheDocument();
  });

  it('met à jour les résultats et l’URL quand la ville change', async () => {
    const user = userEvent.setup();
    renderSearchRoute('/recherche?city=Marrakech');

    await screen.findByText(
      '2 restaurants trouvés à Marrakech',
      {},
      { timeout: RESULTS_TIMEOUT },
    );

    await user.click(screen.getByRole('button', { name: 'Casablanca' }));

    expect(
      await screen.findByText(
        '2 restaurants trouvés à Casablanca',
        {},
        { timeout: RESULTS_TIMEOUT },
      ),
    ).toBeInTheDocument();

    expect(window.location.search).toBe('?city=Casablanca');
    expect(screen.getByRole('link', { name: 'Le Jardin d’Hiver' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sakura Comptoir' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Dar Zellij' })).not.toBeInTheDocument();
  });

  it('affiche un état vide puis restaure le catalogue complet', async () => {
    const user = userEvent.setup();
    renderSearchRoute('/recherche?city=Agadir&q=Jardin');

    expect(
      await screen.findByRole(
        'heading',
        { name: 'Aucun restaurant à Agadir' },
        { timeout: RESULTS_TIMEOUT },
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('0 restaurant trouvé à Agadir pour « Jardin »')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Voir toutes les adresses' }));

    expect(
      await screen.findByText('10 restaurants trouvés', {}, { timeout: RESULTS_TIMEOUT }),
    ).toBeInTheDocument();
    expect(window.location.search).toBe('');
  });

  it('refuse une recherche vide avec un message explicite', async () => {
    const user = userEvent.setup();
    renderSearchRoute('/recherche');

    await user.click(screen.getByRole('button', { name: 'Rechercher' }));

    expect(
      screen.getByText(
        'Indiquez une ville ou le nom d’un restaurant pour lancer la recherche.',
      ),
    ).toBeInTheDocument();
    expect(window.location.search).toBe('');
  });

  it('navigue depuis la barre de recherche de l’accueil vers les résultats', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/');
    render(<App />);

    await user.type(screen.getByLabelText('Ville'), 'Rabat');
    await user.click(screen.getByRole('button', { name: 'Trouver une table' }));

    expect(window.location.pathname).toBe('/recherche');
    expect(window.location.search).toBe('?city=Rabat');
    expect(
      await screen.findByText(
        '2 restaurants trouvés à Rabat',
        {},
        { timeout: RESULTS_TIMEOUT },
      ),
    ).toBeInTheDocument();
  });

  it('affiche les squelettes et l’état de chargement avant les résultats', async () => {
    const { container } = renderSearchRoute('/recherche?city=Marrakech');

    expect(container.querySelectorAll('.restaurant-card--skeleton').length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText('Recherche en cours…')).toBeInTheDocument();
      expect(container.querySelector('[aria-busy="true"]')).toBeTruthy();
    });

    expect(
      await screen.findByText(
        '2 restaurants trouvés à Marrakech',
        {},
        { timeout: RESULTS_TIMEOUT },
      ),
    ).toBeInTheDocument();
    expect(container.querySelector('[aria-busy="true"]')).toBeNull();
  });
});
