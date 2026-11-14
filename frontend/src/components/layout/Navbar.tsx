import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, UserRound, UtensilsCrossed, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initials } from '../../utils/format';

const NAV_LINKS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/recherche', label: 'Restaurants', end: false },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="brand">
          <span className="brand__mark" aria-hidden="true">
            <UtensilsCrossed size={18} />
          </span>
          <span className="brand__text">
            <strong>La Bonne Table</strong>
            <span>TableConnect</span>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="nav-toggle__label">{isOpen ? 'Fermer' : 'Menu'}</span>
        </button>

        <nav
          id="primary-navigation"
          className={`nav ${isOpen ? 'nav--open' : ''}`.trim()}
          aria-label="Navigation principale"
        >
          <ul className="nav__list">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`.trim()}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            {isAuthenticated && user ? (
              <>
                <Link to="/compte" className="account-chip">
                  <span className="account-chip__avatar" aria-hidden="true">
                    {initials(user.firstName, user.lastName)}
                  </span>
                  <span className="account-chip__text">
                    <small>Connecté</small>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                  </span>
                </Link>
                <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
                  <LogOut size={16} aria-hidden="true" />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/connexion" className="btn btn--ghost btn--sm">
                  <UserRound size={16} aria-hidden="true" />
                  <span>Connexion</span>
                </Link>
                <Link to="/inscription" className="btn btn--primary btn--sm">
                  <span>Créer un compte</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
