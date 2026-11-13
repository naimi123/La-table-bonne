import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// La configuration reste volontairement minimale :
// seules les dépendances nécessaires au Sprint 1 sont présentes.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  },
  preview: {
    port: 4173,
  },
});
