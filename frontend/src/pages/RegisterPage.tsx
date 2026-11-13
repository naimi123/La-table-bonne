import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, UserRound } from 'lucide-react';
import { TextField } from '../components/ui/TextField';
import { PasswordField } from '../components/ui/PasswordField';
import { PasswordStrengthMeter } from '../components/ui/PasswordStrengthMeter';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';
import { MockNotice } from '../components/ui/MockNotice';
import { AuthLayout } from '../components/auth/AuthLayout';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';
import { validateRegister, type FieldErrors } from '../utils/validation';

interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const INITIAL_VALUES: RegisterValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export function RegisterPage() {
  useDocumentTitle('Créer un compte');
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = <K extends keyof RegisterValues>(field: K, value: RegisterValues[K]) => {
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
    const validation = validateRegister(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setIsSubmitting(true);
    setFormError(null);
    try {
      const user = await register({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      navigate('/compte', {
        replace: true,
        state: { flash: `Bienvenue ${user.firstName}, votre compte client est créé.` },
      });
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : 'La création du compte a échoué.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Votre table vous attend."
      subtitle="Créez votre compte client pour préparer vos réservations et retrouver vos adresses préférées."
      footer={
        <p>
          Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate aria-labelledby="register-title">
        <div className="auth-form__header">
          <h1 id="register-title">Créer un compte</h1>
          <p>Inscription gratuite, réservée aux clients de La Bonne Table.</p>
        </div>

        {formError ? <Alert variant="error" title="Inscription impossible">{formError}</Alert> : null}

        <div className="form-grid">
          <TextField
            label="Prénom"
            name="firstName"
            autoComplete="given-name"
            placeholder="Zakaria"
            icon={<UserRound size={17} />}
            value={values.firstName}
            error={errors.firstName}
            onChange={(event) => update('firstName', event.target.value)}
            required
          />
          <TextField
            label="Nom"
            name="lastName"
            autoComplete="family-name"
            placeholder="Adli"
            icon={<UserRound size={17} />}
            value={values.lastName}
            error={errors.lastName}
            onChange={(event) => update('lastName', event.target.value)}
            required
          />
        </div>

        <TextField
          label="Adresse e-mail"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.com"
          icon={<Mail size={17} />}
          hint="Une adresse valide, utilisée comme identifiant de connexion."
          value={values.email}
          error={errors.email}
          onChange={(event) => update('email', event.target.value)}
          required
        />

        <div>
          <PasswordField
            label="Mot de passe"
            name="password"
            autoComplete="new-password"
            placeholder="8 caractères minimum"
            hint="Au moins 8 caractères, dont une lettre et un chiffre."
            value={values.password}
            error={errors.password}
            onChange={(event) => update('password', event.target.value)}
            required
          />
          <PasswordStrengthMeter password={values.password} />
        </div>

        <PasswordField
          label="Confirmer le mot de passe"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Saisissez à nouveau le mot de passe"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={(event) => update('confirmPassword', event.target.value)}
          required
        />

        <div className={`field field--checkbox ${errors.acceptTerms ? 'field--invalid' : ''}`.trim()}>
          <label htmlFor="acceptTerms">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={values.acceptTerms}
              aria-invalid={errors.acceptTerms ? true : undefined}
              aria-describedby={errors.acceptTerms ? 'acceptTerms-error' : undefined}
              onChange={(event) => update('acceptTerms', event.target.checked)}
            />
            <span>
              J’accepte les conditions d’utilisation et la politique de confidentialité du projet
              académique La Bonne Table.
            </span>
          </label>
          {errors.acceptTerms ? (
            <p className="field__error" id="acceptTerms-error" role="alert">
              {errors.acceptTerms}
            </p>
          ) : null}
        </div>

        <Button type="submit" block size="lg" isLoading={isSubmitting} iconRight={<ArrowRight size={17} />}>
          {isSubmitting ? 'Création du compte…' : 'Créer mon compte'}
        </Button>

        <MockNotice />
      </form>
    </AuthLayout>
  );
}
