import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CalendarClock, Lock, LogOut, MapPin, Sparkles, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { initials, formatDate } from '../utils/format';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const ROADMAP = [
  { sprint: 'Sprint 1', label: 'Compte, connexion et recherche', status: 'Livré' },
  { sprint: 'Sprint 2', label: 'Filtres, fiches restaurants et réservation', status: 'À venir' },
  { sprint: 'Sprint 3', label: 'Confirmation, annulation et espace restaurateur', status: 'Planifié' },
];

export function AccountPage() {
  useDocumentTitle('Mon compte');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const flash = (location.state as { flash?: string } | null)?.flash;

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <section className="section section--page">
      <div className="container account">
        <header className="page-header">
          <div>
            <p className="eyebrow">Espace client</p>
            <h1 className="page-header__title">Bonjour {user.firstName}</h1>
            <p className="page-header__lead">
              Votre compte est actif. La gestion des réservations sera disponible au Sprint 2.
            </p>
          </div>
          <Badge tone="accent">Client</Badge>
        </header>

        {flash ? <Alert variant="success" title="Compte créé">{flash}</Alert> : null}

        <div className="account__grid">
          <article className="panel profile-card">
            <div className="profile-card__avatar" aria-hidden="true">
              {initials(user.firstName, user.lastName)}
            </div>
            <div>
              <h2 className="profile-card__name">
                {user.firstName} {user.lastName}
              </h2>
              <p className="profile-card__email">{user.email}</p>
              <p className="profile-card__since">
                Membre depuis le {formatDate(user.createdAt)}
              </p>
            </div>

            <dl className="profile-card__list">
              <div>
                <dt>
                  <UserRound size={15} aria-hidden="true" /> Rôle
                </dt>
                <dd>Client</dd>
              </div>
              <div>
                <dt>
                  <MapPin size={15} aria-hidden="true" /> Ville
                </dt>
                <dd>Non renseignée (Sprint 2)</dd>
              </div>
              <div>
                <dt>
                  <CalendarClock size={15} aria-hidden="true" /> Réservations
                </dt>
                <dd>0 — module prévu au Sprint 2</dd>
              </div>
            </dl>

            <Button variant="secondary" onClick={handleLogout} iconLeft={<LogOut size={16} />}>
              Se déconnecter
            </Button>
          </article>

          <article className="panel roadmap-card">
            <h2 className="panel__title">
              <Sparkles size={18} aria-hidden="true" /> Avancement du projet
            </h2>
            <ol className="roadmap">
              {ROADMAP.map((item) => (
                <li key={item.sprint} className="roadmap__item">
                  <span className="roadmap__sprint">{item.sprint}</span>
                  <span className="roadmap__label">{item.label}</span>
                  <span
                    className={`roadmap__status roadmap__status--${item.status === 'Livré' ? 'done' : 'next'}`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ol>

            <p className="roadmap__note">
              <Lock size={14} aria-hidden="true" />
              Les fonctionnalités des Sprints 2 et 3 ne sont pas encore implémentées et ne sont donc
              pas présentées comme disponibles.
            </p>

            <Link to="/recherche" className="link-arrow">
              Explorer les restaurants
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
