import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Aller au contenu principal
      </a>
      <Navbar />
      <main id="main-content" className="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
