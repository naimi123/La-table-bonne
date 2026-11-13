# Preuves et captures d'écran

Ce dossier est destiné aux preuves de recette du volet Front-End.
Il est **volontairement vide de captures** : les images doivent être produites par
Zakaria Adli sur l'application en fonctionnement, puis ajoutées ici avant la revue.

## Convention de nommage

```text
us<numéro>-<ordre>-<description-courte>.png
```

Exemples attendus :

| Fichier | Scénario |
| --- | --- |
| `us01-01-formulaire-vide-erreurs.png` | US01 — validation du formulaire vide |
| `us01-02-inscription-succes.png` | US01 — compte créé, redirection vers l'espace client |
| `us01-03-email-deja-utilise.png` | US01 — doublon d'adresse e-mail |
| `us02-01-connexion-erreur.png` | US02 — identifiants invalides |
| `us02-02-connexion-succes-compte.png` | US02 — session ouverte |
| `us03-01-demande-envoyee.png` | US03 — message neutre + jeton de démonstration |
| `us03-02-nouveau-mot-de-passe.png` | US03 — formulaire de réinitialisation |
| `us03-03-connexion-nouveau-mot-de-passe.png` | US03 — connexion après réinitialisation |
| `us04-01-resultats-ville.png` | US04 — résultats pour Marrakech |
| `us04-02-aucun-resultat.png` | US04 — état vide |
| `us04-03-mobile.png` | US04 — grille sur mobile (375 px) |
| `nav-mobile.png` | Navigation repliée sur mobile |
| `lighthouse.png` | Audit Lighthouse 100/100/100 |

## Bonnes pratiques

- Capturer la **barre d'adresse** pour prouver la route testée.
- Faire apparaître la **date** de la recette dans la capture (horloge système).
- Pour les états d'erreur, garder le message visible.
- Pour le mobile, utiliser les outils de développement du navigateur (mode appareil).
- Ne jamais inclure de mot de passe réel ni de donnée personnelle sensible.
- Compresser les PNG (largeur maximale 1600 px) pour garder le dépôt léger.
