import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Définition de l'interface pour les options d'email
interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

// Interface pour les données client
interface ClientData {
    firstName: string;
    lastName: string;
    email: string;
}

// Interface pour les détails du contact du devis
interface ContactDetails extends ClientData {
    phone: string;
    address: string;
    postalCode: string;
    city: string;
}

// Interface pour le questionnaire
interface QuestionnaireEntry {
    question: string;
    answer: string;
}

//Configuration du transporteur SMTP
const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // Serveur SMTP
    port: parseInt(process.env.SMTP_PORT || "587", 10), // Port SMTP
    secure: process.env.SMTP_SECURE === "true", // SSL/TLS
    auth: {
        user: process.env.SMTP_USER, // Adresse email
        pass: process.env.SMTP_PASS, // Mot de passe
    },
});

//Fonction pour envoyer un email
export const sendEmail = async (emailOptions: EmailOptions): Promise<void> => {
    try {
        await transport.sendMail(emailOptions);
        console.log("Email envoyé avec succès :", emailOptions.to);
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", (error as Error).message);
        throw new Error("Échec de l'envoi de l'e-mail.");
    }
};

// ✅ Fonction pour envoyer une notification au client et à l'admin
export const sendNotificationEmails = async ({
    clientData,
    projectDescription,
}: {
    clientData: ClientData;
    projectDescription: string;
}): Promise<void> => {
    const { firstName, lastName, email } = clientData;

    const emailToAdmin: EmailOptions = {
        from: '"RenovArchitects" <renvarchits@lolaparfums.com>',
        to: "renvarchits@lolaparfums.com",
        subject: "Demande de contact",
        html: `<p>Un nouveau contact de <strong>${firstName} ${lastName}</strong>.<br>Message : ${projectDescription}</p>`,
    };

    const emailToUser: EmailOptions = {
        from: '"RenovArchitects" <renvarchits@lolaparfums.com>',
        to: email,
        subject: "Confirmation de votre demande de contact",
        html: `<p>Bonjour <strong>${firstName}</strong>,<br>Nous avons bien reçu votre demande.<br>Message : ${projectDescription}</p>`,
    };

    await sendEmail(emailToAdmin);
    await sendEmail(emailToUser);
};

//Fonction pour envoyer un devis par email
export const sendDevisEmails = async ({
    contactDetails,
    projectDescription,
    questionnaire,
}: {
    contactDetails: ContactDetails;
    projectDescription: string;
    questionnaire: QuestionnaireEntry[];
}): Promise<void> => {
    const { firstName, lastName, email, phone, address, postalCode, city } = contactDetails;

    const emailToAdmin: EmailOptions = {
        from: '"RenovArchitects" <renvarchits@lolaparfums.com>',
        to: "renvarchits@lolaparfums.com",
        subject: "Nouveau devis soumis",
        html: `<p>Devis de <strong>${firstName} ${lastName}</strong>.<br>Email: ${email}<br>Téléphone: ${phone}<br>Adresse: ${address}, ${postalCode} ${city}<br>Message: ${projectDescription}</p>`,
    };

    const emailToUser: EmailOptions = {
        from: '"RenovArchitects" <renvarchits@lolaparfums.com>',
        to: email,
        subject: "Confirmation de votre devis",
        html: `<p>Bonjour <strong>${firstName}</strong>,<br>Merci d'avoir soumis votre devis.<br>Description du projet : ${projectDescription}</p>`,
    };

    await sendEmail(emailToAdmin);
    await sendEmail(emailToUser);
};
