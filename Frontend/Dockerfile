# Étape 1 : Construire l'application React
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Servir avec Nginx
FROM nginx:alpine

# Copier les fichiers statiques construits dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
