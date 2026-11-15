import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// jsdom n'implémente pas le défilement : ScrollToTop appelle window.scrollTo.
Object.defineProperty(window, 'scrollTo', {
  value: () => undefined,
  writable: true,
});

// Vitest n'active pas les globales : le nettoyage automatique de React Testing
// Library doit donc être déclenché explicitement après chaque test.
afterEach(() => {
  cleanup();
});
