import express from "express";
import { loginAdmin, changePassword } from "../controllers/AdminController";
import authenticate from "../middlewares/Authentification"; // Middleware d'authentification

const router = express.Router();

// 🔹 Route pour la connexion de l'administrateur
router.post("/login", loginAdmin);

// 🔹 Route pour changer le mot de passe (protégée par `authenticate`)
router.put("/changePassword", authenticate, changePassword);

export default router;
