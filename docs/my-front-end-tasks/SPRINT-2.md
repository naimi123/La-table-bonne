# Sprint 2 — Disponibilités & Réservation (planifié)

**Statut : non démarré.** Les cases ci-dessous décrivent le travail à réaliser ; elles
restent volontairement décochées afin de ne pas annoncer une fonctionnalité non livrée.

| Élément | Valeur |
| --- | --- |
| Sprint | 2 |
| Thème | Disponibilités & Réservation |
| Stories | US05, US06, US07, US08 |
| Développeur | Zakaria Adli (Front-End) |
| Statut | Planifié — architecture préparée |

> **Déjà en place (Sprint 1)** : squelette de fiche restaurant en lecture seule
> (`/restaurants/:id`), couche `services/`, composants `Button`, `Badge`, `Alert`,
> `RestaurantImage`, structure CSS par tokens. Le bouton « Réserver » est
> volontairement **désactivé** et étiqueté « Sprint 2 ».

---

## US05 — Filtrer les restaurants par type de cuisine

**Story**
> En tant que client, je veux filtrer les résultats par cuisine afin d'affiner ma recherche.

### Responsabilités Front-End à venir
- [ ] Ajouter une rangée de filtres cuisine sous la barre de recherche.
- [ ] Synchroniser les filtres avec l'URL (`?cuisine=…`).
- [ ] Afficher les filtres actifs sous forme de puces supprimables.
- [ ] Permettre la combinaison ville + cuisine + mot-clé.
- [ ] Annoncer le nombre de résultats après filtrage.

### Tâches techniques
- [ ] Étendre `SearchFilters` avec `cuisine?: string[]`.
- [ ] Étendre `filterRestaurants()` et ses tests unitaires.
- [ ] Créer un composant `FilterChipGroup` accessible (`aria-pressed` / `fieldset`).
- [ ] Ajouter un état « aucun résultat » contextualisé par filtre.
- [ ] Mettre à jour `GET /restaurants?cuisine=` côté contrat API.

### Sous-tâches
- [ ] Afficher les compteurs par cuisine (facultatif, si données disponibles).
- [ ] Bouton « Tout effacer ».
- [ ] Comportement mobile : filtres repliés dans un panneau.

### Critères d'acceptation
- [ ] Sélectionner « Marocaine » ne renvoie que les restaurants de cette cuisine.
- [ ] Plusieurs cuisines peuvent être combinées (OU logique).
- [ ] Les filtres survivent à un rechargement de page (URL).
- [ ] L'état vide propose de retirer les filtres.
- [ ] Navigation clavier complète.

### Dépendances
- US04 (page de recherche livrée).
- Liste officielle des cuisines fournie par le PO.
- Endpoint `GET /restaurants` avec paramètre `cuisine`.

### Definition of Done
- [ ] Build + tests unitaires passants.
- [ ] Tests manuels desktop/mobile documentés dans `TEST-REPORT.md`.
- [ ] Captures d'écran dans `evidence/`.
- [ ] Revue de code et validation PO.

### Preuves attendues
- `evidence/us05-01-filtres-cuisine.png`
- `evidence/us05-02-filtres-combines.png`

---

## US06 — Consulter la fiche détaillée d'un restaurant

**Story**
> En tant que client, je veux consulter la fiche d'un restaurant afin de décider si je
> souhaite y réserver une table.

### Responsabilités Front-End à venir
- [ ] Finaliser la fiche : galerie, description longue, adresse, horaires, équipements.
- [ ] Afficher les avis clients (moyenne + liste).
- [ ] Bouton « Réserver » actif (ouvre US07/US08).
- [ ] Fil d'Ariane et métadonnées de partage.

### Tâches techniques
- [ ] Compléter le modèle `Restaurant` (galerie, coordonnées, services).
- [ ] Découper la page en composants (`RestaurantHero`, `RestaurantInfo`, `ReviewList`).
- [ ] Brancher `GET /restaurants/:id` sur l'API réelle.
- [ ] Gérer l'état 404 (déjà prévu).
- [ ] Ajouter un `Suspense`/squelette dédié.

### Sous-tâches
- [ ] Carte statique ou lien vers l'itinéraire (`maps`).
- [ ] Indicateur « ouvert / fermé » calculé sur les horaires.
- [ ] Partage de la fiche (URL canonique).

### Critères d'acceptation
- [ ] La fiche affiche nom, ville, adresse, cuisine, gamme de prix, note et horaires.
- [ ] Une fiche inexistante affiche un état 404 avec retour à la recherche.
- [ ] Le bouton de réservation est visible et mène au calendrier.
- [ ] La page est lisible sur mobile (images non déformées).

### Dépendances
- US04, contrat `GET /restaurants/:id`.
- Visuels fournis ou validés.

### Definition of Done
- [ ] Build + tests passants.
- [ ] Accessibilité vérifiée (titres, contrastes, images alternatives).
- [ ] Captures `evidence/us06-*.png`.

---

## US07 — Consulter les disponibilités (calendrier)

**Story**
> En tant que client, je veux consulter les créneaux disponibles afin de choisir un
> horaire de réservation.

### Responsabilités Front-End à venir
- [ ] Calendrier mensuel accessible (navigation clavier, annonces ARIA).
- [ ] Sélection d'une date puis d'un créneau horaire.
- [ ] Affichage des créneaux complets comme indisponibles (jamais masqués sans explication).
- [ ] États : chargement, aucune disponibilité, erreur réseau, succès.
- [ ] Fuseau horaire et format français (`Intl.DateTimeFormat`).

### Tâches techniques
- [ ] Créer `Calendar` et `TimeSlotPicker` (aucune dépendance externe si possible).
- [ ] Créer `availabilityService.getAvailability(restaurantId, date)`.
- [ ] Modéliser `AvailabilitySlot { time, seatsLeft, isAvailable }`.
- [ ] Mettre en cache la journée sélectionnée.
- [ ] Gérer les dates passées (désactivées).

### Sous-tâches
- [ ] Légende des statuts.
- [ ] Navigation mois précédent / suivant bornée.
- [ ] Test unitaire du calcul des créneaux affichables.

### Critères d'acceptation
- [ ] Les dates passées ne sont pas sélectionnables.
- [ ] Un créneau complet est annoncé comme indisponible.
- [ ] Le changement de date recharge les créneaux avec un état de chargement.
- [ ] Le parcours est utilisable sans souris.

### Dépendances
- US06, US11 (configuration des créneaux côté restaurateur).
- Endpoint `GET /restaurants/:id/availability?date=`.

### Definition of Done
- [ ] Tests unitaires du calendrier.
- [ ] Audit accessibilité sans erreur critique.
- [ ] Captures `evidence/us07-*.png`.

---

## US08 — Réserver une table

**Story**
> En tant que client connecté, je veux réserver une table afin de garantir ma place.

### Responsabilités Front-End à venir
- [ ] Formulaire de réservation : date, créneau, nombre de personnes, remarque.
- [ ] Exiger la connexion (redirection vers `/connexion` puis retour).
- [ ] Récapitulatif avant validation.
- [ ] Gestion des erreurs métier (créneau pris entre-temps, capacité insuffisante).
- [ ] Ne jamais afficher « réservation enregistrée » sans confirmation du serveur.

### Tâches techniques
- [ ] Créer `reservationService.createReservation(payload)`.
- [ ] Créer `ReservationForm` + validation (`utils/validation.ts`).
- [ ] Protéger la route `/reserver/:restaurantId` avec `ProtectedRoute`.
- [ ] Gérer le conflit 409 (créneau indisponible) avec proposition d'alternative.
- [ ] Ajouter un identifiant de réservation au récapitulatif.

### Sous-tâches
- [ ] Nombre de convives limité à la capacité du restaurant.
- [ ] Champ « demande particulière » limité en longueur.
- [ ] Double soumission bloquée (bouton `loading`).
- [ ] Message d'erreur global non technique.

### Critères d'acceptation
- [ ] Un visiteur non connecté est redirigé vers la connexion.
- [ ] Le formulaire refuse une date passée ou un nombre de convives > capacité.
- [ ] Un créneau déjà pris affiche un message clair et une alternative.
- [ ] En cas de succès, redirection vers la confirmation (US09).
- [ ] Aucune donnée n'est présentée comme enregistrée si l'API échoue.

### Dépendances
- US07, US09, API `POST /reservations`.
- Décision produit sur les règles (délai minimum, nombre maximum).

### Definition of Done
- [ ] Build + tests passants.
- [ ] Scénarios d'erreur testés.
- [ ] Captures `evidence/us08-*.png`.

---

## Préparation déjà réalisée pour le Sprint 2

- [x] Couche services séparée des composants (`services/`), prête à recevoir l'API.
- [x] `ProtectedRoute` réutilisable pour les parcours authentifiés.
- [x] Page fiche restaurant en lecture seule avec bouton volontairement désactivé.
- [x] Types `Restaurant` extensibles (galerie, disponibilités).
- [x] Design system (tokens, boutons, champs, alertes, badges) réutilisable.
- [x] Tests unitaires sur les fonctions pures, faciles à étendre.
