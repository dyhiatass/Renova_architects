import React, { useState } from "react";
import axios from "axios";
import './style.scss';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Hostname from "../../Hostname";

const Questionnaire = () => {
    const questions = [
        {
            id: 1,
            question: "Êtes-vous",
            options: ["Proprietaire", "Locataire", "Professionnel", "Acquereur"]
        },
        {
            id: 2,
            question: "Quel est votre projet",
            options: ["Renovation", "Construction", "Extension","Aménagement", "Demande administrative","Maison individuelle"]
        },
        {
            id: 3,
            question: "Pour quel type de bien",
            options: ["Résidence principale", "Secteur tertiaire", "Professionel restauration" ]
        },
        {
            id: 4,
            question: "Avez-vous besoin d’un architecte, architecte d'interieur ou d’un maître d’oeuvre",
            options: ["Oui", "Non"]
        }
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [contactInfo, setContactInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        email: "",
        phone: "",
        projectDescription: ""
    });

    const handleOptionSelect = (option) => {
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            {
                question: questions[currentQuestionIndex].question,
                answer: option
            }
        ]);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        } else {
            setIsFormVisible(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...contactInfo,
                questionnaire: answers.map((answer) => ({
                    question: answer.question,
                    answer: answer.answer
                })),
                projectDescription: contactInfo.projectDescription // Utiliser la description saisie
            };

            const response = await axios.post(`${Hostname}/devis`, payload);
            toast.success(response.data.message);

            // Réinitialiser le formulaire
            setContactInfo({
                firstName: "",
                lastName: "",
                address: "",
                postalCode: "",
                city: "",
                email: "",
                phone: "",
                projectDescription: ""
            });
            setAnswers([]);
            setCurrentQuestionIndex(0);
            setIsFormVisible(false);
        } catch (error) {
            console.error("Erreur lors de la soumission :", error);
            toast.error("Une erreur s'est produite lors de la soumission.");
        }
    };

    return (
        <div className="questionnaire main-content">
            <div className="questionnaire_container">
                <div className="questionnaire_img"></div>
                <div className="questionnaire_containent">
                    <div className="question__titre">
                        <span>home</span>
                        <span className="material-icons">chevron_right</span>
                        <span className="question__titre_devis">Demande devis</span>
                    </div>
                    {!isFormVisible ? (
                        <div className="question">
                            <h3 className="question__option">{questions[currentQuestionIndex].question}...</h3>
                            <div className="question__btn">
                                {questions[currentQuestionIndex].options.map((option, index) => (
                                    <button
                                        key={index}
                                        
                                        onClick={() => handleOptionSelect(option)}
                                        className={option.toLowerCase()}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="container_form">
                            <form onSubmit={handleSubmit}>
                                <h3 className="titre__form">Entrez vos informations pour finaliser</h3>
                                <div className="first_last">
                                    <input
                                        type="text"
                                        placeholder="Nom*"
                                        value={contactInfo.lastName}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, lastName: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Prénom*"
                                        value={contactInfo.firstName}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, firstName: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="first_last">
                                    <input
                                        type="email"
                                        placeholder="Email*"
                                        value={contactInfo.email}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, email: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Téléphone*"
                                        value={contactInfo.phone}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, phone: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="adresse">
                                    <input
                                        type="text"
                                        placeholder="Adresse*"
                                        value={contactInfo.address}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, address: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <div className="first_last">
                                    <input
                                        type="text"
                                        placeholder="Code Postal*"
                                        value={contactInfo.postalCode}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, postalCode: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ville*"
                                        value={contactInfo.city}
                                        onChange={(e) =>
                                            setContactInfo({ ...contactInfo, city: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                                <textarea
                                    placeholder="Description du projet*"
                                    value={contactInfo.projectDescription}
                                    onChange={(e) =>
                                        setContactInfo({ ...contactInfo, projectDescription: e.target.value })
                                    }
                                    required
                                ></textarea>
                                <button type="submit">Soumettre</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
