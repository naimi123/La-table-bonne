# La Bonne Table

Projet académique de développement d'un système de gestion et de réservation de tables pour les restaurants.

## À propos du projet
La Bonne Table est une plateforme web conçue pour simplifier la recherche de restaurants, la consultation des menus et la réservation de tables en ligne. Le projet est géré selon la méthodologie Agile (Scrum) avec Jira et GitHub.

## Fonctionnalités principales
* **Gestion des comptes :** Inscription, authentification sécurisée et gestion des profils clients.
* **Catalogue & Recherche :** Recherche de restaurants par nom, localisation ou type de cuisine avec consultation des fiches détaillées.
* **Réservation :** Vérification des créneaux horaires disponibles et réservation de tables en temps réel.
* **Espace Restaurateur :** Interface dédiée aux gérants pour consulter et gérer les réservations de leurs établissements.

## Équipe et rôles (Scrum)
* **Scrum Master :** Mustapha Naimi
* **Product Owner**
* **Développeurs Front-End (x2)**
* **Développeur Back-End (x1)**
* **Testeur / QA (x1)**

## Organisation du projet
Le projet est divisé en plusieurs Sprints suivis sur Jira :
* **Sprint 1 :** Accès & Recherche
* **Sprint 2 :** Disponibilités & Réservation
* **Sprint 3 :** Gestion de l'espace restaurateur

## Technologies utilisées
* **Front-End :** HTML, CSS, JavaScript
* **Back-End :** Node.js / Express (ou API équivalente)
* **Base de données :** MySQL / PostgreSQL
* **Gestion de projet :** Jira & GitHub
*# La-table-bonne

## Sprint 1 — Front-End Implementation

### Fonctionnalités livrées
* **US01 — Inscription client :** formulaire validé (prénom, nom, e-mail, mot de passe, confirmation, conditions), indicateur de robustesse, messages d'erreur et de succès.
* **US02 — Connexion :** e-mail / mot de passe, gestion des erreurs, redirection vers l'espace client et session persistée localement.
* **US03 — Réinitialisation du mot de passe :** demande par e-mail et formulaire de réinitialisation par jeton (valable 15 minutes).
* **US04 — Recherche par ville :** recherche ville + mot-clé, puces de villes, cartes restaurants, états de chargement / vide / erreur, mise en page responsive.

### Améliorations techniques
* Validation du formulaire d'inscription et **focus automatique sur le premier champ invalide** (`frontend/src/pages/RegisterPage.tsx`).
* Filtrage des restaurants synchronisé avec l'URL, pour partager ou recharger une recherche.
* États de chargement (squelettes), état vide et état d'erreur avec action « Réessayer ».
* Accessibilité : libellés associés, `aria-invalid`, `aria-describedby`, `role="alert"`, focus visible.
* Tests automatisés unitaires et d'interface (Vitest + React Testing Library).

### Vérification
* `npm test` : **47 tests réussis / 47**, sur 5 fichiers (35 unitaires + 12 d'intégration/interface).
* `npm run build` : **succès** (`tsc --noEmit` + `vite build`, JS 232,48 kB / CSS 32,64 kB).
* Vérification navigateur (Chromium, viewport desktop) : parcours US01 → US04 conformes, 0 erreur console.
* Détail complet : [`docs/my-front-end-tasks/AUDIT-SCRUM-41-46.md`](docs/my-front-end-tasks/AUDIT-SCRUM-41-46.md) et [`TEST-REPORT.md`](docs/my-front-end-tasks/TEST-REPORT.md).

### Périmètre et limites
* Implémentation **Front-End uniquement**, en mode démonstration (`VITE_USE_MOCK_API=true`) : catalogue mock et authentification simulée dans `localStorage`.
* Les API d'inscription, de connexion et de recherche **restent des dépendances Back-End**.
* La recette formelle QA/PO de **SCRUM-43 est encore en attente** ; aucun statut Jira n'a été modifié.
* Ces résultats automatiques ne constituent pas une approbation QA.
