import mongoose, { Schema, Document } from "mongoose";

//Interface TypeScript pour typer l'admin
export interface IAdmin extends Document {
  email: string;
  password: string;
  isFirstLogin: boolean;
}

//Définition du schéma avec types
const AdminSchema: Schema<IAdmin> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Supprime les espaces inutiles
    lowercase: true, // Convertit en minuscules pour éviter les doublons d'email
  },
  password: {
    type: String,
    required: true,
  },
  isFirstLogin: {
    type: Boolean,
    default: true,
  },
});

//Création et exportation du modèle
const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
export default Admin;
