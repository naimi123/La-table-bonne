import { useEffect, useId, useState, type FormEvent } from 'react';
import { MapPin, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { sanitizeText } from '../../utils/validation';

interface SearchBarProps {
  cities: readonly string[];
  initialCity?: string;
  initialQuery?: string;
  submitLabel?: string;
  onSubmit: (values: { city: string; query: string }) => void;
  autoFocus?: boolean;
}

/** Barre de recherche par ville (US04), réutilisée sur l'accueil et la page résultats. */
export function SearchBar({
  cities,
  initialCity = '',
  initialQuery = '',
  submitLabel = 'Rechercher',
  onSubmit,
  autoFocus = false,
}: SearchBarProps) {
  const baseId = useId();
  const cityId = `city-${baseId}`;
  const queryId = `query-${baseId}`;
  const citiesListId = `cities-${baseId}`;

  const [city, setCity] = useState(initialCity);
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCity(initialCity);
    setQuery(initialQuery);
  }, [initialCity, initialQuery]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanCity = sanitizeText(city, 60);
    const cleanQuery = sanitizeText(query, 60);

    if (!cleanCity && !cleanQuery) {
      setError('Indiquez une ville ou le nom d’un restaurant pour lancer la recherche.');
      return;
    }

    setError(null);
    onSubmit({ city: cleanCity, query: cleanQuery });
  };

  return (
    <form className="search-form" role="search" onSubmit={handleSubmit} noValidate>
      <div className="search-form__field">
        <label htmlFor={cityId}>Ville</label>
        <div className="search-form__control">
          <MapPin size={18} aria-hidden="true" />
          <input
            id={cityId}
            name="city"
            type="text"
            list={citiesListId}
            placeholder="Casablanca, Rabat, Marrakech…"
            value={city}
            autoComplete="address-level2"
            autoFocus={autoFocus}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${cityId}-error` : undefined}
            onChange={(event) => setCity(event.target.value)}
          />
          <datalist id={citiesListId}>
            {cities.map((option) => (
              <option key={option} value={option} />
            ))}
          </datalist>
        </div>
      </div>

      <div className="search-form__field">
        <label htmlFor={queryId}>Restaurant ou cuisine</label>
        <div className="search-form__control">
          <Search size={18} aria-hidden="true" />
          <input
            id={queryId}
            name="q"
            type="search"
            placeholder="Nom, cuisine, specialité…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${cityId}-error` : undefined}
          />
        </div>
      </div>

      <Button type="submit" size="lg" className="search-form__submit" iconLeft={<Search size={18} />}>
        {submitLabel}
      </Button>

      {error ? (
        <p className="search-form__error" id={`${cityId}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
