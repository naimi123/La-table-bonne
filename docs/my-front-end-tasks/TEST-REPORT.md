# Rapport de test — Sprint 1 (Front-End)

| Élément | Valeur |
| --- | --- |
| Date d'exécution | 13 novembre 2026 |
| Dernière actualisation | 14 novembre 2026 (audit SCRUM-41/43/44/46) |
| Exécutant | Zakaria Adli |
| Périmètre | US01, US02, US03, US04 + qualité technique |
| Branche | `feature/zakaria-frontend-sprint1` |
| Environnement | Windows, Node v24.17.0, npm 11.13.0 |
| Navigateur | Chromium (via l'outil de prévisualisation), viewport desktop |
| Mode | Démonstration (`VITE_USE_MOCK_API=true`), aucun Back-End |

---

## 1. Résumé

| Indicateur | Résultat |
| --- | --- |
| Build TypeScript + Vite | ✅ Succès |
| Tests automatisés | ✅ 47 / 47 (35 unitaires + 12 d'intégration/interface) |
| Parcours manuels | ✅ 14 / 14 conformes (exécution du 13 novembre 2026) |
| Erreurs console | ✅ 0 |
| Audit Lighthouse — Accessibilité | ✅ 100 |
| Audit Lighthouse — Bonnes pratiques | ✅ 100 |
| Audit Lighthouse — SEO | ✅ 100 |
| Anomalies bloquantes | ✅ Aucune |

> **Actualisation du 14 novembre 2026** : l'audit des sous-tâches SCRUM-41/43/44/46 a
> ajouté des tests d'interface React et corrigé le focus du premier champ invalide. Le
> détail figure dans [`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md). Les résultats
> ci-dessous distinguent l'exécution initiale du 13 novembre et l'actualisation.

> **Périmètre de l'audit Lighthouse** : un seul passage, sur la **page d'accueil**
> (`/`), dans **Chromium en viewport desktop**. Il ne s'agit **pas** d'un audit de tout le
> site ni d'un audit mobile : les autres pages (recherche, formulaires, fiche restaurant,
> 404) n'ont pas été auditées par Lighthouse, et aucune émulation d'appareil n'a été faite.
>
> **Premier passage :** accessibilité 97, bonnes pratiques 100, SEO 83. Deux corrections ont
> été apportées (contraste du texte secondaire et nom accessible du logo), puis le second
> passage a donné 100 / 100 / 100 sur cette même page.

---

## 2. Tests automatisés

Commande : `npm test` (Vitest 2.1.9)

### Exécution initiale — 13 novembre 2026

```text
✓ src/utils/validation.test.ts        (19 tests)
✓ src/services/restaurantFilters.test.ts (7 tests)

Test Files  2 passed (2)
     Tests  26 passed (26)
```

### Exécution après audit — 14 novembre 2026

```text
✓ src/utils/validation.test.ts              (23 tests)
✓ src/services/restaurantFilters.test.ts    (12 tests)
✓ src/pages/RegisterPage.test.tsx            (5 tests)
✓ src/pages/SearchPage.test.tsx              (6 tests)
✓ src/pages/SearchPage.error.test.tsx        (1 test)

Test Files  5 passed (5)
     Tests  47 passed (47)
  Duration  13,00 s
```

| Fichier | Couverture fonctionnelle |
| --- | --- |
| `src/utils/validation.test.ts` | Nettoyage des saisies, e-mail, prénom/nom, mot de passe, confirmation, conditions, robustesse, normalisation de recherche |
| `src/services/restaurantFilters.test.ts` | Filtre par ville sur les 6 villes du catalogue, changement de ville, mot-clé, casse/accents, combinaison, résultat vide, extraction des villes |
| `src/pages/RegisterPage.test.tsx` | Formulaire vide + focus, e-mail invalide + `aria-invalid`, confirmation/conditions, succès + session + redirection, e-mail déjà utilisé |
| `src/pages/SearchPage.test.tsx` | Ville unique, changement de ville + URL, état vide + réinitialisation, saisie vide refusée, navigation depuis l'accueil, chargement |
| `src/pages/SearchPage.error.test.tsx` | Erreur du service simulé puis rechargement via « Réessayer » |

> **Mise à jour de la limite précédente** : React Testing Library, `user-event`,
> `jest-dom` et `jsdom` ont été ajoutés le 14 novembre 2026 pour couvrir les parcours
> US01 et US04. Les autres pages (connexion, réinitialisation, fiche restaurant, 404)
> restent sans test d'interface.

---

## 3. Build de production

Commande : `npm run build` (`tsc --noEmit && vite build`)

```text
vite v5.4.21 building for production...
✓ 1613 modules transformed.
dist/index.html                 0,65 kB │ gzip:  0,40 kB
dist/assets/index-*.css        32,64 kB │ gzip:  6,81 kB
dist/assets/index-*.js        232,48 kB │ gzip: 72,19 kB
✓ built in 8,75 s
```

> Valeurs de l'exécution du **14 novembre 2026**, après ajout des tests d'interface et
> correction du focus d'inscription. Les noms de fichiers `assets/index-*.js|css`
> contiennent un *hash* qui change à chaque build ; seules les tailles sont stables.

- TypeScript `strict`, sans erreur, avec `noUnusedLocals` et `noUnusedParameters` ;
  les fichiers de test sont également vérifiés.
- Dépendances d'exécution : React, React DOM, React Router, Lucide React.
- Dépendances de développement : Vite, TypeScript, plugin React, Vitest, types React,
  React Testing Library, `user-event`, `jest-dom`, `jsdom`.

---

## 4. Tests manuels des parcours

> Les 14 parcours ci-dessous ont été exécutés le **13 novembre 2026**. Ils n'ont pas été
> rejoués en totalité le 14 novembre. Les scénarios M1, M2, M3, M10 et M11 sont désormais
> également couverts par des tests automatisés (section 2).

| # | Scénario | Attendu | Résultat |
| --- | --- | --- | --- |
| M1 | Soumission du formulaire d'inscription vide | 6 messages d'erreur, aucun compte créé | ✅ Conforme |
| M2 | Inscription valide | Redirection `/compte`, message de bienvenue, nom dans l'en-tête | ✅ Conforme |
| M3 | Inscription avec e-mail déjà utilisé | Message « Un compte existe déjà… » | ✅ Conforme |
| M4 | Connexion avec mot de passe erroné | Message « Adresse e-mail ou mot de passe incorrect » | ✅ Conforme |
| M5 | Connexion valide | Redirection `/compte` | ✅ Conforme |
| M6 | Accès direct à `/compte` sans session | Redirection vers `/connexion` | ✅ Conforme |
| M7 | Déconnexion | Session effacée, retour accueil | ✅ Conforme |
| M8 | Demande de réinitialisation | Message neutre + jeton de démonstration affiché | ✅ Conforme |
| M9 | Réinitialisation avec jeton valide | Message de succès, nouveau mot de passe utilisable | ✅ Conforme |
| M10 | Recherche `?city=Marrakech` | 2 résultats (Dar Zellij, La Table du Souk), compteur correct | ✅ Conforme |
| M11 | Recherche sans résultat (`Agadir` + `Jardin`) | État vide + bouton de réinitialisation | ✅ Conforme |
| M12 | Fiche restaurant `/restaurants/r-001` | Contenu affiché, bouton « Réserver » désactivé et étiqueté Sprint 2 | ✅ Conforme |
| M13 | URL inconnue | Page 404 avec retour à l'accueil | ✅ Conforme |
| M14 | Console navigateur sur les parcours | Aucune erreur | ✅ Conforme |

### Vérifications navigateur du 14 novembre 2026

Exécutées dans Chromium, sur le serveur Vite local, avec des iframes de largeur contrôlée
(pour compenser l'absence d'émulation d'appareil de l'outil). La largeur utile est
inférieure de 15 px à la largeur demandée à cause de la barre de défilement.

| Contrôle | Résultat |
| --- | --- |
| `/inscription`, soumission vide | 6 messages, focus sur `firstName`, aucun compte créé, 0 erreur console |
| `/inscription`, responsive 375 / 768 / 1280 | `form-grid` 1 / 1 / 2 colonnes, aside masquée puis visible, aucun débordement horizontal |
| `/recherche?city=Marrakech` | 2 cartes, uniquement Marrakech, compteur correct, 0 erreur console |
| Clic sur la puce « Casablanca » | URL `?city=Casablanca`, 2 cartes uniquement à Casablanca |
| `/recherche`, grille 375 / 768 / 1280 / 1440 | 1 / 2 / 3 / 3 colonnes, aucun débordement horizontal |

Ces mesures ne remplacent pas une recette sur appareil physique.

### Scénarios non exécutés (à faire en recette)

- Réinitialisation avec jeton **expiré** (nécessite de manipuler l'horloge ou d'attendre
  15 minutes) — logique présente dans `mockAuthApi.ts`.
- Vérification sur **appareil physique** (375 px) : les points de rupture ont été mesurés
  dans Chromium, mais aucune capture sur téléphone n'a été produite.
- Navigation avec lecteur d'écran (NVDA/VoiceOver) : non réalisée.

---

## 5. Audit accessibilité

| Contrôle | Résultat |
| --- | --- |
| Lighthouse Accessibilité | 100 / 100 |
| Contrastes de texte | Conformes après correction du jeton `--color-muted` |
| Nom accessible du logo | Corrigé (le texte visible est désormais le nom accessible) |
| Champs étiquetés | Tous les champs ont un `label` associé |
| Erreurs annoncées | `role="alert"` + `aria-describedby` |
| Focus première erreur | Vérifié le 14 novembre 2026 (test d'interface + navigateur) |
| Navigation clavier | Implémentée : lien d'évitement, focus visible, menu mobile pilotable (validation manuelle complète à faire) |
| Mouvement réduit | `prefers-reduced-motion` respecté |
| Images | Textes alternatifs ; images décoratives en `alt=""` |

> **Limite du contrôle** : ces résultats proviennent d'un audit automatisé (Lighthouse,
> page d'accueil, desktop) et de mesures Chromium du 14 novembre. La mise en page a été
> vérifiée à 375, 768, 1280 et 1440 px, mais le **rendu sur appareil physique**, la
> **navigation complète au clavier sur chaque page** et le **test avec un lecteur
> d'écran** (NVDA ou VoiceOver) restent à valider.

---

## 6. Anomalies et limites connues

| # | Type | Description | Statut |
| --- | --- | --- | --- |
| L1 | Limite assumée | Authentification simulée dans `localStorage` (pas de serveur) | Documenté, à remplacer |
| L2 | Limite assumée | Aucun e-mail réel n'est envoyé (US03) | Documenté dans l'interface |
| L3 | Limite assumée | Catalogue de 10 restaurants fictifs | À remplacer par l'API |
| L4 | Limite | Images distantes (Unsplash) : dépendance réseau | Repli visuel prévu |
| L5 | Test | Tests d'interface React pour US01 et US04 ajoutés le 14 novembre 2026 ; autres pages non couvertes | Résolu pour US01/US04, à étendre |
| L6 | Recette | Vérification sur appareil physique et lecteur d'écran à faire ; largeurs mesurées dans Chromium | À planifier |
| L7 | Sécurité | Hachage SHA-256 salé côté navigateur : **ne remplace pas** une authentification serveur | Documenté |

---

## 7. Reproductibilité

```bash
cd frontend
npm install
npm test          # 47 tests
npm run build     # vérification TypeScript + build
npm run dev       # recette manuelle sur http://localhost:5173
```

Compte de démonstration créé lors de la recette :
`zakaria.qa@example.com` (mot de passe local uniquement, non versionné).

Pour repartir d'une base propre dans le navigateur :

```js
localStorage.removeItem('lbt.mock.users.v1');
localStorage.removeItem('lbt.mock.session.v1');
```

---

## 8. Conclusion

Le périmètre **Front-End du Sprint 1** est fonctionnel et testé en mode démonstration.
Les critères d'acceptation des US01 à US04 sont satisfaits à l'exception des éléments
explicitement listés en section 6. L'audit du 14 novembre 2026 a porté la couverture
automatisée à **47 tests** et corrigé le focus du premier champ invalide. La **recette
QA/PO sur appareil physique et lecteur d'écran reste à faire**. **Le Back-End et les
Sprints 2–3 ne sont pas implémentés** et ne doivent pas être présentés comme livrés.

Le détail par sous-tâche Jira est dans
[`AUDIT-SCRUM-41-46.md`](./AUDIT-SCRUM-41-46.md).
