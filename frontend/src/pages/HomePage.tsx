import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarCheck, MapPin, Search, ShieldCheck, Star, UtensilsCrossed } from 'lucide-react';
import { SearchBar } from '../components/restaurants/SearchBar';
import { RestaurantCard } from '../components/restaurants/RestaurantCard';
import { RestaurantGridSkeleton } from '../components/ui/Skeleton';
import { Alert } from '../components/ui/Alert';
import { Badge } from '../components/ui/Badge';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getFeaturedRestaurants } from '../services/restaurantService';
import { CITIES } from '../data/restaurants';
import type { AsyncStatus, Restaurant } from '../types';

const STEPS = [
  {
    icon: Search,
    title: 'Cherchez',
    text: 'Saisissez votre ville et laissez-vous guider parmi les adresses sélectionnées.',
  },
  {
    icon: CalendarCheck,
    title: 'Choisissez',
    text: 'Consultez la fiche du restaurant, ses horaires et sa cuisine avant de décider.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Réservez',
    text: 'La réservation en ligne arrive au Sprint 2 : créneaux, confirmation et suivi.',
  },
];

export function HomePage() {
  useDocumentTitle();
  const navigate = useNavigate();
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [featured, setFeatured] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    setStatus('loading');

    getFeaturedRestaurants(3)
      .then((data) => {
        if (isCancelled) return;
        setFeatured(data);
        setStatus('success');
      })
      .catch((caught: unknown) => {
        if (isCancelled) return;
        setError(caught instanceof Error ? caught.message : 'Impossible de charger la sélection.');
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleSearch = ({ city, query }: { city: string; query: string }) => {
    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (query) params.set('q', query);
    navigate(`/recherche?${params.toString()}`);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow">TableConnect SARL · Plateforme de réservation</p>
            <h1 className="hero__title">
              La bonne table,
              <br />
              au bon moment.
            </h1>
            <p className="hero__lead">
              Découvrez les restaurants de votre ville, comparez les cuisines et préparez votre
              prochaine réservation en quelques clics.
            </p>

            <SearchBar
              cities={CITIES}
              onSubmit={handleSearch}
              autoFocus
              submitLabel="Trouver une table"
            />

            <dl className="hero__stats">
              <div>
                <dt>Adresses sélectionnées</dt>
                <dd>10</dd>
              </div>
              <div>
                <dt>Villes couvertes</dt>
                <dd>6</dd>
              </div>
              <div>
                <dt>Note moyenne</dt>
                <dd>4,5</dd>
              </div>
            </dl>
          </div>

          <div className="hero__media">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=80"
              alt="Salle d’un restaurant élégant dressée pour le service"
              loading="eager"
            />
            <div className="hero__card">
              <span className="hero__card-icon" aria-hidden="true">
                <Star size={16} />
              </span>
              <div>
                <p className="hero__card-title">Le Jardin d’Hiver</p>
                <p className="hero__card-meta">
                  <MapPin size={13} aria-hidden="true" /> Casablanca · Française
                </p>
              </div>
              <span className="hero__card-rating">4,8</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="featured-title">
        <div className="container">
          <div className="section__header">
            <div>
              <p className="eyebrow">Sélection</p>
              <h2 id="featured-title" className="section__title">
                Les tables les mieux notées
              </h2>
            </div>
            <Link to="/recherche" className="link-arrow">
              Voir toutes les adresses
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {status === 'loading' || status === 'idle' ? <RestaurantGridSkeleton count={3} /> : null}

          {status === 'error' ? (
            <Alert variant="error" title="La sélection n’a pas pu être chargée">
              {error}
            </Alert>
          ) : null}

          {status === 'success' ? (
            <div className="restaurant-grid">
              {featured.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="steps-title">
        <div className="container">
          <div className="section__header section__header--center">
            <div>
              <p className="eyebrow">Parcours client</p>
              <h2 id="steps-title" className="section__title">
                Trois étapes, une table
              </h2>
            </div>
          </div>

          <ol className="steps">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="step">
                  <span className="step__number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="step__icon" aria-hidden="true">
                    <Icon size={20} />
                  </span>
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__text">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="sprint-title">
        <div className="container">
          <div className="notice-band">
            <div>
              <Badge tone="accent">Sprint 1 — en cours</Badge>
              <h2 id="sprint-title" className="notice-band__title">
                Un projet académique, développé en Scrum
              </h2>
              <p className="notice-band__text">
                Ce site est la livraison Front-End du module M210. L’inscription, la connexion, la
                réinitialisation du mot de passe et la recherche par ville sont opérationnelles en
                mode démonstration. La disponibilité des tables et la réservation seront livrées aux
                Sprints 2 et 3.
              </p>
            </div>
            <div className="notice-band__aside">
              <ShieldCheck size={22} aria-hidden="true" />
              <p>
                Aucune donnée personnelle n’est transmise : les comptes de démonstration restent
                dans votre navigateur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
