import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <span className="brand__mark brand__mark--footer" aria-hidden="true">
            <UtensilsCrossed size={18} />
          </span>
          <div>
            <p className="footer__title">La Bonne Table</p>
            <p className="footer__text">
              Découvrez les meilleures tables de votre ville et réservez en quelques instants.
            </p>
          </div>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Navigation</h2>
          <ul className="footer__list">
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/recherche">Rechercher un restaurant</Link>
            </li>
            <li>
              <Link to="/inscription">Créer un compte</Link>
            </li>
            <li>
              <Link to="/connexion">Se connecter</Link>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h2 className="footer__heading">Projet</h2>
          <ul className="footer__list">
            <li>Module M210 — Approche Agile</li>
            <li>Client : TableConnect SARL</li>
            <li>Méthodologie Scrum</li>
            <li>Jira : La Table Bonne</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} La Bonne Table — Projet académique.</p>
        <p className="footer__disclaimer">
          Sprint 1 : interfaces d’authentification et de recherche. Données de démonstration —
          aucune réservation n’est réellement enregistrée.
        </p>
      </div>
    </footer>
  );
}
