import { sendNotificationEmails } from "./emailService"; // Import TypeScript

(async () => {
    try {
        await sendNotificationEmails({
            clientData: {
                firstName: "John",
                lastName: "Doe",
                email: "bilelzara@gmail.com"
            },
            projectDescription: "Je souhaite rénover ma cuisine."
        });
        console.log("Test réussi : emails envoyés !");
    } catch (error) {
        console.error(" Test échoué :", (error as Error).message);
    }
})();
