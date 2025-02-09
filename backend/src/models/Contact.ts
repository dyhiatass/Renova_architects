import mongoose, { Schema, Document } from "mongoose";

// Interface Contact pour définir la structure du document
export interface IContact extends Document {
  lastName: string;
  firstName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phone: string;
  projectDescriptions: {
    description: string;
    date?: Date;
  }[];
  submittedAt?: Date;
}

// Définition du Schéma Mongoose
const ContactSchema: Schema = new Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  city: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/, //  Validation du format email
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/, //  Validation pour un numéro à 10 chiffres
  },
  projectDescriptions: [
    {
      description: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

//  Création et exportation du modèle Mongoose
const Contact = mongoose.model<IContact>("Contact", ContactSchema, "contactsUser");

export default Contact;
