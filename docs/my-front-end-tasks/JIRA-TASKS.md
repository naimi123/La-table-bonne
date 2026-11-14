# Tâches Jira suggérées — volet Front-End

> **À lire avant saisie.** Ce document **prépare** les tâches à créer manuellement dans
> Jira (projet **La Table Bonne**, module M210). Aucune intégration Jira n'a été utilisée :
> **aucune tâche n'a été créée, modifiée ou déplacée dans Jira**. Les identifiants
> (`LBT-xx`) sont des **placeholders** à remplacer par les clés réelles générées par Jira.

### Correspondance avec les sous-tâches réelles du Sprint 1

| Sous-tâche Jira | Périmètre | Tâches suggérées ci-dessous | Audit |
| --- | --- | --- | --- |
| **SCRUM-41** | Intégration de l'interface de création de compte | `LBT-101` → `LBT-107` | [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md) |
| **SCRUM-43** | Validation des scénarios de test et recette (US01) | `LBT-103`, `LBT-108`, `LBT-147` | [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md) |
| **SCRUM-44** | Développement de la page de recherche | `LBT-131` → `LBT-137` | [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md) |
| **SCRUM-46** | Test des résultats de recherche et filtre | `LBT-134`, `LBT-135`, `LBT-147` | [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md) |

---

## 1. Configuration proposée du projet Jira

| Paramètre | Valeur |
| --- | --- |
| Projet | La Table Bonne |
| Clé suggérée | `LBT` |
| Méthode | Scrum |
| Type de board | Scrum, 3 sprints de 2 semaines |
| Composant | `Front-End` |
| Étiquettes | `frontend`, `sprint-1`, `us01`, `us02`, `us03`, `us04`, `accessibilite`, `responsive`, `technique` |
| Types de tickets | Epic, Story, Tâche, Sous-tâche, Bug |
| Estimation | Story Points pour les Stories, heures pour les Tâches |

### Epics proposés

| Epic | Stories |
| --- | --- |
| EPIC 1 — Accès & Recherche | US01, US02, US03, US04 |
| EPIC 2 — Disponibilités & Réservation | US05, US06, US07, US08 |
| EPIC 3 — Gestion de l'espace restaurateur | US09, US10, US11, US12 |
| EPIC 4 — Qualité & Documentation Front-End | Tâches techniques transverses |

---

## 2. Sprint 1 — Stories

| Clé suggérée | Type | Résumé | Parent | SP | Priorité | Statut à mettre |
| --- | --- | --- | --- | --- | --- | --- |
| `LBT-01` | Story | US01 — Inscription d'un client | EPIC 1 | 5 | Haute | À faire |
| `LBT-02` | Story | US02 — Connexion d'un client | EPIC 1 | 3 | Haute | À faire |
| `LBT-03` | Story | US03 — Réinitialisation du mot de passe | EPIC 1 | 5 | Haute | À faire |
| `LBT-04` | Story | US04 — Recherche de restaurants par ville | EPIC 1 | 5 | Haute | À faire |

> **Statut à mettre :** les stories passent en *En cours* quand la saisie Jira est faite,
> puis en *Done* **uniquement après revue de code et validation du PO**, pas parce que
> le code existe localement.

---

## 3. Sprint 1 — Tâches Front-End (ma saisie)

### US01 — Inscription (`LBT-01`)

| Clé suggérée | Type | Résumé | Parent | Estim. | Étiquettes |
| --- | --- | --- | --- | --- | --- |
| `LBT-101` | Tâche | Créer la page d'inscription et sa mise en page responsive | LBT-01 | 4 h | frontend, us01, responsive |
| `LBT-102` | Tâche | Composants de formulaire réutilisables (TextField, PasswordField) | LBT-01 | 4 h | frontend, us01, technique |
| `LBT-103` | Tâche | Règles de validation (prénom, nom, e-mail, mot de passe, conditions) | LBT-01 | 4 h | frontend, us01 |
| `LBT-104` | Tâche | Indicateur de robustesse du mot de passe | LBT-01 | 2 h | frontend, us01 |
| `LBT-105` | Tâche | Service d'inscription + gestion du doublon d'e-mail | LBT-01 | 3 h | frontend, us01, technique |
| `LBT-106` | Tâche | États de soumission, d'erreur et de succès + redirection | LBT-01 | 2 h | frontend, us01 |
| `LBT-107` | Tâche | Accessibilité du formulaire (labels, aria, focus, clavier) | LBT-01 | 2 h | frontend, us01, accessibilite |
| `LBT-108` | Sous-tâche | Tests unitaires des règles de validation | LBT-103 | 2 h | frontend, test |

### US02 — Connexion (`LBT-02`)

| Clé suggérée | Type | Résumé | Parent | Estim. | Étiquettes |
| --- | --- | --- | --- | --- | --- |
| `LBT-111` | Tâche | Créer la page de connexion | LBT-02 | 3 h | frontend, us02 |
| `LBT-112` | Tâche | Contexte d'authentification (login, logout, restauration) | LBT-02 | 3 h | frontend, us02, technique |
| `LBT-113` | Tâche | Protection des routes privées (`/compte`) | LBT-02 | 2 h | frontend, us02 |
| `LBT-114` | Tâche | Message d'erreur non révélateur + annonce ARIA | LBT-02 | 2 h | frontend, us02, accessibilite |
| `LBT-115` | Tâche | En-tête connecté (avatar, nom, déconnexion) | LBT-02 | 2 h | frontend, us02 |
| `LBT-116` | Sous-tâche | Repli du mot de passe (hash salé en mode démo) | LBT-112 | 2 h | frontend, technique |

### US03 — Réinitialisation (`LBT-03`)

| Clé suggérée | Type | Résumé | Parent | Estim. | Étiquettes |
| --- | --- | --- | --- | --- | --- |
| `LBT-121` | Tâche | Écran de demande de réinitialisation | LBT-03 | 2 h | frontend, us03 |
| `LBT-122` | Tâche | Écran de saisie du nouveau mot de passe | LBT-03 | 3 h | frontend, us03 |
| `LBT-123` | Tâche | Gestion du jeton (validité, expiration, usage unique) | LBT-03 | 3 h | frontend, us03, technique |
| `LBT-124` | Tâche | Message neutre anti-énumération des comptes | LBT-03 | 1 h | frontend, us03 |
| `LBT-125` | Tâche | Affichage du jeton de démonstration (aucun e-mail réel) | LBT-03 | 2 h | frontend, us03 |
| `LBT-126` | Sous-tâche | Tests manuels : jeton invalide / expiré / réutilisé | LBT-123 | 2 h | frontend, test |

### US04 — Recherche par ville (`LBT-04`)

| Clé suggérée | Type | Résumé | Parent | Estim. | Étiquettes |
| --- | --- | --- | --- | --- | --- |
| `LBT-131` | Tâche | Barre de recherche (ville + mot-clé) réutilisable | LBT-04 | 3 h | frontend, us04 |
| `LBT-132` | Tâche | Page de résultats avec paramètres d'URL | LBT-04 | 3 h | frontend, us04 |
| `LBT-133` | Tâche | Carte restaurant (image, note, prix, tags, lien) | LBT-04 | 4 h | frontend, us04 |
| `LBT-134` | Tâche | Filtrage insensible à la casse et aux accents + tests | LBT-04 | 3 h | frontend, us04, test |
| `LBT-135` | Tâche | États chargement (squelettes), vide, erreur | LBT-04 | 3 h | frontend, us04 |
| `LBT-136` | Tâche | Responsive de la grille de résultats | LBT-04 | 2 h | frontend, us04, responsive |
| `LBT-137` | Sous-tâche | Jeu de données de démonstration (10 restaurants) | LBT-04 | 2 h | frontend, us04 |

### Tâches transverses Sprint 1

| Clé suggérée | Type | Résumé | Parent | Estim. | Étiquettes |
| --- | --- | --- | --- | --- | --- |
| `LBT-141` | Tâche | Initialiser le projet Vite + React + TypeScript dans `frontend/` | EPIC 4 | 3 h | frontend, technique |
| `LBT-142` | Tâche | Architecture CSS (tokens, base, layout, composants, pages) | EPIC 4 | 4 h | frontend, technique |
| `LBT-143` | Tâche | Couche services séparée de l'interface + variables d'environnement | EPIC 4 | 3 h | frontend, technique |
| `LBT-144` | Tâche | Navigation responsive et pied de page | EPIC 4 | 3 h | frontend, responsive |
| `LBT-145` | Tâche | Audit accessibilité et correction des contrastes | EPIC 4 | 2 h | frontend, accessibilite |
| `LBT-146` | Tâche | Rédiger la documentation Front-End et les livrables Jira | EPIC 4 | 3 h | frontend, documentation |
| `LBT-147` | Tâche | Exécuter build, tests et rapport de recette | EPIC 4 | 2 h | frontend, test |

---

## 4. Backlog Sprint 2 (à créer, non commencé)

| Clé suggérée | Type | Résumé | Parent | SP/Estim. | Sprint |
| --- | --- | --- | --- | --- | --- |
| `LBT-05` | Story | US05 — Filtres par cuisine | EPIC 2 | 3 | 2 |
| `LBT-201` | Tâche | Composant de filtres à puces accessibles | LBT-05 | 3 h | 2 |
| `LBT-202` | Tâche | Étendre le filtrage et les tests unitaires | LBT-05 | 2 h | 2 |
| `LBT-203` | Tâche | Synchroniser les filtres avec l'URL | LBT-05 | 2 h | 2 |
| `LBT-06` | Story | US06 — Fiche détaillée du restaurant | EPIC 2 | 5 | 2 |
| `LBT-211` | Tâche | Finaliser la fiche (galerie, infos, avis) | LBT-06 | 6 h | 2 |
| `LBT-212` | Tâche | État 404 et squelettes de chargement | LBT-06 | 2 h | 2 |
| `LBT-07` | Story | US07 — Calendrier des disponibilités | EPIC 2 | 8 | 2 |
| `LBT-221` | Tâche | Composant calendrier accessible | LBT-07 | 6 h | 2 |
| `LBT-222` | Tâche | Sélecteur de créneaux + états | LBT-07 | 4 h | 2 |
| `LBT-223` | Tâche | Service de disponibilités | LBT-07 | 3 h | 2 |
| `LBT-08` | Story | US08 — Réservation d'une table | EPIC 2 | 8 | 2 |
| `LBT-231` | Tâche | Formulaire de réservation + validation | LBT-08 | 5 h | 2 |
| `LBT-232` | Tâche | Gestion du conflit de créneau (409) | LBT-08 | 3 h | 2 |
| `LBT-233` | Tâche | Protection de la route de réservation | LBT-08 | 1 h | 2 |

---

## 5. Backlog Sprint 3 (à créer, non commencé)

| Clé suggérée | Type | Résumé | Parent | SP/Estim. | Sprint |
| --- | --- | --- | --- | --- | --- |
| `LBT-09` | Story | US09 — Confirmation de réservation | EPIC 3 | 3 | 3 |
| `LBT-10` | Story | US10 — Annulation d'une réservation | EPIC 3 | 5 | 3 |
| `LBT-11` | Story | US11 — Configuration capacité et créneaux | EPIC 3 | 8 | 3 |
| `LBT-12` | Story | US12 — Tableau de bord restaurateur | EPIC 3 | 8 | 3 |
| `LBT-301` | Tâche | Écran de confirmation + export `.ics` | LBT-09 | 3 h | 3 |
| `LBT-302` | Tâche | Liste « Mes réservations » + dialogue d'annulation | LBT-10 | 5 h | 3 |
| `LBT-303` | Tâche | Contrôle d'accès par rôle (client / restaurateur) | LBT-11 | 4 h | 3 |
| `LBT-304` | Tâche | Éditeur de créneaux et de capacité | LBT-11 | 6 h | 3 |
| `LBT-305` | Tâche | Tableau des réservations et filtres | LBT-12 | 6 h | 3 |
| `LBT-306` | Tâche | Vue responsive en cartes sur mobile | LBT-12 | 3 h | 3 |

---

## 6. Définition of Done commune (à coller dans Jira)

Une tâche Front-End est *Done* lorsque :

1. Le code respecte la structure existante et passe `npm run build`.
2. `npm test` passe et les fonctions pures ajoutées sont couvertes.
3. Les états chargement / vide / erreur / succès sont présents quand applicable.
4. L'écran est vérifié à 375 px, 768 px et 1280 px de largeur.
5. Les champs sont accessibles (label, erreur annoncée, navigation clavier).
6. Aucune erreur console ni avertissement bloquant.
7. Une capture d'écran est ajoutée dans `evidence/`.
8. La revue de code est faite par un membre de l'équipe.
9. Aucun mensonge fonctionnel : une fonction simulée est annoncée comme telle.

---

## 7. Correspondance code ↔ tickets (pour la revue)

| Ticket | Fichiers principaux |
| --- | --- |
| `LBT-101` → `LBT-107` | `src/pages/RegisterPage.tsx`, `src/components/auth/AuthLayout.tsx`, `src/components/ui/TextField.tsx`, `src/components/ui/PasswordField.tsx`, `src/components/ui/PasswordStrengthMeter.tsx` |
| `LBT-103`, `LBT-104` | `src/utils/validation.ts`, `src/utils/validation.test.ts` |
| `LBT-105` | `src/services/authService.ts`, `src/services/mockAuthApi.ts`, `src/services/storage.ts` |
| `LBT-111` → `LBT-115` | `src/pages/LoginPage.tsx`, `src/context/AuthContext.tsx`, `src/components/routing/ProtectedRoute.tsx`, `src/components/layout/Navbar.tsx` |
| `LBT-121` → `LBT-125` | `src/pages/ForgotPasswordPage.tsx`, `src/pages/ResetPasswordPage.tsx`, `src/services/mockAuthApi.ts` |
| `LBT-131` → `LBT-137` | `src/pages/SearchPage.tsx`, `src/components/restaurants/*`, `src/services/restaurantService.ts`, `src/services/restaurantFilters.ts`, `src/data/restaurants.ts` |
| `LBT-141` → `LBT-147` | `frontend/package.json`, `frontend/src/styles/*`, `frontend/src/services/*`, `frontend/src/App.tsx`, `docs/my-front-end-tasks/*` |

---

## 8. Check-list de saisie manuelle

- [ ] Créer les 4 Stories du Sprint 1 et les rattacher à EPIC 1.
- [ ] Créer les tâches `LBT-101` → `LBT-147` avec leurs estimations.
- [ ] Renseigner le composant `Front-End` et les étiquettes.
- [ ] Renseigner le Sprint 1 sur chaque ticket du Sprint 1.
- [ ] Ajouter la Definition of Done dans la description des Stories.
- [ ] Créer les Stories des Sprints 2 et 3 sans les planifier.
- [ ] Déplacer les tickets en *Done* après revue uniquement.
- [ ] Joindre les captures d'écran de `evidence/`.
