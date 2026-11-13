# Rapport de test — Sprint 1 (Front-End)

| Élément | Valeur |
| --- | --- |
| Date d'exécution | 13 novembre 2026 |
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
| Tests unitaires | ✅ 26 / 26 |
| Parcours manuels | ✅ 12 / 12 conformes |
| Erreurs console | ✅ 0 |
| Audit Lighthouse — Accessibilité | ✅ 100 |
| Audit Lighthouse — Bonnes pratiques | ✅ 100 |
| Audit Lighthouse — SEO | ✅ 100 |
| Anomalies bloquantes | ✅ Aucune |

> Les audits Lighthouse ont été lancés sur la page d'accueil. **Premier passage :**
> accessibilité 97, bonnes pratiques 100, SEO 83. Deux corrections ont été apportées
> (contraste du texte secondaire et nom accessible du logo), puis le second passage a
> donné 100 / 100 / 100.

---

## 2. Tests automatisés

Commande : `npm test` (Vitest 2.1.9)

```text
✓ src/utils/validation.test.ts        (19 tests)
✓ src/services/restaurantFilters.test.ts (7 tests)

Test Files  2 passed (2)
     Tests  26 passed (26)
  Duration  4,36 s
```

| Fichier | Couverture fonctionnelle |
| --- | --- |
| `src/utils/validation.test.ts` | Nettoyage des saisies, e-mail, mot de passe, confirmation, conditions, robustesse, normalisation de recherche |
| `src/services/restaurantFilters.test.ts` | Filtre par ville, par mot-clé, insensibilité casse/accents, combinaison, résultat vide, extraction des villes |

> **Limite assumée** : les composants React ne sont pas couverts par des tests
> d'interface. React Testing Library n'a pas été ajouté afin de ne pas introduire de
> dépendance non demandée au Sprint 1. Les parcours sont couverts manuellement
> (section 4) ; l'ajout de tests d'interface est proposé au Sprint 2.

---

## 3. Build de production

Commande : `npm run build` (`tsc --noEmit && vite build`)

```text
vite v5.4.21 building for production...
✓ 1613 modules transformed.
dist/index.html                 0,65 kB │ gzip:  0,40 kB
dist/assets/index-*.css        32,64 kB │ gzip:  6,81 kB
dist/assets/index-*.js        232,21 kB │ gzip: 72,09 kB
✓ built in 21,80 s
```

- TypeScript `strict`, sans erreur, avec `noUnusedLocals` et `noUnusedParameters`.
- Aucune dépendance superflue : React, React DOM, React Router, Lucide React ;
  en développement : Vite, TypeScript, plugin React, Vitest, types React.

---

## 4. Tests manuels des parcours

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

### Scénarios non exécutés (à faire en recette)

- Réinitialisation avec jeton **expiré** (nécessite de manipuler l'horloge ou d'attendre
  15 minutes) — logique présente dans `mockAuthApi.ts`.
- Vérification visuelle mobile réelle (375 px) : les points de rupture CSS sont
  implémentés mais la capture sur appareil reste à produire.
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
| Navigation clavier | Lien d'évitement, focus visible, menu mobile pilotable |
| Mouvement réduit | `prefers-reduced-motion` respecté |
| Images | Textes alternatifs ; images décoratives en `alt=""` |

---

## 6. Anomalies et limites connues

| # | Type | Description | Statut |
| --- | --- | --- | --- |
| L1 | Limite assumée | Authentification simulée dans `localStorage` (pas de serveur) | Documenté, à remplacer |
| L2 | Limite assumée | Aucun e-mail réel n'est envoyé (US03) | Documenté dans l'interface |
| L3 | Limite assumée | Catalogue de 10 restaurants fictifs | À remplacer par l'API |
| L4 | Limite | Images distantes (Unsplash) : dépendance réseau | Repli visuel prévu |
| L5 | Test | Tests d'interface React absents | Proposé Sprint 2 |
| L6 | Recette | Vérification mobile et lecteur d'écran à faire | À planifier |
| L7 | Sécurité | Hachage SHA-256 salé côté navigateur : **ne remplace pas** une authentification serveur | Documenté |

---

## 7. Reproductibilité

```bash
cd frontend
npm install
npm test          # 26 tests
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
explicitement listés en section 6. **Le Back-End et les Sprints 2–3 ne sont pas
implémentés** et ne doivent pas être présentés comme livrés.
