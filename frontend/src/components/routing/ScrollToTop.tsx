import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Remet la page en haut lors d'un changement de route. */
export function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, search]);

  return null;
}
