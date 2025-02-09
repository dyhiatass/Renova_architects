import { Request, Response } from "express";
import Contact from "../models/Contact";
import { sendNotificationEmails } from "../services/emailService";

//  Fonction d'envoi d'email et ajout/modification d'un contact
export const sendMail = async (req: Request, res: Response): Promise<Response> => {
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
        } = req.body;

        // Vérification des champs requis
        if (!email || !projectDescription) {
            return res.status(400).json({ message: "Email et description du projet sont requis." });
        }

        // Vérifier ou créer un contact
        let contact = await Contact.findOne({ email });

        if (contact) {
            contact.projectDescriptions.push({ description: projectDescription });
        } else {
            contact = new Contact({
                firstName,
                lastName,
                address,
                postalCode,
                city,
                email,
                phone,
                projectDescriptions: [{ description: projectDescription }],
            });
        }

        await contact.save(); // `.save()` fonctionne car c'est un document Mongoose

        // Envoi de notification par email
        await sendNotificationEmails({ clientData: { firstName, lastName, email }, projectDescription });

        return res.status(200).json({ message: "Message reçu avec succès. Emails envoyés." });
    } catch (error: any) {
        console.error("Erreur lors de l'envoi de l'email :", error);
        return res.status(500).json({ message: "Une erreur s'est produite lors de l'envoi de l'email.", error: error.message });
    }
};

// Récupération de tous les contacts
export const getUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contacts = await Contact.find().lean(); //Utilisation de `.lean()` pour optimiser
        return res.status(200).json(contacts);
    } catch (error: any) {
        console.error("Erreur lors de la récupération des contacts :", error);
        return res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

// Suppression de plusieurs contacts
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        console.log("Requête reçue pour suppression :", req.body);
        const { ids } = req.body;

        // Vérification des `ids`
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Aucun utilisateur sélectionné." });
        }

        // Suppression des utilisateurs
        const result = await Contact.deleteMany({ _id: { $in: ids } });
        console.log(`${result.deletedCount} utilisateurs supprimés`);

        return res.status(200).json({ message: `${result.deletedCount} utilisateurs supprimés avec succès.` });
    } catch (error: any) {
        console.error("Erreur lors de la suppression :", error);
        return res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

// Récupération d'un utilisateur par ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await Contact.findById(req.params.id).lean();
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }
        return res.status(200).json(user);
    } catch (error: any) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};

// Mise à jour d'un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedUser = await Contact.findByIdAndUpdate(id, req.body, { new: true }).lean();
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
        return res.status(200).json(updatedUser);
    } catch (error: any) {
        console.error("Erreur lors de la modification :", error);
        return res.status(500).json({ message: "Erreur interne du serveur.", error: error.message });
    }
};
