# Audit des sous-tâches Jira — SCRUM-41, SCRUM-43, SCRUM-44, SCRUM-46

| Élément | Valeur |
| --- | --- |
| Date de l'audit | 14 novembre 2026 |
| Développeur | Zakaria Adli (Front-End) |
| Branche | `feature/zakaria-frontend-sprint1` |
| Commit de départ | `c6fd8c4` — `docs(frontend): record GitHub username migration` |
| Périmètre | Front-End uniquement (US01 et US04) |
| Mode | Démonstration (`VITE_USE_MOCK_API=true`), aucun Back-End |
| Jira | **Aucun statut Jira n'a été modifié** |

> **État initial du dépôt** : branche synchronisée avec `origin`, aucun fichier suivi
> modifié. Un `package-lock.json` non suivi existait déjà à la racine ; il n'a pas été
> modifié. Aucun commit ni `push` n'a été effectué pendant cet audit.

Ce document complète [`TEST-REPORT.md`](./TEST-REPORT.md) et
[`SPRINT-1.md`](./SPRINT-1.md). Il ne remplace pas la recette QA/PO.

---

## 1. Méthode

1. Inspection de la branche, de l'historique et de l'arborescence.
2. Lecture des pages, composants, services, règles de validation, données et tests.
3. Exécution de la base de référence **avant modification** :
   - `npm test` → **26 tests / 2 fichiers, tous réussis** ;
   - `npm run build` → **succès**, bundle JS 232,28 kB.
4. Mise en correspondance de chaque sous-tâche avec les fichiers réellement présents.
5. Correction du seul écart constaté sur US01, puis ajout des tests manquants.
6. Nouvelle exécution des tests et du build.
7. Vérification dans Chromium (desktop, tablette, mobile) des pages `/inscription` et
   `/recherche`, sans erreur console.

---

## 2. Synthèse

| Jira | Statut initial | Constat | Statut final proposé |
| --- | --- | --- | --- |
| **SCRUM-41** | PARTIALLY COMPLETE | Interface, route, validation, états et responsive déjà présents. Un seul écart : le premier champ invalide ne recevait pas le focus (AC1.1). | **COMPLETE** (périmètre Front-End) |
| **SCRUM-43** | PARTIALLY COMPLETE | 19 tests de validation et 14 parcours manuels documentés, mais aucun test d'interface pour l'inscription (messages rendus, focus, doublon, succès/session). | **PARTIALLY COMPLETE** : couverture automatisée complétée, **recette QA/PO encore requise** |
| **SCRUM-44** | COMPLETE | Page de recherche, filtres ville/mot-clé, états, cartes et responsive déjà implémentés et intégrés. | **COMPLETE** (périmètre Front-End) |
| **SCRUM-46** | PARTIALLY COMPLETE | Filtrage pur déjà testé (7 tests), mais pas de tests d'intégration page/service ni des états vide, chargement et erreur. | **COMPLETE** (tests automatisés), aucun bug confirmé |

---

## 3. SCRUM-41 — Intégration de l'interface de création de compte

### Ce qui existait déjà

| Élément | Fichier |
| --- | --- |
| Route `/inscription` | `frontend/src/App.tsx` |
| Page et formulaire | `frontend/src/pages/RegisterPage.tsx` |
| Mise en page d'authentification | `frontend/src/components/auth/AuthLayout.tsx` |
| Champs réutilisables | `frontend/src/components/ui/TextField.tsx`, `PasswordField.tsx` |
| Indicateur de robustesse | `frontend/src/components/ui/PasswordStrengthMeter.tsx` |
| Règles de validation | `frontend/src/utils/validation.ts` |
| Service d'inscription et doublon | `frontend/src/services/authService.ts`, `mockAuthApi.ts`, `storage.ts` |
| Session et redirection | `frontend/src/context/AuthContext.tsx`, `AccountPage.tsx`, `Navbar.tsx` |

La page était donc bien intégrée : route publique, formulaire contrôlé, validation au
submit, messages d'erreur, état de soumission, redirection vers `/compte`, message de
bienvenue et affichage du nom dans la navigation. Aucune page ni aucun composant n'a été
recréé.

### Écart corrigé

**AC1.1** exige que « le premier champ en erreur reçoive le focus ». Ce comportement
n'était pas implémenté.

- `frontend/src/pages/RegisterPage.tsx` : ajout de `FIELD_ORDER` et, en cas d'erreurs,
  focus sur le premier champ invalide via `form.elements.namedItem(...)`.
- Le focus fonctionne aussi pour la case « conditions ».
- Aucun autre comportement n'a été modifié.

### Vérifications

- Soumission vide dans Chromium : **6 messages**, focus sur `firstName`, **aucun compte
  créé**, **0 erreur console**.
- E-mail invalide : message dédié, `aria-invalid="true"`, focus sur le champ e-mail
  (test automatisé).
- Confirmation différente + conditions non cochées : deux messages, soumission bloquée,
  focus sur le champ de confirmation (test automatisé).
- Inscription valide : session créée, redirection `/compte`, message de bienvenue, mot de
  passe non stocké en clair (test automatisé).
- Doublon : message « Un compte existe déjà… », un seul compte conservé (test automatisé).
- Responsive mesuré dans Chromium (iframe de largeur contrôlée, largeur utile après
  barre de défilement entre parenthèses) :

| Largeur demandée | `form-grid` | `auth-layout` | Colonne visuelle | Débordement horizontal |
| --- | --- | --- | --- | --- |
| 375 px (360 px utiles) | 1 colonne | 1 colonne | masquée | non |
| 768 px (753 px utiles) | 1 colonne | 1 colonne | masquée | non |
| 1280 px (1265 px utiles) | 2 colonnes | 2 colonnes | visible | non |

Le menu mobile est affiché (`nav-toggle`) sur mobile/tablette et masqué sur desktop.

---

## 4. SCRUM-43 — Validation des scénarios de test et recette (US01)

### Ce qui existait déjà

- `frontend/src/utils/validation.test.ts` : 19 tests (nettoyage, e-mail, mot de passe,
  confirmation, conditions, robustesse, normalisation).
- `docs/my-front-end-tasks/TEST-REPORT.md` : 14 parcours manuels documentés, dont 3
  scénarios d'inscription.
- Aucun test d'interface React : les messages rendus, le focus, la redirection et le
  doublon n'étaient vérifiés que manuellement.

### Tests ajoutés

| Fichier | Nombre | Scénarios |
| --- | --- | --- |
| `frontend/src/pages/RegisterPage.test.tsx` | 5 | Formulaire vide + focus, e-mail invalide + `aria-invalid`, confirmation/conditions, succès + session + redirection, e-mail déjà utilisé |
| `frontend/src/utils/validation.test.ts` | +4 | Six champs manquants dans l'ordre, prénoms/noms accentués, nom vide, prénom d'un caractère |

Les tests d'interface rendent l'application réelle (`<App />`), remplissent le formulaire
avec `user-event`, soumettent et vérifient le DOM ainsi que `localStorage`.

### Non couvert par cet audit

- **Recette fonctionnelle QA/PO** : non exécutée (elle appartient au testeur et au PO).
- **Appareil physique et lecteur d'écran** : non testés ; la mise en page a été mesurée
  dans Chromium, pas sur un téléphone réel ni avec NVDA/VoiceOver.
- **E-mail réel** : impossible sans Back-End ; le mode démonstration reste assumé.
- Les scénarios de jeton expiré concernent **US03**, hors périmètre de SCRUM-43.

---

## 5. SCRUM-44 — Développement de la page de recherche

### Ce qui existait déjà

| Élément | Fichier |
| --- | --- |
| Route `/recherche` | `frontend/src/App.tsx` |
| Page de résultats et états | `frontend/src/pages/SearchPage.tsx` |
| Barre de recherche réutilisable | `frontend/src/components/restaurants/SearchBar.tsx` |
| Cartes et repli d'image | `RestaurantCard.tsx`, `RestaurantImage.tsx` |
| Squelettes et état vide | `components/ui/Skeleton.tsx`, `EmptyState.tsx` |
| Service et filtrage | `services/restaurantService.ts`, `restaurantFilters.ts` |
| Catalogue de démonstration | `src/data/restaurants.ts` (10 restaurants, 6 villes) |

La page était complète : recherche par ville et mot-clé, puces de villes, synchronisation
de l'URL, compteur, chargement, vide, erreur avec « Réessayer », réinitialisation et
cartes responsives. **Aucun code de production n'a été modifié pour SCRUM-44.**

### Vérifications

- `/recherche?city=Marrakech` → 2 cartes, toutes deux à Marrakech.
- Clic sur la puce « Casablanca » → URL `?city=Casablanca`, 2 cartes, toutes deux à
  Casablanca, aucune carte de Marrakech.
- Navigation depuis la barre de recherche de l'accueil → `/recherche?city=Rabat`.
- Aucun débordement horizontal et grille mesurée dans Chromium :

| Largeur demandée | Colonnes de la grille | Débordement horizontal |
| --- | --- | --- |
| 375 px (360 px utiles) | 1 | non |
| 768 px (753 px utiles) | 2 | non |
| 1280 px (1265 px utiles) | 3 | non |
| 1440 px (1425 px utiles) | 3 | non |

> La grille desktop compte 3 colonnes même avec 2 résultats : la troisième colonne reste
> vide, ce qui est le comportement attendu de `auto-fill`.

### Limite

Le catalogue et le filtrage sont **simulés**. L'API `GET /restaurants?city=&q=` n'est pas
disponible (SCRUM-45, hors périmètre Front-End). La couche `restaurantService` est déjà
prête à basculer via `VITE_USE_MOCK_API=false`, mais ce basculement n'a pas été testé
contre un serveur réel.

---

## 6. SCRUM-46 — Test des résultats de recherche et filtre

### Tests ajoutés

| Fichier | Nombre | Scénarios |
| --- | --- | --- |
| `frontend/src/services/restaurantFilters.test.ts` | +5 | Toutes les villes du catalogue, changement de ville, état vide, accents/casse, villes extraites |
| `frontend/src/pages/SearchPage.test.tsx` | 6 | Ville unique, changement de ville + URL, état vide + restauration, recherche vide refusée, navigation depuis l'accueil, chargement (`aria-busy` + squelettes) |
| `frontend/src/pages/SearchPage.error.test.tsx` | 1 | Erreur du service puis rechargement via « Réessayer » |

### Scénarios vérifiés

- Une ville ne renvoie que ses restaurants : testé sur les **6 villes** du catalogue et
  sur les couples Marrakech/Casablanca.
- Le changement de ville met à jour les résultats **et** l'URL.
- Aucun résultat : état vide contextualisé, puis restauration des 10 adresses.
- Saisie invalide : recherche entièrement vide refusée avec message.
- Chargement : squelettes présents, zone `aria-busy="true"`, puis résultats.
- Erreur : message et bouton « Réessayer », rechargement vérifié avec un service simulé
  en échec.

### Bugs confirmés

**Aucun bug fonctionnel confirmé.** Aucun correctif de recherche n'a donc été nécessaire.
Le seul défaut trouvé pendant l'audit concernait le focus du formulaire d'inscription
(SCRUM-41).

---

## 7. Fichiers modifiés ou ajoutés

| Fichier | Type | Raison |
| --- | --- | --- |
| `frontend/src/pages/RegisterPage.tsx` | Modifié | Focus sur le premier champ invalide (AC1.1) |
| `frontend/vite.config.ts` | Modifié | Environnement de test `jsdom` + fichier de préparation |
| `frontend/src/test/setup.ts` | Ajouté | Nettoyage RTL et polyfill `window.scrollTo` |
| `frontend/src/pages/RegisterPage.test.tsx` | Ajouté | 5 tests d'intégration US01 |
| `frontend/src/pages/SearchPage.test.tsx` | Ajouté | 6 tests d'intégration US04 |
| `frontend/src/pages/SearchPage.error.test.tsx` | Ajouté | 1 test de l'état d'erreur US04 |
| `frontend/src/utils/validation.test.ts` | Modifié | +4 tests de validation |
| `frontend/src/services/restaurantFilters.test.ts` | Modifié | +5 tests de filtrage sur le catalogue réel |
| `frontend/package.json`, `frontend/package-lock.json` | Modifiés | Dépendances de test : RTL, user-event, jest-dom, jsdom |
| `docs/my-front-end-tasks/*` | Modifiés | Résultats et statuts de l'audit |

Aucun fichier Back-End, aucune donnée de restaurant et aucun endpoint n'ont été inventés.

---

## 8. Commandes et résultats réels

```bash
cd frontend
npm test
npm run build
```

### Avant modification

```text
Test Files  2 passed (2)
     Tests  26 passed (26)

vite v5.4.21
✓ 1613 modules transformed
dist/assets/index-*.js  232,28 kB │ gzip: 72,12 kB
✓ built in 6,94 s
```

### Après modification

```text
✓ src/utils/validation.test.ts              (23 tests)
✓ src/services/restaurantFilters.test.ts    (12 tests)
✓ src/pages/RegisterPage.test.tsx            (5 tests)
✓ src/pages/SearchPage.test.tsx              (6 tests)
✓ src/pages/SearchPage.error.test.tsx        (1 test)

Test Files  5 passed (5)
     Tests  47 passed (47)
  Duration  13,00 s

vite v5.4.21
✓ 1613 modules transformed
dist/assets/index-*.css  32,64 kB │ gzip:  6,81 kB
dist/assets/index-*.js  232,48 kB │ gzip: 72,19 kB
✓ built in 8,75 s
```

`npm run build` exécute `tsc --noEmit` en mode `strict` : les tests et le code de
production passent la vérification TypeScript.

---

## 9. Limites et dépendances restantes

1. **Back-End absent** : authentification et catalogue simulés ; aucune donnée serveur.
2. **SCRUM-42 / SCRUM-45 hors périmètre** : aucune API d'inscription ni de filtre n'a été
   implémentée.
3. **Recette humaine** : la validation QA/PO, un appareil physique et un lecteur d'écran
   restent à faire.
4. **État d'erreur de recherche** : testé avec un service simulé en échec, pas avec une
   panne HTTP réelle.
5. **Jira** : aucun statut n'a été changé ; aucune tâche n'est déclarée « Done » ici.
6. **Git** : aucun commit, amendement, rebase, `push` ou fusion n'a été effectué.

---

## 10. Recommandation

| Jira | Recommandation |
| --- | --- |
| **SCRUM-41** | Peut être proposé en revue puis marqué Done après validation de la revue de code. |
| **SCRUM-43** | Couverture automatisée prête ; à faire valider par le QA/PO avant de passer Done. |
| **SCRUM-44** | Peut être proposé en revue puis marqué Done ; l'intégration API reste une dépendance Back-End. |
| **SCRUM-46** | Tests et absence de bug confirmés ; à faire valider par le QA avant de passer Done. |
