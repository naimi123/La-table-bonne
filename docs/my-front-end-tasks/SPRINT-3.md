# Sprint 3 — Gestion de l'espace restaurateur (planifié)

**Statut : non démarré.** Aucune fonctionnalité de ce sprint n'est implémentée ni
présentée comme disponible dans l'application.

| Élément | Valeur |
| --- | --- |
| Sprint | 3 |
| Thème | Confirmation, annulation, gestion restaurateur |
| Stories | US09, US10, US11, US12 |
| Développeur | Zakaria Adli (Front-End) |
| Statut | Planifié |

---

## US09 — Confirmation de réservation

**Story**
> En tant que client, je veux recevoir une confirmation de ma réservation afin d'être
> certain que ma table est réservée.

### Responsabilités Front-End à venir
- [ ] Écran de confirmation avec numéro de réservation, date, heure, restaurant.
- [ ] Récapitulatif imprimable / partageable.
- [ ] Lien vers « Mes réservations ».
- [ ] Message d'erreur si la confirmation n'a pas été obtenue.

### Tâches techniques
- [ ] Créer `ReservationConfirmationPage` (`/reservations/:id/confirmation`).
- [ ] Ajouter `reservationService.getReservation(id)`.
- [ ] Modéliser `Reservation { id, restaurantId, date, time, partySize, status }`.
- [ ] Empêcher l'affichage d'une confirmation sans données serveur.

### Sous-tâches
- [ ] Bouton « Ajouter au calendrier » (fichier `.ics` généré côté client).
- [ ] Mention explicite : e-mail de confirmation envoyé par le Back-End.

### Critères d'acceptation
- [ ] La page affiche toutes les informations de la réservation.
- [ ] L'identifiant est visible et copiable.
- [ ] Un accès direct sans réservation valide affiche un état 404.
- [ ] Aucune confirmation n'est affichée si l'API n'a pas répondu.

### Dépendances
- US08, API `GET /reservations/:id`.

### Definition of Done
- [ ] Tests passants, captures `evidence/us09-*.png`, revue PO.

---

## US10 — Annulation d'une réservation

**Story**
> En tant que client, je veux annuler une réservation afin de libérer ma table si je ne
> peux plus venir.

### Responsabilités Front-End à venir
- [ ] Liste « Mes réservations » avec statuts (à venir, passée, annulée).
- [ ] Action d'annulation avec confirmation explicite (dialogue accessible).
- [ ] Affichage de la politique d'annulation (délai autorisé).
- [ ] Mise à jour immédiate du statut après réponse serveur.

### Tâches techniques
- [ ] Créer `MyReservationsPage` protégée.
- [ ] `reservationService.cancelReservation(id)` avec gestion 403/409.
- [ ] Composant `ConfirmDialog` accessible (focus trap, `Escape`).
- [ ] Rafraîchir la liste après annulation.

### Sous-tâches
- [ ] Distinguer annulation possible / trop tardive (message dédié).
- [ ] Éviter la double annulation.
- [ ] Annonce du résultat aux lecteurs d'écran.

### Critères d'acceptation
- [ ] L'annulation demande une confirmation.
- [ ] Le statut passe à « Annulée » après succès serveur.
- [ ] Une annulation hors délai est refusée avec explication.
- [ ] L'utilisateur ne voit que ses propres réservations.

### Dépendances
- US09, API `DELETE /reservations/:id`.

### Definition of Done
- [ ] Scénarios d'erreur testés, captures, revue.

---

## US11 — Configurer la capacité et les créneaux (restaurateur)

**Story**
> En tant que restaurateur, je veux configurer mes créneaux et ma capacité afin que les
> clients ne réservent que des tables réellement disponibles.

### Responsabilités Front-End à venir
- [ ] Formulaire de capacité par service (midi / soir).
- [ ] Gestion des créneaux : ajout, suppression, durée, jours d'ouverture.
- [ ] Validation croisée (somme des créneaux ≤ capacité).
- [ ] Aperçu client des créneaux générés.

### Tâches techniques
- [ ] Créer `restaurantSettingsService` + `SettingsPage` protégée par rôle.
- [ ] Gérer les rôles dans `AuthContext` (`client`, `restaurateur`, `admin`).
- [ ] Créer `TimeSlotEditor` réutilisable.
- [ ] Empêcher la suppression d'un créneau ayant des réservations actives.

### Sous-tâches
- [ ] Valeurs par défaut raisonnables.
- [ ] Messages d'erreur métier explicites.
- [ ] Sauvegarde avec état `loading` / succès / erreur.

### Critères d'acceptation
- [ ] Seul un restaurateur peut accéder à l'écran.
- [ ] Une capacité incohérente est refusée.
- [ ] Les créneaux enregistrés apparaissent côté client (US07).
- [ ] Les modifications sont confirmées visuellement.

### Dépendances
- US07, US12, API `PUT /restaurants/:id/settings`, gestion des rôles Back-End.

### Definition of Done
- [ ] Autorisations vérifiées, captures, revue.

---

## US12 — Tableau de bord des réservations (restaurateur)

**Story**
> En tant que restaurateur, je veux consulter les réservations de mes restaurants afin
> d'organiser le service.

### Responsabilités Front-End à venir
- [ ] Vue jour/semaine des réservations.
- [ ] Filtres par service et par statut.
- [ ] Détail d'une réservation (client, convives, remarque).
- [ ] Indicateurs simples : couverts du jour, taux d'occupation.
- [ ] Export CSV (facultatif, si validé par le PO).

### Tâches techniques
- [ ] Créer `RestaurateurDashboardPage` protégée par rôle.
- [ ] `reservationService.listReservations({ restaurantId, date })`.
- [ ] Composant `ReservationTable` responsive (cartes sur mobile).
- [ ] Gérer les états vide / erreur / chargement.

### Sous-tâches
- [ ] Groupement par créneau horaire.
- [ ] Mise à jour manuelle du statut (honorée / no-show) si validée.
- [ ] Rafraîchissement manuel des données.

### Critères d'acceptation
- [ ] Un restaurateur ne voit que ses établissements.
- [ ] Les réservations sont triées par heure.
- [ ] Les statuts sont lisibles sans dépendre uniquement de la couleur.
- [ ] Le tableau est utilisable sur tablette.

### Dépendances
- US10, US11, API `GET /restaurants/:id/reservations`.

### Definition of Done
- [ ] Tests passants, audit accessibilité, captures, revue.

---

## Préparation déjà réalisée pour le Sprint 3

- [x] `ProtectedRoute` prêt à être étendu à des contrôles de rôle.
- [x] `AuthContext` centralise l'utilisateur (extension `role` prévue).
- [x] Types et services isolés, donc extensibles sans toucher aux composants.
- [x] Composants d'état (vide, erreur, chargement) déjà disponibles.
- [x] Aucune promesse fonctionnelle affichée dans l'interface pour ces stories.
