import { Request, Response } from "express";
import { ObjectId } from "mongodb"; // Importer ObjectId
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Admin, { IAdmin } from "../models/Admin"; // Import du modèle
dotenv.config();

// Interface pour `decoded` après `jwt.verify()`
interface DecodedToken {
  id: string;
}

// Interface Admin avec `_id` de type `string | ObjectId`
interface IAdminDoc extends IAdmin {
  _id: string | ObjectId;
}

//  Création automatique de l'administrateur
const createAdmin = async (): Promise<void> => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("L'administrateur existe déjà.");
      return;
    }

    const hashedPassword = await bcrypt.hash("temporary123", 10);

    const admin = new Admin({
      email: "admin@gmail.com",
      password: hashedPassword,
      isFirstLogin: true,
    });

    await admin.save();
    console.log("Administrateur créé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la création de l'administrateur :", error);
  }
};
createAdmin();

//Connexion de l'administrateur
const loginAdmin = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    console.log("Tentative de connexion avec :", email);

    const admin: IAdminDoc | null = await Admin.findOne({ email });
    if (!admin) {
      console.error("Administrateur non trouvé");
      return res.status(404).json({ message: "Administrateur non trouvé" });
    }

    console.log("État actuel de isFirstLogin :", admin.isFirstLogin);

    const isMatch = await bcrypt.compare(password.trim(), admin.password.trim());
    if (!isMatch) {
      console.error("Mot de passe incorrect");
      return res.status(401).json({ message: "Informations d'identification non valides" });
    }

    return res.status(200).json({
      message: "Connexion réussie",
      isFirstLogin: admin.isFirstLogin,
      token: jwt.sign(
        { id: admin._id.toString() }, // Convertir ObjectId en string
        process.env.JWT_SECRET || "secret123",
        { expiresIn: "1h" }
      ),
    });
  } catch (error) {
    const err = error as Error; // Cast `error` en `Error`
    console.error("Erreur de connexion :", err.message);
  
    return res.status(500).json({ 
      message: "Erreur de connexion", 
      error: err.message 
    });
  }
};

// Changement de mot de passe
const changePassword = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { newPassword } = req.body;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123") as DecodedToken;
    } catch (error) {
      return res.status(401).json({ message: "Token invalide ou expiré." });
    }

    const admin: IAdminDoc | null = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(404).json({ message: "Administrateur introuvable" });
    }

    // Vérifier si le nouveau mot de passe est identique à l'ancien
    const isSamePassword = await bcrypt.compare(newPassword, admin.password);
    if (isSamePassword) {
      return res.status(400).json({ message: "Le nouveau mot de passe doit être différent de l'ancien." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    admin.isFirstLogin = false; // Passe `isFirstLogin` à `false` après modification

    await admin.save(); // `.save()` fonctionne ici aussi !

    console.log("Mot de passe changé avec succès !");
    return res.status(200).json({
      isFirstLogin: false,
      message: "Mot de passe changé avec succès",
    });
  } catch (error) {
    const err = error as Error; // 🔹 Cast `error` en `Error`
    console.error("Erreur de connexion :", err.message);
  
    return res.status(500).json({ 
      message: "Erreur de connexion", 
      error: err.message 
    });
  }
};

export { loginAdmin, changePassword };
