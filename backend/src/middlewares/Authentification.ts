import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//Clé secrète sécurisée via les variables d'environnement
const SECRET_KEY = process.env.JWT_SECRET || "secret123";

// Interface pour inclure `adminId` dans `Request`
interface AuthRequest extends Request {
  adminId?: string;
}

// Middleware d'authentification
const Authentification = (req: AuthRequest, res: Response, next: NextFunction): Response | void => {
  try {
    //  Vérifier la présence du token dans l'en-tête Authorization
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Aucun jeton fourni" });
    }

    //  Vérifier et décoder le token
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };
    req.adminId = decoded.id; // Stocke l'ID de l'admin dans la requête

    next(); // Passer au middleware suivant
  } catch (error: any) {
    console.error("Erreur d'authentification :", error.message);
    return res.status(403).json({ message: "Jeton invalide" });
  }
};

export default Authentification;
