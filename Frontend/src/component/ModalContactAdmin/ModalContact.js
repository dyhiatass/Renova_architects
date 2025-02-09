import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './style.scss';
import { useNavigate } from 'react-router-dom';
import { submitContact, clearMessage } from '../../redux/slices/contactSlice';

export default function ModalContact({ setContactModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Correction du `useSelector`
    const { loading, error, successMessage } = useSelector(state => state.contact);

    // États des champs du formulaire
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        dispatch(submitContact({
            firstName,
            lastName,
            address,
            postalCode,
            city,
            email,
            phone,
            projectDescription,
        }));
    };

    //  Utiliser `useEffect` pour bien gérer le succès et vider les champs
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);

            //Réinitialiser les champs avec `setTimeout` après l'affichage du toast
            setTimeout(() => {
                setFirstName("");
                setLastName("");
                setAddress("");
                setPostalCode("");
                setCity("");
                setEmail("");
                setPhone("");
                setProjectDescription("");
                
                //  Fermer la modal après 1 seconde
                setContactModal(false);
                navigate('/');

                // Nettoyer l'état Redux
                dispatch(clearMessage());
            }, 1500); // Attendre 1.5 secondes pour ne pas bloquer la mise à jour
        }

        if (error) {
            toast.error("Erreur lors de l'envoi du formulaire !");
            dispatch(clearMessage());
        }
    }, [successMessage, error, dispatch, navigate, setContactModal]);

    return (
        <div className='contact main-content'>
            <div className='container_form'>
                <form onSubmit={handleSubmit} action='/contact'>
                    <span onClick={() => setContactModal(false)}>x</span>
                    <h3 className="titre__form">Merci de remplir le formulaire ci-dessous. Notre équipe vous recontactera dans les plus brefs délais.</h3>
                    
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
                        <textarea placeholder="Description du projet*" required value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></textarea>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Envoi..." : "Envoyer"}
                    </button>
                </form>
            </div>
        </div>
    );
}
