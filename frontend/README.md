# La Bonne Table — Front-End

Application web React (Vite + TypeScript) du projet académique **La Bonne Table**
(module M210 — Approche Agile, client TableConnect SARL).

Développé par **Zakaria Adli** — Front-End Developer.
Branche de travail : `feature/zakaria-frontend-sprint1`.

## Démarrage

```bash
cd frontend
npm install
cp .env.example .env.local   # facultatif : voir .env.example
npm run dev
```

Application disponible sur `http://localhost:5173`.

## Scripts

| Commande | Description |
| --- | --- |
| `npm run dev` | Serveur de développement Vite |
| `npm run build` | Vérification TypeScript + build de production |
| `npm run preview` | Prévisualisation du build |
| `npm run typecheck` | Vérification des types uniquement |
| `npm test` | Tests unitaires (Vitest) |

## Structure

```text
frontend/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── public/            robots.txt (fichiers servis à la racine)
└── src/
    ├── components/
    │   ├── auth/          AuthLayout
    │   ├── layout/        Navbar, Footer, AppLayout
    │   ├── restaurants/   SearchBar, RestaurantCard, RestaurantImage
    │   ├── routing/       ProtectedRoute, ScrollToTop
    │   └── ui/            Button, TextField, Alert, Badge, EmptyState, Skeleton…
    ├── context/           AuthContext
    ├── data/              Catalogue mock (10 restaurants)
    ├── hooks/             useDocumentTitle
    ├── pages/             Accueil, Recherche, Login, Register, Reset, Compte, Détails
    ├── services/          apiClient, authService, restaurantService, mockAuthApi
    ├── styles/            tokens, base, layout, components, pages
    ├── types/             Contrats TypeScript
    └── utils/             validation, format
```

## Périmètre implémenté

### Sprint 1 — terminé (mode démonstration)

- **US01** Inscription client : formulaire validé (prénom, nom, e-mail, mot de passe,
  confirmation, conditions), indicateur de robustesse, états d'erreur et de succès.
- **US02** Connexion : e-mail / mot de passe, gestion des erreurs, redirection vers
  l'espace client, session persistée localement.
- **US03** Réinitialisation du mot de passe : demande par e-mail + formulaire de
  réinitialisation avec jeton (valable 15 minutes).
- **US04** Recherche par ville : barre de recherche (ville + mot-clé), puces de villes,
  cartes restaurants, états chargement / erreur / vide, responsive.

### Sprints 2 et 3 — architecture préparée, non implémentés

- US05 filtres cuisine, US06 fiche restaurant (base de page en lecture seule),
  US07 calendrier, US08 réservation, US09 confirmation, US10 annulation,
  US11 configuration des créneaux, US12 tableau de bord restaurateur.

## Mode démonstration

Le Back-End n'étant pas disponible, `VITE_USE_MOCK_API=true` (valeur par défaut) active :

- un **catalogue de 10 restaurants** fictifs (`src/data/restaurants.ts`) ;
- une **authentification simulée** dans `localStorage` (`src/services/mockAuthApi.ts`),
  avec mots de passe salés et hachés en SHA-256. **Ce n'est pas une authentification
  réelle** : aucune donnée n'est envoyée à un serveur.

Pour brancher l'API, créer `.env.local` :

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_USE_MOCK_API=false
```

Endpoints attendus : `POST /auth/register`, `POST /auth/login`,
`POST /auth/password-reset/request`, `POST /auth/password-reset/confirm`,
`GET /restaurants`, `GET /restaurants/:id`.

## Accessibilité

- HTML sémantique, lien d'évitement, navigation clavier.
- Champs reliés à leur libellé, erreurs annoncées (`role="alert"`, `aria-describedby`).
- Contrastes conformes, focus visible, `prefers-reduced-motion` respecté.

## Documentation projet

Ce fichier documente **l'application** : démarrage, scripts, architecture du code.
La documentation de projet (sprints, Jira, critères d'acceptation, recette) est
centralisée dans le dossier [`docs/`](../docs/README.md) du dépôt :

- [`docs/README.md`](../docs/README.md) — index de la documentation ;
- [`docs/my-front-end-tasks/README.md`](../docs/my-front-end-tasks/README.md) — périmètre
  Front-End, conventions et liens vers les livrables.
