import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { App } from '../App';
import { SESSION_STORAGE_KEY, USERS_STORAGE_KEY } from '../services/storage';

const VALID_EMAIL = 'nouveau.client@example.com';

function renderRegisterPage() {
  window.history.pushState({}, '', '/inscription');
  return render(<App />);
}

interface FillOptions {
  email?: string;
  password?: string;
  confirmation?: string;
  acceptTerms?: boolean;
}

async function fillRegistrationForm(user: UserEvent, options: FillOptions = {}) {
  const {
    email = VALID_EMAIL,
    password = 'Table2026',
    confirmation = password,
    acceptTerms = true,
  } = options;

  await user.type(screen.getByLabelText('Prénom'), 'Zakaria');
  await user.type(screen.getByLabelText('Nom'), 'Adli');
  await user.type(screen.getByLabelText('Adresse e-mail'), email);

  // Les deux champs mot de passe ont des libellés distincts : le libellé exact
  // « Mot de passe » cible le premier sans ambiguïté.
  await user.type(screen.getByLabelText('Mot de passe'), password);
  await user.type(screen.getByLabelText('Confirmer le mot de passe'), confirmation);

  if (acceptTerms) {
    await user.click(screen.getByRole('checkbox', { name: /conditions d’utilisation/i }));
  }
}

describe('RegisterPage — intégration US01', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('affiche les six erreurs et place le focus sur le premier champ invalide', async () => {
    const user = userEvent.setup();
    renderRegisterPage();

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(screen.getAllByRole('alert')).toHaveLength(6);
    expect(screen.getByText('Le prénom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le nom est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('L’adresse e-mail est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Le mot de passe est obligatoire.')).toBeInTheDocument();
    expect(screen.getByText('Veuillez confirmer le mot de passe.')).toBeInTheDocument();
    expect(
      screen.getByText('Vous devez accepter les conditions d’utilisation.'),
    ).toBeInTheDocument();

    expect(screen.getByLabelText('Prénom')).toHaveFocus();
    expect(window.localStorage.getItem(USERS_STORAGE_KEY)).toBeNull();
  });

  it('refuse une adresse e-mail invalide et la marque aria-invalid', async () => {
    const user = userEvent.setup();
    renderRegisterPage();
    await fillRegistrationForm(user, { email: 'zakaria@example' });

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    const emailField = screen.getByLabelText('Adresse e-mail');
    expect(
      screen.getByText('Le format de l’adresse e-mail est invalide (ex. nom@domaine.com).'),
    ).toBeInTheDocument();
    expect(emailField).toHaveAttribute('aria-invalid', 'true');
    expect(emailField).toHaveFocus();
    expect(window.localStorage.getItem(USERS_STORAGE_KEY)).toBeNull();
  });

  it('refuse une confirmation différente et des conditions non acceptées', async () => {
    const user = userEvent.setup();
    renderRegisterPage();
    await fillRegistrationForm(user, {
      confirmation: 'Autre2026',
      acceptTerms: false,
    });

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(screen.getByText('Les deux mots de passe ne correspondent pas.')).toBeInTheDocument();
    expect(
      screen.getByText('Vous devez accepter les conditions d’utilisation.'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Confirmer le mot de passe')).toHaveFocus();
  });

  it('crée le compte, ouvre une session et redirige vers /compte', async () => {
    const user = userEvent.setup();
    renderRegisterPage();
    await fillRegistrationForm(user);

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Bonjour Zakaria' }, { timeout: 4000 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Bienvenue Zakaria, votre compte client est créé/)).toBeInTheDocument();
    expect(window.location.pathname).toBe('/compte');

    const session = JSON.parse(window.localStorage.getItem(SESSION_STORAGE_KEY) ?? 'null') as {
      user?: { email?: string };
      token?: string;
    } | null;
    expect(session?.user?.email).toBe(VALID_EMAIL);
    expect(session?.token).toBeTruthy();

    const users = JSON.parse(window.localStorage.getItem(USERS_STORAGE_KEY) ?? '[]') as Array<{
      email: string;
      passwordHash: string;
    }>;
    expect(users).toHaveLength(1);
    expect(users[0].passwordHash).not.toBe('Table2026');
    expect(users[0].passwordHash.length).toBeGreaterThan(10);
  });

  it('signale un e-mail déjà utilisé sans créer de second compte', async () => {
    window.localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify([
        {
          id: 'u-existing',
          firstName: 'Zakaria',
          lastName: 'Adli',
          email: 'zakaria.qa@example.com',
          createdAt: '2026-01-01T00:00:00.000Z',
          salt: 'sel-existant',
          passwordHash: 'empreinte-existante',
        },
      ]),
    );

    const user = userEvent.setup();
    renderRegisterPage();
    await fillRegistrationForm(user, { email: 'zakaria.qa@example.com' });

    await user.click(screen.getByRole('button', { name: 'Créer mon compte' }));

    expect(
      await screen.findByText('Un compte existe déjà avec cette adresse e-mail.', {}, { timeout: 4000 }),
    ).toBeInTheDocument();
    expect(screen.getByText('Inscription impossible')).toBeInTheDocument();

    const users = JSON.parse(window.localStorage.getItem(USERS_STORAGE_KEY) ?? '[]') as unknown[];
    expect(users).toHaveLength(1);
  });
});
