# Critères d'acceptation — Front-End

Format Gherkin (`Étant donné / Quand / Alors`) pour faciliter la recette avec le PO, le
testeur QA et la saisie dans Jira.

Légende : ✅ vérifié · ⏳ à vérifier en revue · ❌ non applicable au Front-End.

---

## US01 — Inscription d'un client

### AC1.1 — Champs obligatoires
```gherkin
Étant donné que je suis sur la page /inscription
Quand je soumets le formulaire sans rien saisir
Alors chaque champ affiche un message d'erreur explicite
Et le premier champ en erreur reçoit le focus
Et aucun compte n'est créé
```
✅ Vérifié : 6 messages affichés (prénom, nom, e-mail, mot de passe, confirmation, conditions).

### AC1.2 — Format d'e-mail
```gherkin
Quand je saisis « zakaria@example » puis je soumets
Alors le message « Le format de l'adresse e-mail est invalide » s'affiche
Et le champ est marqué aria-invalid="true"
```
✅ Vérifié (règle unitaire + rendu).

### AC1.3 — Robustesse du mot de passe
```gherkin
Quand je saisis un mot de passe de 7 caractères
Alors le message « Le mot de passe doit contenir au moins 8 caractères » s'affiche

Quand je saisis « motdepasse » (sans chiffre)
Alors le message indique l'absence de chiffre

Quand je saisis « Table2026! »
Alors l'indicateur affiche « Fort »
```
✅ Vérifié (règles + tests unitaires `validatePassword`, `getPasswordStrength`).

### AC1.4 — Confirmation
```gherkin
Quand les deux mots de passe diffèrent
Alors le message « Les deux mots de passe ne correspondent pas » s'affiche
Et la soumission est bloquée
```
✅ Vérifié.

### AC1.5 — Conditions d'utilisation
```gherkin
Quand la case « conditions » n'est pas cochée
Alors la soumission est bloquée avec un message dédié
```
✅ Vérifié.

### AC1.6 — Succès
```gherkin
Étant donné des informations valides et un e-mail non utilisé
Quand je soumets le formulaire
Alors un compte de démonstration est créé
Et je suis redirigé vers /compte
Et un message de bienvenue s'affiche
Et la navigation montre mon prénom et mon nom
```
✅ Vérifié.

### AC1.7 — E-mail déjà utilisé
```gherkin
Étant donné un compte existant avec « zakaria.qa@example.com »
Quand je m'inscris avec la même adresse
Alors le message « Un compte existe déjà avec cette adresse e-mail » s'affiche
Et aucun second compte n'est créé
```
✅ Vérifié.

### AC1.8 — Transparence
```gherkin
Alors un bandeau indique que les comptes sont stockés dans le navigateur
Et qu'aucune donnée n'est envoyée à un serveur
```
✅ Vérifié.

---

## US02 — Connexion

### AC2.1 — Identifiants valides
```gherkin
Étant donné un compte existant
Quand je saisis l'e-mail et le mot de passe corrects
Alors je suis redirigé vers /compte
Et la session est restaurée après rechargement de la page
```
✅ Vérifié.

### AC2.2 — Identifiants invalides
```gherkin
Quand je saisis un mot de passe incorrect
Alors le message « Adresse e-mail ou mot de passe incorrect » s'affiche
Et le message est identique pour un e-mail inconnu
Et il est annoncé dans un rôle "alert"
```
✅ Vérifié (message identique, `role="alert"`).

### AC2.3 — Accès protégé
```gherkin
Étant donné que je ne suis pas connecté
Quand j'ouvre /compte directement
Alors je suis redirigé vers /connexion
Et après connexion je reviens sur /compte
```
✅ Vérifié.

### AC2.4 — Déconnexion
```gherkin
Quand je clique sur « Déconnexion »
Alors la session locale est effacée
Et je suis ramené à l'accueil
Et la navigation affiche « Connexion / Créer un compte »
```
✅ Vérifié.

---

## US03 — Réinitialisation du mot de passe

### AC3.1 — Demande neutre
```gherkin
Quand je demande une réinitialisation pour une adresse inconnue
Alors le message affiché est identique à celui d'une adresse connue
Et aucune information sur l'existence du compte n'est révélée
```
✅ Vérifié.

### AC3.2 — Lien valide
```gherkin
Étant donné un jeton valide de moins de 15 minutes
Quand je saisis un nouveau mot de passe conforme et sa confirmation
Alors le mot de passe est remplacé
Et le message « Mot de passe mis à jour » s'affiche
Et je peux me connecter avec le nouveau mot de passe
```
✅ Vérifié.

### AC3.3 — Jeton invalide
```gherkin
Quand j'utilise un jeton inconnu
Alors le message « Ce lien de réinitialisation est invalide » s'affiche
```
✅ Vérifié (code de service).

### AC3.4 — Jeton expiré
```gherkin
Étant donné un jeton dont la date d'expiration est passée
Quand je soumets le formulaire
Alors le message « Ce lien de réinitialisation a expiré » s'affiche
```
⏳ Vérifié par lecture du service, à rejouer en recette (manipulation de l'horloge).

### AC3.5 — Usage unique
```gherkin
Quand je réutilise un jeton déjà consommé
Alors la réinitialisation est refusée
```
✅ Vérifié (jeton supprimé du stockage après usage).

### AC3.6 — Transparence sur l'e-mail
```gherkin
Alors l'interface indique qu'aucun e-mail réel n'est envoyé
Et le jeton de démonstration est affiché pour permettre la recette
```
✅ Vérifié.

---

## US04 — Recherche par ville

### AC4.1 — Recherche par ville
```gherkin
Étant donné la page /recherche
Quand je choisis « Marrakech »
Alors seules les adresses de Marrakech sont affichées
Et le compteur annonce « 2 restaurants trouvés à Marrakech »
```
✅ Vérifié.

### AC4.2 — Insensibilité casse/accents
```gherkin
Quand je saisis « marrakech » ou « MARRAKECH »
Alors le résultat est identique
```
✅ Vérifié (test unitaire).

### AC4.3 — Aucun résultat
```gherkin
Quand aucune adresse ne correspond
Alors un état vide explique la situation
Et propose « Voir toutes les adresses »
Et ce bouton restaure le catalogue complet
```
✅ Vérifié.

### AC4.4 — États de chargement et d'erreur
```gherkin
Pendant la recherche
Alors des squelettes de cartes sont affichés et la zone est marquée aria-busy

Si le service échoue
Alors un message d'erreur s'affiche avec un bouton « Réessayer »
```
✅ Vérifié (squelettes observés, gestion d'erreur codée).

### AC4.5 — URL partageable
```gherkin
Quand j'ouvre /recherche?city=Marrakech&q=Dar
Alors les filtres sont appliqués au chargement
Et les champs sont préremplis
```
✅ Vérifié.

### AC4.6 — Cartes restaurants
```gherkin
Alors chaque carte affiche une image (avec alternative), le nom, la ville, la cuisine,
la note, la gamme de prix et un lien vers la fiche
Et si l'image distante échoue, un repli visuel s'affiche
```
✅ Vérifié.

### AC4.7 — Responsive
```gherkin
Alors la grille affiche 3 colonnes sur desktop, 2 sur tablette, 1 sur mobile
Et la navigation se replie dans un menu « Menu »
```
⏳ À valider visuellement en recette (points de rupture 480 / 760 / 900 / 980 px).

### AC4.8 — Périmètre exclu
```gherkin
Alors les filtres par cuisine et budget ne sont pas proposés comme actifs
Et une mention indique qu'ils arrivent au Sprint 2 (US05)
```
✅ Vérifié.

---

## US05 → US12 — Critères à valider lors des sprints concernés

Ces critères sont volontairement **non cochés** : aucune fonctionnalité correspondante
n'est implémentée.

### US05 — Filtres cuisine
- [ ] Filtre simple par cuisine.
- [ ] Combinaison de plusieurs cuisines (OU).
- [ ] URL synchronisée et partageable.
- [ ] État vide avec retrait des filtres.
- [ ] Navigation clavier et `aria-pressed`.

### US06 — Fiche restaurant
- [ ] Toutes les informations obligatoires affichées.
- [ ] Fiche inexistante → état 404 avec retour.
- [ ] Bouton « Réserver » actif et fonctionnel.
- [ ] Images non déformées et alternatives renseignées.

### US07 — Calendrier
- [ ] Dates passées désactivées.
- [ ] Créneaux complets annoncés indisponibles.
- [ ] Chargement et erreur gérés.
- [ ] Utilisable au clavier et au lecteur d'écran.

### US08 — Réservation
- [ ] Connexion obligatoire (redirection + retour).
- [ ] Validation date, créneau, nombre de convives.
- [ ] Conflit de créneau expliqué et alternative proposée.
- [ ] Aucune confirmation sans réponse serveur.

### US09 — Confirmation
- [ ] Identifiant de réservation affiché et copiable.
- [ ] Accès invalide → 404.
- [ ] Export calendrier fonctionnel.

### US10 — Annulation
- [ ] Confirmation explicite avant annulation.
- [ ] Statut mis à jour après réponse serveur.
- [ ] Annulation hors délai refusée avec explication.
- [ ] Isolation des données par utilisateur.

### US11 — Configuration restaurateur
- [ ] Accès réservé au rôle restaurateur.
- [ ] Capacité incohérente refusée.
- [ ] Créneaux visibles côté client.
- [ ] Confirmation visuelle de l'enregistrement.

### US12 — Tableau de bord restaurateur
- [ ] Périmètre limité aux établissements du restaurateur.
- [ ] Tri par heure, statuts lisibles sans couleur seule.
- [ ] Utilisable sur tablette.
- [ ] États vide / erreur / chargement.

---

## Critères non fonctionnels (tous sprints)

| Critère | Seuil | Vérification |
| --- | --- | --- |
| Accessibilité | Aucun audit Lighthouse critique | ✅ 100 / 100 |
| Contraste | ≥ 4,5:1 pour le texte courant | ✅ Corrigé (jeton `--color-muted`) |
| Responsive | 375 px → 1440 px sans débordement horizontal | ⏳ Recette visuelle |
| Performance | Bundle JS < 300 kB (hors gzip) | ✅ 232 kB |
| Erreurs console | 0 | ✅ Vérifié |
| TypeScript | `strict` sans erreur | ✅ `npm run build` |
| Tests unitaires | 100 % de réussite | ✅ 26/26 |
