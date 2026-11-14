import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, KeyRound } from 'lucide-react';
import { TextField } from '../components/ui/TextField';
import { PasswordField } from '../components/ui/PasswordField';
import { PasswordStrengthMeter } from '../components/ui/PasswordStrengthMeter';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { MockNotice } from '../components/ui/MockNotice';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { resetPassword } from '../services/authService';
import { validateResetPassword, type FieldErrors } from '../utils/validation';

export function ResetPasswordPage() {
  useDocumentTitle('Réinitialiser le mot de passe');

  const initialToken = new URLSearchParams(window.location.search).get('token') ?? '';
  const [token, setToken] = useState(initialToken);
  const [values, setValues] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateResetPassword(values);
    if (!token.trim()) {
      validation.token = 'Le jeton de réinitialisation est obligatoire.';
    }
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setFormError(null);
    try {
      await resetPassword(token.trim(), values.password);
      setIsDone(true);
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : 'La réinitialisation a échoué.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Choisissez un nouveau mot de passe."
      subtitle="Le lien est valable 15 minutes et ne peut être utilisé qu’une seule fois."
      footer={
        <p>
          <Link to="/connexion">Retour à la connexion</Link>
        </p>
      }
    >
      <div className="auth-form">
        <div className="auth-form__header">
          <h1>Nouveau mot de passe</h1>
          <p>Définissez un mot de passe solide et unique.</p>
        </div>

        {formError ? <Alert variant="error" title="Réinitialisation impossible">{formError}</Alert> : null}

        {isDone ? (
          <>
            <Alert variant="success" title="Mot de passe mis à jour">
              Votre mot de passe a été remplacé dans le stockage de démonstration. Vous pouvez
              maintenant vous connecter avec le nouveau mot de passe.
            </Alert>
            <Link to="/connexion" className="btn btn--primary btn--block">
              <span>Se connecter</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="stack">
            <TextField
              label="Jeton de réinitialisation"
              name="token"
              placeholder="Collez le jeton reçu"
              icon={<KeyRound size={17} />}
              hint="En production, ce jeton est transmis par le lien reçu par e-mail."
              value={token}
              error={errors.token}
              onChange={(event) => {
                setToken(event.target.value);
                setErrors((current) => ({ ...current, token: '' }));
              }}
              required
            />

            <div>
              <PasswordField
                label="Nouveau mot de passe"
                name="password"
                autoComplete="new-password"
                placeholder="8 caractères minimum"
                hint="Au moins 8 caractères, dont une lettre et un chiffre."
                value={values.password}
                error={errors.password}
                onChange={(event) => {
                  setValues((current) => ({ ...current, password: event.target.value }));
                  setErrors((current) => ({ ...current, password: '' }));
                }}
                required
              />
              <PasswordStrengthMeter password={values.password} />
            </div>

            <PasswordField
              label="Confirmer le nouveau mot de passe"
              name="confirmPassword"
              autoComplete="new-password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(event) => {
                setValues((current) => ({ ...current, confirmPassword: event.target.value }));
                setErrors((current) => ({ ...current, confirmPassword: '' }));
              }}
              required
            />

            <Button type="submit" block size="lg" isLoading={isSubmitting}>
              {isSubmitting ? 'Mise à jour…' : 'Réinitialiser le mot de passe'}
            </Button>
          </form>
        )}

        <MockNotice>
          <strong>Mode démonstration académique.</strong> La vérification du jeton et la mise à
          jour du mot de passe sont simulées localement (aucun serveur).
        </MockNotice>
      </div>
    </AuthLayout>
  );
}
