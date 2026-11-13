# Mes tâches Front-End — Zakaria Adli

Espace de documentation personnelle du volet **Front-End** du projet académique
**La Bonne Table** (module M210 — Approche Agile, client TableConnect SARL, méthodologie Scrum).

| Élément | Valeur |
| --- | --- |
| Développeur | Zakaria Adli |
| GitHub | `zr7791474-blip` |
| Rôle | Front-End Developer |
| Dépôt | `naimi123/La-table-bonne` |
| Branche de travail | `feature/zakaria-frontend-sprint1` |
| Dossier de code | `frontend/` |
| Projet Jira | La Table Bonne |
| Sprint en cours | **Sprint 1 — Accès & Recherche** |

> ⚠️ **Transparence** : ce dossier prépare les livrables Jira **pour saisie manuelle**.
> Aucune intégration Jira n'a été utilisée et aucune tâche n'a été créée ou modifiée
> dans Jira par l'assistant. Voir [`JIRA-TASKS.md`](./JIRA-TASKS.md).

---

## Sommaire

| Document | Contenu |
| --- | --- |
| [`SPRINT-1.md`](./SPRINT-1.md) | US01 → US04 : stories, tâches, critères, preuves (Sprint actif) |
| [`SPRINT-2.md`](./SPRINT-2.md) | US05 → US08 : préparation et architecture |
| [`SPRINT-3.md`](./SPRINT-3.md) | US09 → US12 : préparation et architecture |
| [`JIRA-TASKS.md`](./JIRA-TASKS.md) | Tâches Front-End suggérées et stories parentes |
| [`ACCEPTANCE-CRITERIA.md`](./ACCEPTANCE-CRITERIA.md) | Critères d'acceptation détaillés (Gherkin) |
| [`TEST-REPORT.md`](./TEST-REPORT.md) | Résultats réels des tests, build et audit |
| [`PROGRESS.md`](./PROGRESS.md) | Avancement, journal des modifications, prochaines étapes |
| [`evidence/README.md`](./evidence/README.md) | Convention de nommage des captures d'écran |

---

## Périmètre de ma responsabilité

### Sprint 1 — Actif

| US | Intitulé | État Front-End |
| --- | --- | --- |
| US01 | Inscription client | ✅ Implémenté (mode démonstration) |
| US02 | Connexion | ✅ Implémenté (mode démonstration) |
| US03 | Réinitialisation du mot de passe | ✅ Implémenté (mode démonstration) |
| US04 | Recherche de restaurants par ville | ✅ Implémenté (catalogue simulé) |

### Sprints 2 et 3 — Planifiés

US05 filtres cuisine · US06 fiche restaurant · US07 calendrier de disponibilités ·
US08 réservation · US09 confirmation · US10 annulation · US11 configuration des
créneaux · US12 tableau de bord restaurateur.

**Aucune de ces fonctionnalités n'est marquée terminée** : l'architecture est préparée,
les écrans ne sont pas livrés.

---

## Conventions de collaboration

1. **Jamais de commit direct sur `main`.**
2. Une branche par sujet : `feature/zakaria-frontend-<sujet>`.
3. Commits explicites, en français ou en anglais, au format
   `type(scope): description` (ex. `feat(auth): validation du formulaire d'inscription`).
4. `git pull --rebase origin main` avant toute demande de fusion.
5. **Aucun `push --force`, aucune fusion dans `main` sans validation de l'équipe.**
6. Les fichiers des autres développeurs (Back-End, autres pages) ne sont pas modifiés.
7. Un tirage (pull request) ne concerne qu'un périmètre : documentation, US, correctif.

---

## Démarrage local

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

Voir [`../../frontend/README.md`](../../frontend/README.md) pour l'architecture du code,
les variables d'environnement et le mode démonstration.

---

## Architecture et structure

L'application est une SPA React (Vite + TypeScript strict). Le détail des dossiers et des
scripts est dans [`../../frontend/README.md`](../../frontend/README.md) ; cette section
résume ce qui est utile à la revue.

### Routes

| Route | Page | Accès |
| --- | --- | --- |
| `/` | Accueil | Public |
| `/recherche` | Recherche (filtres `city` / `q` synchronisés à l'URL) | Public |
| `/restaurants/:id` | Fiche restaurant — lecture seule | Public |
| `/inscription` | Inscription (US01) | Public |
| `/connexion` | Connexion (US02) | Public |
| `/mot-de-passe-oublie` | Demande de réinitialisation (US03) | Public |
| `/reinitialiser-mot-de-passe` | Nouveau mot de passe (US03) | Public, jeton requis |
| `/compte` | Compte client | **Protégé** (`ProtectedRoute`) |
| `*` | Page 404 | Public |

### Couches

| Dossier | Responsabilité |
| --- | --- |
| `src/pages/` | 9 pages, une par route ; composition uniquement |
| `src/components/` | UI (`ui/`), layout (`layout/`), restaurants, authentification, routage |
| `src/context/` | `AuthContext` : session, connexion, déconnexion |
| `src/services/` | Logique métier isolée : `authService`, `restaurantService`, `mockAuthApi`, `apiClient`, `config`, `storage`, `restaurantFilters` |
| `src/hooks/` | Hooks partagés (titre de page, etc.) |
| `src/data/` | Catalogue fictif de 10 restaurants (mode démonstration) |
| `src/utils/` | Validation et formatage (couverts par les tests unitaires) |
| `src/styles/` | 6 feuilles CSS : `index.css` (point d'entrée) + `tokens`, `base`, `layout`, `components`, `pages` |

**Point de bascule Back-End** : seule la couche `src/services/` connaît le mode
démonstration. `VITE_USE_MOCK_API=true` active les services simulés ; le passage à l'API
réelle ne doit pas modifier les pages ni les composants.

---

## Publication

| Élément | Valeur |
| --- | --- |
| Branche | `feature/zakaria-frontend-sprint1` |
| Commit publié | `af23967` — `feat(frontend): implement sprint 1 authentication and restaurant search` |
| Pull request | [#1](https://github.com/naimi123/La-table-bonne/pull/1) — ouverte, en attente de revue |
| `main` | non modifiée |
