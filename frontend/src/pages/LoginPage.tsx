import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { TextField } from '../components/ui/TextField';
import { PasswordField } from '../components/ui/PasswordField';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { MockNotice } from '../components/ui/MockNotice';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import { validateLogin, type FieldErrors } from '../utils/validation';

export function LoginPage() {
  useDocumentTitle('Connexion');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/compte';

  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field: 'email' | 'password', value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateLogin(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setFormError(null);
    try {
      await login(values.email.trim(), values.password);
      navigate(redirectTo, { replace: true });
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : 'La connexion a échoué.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Bon retour à table."
      subtitle="Connectez-vous pour retrouver vos restaurants favoris et, dès le Sprint 2, vos réservations."
      footer={
        <p>
          Pas encore de compte ?{' '}
          <Link to="/inscription">Créer un compte client</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate aria-labelledby="login-title">
        <div className="auth-form__header">
          <h1 id="login-title">Connexion</h1>
          <p>Accédez à votre espace client.</p>
        </div>

        {formError ? <Alert variant="error" title="Connexion impossible">{formError}</Alert> : null}

        <TextField
          label="Adresse e-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.com"
          icon={<Mail size={17} />}
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
          required
        />

        <PasswordField
          label="Mot de passe"
          name="password"
          autoComplete="current-password"
          placeholder="Votre mot de passe"
          value={values.password}
          error={errors.password}
          onChange={(event) => update('password', event.target.value)}
          required
        />

        <div className="auth-form__row">
          <Link to="/mot-de-passe-oublie" className="auth-form__link">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" block size="lg" isLoading={isSubmitting} iconRight={<ArrowRight size={17} />}>
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </Button>

        <MockNotice />
      </form>
    </AuthLayout>
  );
}
