import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Protège les pages réservées aux clients connectés.
 * Redirige vers /connexion en conservant la destination initiale.
 */
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
