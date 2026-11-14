import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Star } from 'lucide-react';
import type { Restaurant } from '../../types';
import { formatRating } from '../../utils/format';
import { RestaurantImage } from './RestaurantImage';

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-card__media">
        <RestaurantImage src={restaurant.imageUrl} alt={`Salle du restaurant ${restaurant.name}`} />
        <span className="restaurant-card__price" aria-label={`Gamme de prix ${restaurant.priceRange}`}>
          {restaurant.priceRange}
        </span>
      </div>

      <div className="restaurant-card__body">
        <div className="restaurant-card__top">
          <h3 className="restaurant-card__title">
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h3>
          <span className="restaurant-card__rating" aria-label={`Note ${formatRating(restaurant.rating)} sur 5`}>
            <Star size={14} aria-hidden="true" />
            {formatRating(restaurant.rating)}
          </span>
        </div>

        <p className="restaurant-card__meta">
          <MapPin size={14} aria-hidden="true" />
          <span>
            {restaurant.city} · {restaurant.cuisine}
          </span>
        </p>

        <p className="restaurant-card__desc">{restaurant.description}</p>

        <ul className="restaurant-card__tags">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="restaurant-card__footer">
          <span className="restaurant-card__reviews">{restaurant.reviewCount} avis</span>
          <Link to={`/restaurants/${restaurant.id}`} className="restaurant-card__link">
            Découvrir
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
