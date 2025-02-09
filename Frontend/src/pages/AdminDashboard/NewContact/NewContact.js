import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './styleUser.scss';
import { useNavigate } from 'react-router-dom';
import { addContact } from "../../../redux/slices/contactSlice"; // Import de l'action Redux

export default function NewUser() {
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Récupération des états globaux depuis Redux
    const { loading, error } = useSelector((state) => state.contact);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const resultAction = await dispatch(
                addContact({
                    firstName,
                    lastName,
                    address,
                    postalCode,
                    city,
                    email,
                    phone,
                    projectDescription,
                })
            );

            if (addContact.fulfilled.match(resultAction)) {
                toast.success("Utilisateur ajouté avec succès !");
                setFirstName("");
                setLastName("");
                setAddress("");
                setPostalCode("");
                setCity("");
                setEmail("");
                setPhone("");
                setProjectDescription("");
                navigate('/admin/contacts');
            } else {
                toast.error("Erreur lors de l'ajout de l'utilisateur");
            }
        } catch (error) {
            toast.error("Une erreur est survenue.");
        }
    };

    return (
        <div className='contacts'>
            <div className='container_form'>
                <form onSubmit={handleSubmit}>
                    <h3 className="titre__form">Veuillez remplir le formulaire pour ajouter un utilisateur.</h3>
                    
                    <div className="first_last">
                        <input type="text" placeholder="Nom*" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <input type="text" placeholder="Prénom*" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div className="first_last">
                        <input type="email" placeholder="Email*" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="text" placeholder="Téléphone*" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="adresse">
                        <input placeholder="Adresse*" type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="first_last">
                        <input placeholder="Code Postal*" type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        <input placeholder="Ville*" type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="first_last">
                        <textarea
                            name="projectDescription"
                            placeholder="Description du projet*"
                            required
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Envoi en cours..." : "Envoyer"}
                    </button>
                </form>

                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
}
