import express from "express";
import {
    submitDevis,
    getAllDevis,
    updateDevis,
    deleteDevis,
    getDevisById,
    getDevisStats
} from "../controllers/DevisController";

const router = express.Router();

// 🔹 Route pour soumettre un nouveau devis
router.post("/", submitDevis);

// 🔹 Route pour obtenir les statistiques des devis
router.get("/stats", getDevisStats);

// 🔹 Route pour récupérer un devis spécifique par ID
router.get("/:id", getDevisById);

// 🔹 Route pour obtenir tous les devis
router.get("/", getAllDevis);

// 🔹 Route pour modifier un devis
router.put("/:id", updateDevis);

// 🔹 Route pour supprimer un devis
router.delete("/:id", deleteDevis);

export default router;
