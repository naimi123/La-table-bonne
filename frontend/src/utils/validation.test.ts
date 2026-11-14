import { describe, expect, it } from 'vitest';
import {
  getPasswordStrength,
  normalizeSearchTerm,
  sanitizeText,
  validateEmail,
  validateLogin,
  validatePassword,
  validateRegister,
} from './validation';

describe('sanitizeText', () => {
  it('supprime les espaces superflus', () => {
    expect(sanitizeText('  Casa   blanca  ')).toBe('Casa blanca');
  });

  it('tronque à la longueur maximale', () => {
    expect(sanitizeText('abcdefghij', 4)).toBe('abcd');
  });
});

describe('validateEmail', () => {
  it('accepte une adresse valide', () => {
    expect(validateEmail('zakaria@example.com')).toBeUndefined();
  });

  it('refuse une adresse vide', () => {
    expect(validateEmail('')).toBe('L’adresse e-mail est obligatoire.');
  });

  it('refuse un format invalide', () => {
    expect(validateEmail('zakaria@example')).toBeDefined();
    expect(validateEmail('zakaria.example.com')).toBeDefined();
  });
});

describe('validatePassword', () => {
  it('accepte un mot de passe conforme', () => {
    expect(validatePassword('Table2026')).toBeUndefined();
  });

  it('refuse un mot de passe trop court', () => {
    expect(validatePassword('Tb1')).toContain('8 caractères');
  });

  it('refuse un mot de passe sans chiffre', () => {
    expect(validatePassword('MotDePasse')).toContain('chiffre');
  });

  it('refuse un mot de passe sans lettre', () => {
    expect(validatePassword('12345678')).toContain('lettre');
  });
});

describe('validateRegister', () => {
  const validValues = {
    firstName: 'Zakaria',
    lastName: 'Adli',
    email: 'zakaria@example.com',
    password: 'Table2026',
    confirmPassword: 'Table2026',
    acceptTerms: true,
  };

  it('ne renvoie aucune erreur pour un formulaire valide', () => {
    expect(validateRegister(validValues)).toEqual({});
  });

  it('signale la confirmation différente', () => {
    const errors = validateRegister({ ...validValues, confirmPassword: 'Autre2026' });
    expect(errors.confirmPassword).toBe('Les deux mots de passe ne correspondent pas.');
  });

  it('exige l’acceptation des conditions', () => {
    const errors = validateRegister({ ...validValues, acceptTerms: false });
    expect(errors.acceptTerms).toBeDefined();
  });

  it('signale un prénom trop court', () => {
    const errors = validateRegister({ ...validValues, firstName: 'Z' });
    expect(errors.firstName).toBeDefined();
  });
});

describe('validateLogin', () => {
  it('exige un mot de passe', () => {
    const errors = validateLogin({ email: 'zakaria@example.com', password: '' });
    expect(errors.password).toBe('Le mot de passe est obligatoire.');
  });

  it('valide un formulaire complet', () => {
    expect(validateLogin({ email: 'zakaria@example.com', password: 'Table2026' })).toEqual({});
  });
});

describe('getPasswordStrength', () => {
  it('retourne 0 pour un mot de passe vide', () => {
    expect(getPasswordStrength('').score).toBe(0);
  });

  it('évalue un mot de passe complet comme fort', () => {
    expect(getPasswordStrength('Table-Bonne-2026!').score).toBe(4);
  });
});

describe('normalizeSearchTerm', () => {
  it('retourne une chaîne vide pour null', () => {
    expect(normalizeSearchTerm(null)).toBe('');
  });

  it('nettoie la saisie', () => {
    expect(normalizeSearchTerm('  Marrakech  ')).toBe('Marrakech');
  });
});
