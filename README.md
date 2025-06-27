# ACME BIAQuiz

ACME BIAQuiz est un plugin WordPress proposant des quiz interactifs pour se préparer au Brevet d'Initiation à l'Aéronautique (BIA). Il permet de créer, importer et exporter facilement des questionnaires thématiques et d'offrir aux utilisateurs une interface moderne basée sur React.

## Installation

1. Copier le dossier du plugin dans le répertoire `wp-content/plugins/` de votre site WordPress.
2. Depuis l'administration WordPress, activer **ACME BIAQuiz** dans la liste des extensions.
3. Installer les dépendances JavaScript :
   ```bash
   npm install
   ```
4. Générer les fichiers front‑end dans le dossier `assets/` en exécutant :
   ```bash
   npm run build
   ```
5. Le plugin est prêt à être utilisé.

## Shortcode

Le plugin fournit le shortcode `[biaquiz]` pour afficher l'interface d'entraînement sur n'importe quelle page ou article. Il accepte deux options :

- `category` : identifiant slug de la catégorie à pré‑sélectionner.
- `quiz_id` : ID d'un quiz précis à charger directement.

Par défaut, sans option, le shortcode affiche la page d'accueil du quiz et propose la liste des catégories créées dans l'administration.
