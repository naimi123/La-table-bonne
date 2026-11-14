# Sprint 1 — Accès & Recherche (actif)

**Objectif du sprint** : permettre à un client de créer un compte, de se connecter,
de récupérer l'accès à son compte et de trouver un restaurant par ville.

| Élément | Valeur |
| --- | --- |
| Sprint | 1 |
| Thème | Accès & Recherche |
| Stories | US01, US02, US03, US04 |
| Développeur | Zakaria Adli (Front-End) |
| Branche | `feature/zakaria-frontend-sprint1` |
| Dossier | `frontend/` |
| Statut | Front-End livré en mode démonstration, en attente de revue d'équipe |

> Le Back-End n'étant pas disponible, les services sont simulés
> (`VITE_USE_MOCK_API=true`). Les écrans sont réels et testables, mais **aucune
> donnée n'est persistée sur un serveur** et **aucune authentification réelle n'est
> effectuée**. Ce point doit être rappelé à la démonstration.

---

## US01 — Inscription d'un client

**Story**
> En tant que visiteur, je veux créer un compte client afin de pouvoir réserver une table.

### Mes responsabilités Front-End
- [x] Écran d'inscription responsive (`/inscription`).
- [x] Validation côté client des champs et messages d'erreur explicites.
- [x] Indicateur de robustesse du mot de passe.
- [x] Gestion des états : soumission, erreur, succès.
- [x] Redirection vers l'espace client après création du compte.
- [x] Accessibilité des champs (`label`, `aria-invalid`, `aria-describedby`).

### Tâches techniques
- [x] Créer la page `RegisterPage` et sa mise en page (`AuthLayout`).
- [x] Créer les composants `TextField`, `PasswordField`, `PasswordStrengthMeter`.
- [x] Écrire les règles de validation dans `utils/validation.ts`.
- [x] Implémenter `registerUser()` dans `services/authService.ts`.
- [x] Gérer le doublon d'adresse e-mail (erreur 409 en mode simulé).
- [x] Persister la session locale via `AuthContext`.
- [x] Ajouter les mentions de transparence du mode démonstration.

### Sous-tâches
- [x] Prénom : obligatoire, 2 à 40 caractères alphabétiques.
- [x] Nom : obligatoire, 2 à 40 caractères alphabétiques.
- [x] E-mail : obligatoire, format valide, unicité.
- [x] Mot de passe : 8 caractères minimum, une lettre et un chiffre.
- [x] Confirmation identique au mot de passe.
- [x] Acceptation obligatoire des conditions.
- [x] Bouton en état `loading` pendant la soumission.

### Critères d'acceptation
- [x] Tous les champs obligatoires sont présents et étiquetés.
- [x] La soumission d'un formulaire vide affiche une erreur sous chaque champ.
- [x] Un e-mail invalide affiche « Le format de l'adresse e-mail est invalide ».
- [x] Un mot de passe de moins de 8 caractères est refusé avec un message.
- [x] La confirmation différente est refusée.
- [x] Les conditions non cochées sont refusées.
- [x] Un e-mail déjà utilisé affiche « Un compte existe déjà avec cette adresse e-mail ».
- [x] En cas de succès : redirection vers `/compte` + message de bienvenue.
- [x] Le formulaire reste utilisable au clavier et sur mobile.
- [ ] Validation en revue par un autre membre de l'équipe.

### Dépendances
- Contrat d'API `POST /auth/register` (Back-End) — en attente.
- Décision produit sur les champs obligatoires (PO) — validée par les critères ci-dessus.

### Definition of Done
- [x] Code fusionnable, sans erreur TypeScript (`npm run build`).
- [x] Tests unitaires de validation passants.
- [x] Aucune erreur console sur le parcours.
- [x] Mentions « mode démonstration » affichées.
- [ ] Capture d'écran ajoutée dans `evidence/`.
- [ ] Revue de code par un pair.
- [ ] Tâche Jira déplacée en « Done » **après** revue (manuellement).

### Preuves attendues
- `evidence/us01-01-formulaire-vide-erreurs.png`
- `evidence/us01-02-inscription-succes.png`
- `evidence/us01-03-email-deja-utilise.png`

---

## US02 — Connexion

**Story**
> En tant que client inscrit, je veux me connecter afin d'accéder à mon espace personnel.

### Mes responsabilités Front-End
- [x] Écran de connexion responsive (`/connexion`).
- [x] Validation e-mail / mot de passe.
- [x] Affichage d'une erreur non révélatrice (« Adresse e-mail ou mot de passe incorrect »).
- [x] Redirection vers la page demandée initialement (`ProtectedRoute`).
- [x] État connecté visible dans la navigation (avatar, nom, déconnexion).

### Tâches techniques
- [x] Créer `LoginPage` + composant de champ réutilisable (`TextField`).
- [x] Implémenter `loginUser()` et le hachage salé en mode simulé.
- [x] Créer `AuthContext` (`login`, `logout`, restauration de session).
- [x] Protéger `/compte` avec `ProtectedRoute`.
- [x] Gérer le bouton d'affichage/masquage du mot de passe.
- [x] Gérer la déconnexion depuis la barre de navigation.

### Sous-tâches
- [x] Champs préremplissables par le gestionnaire de mots de passe (`autocomplete`).
- [x] Message d'erreur global dans un `role="alert"`.
- [x] Lien « Mot de passe oublié ? ».
- [x] Lien vers l'inscription.

### Critères d'acceptation
- [x] Un identifiant inconnu affiche « Adresse e-mail ou mot de passe incorrect ».
- [x] Un mot de passe erroné affiche le même message (pas d'énumération de comptes).
- [x] Des identifiants valides redirigent vers `/compte`.
- [x] L'accès direct à `/compte` sans session redirige vers `/connexion`.
- [x] Après connexion, la navigation affiche le nom de l'utilisateur.
- [x] La déconnexion ramène à l'accueil et efface la session.
- [ ] Revue de code par un pair.

### Dépendances
- Contrat d'API `POST /auth/login` — en attente.
- US01 (compte existant).

### Definition of Done
- [x] Build et tests passants.
- [x] Aucune erreur console.
- [x] Session restaurée après rechargement de page.
- [ ] Capture d'écran dans `evidence/`.
- [ ] Revue de code.

### Preuves attendues
- `evidence/us02-01-connexion-erreur.png`
- `evidence/us02-02-connexion-succes-compte.png`

---

## US03 — Réinitialisation du mot de passe

**Story**
> En tant que client ayant oublié son mot de passe, je veux le réinitialiser afin de
> retrouver l'accès à mon compte.

### Mes responsabilités Front-End
- [x] Écran de demande (`/mot-de-passe-oublie`).
- [x] Écran de réinitialisation avec jeton (`/reinitialiser-mot-de-passe?token=…`).
- [x] Message neutre anti-énumération (« Si un compte est associé… »).
- [x] Validation du nouveau mot de passe + confirmation.
- [x] Gestion des jetons invalides et expirés (message dédié).
- [x] Affichage du jeton en mode démonstration (aucun e-mail réel).

### Tâches techniques
- [x] Créer `ForgotPasswordPage` et `ResetPasswordPage`.
- [x] Implémenter `requestPasswordReset()` et `resetPassword()`.
- [x] Générer un jeton à durée de vie 15 minutes (simulation).
- [x] Stocker uniquement l'empreinte SHA-256 du jeton.
- [x] Préremplir le jeton depuis l'URL.
- [x] Afficher un lien direct de test dans l'interface (mode démo).

### Sous-tâches
- [x] Validation du format e-mail avant envoi.
- [x] Message de confirmation après demande.
- [x] Blocage d'un jeton expiré.
- [x] Blocage d'un jeton inconnu.
- [x] Consommation unique du jeton (supprimé après usage).

### Critères d'acceptation
- [x] Une adresse inconnue affiche le même message de confirmation (pas de fuite d'information).
- [x] Un jeton valide permet de définir un nouveau mot de passe.
- [x] Le nouveau mot de passe respecte les règles de robustesse.
- [x] Le jeton est inutilisable après emploi.
- [x] Un jeton expiré affiche « Ce lien de réinitialisation a expiré ».
- [x] Après succès, un lien mène à la connexion.
- [ ] Envoi réel d'e-mail (hors périmètre Front-End, dépend du Back-End).

### Dépendances
- Services d'envoi d'e-mail (Back-End) — **non disponible**, donc simulé.
- US01/US02.

### Definition of Done
- [x] Parcours complet testé manuellement (demande → jeton → nouveau mot de passe → connexion).
- [x] Build et tests passants.
- [x] Transparence affichée sur l'absence d'e-mail réel.
- [ ] Capture d'écran dans `evidence/`.
- [ ] Revue de code.

### Preuves attendues
- `evidence/us03-01-demande-envoyee.png`
- `evidence/us03-02-nouveau-mot-de-passe.png`
- `evidence/us03-03-connexion-nouveau-mot-de-passe.png`

---

## US04 — Rechercher un restaurant par ville

**Story**
> En tant que client, je veux rechercher un restaurant par ville afin de trouver une
> adresse proche de moi.

### Mes responsabilités Front-End
- [x] Barre de recherche (ville + nom/cuisine) sur l'accueil et la page résultats.
- [x] Page résultats `/recherche` avec paramètres d'URL (`?city=…&q=…`).
- [x] Puces de villes rapides avec état actif (`aria-pressed`).
- [x] Cartes restaurants (image, note, cuisine, prix, tags, lien fiche).
- [x] État de chargement (squelettes), état vide, état d'erreur avec « Réessayer ».
- [x] Compteur de résultats annoncé (`role="status"`).
- [x] Réinitialisation des filtres.
- [x] Repli visuel si une image distante ne charge pas.

### Tâches techniques
- [x] Créer `SearchBar`, `RestaurantCard`, `RestaurantImage`, `EmptyState`, `Skeleton`.
- [x] Créer `restaurantService.searchRestaurants()` (mock + HTTP prêt).
- [x] Écrire la fonction pure `filterRestaurants()` (insensible à la casse/accents).
- [x] Synchroniser l'état avec l'URL via `useSearchParams`.
- [x] Créer le catalogue de démonstration (10 restaurants, 6 villes).
- [x] Gérer `aria-busy` pendant le chargement.

### Sous-tâches
- [x] Recherche par ville exacte (insensible aux accents).
- [x] Recherche texte sur nom, cuisine, ville et tags.
- [x] Combinaison ville + mot-clé.
- [x] Aucun résultat : message contextualisé + action de réinitialisation.
- [x] Cartes responsives (1 → 3 colonnes).
- [x] Mention explicite : les filtres cuisine/budget arrivent au Sprint 2 (US05).

### Critères d'acceptation
- [x] Une recherche « Marrakech » retourne les restaurants de Marrakech uniquement.
- [x] « marrakech » (minuscules) et « Marrakech » donnent le même résultat.
- [x] Une recherche sans correspondance affiche un état vide explicite.
- [x] Le compteur annonce le nombre de résultats.
- [x] L'URL est partageable et rechargeable avec les mêmes filtres.
- [x] Le bouton « Réinitialiser » restaure le catalogue complet.
- [x] Les images disposent d'un texte alternatif et d'un repli.
- [ ] Filtres par cuisine et budget (US05 — Sprint 2, **non implémentés**).

### Dépendances
- Contrat d'API `GET /restaurants?city=&q=` (Back-End) — en attente.
- Jeu de données de démonstration validé par le PO.

### Definition of Done
- [x] Build et tests passants (filtrage couvert par tests unitaires).
- [x] États chargement / vide / erreur / succès présents.
- [x] Points de rupture CSS implémentés (480 / 760 / 900 / 980 px).
- [ ] Recette visuelle réelle sur appareil (375 px) — **en attente**.
- [ ] Capture d'écran desktop + mobile dans `evidence/`.
- [ ] Revue de code.

### Preuves attendues
- `evidence/us04-01-resultats-ville.png`
- `evidence/us04-02-aucun-resultat.png`
- `evidence/us04-03-mobile.png`

---

## Dettes techniques et points à arbitrer

| Sujet | Description | Échéance proposée |
| --- | --- | --- |
| Authentification simulée | Remplacer `mockAuthApi` par l'API réelle | Dès livraison Back-End |
| Images distantes | Passer sur des visuels hébergés/optimisés | Sprint 2 |
| Tests d'interface | Ajouter React Testing Library (non installé pour limiter les dépendances) | Sprint 2 |
| Filtres cuisine | Prévu US05 | Sprint 2 |
| Pagination | Non nécessaire pour 10 adresses | Sprint 3 si besoin |
