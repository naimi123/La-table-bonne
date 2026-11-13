# Avancement — Front-End

Dernière mise à jour : **13 novembre 2026**

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

---

## 2. Répartition du travail réalisé (Sprint 1)

| Domaine | Détail |
| --- | --- |
| Initialisation | Vite 5, React 18, TypeScript 5.9 (strict), React Router 6, Lucide React |
| Design system | 5 feuilles CSS (tokens, base, layout, composants, pages), palette chaude + terracotta |
| Pages | Accueil, Recherche, Inscription, Connexion, Mot de passe oublié, Réinitialisation, Compte, Fiche restaurant, 404 |
| Composants | 12 composants UI + 4 composants de layout + 3 composants restaurants |
| Services | `authService`, `restaurantService`, `mockAuthApi`, `apiClient`, `storage`, `restaurantFilters` |
| Validation | Prénom, nom, e-mail, mot de passe, confirmation, conditions, recherche |
| Tests | 26 tests unitaires (validation + filtrage) |
| Qualité | Build sans erreur, 0 erreur console, Lighthouse 100/100/100 |

---

## 3. Journal des modifications

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

- Vérification de l'accès GitHub : compte `zr7791474-blip`, permission `push` confirmée,
  aucune invitation en attente.
- Clonage du dépôt d'équipe dans `C:\Users\DELL\Documents\La-table-bonne`.
- Création de la branche `feature/zakaria-frontend-sprint1` (aucune modification de `main`).
- Création de l'application `frontend/` (React + Vite + TypeScript).
- Implémentation de US01, US02, US03, US04 en mode démonstration.
- Préparation de l'architecture des Sprints 2 et 3 (fiche restaurant, services, routes protégées).
- Rédaction des livrables Jira et de la documentation de suivi.
- Exécution du build, des tests unitaires et des parcours manuels : tout est conforme.
- **Aucun `push` effectué** : les modifications attendent la revue et l'autorisation.

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
5. **Pousser** la branche puis ouvrir une *pull request* vers `main` — uniquement après
   autorisation explicite du propriétaire du dépôt.
6. **Aligner** la couche services avec les contrats Back-End dès leur publication.
7. **Planifier** le Sprint 2 : US05 (filtres), puis US06 → US07 → US08.

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
