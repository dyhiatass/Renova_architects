import { Request, Response } from "express";
import Devis from "../models/Devis";
import { sendDevisEmails } from "../services/emailService";

// Soumission d'un devis
export const submitDevis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            firstName,
            lastName,
            address,
            postalCode,
            city,
            email,
            phone,
            projectDescription,
            questionnaire,
        } = req.body;

        if (!firstName || !lastName || !email || !phone || !projectDescription || !questionnaire) {
            return res.status(400).json({ message: "Champs obligatoires manquants." });
        }

        let devis = await Devis.findOne({ "contactDetails.email": email });

        if (devis) {
            devis.projectDescriptions.push({ description: projectDescription, date: new Date() });
            devis.questionnaire.push({ description: "Réponses au questionnaire", date: new Date(), questions: questionnaire });
        } else {
            devis = new Devis({
                contactDetails: { firstName, lastName, address, postalCode, city, email, phone },
                projectDescriptions: [{ description: projectDescription, date: new Date() }],
                questionnaire: [{ description: "Réponses au questionnaire", date: new Date(), questions: questionnaire }],
            });
        }

        await devis.save();

        await sendDevisEmails({
            contactDetails: { firstName, lastName, email, phone, address, postalCode, city },
            projectDescription,
            questionnaire,
        });

        return res.status(200).json({
            message: devis.projectDescriptions.length > 1 ? "Devis mis à jour avec succès." : "Devis soumis avec succès !",
            devisId: devis._id,
        });
    } catch (error: any) {
        console.error("Erreur lors de la soumission du devis :", error.message);
        return res.status(500).json({ message: "Erreur lors de la soumission du devis." });
    }
};

//Récupérer tous les devis
export const getAllDevis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const devisList = await Devis.find().lean();

        return res.status(200).json(devisList);
    } catch (error: any) {
        console.error("Erreur lors de la récupération des devis :", error.message);
        return res.status(500).json({ message: "Erreur lors de la récupération des devis." });
    }
};

//Récupérer un devis par ID
export const getDevisById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const devis = await Devis.findById(req.params.id).lean();
        if (!devis) {
            return res.status(404).json({ message: "Devis non trouvé." });
        }
        return res.status(200).json(devis);
    } catch (error: any) {
        console.error("Erreur lors de la récupération du devis :", error.message);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

//Ajouter un devis
export const addDevis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newDevis = new Devis(req.body);
        await newDevis.save();
        return res.status(201).json({ message: "Devis ajouté avec succès.", devis: newDevis });
    } catch (error: any) {
        console.error("Erreur lors de l'ajout du devis :", error);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

// Modifier un devis
export const updateDevis = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedDevis = await Devis.findByIdAndUpdate(id, req.body, { new: true }).lean();
        if (!updatedDevis) {
            return res.status(404).json({ message: "Devis non trouvé." });
        }
        return res.status(200).json({ message: "Devis modifié avec succès.", devis: updatedDevis });
    } catch (error: any) {
        console.error("Erreur lors de la modification du devis :", error);
        return res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

// Supprimer un devis

export const deleteDevis = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(" Suppression du devis avec ID :", id); // Vérification

        const deletedDevis = await Devis.findByIdAndDelete(id);
        if (!deletedDevis) {
            return res.status(404).json({ message: "Devis non trouvé." });
        }
        res.status(200).json({ message: "Devis supprimé avec succès !" });
    } catch (error) {
        console.error("Erreur lors de la suppression du devis :", error);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

  



//Récupérer les statistiques des devis
export const getDevisStats = async (req: Request, res: Response): Promise<Response> => {
    try {
        const totalDevis = await Devis.countDocuments();

        const devisByMonth = await Devis.aggregate([
            {
                $group: {
                    _id: { $month: "$dateDevis" },
                    count: { $sum: 1 },
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const devisByType = await Devis.aggregate([
            { $unwind: "$questionnaire" },
            { $unwind: "$questionnaire.questions" },
            { $match: { "questionnaire.questions.question": "Quel est votre projet" } },
            {
                $group: {
                    _id: "$questionnaire.questions.answer",
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
        ]);

        return res.status(200).json({
            totalDevis,
            devisByMonth,
            devisByType
        });
    } catch (error: any) {
        console.error("Erreur lors de l'obtention des statistiques des devis :", error);
        return res.status(500).json({ message: "Erreur lors de l'obtention des statistiques." });
    }
};
