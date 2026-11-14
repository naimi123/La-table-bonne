import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

/**
 * Bandeau de transparence : rappelle que les fonctions Back-End sont simulées.
 * Obligatoire pour ne pas laisser croire à une authentification réelle.
 */
export function MockNotice({ children }: { children?: ReactNode }) {
  return (
    <aside className="mock-notice">
      <Info size={16} aria-hidden="true" />
      <p>
        {children ?? (
          <>
            <strong>Mode démonstration académique.</strong> Les comptes sont enregistrés
            uniquement dans ce navigateur (localStorage). Aucun serveur, aucune base de données
            et aucun e-mail réel ne sont utilisés.
          </>
        )}
      </p>
    </aside>
  );
}
