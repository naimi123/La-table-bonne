import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarClock,
  Clock,
  MapPin,
  Star,
  Users,
  Utensils,
} from 'lucide-react';
import { getRestaurantById } from '../services/restaurantService';
import { RestaurantImage } from '../components/restaurants/RestaurantImage';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { EmptyState } from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { formatRating } from '../utils/format';
import type { AsyncStatus, Restaurant } from '../types';

/**
 * Fiche restaurant — base de l'US06 (Sprint 2).
 * Sprint 1 : consultation en lecture seule. Le calendrier de disponibilités (US07)
 * et la réservation (US08) ne sont volontairement pas encore activés.
 */
export function RestaurantDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);

  useDocumentTitle(restaurant?.name ?? 'Fiche restaurant');

  useEffect(() => {
    if (!id) return;
    let isCancelled = false;
    setStatus('loading');

    getRestaurantById(id)
      .then((data) => {
        if (isCancelled) return;
        setRestaurant(data);
        setStatus('success');
      })
      .catch((caught: unknown) => {
        if (isCancelled) return;
        setError(caught instanceof Error ? caught.message : 'Restaurant introuvable.');
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (status === 'error') {
    return (
      <section className="section section--page">
        <div className="container">
          <EmptyState
            headingLevel="h1"
            icon={<Utensils size={26} />}
            title="Restaurant introuvable"
            description={error ?? 'Cette fiche n’existe pas ou n’est plus disponible.'}
            action={
              <Link to="/recherche" className="btn btn--secondary">
                Retour à la recherche
              </Link>
            }
          />
        </div>
      </section>
    );
  }

  if (status !== 'success' || !restaurant) {
    return (
      <section className="section section--page">
        <div className="container" aria-busy="true">
          <div className="skeleton skeleton--line skeleton--w-40" />
          <div className="skeleton skeleton--hero" />
        </div>
      </section>
    );
  }

  return (
    <section className="section section--page">
      <div className="container">
        <Link to="/recherche" className="back-link">
          <ArrowLeft size={16} aria-hidden="true" />
          Retour aux restaurants
        </Link>

        <div className="detail-hero">
          <RestaurantImage
            src={restaurant.imageUrl}
            alt={`Salle du restaurant ${restaurant.name}`}
            className="detail-hero__image"
          />
          <div className="detail-hero__content">
            <div className="detail-hero__badges">
              <Badge tone="accent">{restaurant.cuisine}</Badge>
              <Badge tone="outline">{restaurant.priceRange}</Badge>
              <Badge tone="outline">US06 · Sprint 2</Badge>
            </div>
            <h1 className="detail-hero__title">{restaurant.name}</h1>
            <p className="detail-hero__meta">
              <MapPin size={15} aria-hidden="true" /> {restaurant.address}, {restaurant.city}
            </p>
            <p className="detail-hero__meta">
              <Star size={15} aria-hidden="true" /> {formatRating(restaurant.rating)} / 5 ·{' '}
              {restaurant.reviewCount} avis
            </p>
            <p className="detail-hero__desc">{restaurant.description}</p>

            <ul className="detail-hero__tags">
              {restaurant.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className="detail-hero__cta">
              <Button disabled title="Disponible au Sprint 2">
                Réserver une table
              </Button>
              <p className="detail-hero__cta-note">
                <CalendarClock size={15} aria-hidden="true" />
                Calendrier de disponibilités et réservation : Sprint 2 (US07 / US08).
              </p>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <article className="panel">
            <h2 className="panel__title">
              <Clock size={17} aria-hidden="true" /> Horaires
            </h2>
            <p>{restaurant.openingHours}</p>
          </article>
          <article className="panel">
            <h2 className="panel__title">
              <Users size={17} aria-hidden="true" /> Capacité
            </h2>
            <p>{restaurant.capacity} couverts — configuration des créneaux au Sprint 3 (US11).</p>
          </article>
          <article className="panel">
            <h2 className="panel__title">
              <Utensils size={17} aria-hidden="true" /> Cuisine
            </h2>
            <p>{restaurant.cuisine}</p>
          </article>
        </div>

        <Alert variant="info" title="Données de démonstration">
          Cette fiche provient du catalogue simulé du Front-End. Les informations seront servies par
          l’API Back-End (<code>GET /restaurants/{restaurant.id}</code>) dès sa mise à disposition.
        </Alert>
      </div>
    </section>
  );
}
