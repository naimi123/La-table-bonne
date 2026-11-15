# Avancement — Front-End

Dernière mise à jour : **14 novembre 2026**

---

## 1. Tableau de bord

| Sprint | Story | Périmètre Front-End | Code | Tests | Revue | Jira |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | US01 Inscription | Terminé (démo) | ✅ | ✅ | ⏳ | À saisir |
| 1 | US02 Connexion | Terminé (démo) | ✅ | ✅ | ⏳ | À saisir |
| 1 | US03 Réinitialisation | Terminé (démo) | ✅ | ✅ | ⏳ | À saisir |
| 1 | US04 Recherche par ville | Terminé (démo) | ✅ | ✅ | ⏳ | À saisir |
| 2 | US05 Filtres cuisine | Non démarré | — | — | — | À créer |
| 2 | US06 Fiche restaurant | Base en lecture seule | 🟡 | — | — | À créer |
| 2 | US07 Calendrier | Non démarré | — | — | — | À créer |
| 2 | US08 Réservation | Non démarré | — | — | — | À créer |
| 3 | US09 Confirmation | Non démarré | — | — | — | À créer |
| 3 | US10 Annulation | Non démarré | — | — | — | À créer |
| 3 | US11 Configuration créneaux | Non démarré | — | — | — | À créer |
| 3 | US12 Tableau de bord restaurateur | Non démarré | — | — | — | À créer |

Légende : ✅ terminé · 🟡 partiel / préparation · ⏳ en attente · — non applicable.

> **Revue** : la colonne « Revue » reste à ⏳ pour les quatre stories. Le code est publié
> et la *pull request* est ouverte ; la validation par l'équipe (Scrum Master, QA, PO)
> n'a pas encore eu lieu.

### Publication

| Élément | Valeur |
| --- | --- |
| Branche publiée | `feature/zakaria-frontend-sprint1` (suivi de `origin/…`) |
| Commit d'implémentation | `af23967` — `feat(frontend): implement sprint 1 authentication and restaurant search` |
| Historique complet | [commits de la branche](https://github.com/naimi123/La-table-bonne/commits/feature/zakaria-frontend-sprint1) |
| Pull request | [#1](https://github.com/naimi123/La-table-bonne/pull/1) — ouverte, non fusionnée |
| `main` | inchangée (`537ea81`) |
| `README.md` d'équipe | inchangé (blob identique à `origin/main`) |

---

## 2. Répartition du travail réalisé (Sprint 1)

| Domaine | Détail |
| --- | --- |
| Initialisation | Vite 5, React 18, TypeScript 5.9 (strict), React Router 6, Lucide React |
| Design system | 6 feuilles CSS (`index.css` + tokens, base, layout, composants, pages), palette chaude + terracotta |
| Pages | Accueil, Recherche, Inscription, Connexion, Mot de passe oublié, Réinitialisation, Compte, Fiche restaurant, 404 |
| Composants | 12 composants UI + 4 composants de layout + 3 composants restaurants |
| Services | `authService`, `restaurantService`, `mockAuthApi`, `apiClient`, `config`, `storage`, `restaurantFilters` |
| Validation | Prénom, nom, e-mail, mot de passe, confirmation, conditions, recherche |
| Tests | 47 tests (35 unitaires + 12 d'intégration/interface), voir [`TEST-REPORT.md`](./TEST-REPORT.md) |
| Qualité | Build sans erreur, 0 erreur console, Lighthouse 100/100/100 (page d'accueil, desktop — voir [`TEST-REPORT.md`](./TEST-REPORT.md)) |

---

## 3. Journal des modifications

### 14 novembre 2026 — Audit SCRUM-41/43/44/46 et tests d'interface

- Audit des quatre sous-tâches Jira confiées au volet Front-End, sans recréer de page.
- **SCRUM-41** : seul écart fonctionnel constaté, le focus du premier champ invalide
  (AC1.1) ; corrigé dans `RegisterPage.tsx` et vérifié dans Chromium.
- **SCRUM-43** : ajout de 5 tests d'intégration pour l'inscription et de 4 tests de
  validation supplémentaires.
- **SCRUM-44** : page de recherche déjà complète ; aucun code de production modifié.
- **SCRUM-46** : ajout de 7 tests d'intégration/interface pour les résultats, les états
  chargement/vide/erreur et le changement de ville, ainsi que 5 tests de filtrage sur le
  catalogue réel.
- Ajout de React Testing Library, `user-event`, `jest-dom` et `jsdom` en dépendances de
  développement ; configuration Vitest en environnement `jsdom`.
- Résultats : **47/47 tests réussis**, build réussi (JS 232,48 kB), **0 erreur console**
  sur les parcours vérifiés.
- Vérification responsive dans Chromium à 375, 768, 1280 et 1440 px : aucun débordement.
- **Aucun commit, `push` ou changement de statut Jira.** Détail :
  [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md).

### 13 novembre 2026 — Migration du compte GitHub

- Changement de pseudonyme GitHub : `zr7791474-blip` → **`Zakariaa-Adli`**
  (`@Zkr_ad`). Les commits existants restent liés au même compte (identifiant GitHub
  inchangé) ; aucun historique n'a été réécrit.
- Identité Git globale alignée : `Zakariaa Adli <zakariaaadlii@gmail.com>`.
- Le dépôt d'équipe `naimi123/La-table-bonne` et la branche
  `feature/zakaria-frontend-sprint1` ne changent pas : aucun renommage de dépôt, aucun
  nouveau remote, aucune réécriture.
- La *pull request* #1 reste ouverte et accessible ; son auteur s'affiche désormais
  `Zakariaa-Adli`.

### 13 novembre 2026 — Finalisation de la documentation et de la présentation GitHub

- Mise à jour de l'avancement : remplacement de la mention « aucun `push` effectué » par
  l'état réel de publication (branche, commit `af23967`, PR #1).
- Ajout du bloc « Publication » (branche, commit, PR, état de `main`, `README.md` d'équipe).
- Précision du périmètre de l'audit Lighthouse (page d'accueil, viewport desktop uniquement).
- Alignement du rapport de test sur les résultats réellement mesurés (14 scénarios manuels,
  build et tests de la dernière exécution).
- Ajout d'une section « Architecture et structure » dans le [`README`](./README.md) du volet.
- **En attente côté propriétaire** : captures d'écran dans `evidence/`, vérification mobile
  375 px, navigation avec lecteur d'écran, saisie manuelle des tickets Jira.

### 13 novembre 2026 — Organisation du dépôt et publication

- Audit complet du dépôt : `frontend/` ne contient que l'application, `docs/` uniquement
  de la documentation. **Aucun fichier n'a été déplacé** : la séparation était déjà correcte.
- Ajout d'un `.gitignore` à la racine (système, éditeurs, environnements, dépendances)
  pour protéger aussi les futurs dossiers de l'équipe.
- Ajout de `docs/README.md`, index unique de la documentation du projet.
- Mise à jour des liens de `frontend/README.md` vers cet index.
- Vérification de tous les liens relatifs Markdown : aucun lien mort.
- Aucune modification du `README.md` d'équipe (contenu conservé à l'identique).

### 13 novembre 2026 — Sprint 1, livraison Front-End

- Vérification de l'accès GitHub : compte `zr7791474-blip` (renommé `Zakariaa-Adli`
  depuis), permission `push` confirmée,
  aucune invitation en attente.
- Clonage du dépôt d'équipe dans `C:\Users\DELL\Documents\La-table-bonne`.
- Création de la branche `feature/zakaria-frontend-sprint1` (aucune modification de `main`).
- Création de l'application `frontend/` (React + Vite + TypeScript).
- Implémentation de US01, US02, US03, US04 en mode démonstration.
- Préparation de l'architecture des Sprints 2 et 3 (fiche restaurant, services, routes protégées).
- Rédaction des livrables Jira et de la documentation de suivi.
- Exécution du build, des tests unitaires et des parcours manuels : tout est conforme.
- **Publication effectuée** : branche `feature/zakaria-frontend-sprint1` poussée sur
  `origin` (commit `af23967`), *pull request* [#1](https://github.com/naimi123/La-table-bonne/pull/1)
  ouverte vers `main`. `main` n'a pas été modifiée et la PR n'a pas été fusionnée.

---

## 4. Points bloquants / dépendances

| Sujet | Impact | Responsable | Contournement actuel |
| --- | --- | --- | --- |
| API Back-End non disponible | Authentification et catalogue réels impossibles | Développeur Back-End | Services simulés + bandeau de transparence |
| Envoi d'e-mail (US03) | Lien de réinitialisation non reçu par e-mail | Back-End | Jeton affiché dans l'interface (démo) |
| Contrats d'API non validés | Risque de retouche des services | Équipe / PO | Couche `services/` isolée, bascule par variable d'environnement |
| Revues de code | Tickets Jira non « Done » | Équipe | Documentation prête pour la revue |

---

## 5. Prochaines actions recommandées

1. **Relire** le diff de la branche avec l'équipe (surtout `frontend/src`).
2. **Créer** les tickets Jira listés dans `JIRA-TASKS.md` (saisie manuelle).
3. **Capturer** les écrans listés dans chaque fichier de sprint et les déposer dans `evidence/`.
4. **Faire valider** les critères d'acceptation US01–US04 par le PO et le QA.
5. **Faire relire et valider** la *pull request*
   [#1](https://github.com/naimi123/La-table-bonne/pull/1) par l'équipe, puis la fusionner
   selon le processus du projet. La branche est déjà publiée ; ne pas repousser sur `main`.
6. **Aligner** la couche services avec les contrats Back-End dès leur publication.
7. **Planifier** le Sprint 2 : US05 (filtres), puis US06 → US07 → US08.
8. **Étendre** les tests d'interface aux parcours US02 et US03 (connexion, jetons) et
   produire les captures d'écran de `evidence/`.

---

## 6. Commandes utiles

```bash
# État de la branche
git status
git log --oneline --graph --decorate -10

# Qualité
cd frontend && npm run build && npm test

# Comparaison avec main (avant revue)
git diff --stat main...feature/zakaria-frontend-sprint1
```
