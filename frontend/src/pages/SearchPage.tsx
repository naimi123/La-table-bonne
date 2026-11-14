import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, RotateCcw, SearchX } from 'lucide-react';
import { SearchBar } from '../components/restaurants/SearchBar';
import { RestaurantCard } from '../components/restaurants/RestaurantCard';
import { RestaurantGridSkeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { searchRestaurants } from '../services/restaurantService';
import { CITIES } from '../data/restaurants';
import type { AsyncStatus, Restaurant } from '../types';

export function SearchPage() {
  useDocumentTitle('Rechercher un restaurant');
  const [searchParams, setSearchParams] = useSearchParams();

  const city = searchParams.get('city') ?? '';
  const query = searchParams.get('q') ?? '';

  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [results, setResults] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    setStatus('loading');
    setError(null);

    searchRestaurants({ city, query })
      .then((data) => {
        if (isCancelled) return;
        setResults(data);
        setStatus('success');
      })
      .catch((caught: unknown) => {
        if (isCancelled) return;
        setError(caught instanceof Error ? caught.message : 'La recherche a échoué.');
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [city, query, reloadKey]);

  const applyFilters = (next: { city?: string; query?: string }) => {
    const params = new URLSearchParams();
    const nextCity = next.city ?? city;
    const nextQuery = next.query ?? query;
    if (nextCity) params.set('city', nextCity);
    if (nextQuery) params.set('q', nextQuery);
    setSearchParams(params, { replace: false });
  };

  const resetFilters = () => setSearchParams(new URLSearchParams());

  const filtersActive = Boolean(city || query);

  return (
    <section className="section section--page">
      <div className="container">
        <header className="page-header">
          <div>
            <p className="eyebrow">Catalogue</p>
            <h1 className="page-header__title">Trouver une table</h1>
            <p className="page-header__lead">
              Filtrez par ville, puis affinez par nom de restaurant, cuisine ou spécialité.
            </p>
          </div>
          <Badge tone="outline">US04 · Sprint 1</Badge>
        </header>

        <div className="search-panel">
          <SearchBar
            cities={CITIES}
            initialCity={city}
            initialQuery={query}
            onSubmit={({ city: nextCity, query: nextQuery }) =>
              applyFilters({ city: nextCity, query: nextQuery })
            }
          />

          <div className="chip-row" role="group" aria-label="Filtrer par ville">
            <button
              type="button"
              className={`chip ${!city ? 'chip--active' : ''}`.trim()}
              aria-pressed={!city}
              onClick={() => applyFilters({ city: '' })}
            >
              Toutes les villes
            </button>
            {CITIES.map((option) => (
              <button
                key={option}
                type="button"
                className={`chip ${city === option ? 'chip--active' : ''}`.trim()}
                aria-pressed={city === option}
                onClick={() => applyFilters({ city: option })}
              >
                <MapPin size={13} aria-hidden="true" />
                {option}
              </button>
            ))}
          </div>

          <p className="filters-note">
            Les filtres par cuisine et par budget arriveront au Sprint 2 (US05).
          </p>
        </div>

        <div className="results-bar">
          <p className="results-bar__count" role="status" aria-live="polite">
            {status === 'loading'
              ? 'Recherche en cours…'
              : status === 'success'
                ? `${results.length} restaurant${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`
                : 'Résultats indisponibles'}
            {status === 'success' && city ? ` à ${city}` : ''}
            {status === 'success' && query ? ` pour « ${query} »` : ''}
          </p>

          {filtersActive ? (
            <Button variant="ghost" size="sm" onClick={resetFilters} iconLeft={<RotateCcw size={15} />}>
              Réinitialiser
            </Button>
          ) : null}
        </div>

        <div aria-busy={status === 'loading'}>
          {status === 'loading' || status === 'idle' ? <RestaurantGridSkeleton /> : null}

          {status === 'error' ? (
            <div className="stack">
              <Alert variant="error" title="Impossible de charger les restaurants">
                {error}
              </Alert>
              <Button variant="secondary" onClick={() => setReloadKey((key) => key + 1)}>
                Réessayer
              </Button>
            </div>
          ) : null}

          {status === 'success' && results.length === 0 ? (
            <EmptyState
              icon={<SearchX size={26} />}
              title={city ? `Aucun restaurant à ${city}` : 'Aucun restaurant ne correspond'}
              description="Essayez une autre ville, un autre mot-clé, ou parcourez l’ensemble de nos adresses."
              action={
                <Button variant="secondary" onClick={resetFilters} iconLeft={<RotateCcw size={16} />}>
                  Voir toutes les adresses
                </Button>
              }
            />
          ) : null}

          {status === 'success' && results.length > 0 ? (
            <div className="restaurant-grid">
              {results.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
