import express from "express";
import {
    sendMail,
    getUser,
    deleteUser,  // Correction du nom de la fonction
    getUserById,
    updateUser
} from "../controllers/ContactController";

const router = express.Router();

// 🔹 Route pour envoyer un message (Créer un contact)
router.post("/", sendMail);

// 🔹 Route pour récupérer tous les contacts
router.get("/", getUser);

// 🔹 Route pour supprimer plusieurs contacts
router.post("/delete", deleteUser);

// 🔹 Route pour récupérer un contact par son ID
router.get("/:id", getUserById);

// 🔹 Route pour mettre à jour un contact
router.put("/:id", updateUser);

export default router;
