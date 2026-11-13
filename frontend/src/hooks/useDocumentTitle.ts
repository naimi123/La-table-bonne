import { useEffect } from 'react';

const BASE_TITLE = 'La Bonne Table';

/** Met à jour le titre du document (accessibilité / navigation). */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE_TITLE}` : `${BASE_TITLE} — Réservez votre table`;
  }, [title]);
}
