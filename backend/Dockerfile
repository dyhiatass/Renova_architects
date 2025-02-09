# Utiliser une image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances en production uniquement
RUN npm install --only=production

# Copier le reste des fichiers
COPY . .

# Exposer le port 5000 (ou celui que vous utilisez dans le backend)
EXPOSE 5000

# Démarrer l'application
CMD ["npm", "start"]
