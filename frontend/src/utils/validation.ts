/**
 * Règles de validation partagées par les formulaires (US01, US02, US03).
 * Ces fonctions sont pures afin d'être testées unitairement (Vitest).
 */

export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const NAME_PATTERN = /^[\p{L}][\p{L}\s'’-]{1,39}$/u;

export interface RegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ResetPasswordValues {
  password: string;
  confirmPassword: string;
}

/** Nettoie une saisie utilisateur : espaces superflus et longueur maximale. */
export function sanitizeText(value: string, maxLength = 60): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

export function validateFirstName(value: string): string | undefined {
  const clean = sanitizeText(value, 40);
  if (!clean) return 'Le prénom est obligatoire.';
  if (!NAME_PATTERN.test(clean)) return 'Le prénom doit contenir au moins 2 lettres.';
  return undefined;
}

export function validateLastName(value: string): string | undefined {
  const clean = sanitizeText(value, 40);
  if (!clean) return 'Le nom est obligatoire.';
  if (!NAME_PATTERN.test(clean)) return 'Le nom doit contenir au moins 2 lettres.';
  return undefined;
}

export function validateEmail(value: string): string | undefined {
  const clean = value.trim();
  if (!clean) return 'L’adresse e-mail est obligatoire.';
  if (clean.length > 120) return 'L’adresse e-mail est trop longue.';
  if (!EMAIL_PATTERN.test(clean)) return 'Le format de l’adresse e-mail est invalide (ex. nom@domaine.com).';
  return undefined;
}

/**
 * Mot de passe : 8 caractères minimum, au moins une lettre et un chiffre.
 * Volontairement simple et documenté dans docs/my-front-end-tasks/ACCEPTANCE-CRITERIA.md.
 */
export function validatePassword(value: string): string | undefined {
  if (!value) return 'Le mot de passe est obligatoire.';
  if (value.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
  if (value.length > 72) return 'Le mot de passe ne peut pas dépasser 72 caractères.';
  if (!/[A-Za-z]/.test(value)) return 'Le mot de passe doit contenir au moins une lettre.';
  if (!/\d/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre.';
  return undefined;
}

export function validatePasswordConfirmation(password: string, confirmation: string): string | undefined {
  if (!confirmation) return 'Veuillez confirmer le mot de passe.';
  if (password !== confirmation) return 'Les deux mots de passe ne correspondent pas.';
  return undefined;
}

export function validateRegister(values: RegisterValues): FieldErrors {
  const errors: FieldErrors = {};
  const firstName = validateFirstName(values.firstName);
  const lastName = validateLastName(values.lastName);
  const email = validateEmail(values.email);
  const password = validatePassword(values.password);
  const confirmation = validatePasswordConfirmation(values.password, values.confirmPassword);

  if (firstName) errors.firstName = firstName;
  if (lastName) errors.lastName = lastName;
  if (email) errors.email = email;
  if (password) errors.password = password;
  if (confirmation) errors.confirmPassword = confirmation;
  if (!values.acceptTerms) errors.acceptTerms = 'Vous devez accepter les conditions d’utilisation.';

  return errors;
}

export function validateLogin(values: LoginValues): FieldErrors {
  const errors: FieldErrors = {};
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  if (!values.password) errors.password = 'Le mot de passe est obligatoire.';
  return errors;
}

export function validateResetRequest(email: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;
  return errors;
}

export function validateResetPassword(values: ResetPasswordValues): FieldErrors {
  const errors: FieldErrors = {};
  const password = validatePassword(values.password);
  const confirmation = validatePasswordConfirmation(values.password, values.confirmPassword);
  if (password) errors.password = password;
  if (confirmation) errors.confirmPassword = confirmation;
  return errors;
}

export interface PasswordStrength {
  /** 0 = très faible, 4 = fort. */
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return { score: 0, label: 'Aucun mot de passe saisi' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Za-z]/.test(password) && /\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ['Très faible', 'Faible', 'Moyen', 'Bon', 'Fort'] as const;
  const bounded = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  return { score: bounded, label: labels[bounded] };
}

/** Normalise un critère de recherche (ville / nom) avant appel au service. */
export function normalizeSearchTerm(value: string | null | undefined, maxLength = 60): string {
  if (!value) return '';
  return sanitizeText(value, maxLength);
}
