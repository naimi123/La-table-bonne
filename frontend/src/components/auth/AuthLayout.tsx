import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

/** Mise en page commune aux écrans d'authentification (US01, US02, US03). */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <section className="auth-layout">
      <div className="container auth-layout__inner">
        <aside className="auth-aside" aria-hidden="true">
          <img
            className="auth-aside__image"
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=80"
            alt=""
            loading="lazy"
          />
          <div className="auth-aside__overlay">
            <Link to="/" className="brand brand--light">
              <span className="brand__mark" aria-hidden="true">
                <UtensilsCrossed size={18} />
              </span>
              <span className="brand__text">
                <strong>La Bonne Table</strong>
                <span>TableConnect</span>
              </span>
            </Link>
            <div>
              <p className="auth-aside__eyebrow">Sprint 1 · Accès &amp; recherche</p>
              <p className="auth-aside__title">{title}</p>
              <p className="auth-aside__text">{subtitle}</p>
            </div>
            <p className="auth-aside__note">
              Projet académique M210 — Approche Agile. Interface réalisée par Zakaria Adli
              (Front-End).
            </p>
          </div>
        </aside>

        <div className="auth-panel">
          {children}
          <div className="auth-panel__footer">{footer}</div>
        </div>
      </div>
    </section>
  );
}
