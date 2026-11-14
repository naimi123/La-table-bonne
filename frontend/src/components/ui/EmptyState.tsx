import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  /**
   * Niveau de titre : `h2` par défaut (état vide dans une page existante),
   * `h1` lorsque l'état vide constitue le contenu principal de la page (404).
   */
  headingLevel?: 'h1' | 'h2';
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  headingLevel = 'h2',
}: EmptyStateProps) {
  const Heading = headingLevel;

  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        {icon}
      </span>
      <Heading className="empty-state__title">{title}</Heading>
      <p className="empty-state__description">{description}</p>
      {action ? <div className="empty-state__action">{action}</div> : null}
    </div>
  );
}
