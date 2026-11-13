import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
import { ScrollToTop } from './components/routing/ScrollToTop';
import { ProtectedRoute } from './components/routing/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { AccountPage } from './pages/AccountPage';
import { RestaurantDetailsPage } from './pages/RestaurantDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recherche" element={<SearchPage />} />
            <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/inscription" element={<RegisterPage />} />
            <Route path="/mot-de-passe-oublie" element={<ForgotPasswordPage />} />
            <Route path="/reinitialiser-mot-de-passe" element={<ResetPasswordPage />} />
            <Route
              path="/compte"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}
