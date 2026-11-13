# Documentation — La Bonne Table

Point d'entrée de la documentation du projet académique **La Bonne Table**
(module M210 — Approche Agile, client TableConnect SARL, méthodologie Scrum).

Ce dossier ne contient que de la **documentation**. Le code de l'application vit dans
[`../frontend/`](../frontend/README.md) ; le code Back-End sera ajouté par son
développeur dans un dossier dédié à la racine du dépôt.

## Organisation

```text
docs/
└── my-front-end-tasks/       Volet Front-End — Zakaria Adli
    ├── README.md             Point d'entrée, périmètre, conventions
    ├── SPRINT-1.md           US01 → US04 (sprint actif)
    ├── SPRINT-2.md           US05 → US08 (planifié)
    ├── SPRINT-3.md           US09 → US12 (planifié)
    ├── JIRA-TASKS.md         Tâches à saisir manuellement dans Jira
    ├── ACCEPTANCE-CRITERIA.md Critères d'acceptation (Gherkin)
    ├── TEST-REPORT.md        Résultats de build, tests et audit
    ├── PROGRESS.md           Avancement et prochaines actions
    └── evidence/             Captures et preuves de recette
```

Les dossiers de documentation des autres volets (`backend/`, `qa/`, `scrum/`) seront
créés par leurs responsables lorsqu'ils auront du contenu : aucun dossier vide n'est
ajouté à l'avance.

## Par où commencer

| Vous êtes | Lisez |
| --- | --- |
| Scrum Master / Product Owner | [`my-front-end-tasks/PROGRESS.md`](./my-front-end-tasks/PROGRESS.md), puis [`JIRA-TASKS.md`](./my-front-end-tasks/JIRA-TASKS.md) |
| Développeur Back-End | [`my-front-end-tasks/README.md`](./my-front-end-tasks/README.md) (périmètre) et la section « Mode démonstration » du [`README` Front-End](../frontend/README.md) |
| Testeur / QA | [`my-front-end-tasks/ACCEPTANCE-CRITERIA.md`](./my-front-end-tasks/ACCEPTANCE-CRITERIA.md) et [`TEST-REPORT.md`](./my-front-end-tasks/TEST-REPORT.md) |
| Autre développeur Front-End | [`../frontend/README.md`](../frontend/README.md) puis [`my-front-end-tasks/SPRINT-1.md`](./my-front-end-tasks/SPRINT-1.md) |

## Conventions

- Documentation rédigée en **français**, langue du projet.
- Un dossier par volet, un fichier par sprint ou par livrable.
- Les captures d'écran vont dans le dossier `evidence/` du volet concerné
  (voir [`my-front-end-tasks/evidence/README.md`](./my-front-end-tasks/evidence/README.md)).
- Ne pas dupliquer une information : un document fait référence, les autres renvoient à lui.
- Aucune fonctionnalité non implémentée n'est présentée comme terminée.
