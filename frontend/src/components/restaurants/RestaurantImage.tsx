import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface RestaurantImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Image avec état de chargement et repli visuel si l'URL distante est
 * indisponible (le catalogue de démonstration utilise des images distantes).
 */
export function RestaurantImage({ src, alt, className = '' }: RestaurantImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <div className={`restaurant-image restaurant-image--fallback ${className}`.trim()} role="img" aria-label={alt}>
        <UtensilsCrossed size={28} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`restaurant-image ${className}`.trim()}>
      {status === 'loading' ? <span className="restaurant-image__placeholder" aria-hidden="true" /> : null}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={status === 'loaded' ? 'is-loaded' : ''}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}
