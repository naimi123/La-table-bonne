import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function NotFoundPage() {
  useDocumentTitle('Page introuvable');

  return (
    <section className="section section--page">
      <div className="container">
        <EmptyState
          headingLevel="h1"
          icon={<Compass size={26} />}
          title="Cette page n’existe pas (404)"
          description="Le lien est peut-être obsolète, ou la page n’a pas encore été développée dans le cadre du Sprint en cours."
          action={
            <Link to="/" className="btn btn--primary">
              Revenir à l’accueil
            </Link>
          }
        />
      </div>
    </section>
  );
}
