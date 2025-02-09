import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL: string | undefined = process.env.MONGO_URL;

if (!MONGO_URL) {
    throw new Error("⚠️ La variable d'environnement MONGO_URL est manquante !");
}

//Connexion à MongoDB avec gestion des erreurs
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 5000, // Délai de sélection du serveur
        });
        console.log("Connecté à MongoDB !");
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", (error as Error).message);
        process.exit(1); // Arrête l'application en cas d'échec
    }
};

export default connectDB;
