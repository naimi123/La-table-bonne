import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, KeyRound, Mail } from 'lucide-react';
import { TextField } from '../components/ui/TextField';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { MockNotice } from '../components/ui/MockNotice';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { requestPasswordReset } from '../services/authService';
import { validateResetRequest, type FieldErrors } from '../utils/validation';

interface ResetTicket {
  token: string;
  expiresAt: string;
}

export function ForgotPasswordPage() {
  useDocumentTitle('Mot de passe oublié');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [ticket, setTicket] = useState<ResetTicket | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateResetRequest(email);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setFormError(null);
    try {
      const result = await requestPasswordReset(email.trim());
      setTicket(result);
      setIsSent(true);
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : 'La demande a échoué.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Retrouvez l’accès à votre compte."
      subtitle="Indiquez votre adresse e-mail : nous vous enverrons un lien sécurisé pour choisir un nouveau mot de passe."
      footer={
        <p>
          <Link to="/connexion">Retour à la connexion</Link>
        </p>
      }
    >
      <div className="auth-form">
        <div className="auth-form__header">
          <h1>Mot de passe oublié</h1>
          <p>La réinitialisation est valable 15 minutes.</p>
        </div>

        {formError ? <Alert variant="error" title="Demande impossible">{formError}</Alert> : null}

        {isSent ? (
          <>
            <Alert variant="success" title="Demande enregistrée">
              Si un compte est associé à <strong>{email.trim()}</strong>, un lien de
              réinitialisation vient d’être généré.
            </Alert>

            {ticket ? (
              <div className="token-panel">
                <p className="token-panel__title">
                  <KeyRound size={16} aria-hidden="true" /> Lien de démonstration
                </p>
                <p className="token-panel__text">
                  En mode démonstration, aucun e-mail n’est envoyé. Utilisez ce lien pour tester le
                  parcours de réinitialisation :
                </p>
                <code className="token-panel__value">/reinitialiser-mot-de-passe?token={ticket.token}</code>
                <Link
                  to={`/reinitialiser-mot-de-passe?token=${encodeURIComponent(ticket.token)}`}
                  className="btn btn--secondary btn--block"
                >
                  <span>Ouvrir le formulaire de réinitialisation</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            ) : null}

            <Button variant="ghost" block onClick={() => setIsSent(false)}>
              Utiliser une autre adresse
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="stack">
            <TextField
              label="Adresse e-mail"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="vous@exemple.com"
              icon={<Mail size={17} />}
              value={email}
              error={errors.email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors({});
              }}
              required
            />

            <Button type="submit" block size="lg" isLoading={isSubmitting} iconRight={<ArrowRight size={17} />}>
              {isSubmitting ? 'Envoi…' : 'Envoyer le lien'}
            </Button>
          </form>
        )}

        <MockNotice>
          <strong>Mode démonstration académique.</strong> Aucun e-mail réel n’est envoyé : le jeton
          de réinitialisation est affiché ci-dessus pour permettre la recette du parcours (US03).
        </MockNotice>
      </div>
    </AuthLayout>
  );
}
