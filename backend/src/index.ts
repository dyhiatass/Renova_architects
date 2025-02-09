import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database"; // Import de la connexion MongoDB
import contactRoute from "./routes/contact";
import DevisRoute from "./routes/devis";
import adminRoute from "./routes/admin";

dotenv.config(); // Charge les variables d'environnement

const app = express();

// Connexion à MongoDB
connectDB()
  .then(() => console.log(" Connexion à la base de données réussie"))
  .catch((error) => console.error(" Erreur de connexion à MongoDB :", error));

// Configuration de CORS
app.use(
  cors({
    origin: "*", // Autorise toutes les origines (à restreindre en production)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware de journalisation des requêtes (DEBUG)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Requête reçue :", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
});

// Middleware pour parser les requêtes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définition des routes
app.use("/contact", contactRoute);
app.use("/devis", DevisRoute);
app.use("/admin", adminRoute);

// Route de test
app.get("/", (req: Request, res: Response) => {
  res.send("Serveur Express TypeScript en ligne !");
});

// Démarrage du serveur
const PORT: number = Number(process.env.PORT) || 5003; // Port défini dans .env ou 5002 par défaut

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
