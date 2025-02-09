# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## arborescence
── Frontend
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── image
│   │   ├── index.html
│   │   └── manifest.json
│   └── src
│       ├── App.js
│       ├── component
│       │   ├── ChangePassword
│       │   │   └── ChangePassword.js
│       │   ├── Footer
│       │   │   └── Footer.js
│       │   └── Header
│       │       └── Header.js
│       ├── index.js
│       └── pages
│           ├── Agence
│           │   └── Agence.js
│           ├── Amenagement
│           │   └── Amenagement.js
│           ├── Contact
│           │   └── Contact.js
│           ├── Dashboard
│           │   └── Dashboard.js
│           ├── Devis
│           │   └── DemandeDevis.js
│           ├── Login
│           │   └── Login.js
│           ├── MaitriseOeuvre
│           │   └── MaitriseOeuvre.js
│           ├── Realisation
│           │   └── Realisation.js
│           └── parmisConstruction
│               └── PermisConsruction.js
└── backend
    ├── controllers
    │   ├── AdminController.js
    │   ├── ContactController.js
    │   └── DevisController.js
    ├── database.js
    ├── index.js
    ├── middlewares
    │   └── Authentification.js
    ├── models
    │   ├── Admin.js
    │   ├── Contact.js
    │   └── Devis.js
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   ├── admin.js
    │   ├── contact.js
    │   └── devis.js
    └── test.js




    ├── Frontend           # Partie interface utilisateur (UI)
│   ├── README.md          # Documentation du frontend
│   ├── node_modules       # Bibliothèques nécessaires pour React
│   ├── package-lock.json  # Verrouillage des versions des dépendances
│   ├── package.json       # Liste des dépendances et scripts npm
│   ├── public             # Fichiers statiques (HTML, favicon, etc.)
│   └── src                # Code source principal de l'application React
└── Backend                # Partie serveur (API et gestion des données)
    ├── controllers        # Gère la logique métier (API)
    ├── database.js        # Connexion à la base de données MongoDB
    ├── index.js           # Point d'entrée du serveur
    ├── middlewares        # Fonctions intermédiaires (sécurité, validation)
    ├── models             # Définition des schémas de données pour MongoDB
    ├── node_modules       # Bibliothèques nécessaires pour le backend
    ├── package-lock.json  # Verrouillage des versions des dépendances
    ├── package.json       # Liste des dépendances et scripts npm
    ├── routes             # Définit les routes de l'API
    └── test.js            # Fichier pour tester des fonctionnalités
