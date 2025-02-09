import mongoose, { Schema, Document } from "mongoose";

// Interface pour `questionnaire`
interface IQuestion {
  question: string;
  answer: string;
}

interface IQuestionnaire {
  date?: Date;
  description: string;
  questions: IQuestion[];
}

//  Interface pour `projectDescriptions`
interface IProjectDescription {
  description: string;
  date?: Date;
}

//  Interface principale `Devis`
export interface IDevis extends Document {
  contactDetails: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    city: string;
    email: string;
    phone: string;
  };
  projectDescriptions: IProjectDescription[];
  questionnaire: IQuestionnaire[];
  dateDevis?: Date;
}

//  Définition du Schéma Mongoose
const DevisSchema: Schema = new Schema({
  contactDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/ // Validation email
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/ //Validation numéro téléphone
    },
  },
  projectDescriptions: [
    {
      description: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  questionnaire: [
    {
      date: { type: Date, default: Date.now },
      description: { type: String, required: true },
      questions: [
        {
          question: { type: String, required: true },
          answer: { type: String, required: true },
        },
      ],
    },
  ],
  dateDevis: { type: Date, default: Date.now },
});

// Création et exportation du modèle Mongoose
const Devis = mongoose.model<IDevis>("Devis", DevisSchema, "DevisUser");

export default Devis;
