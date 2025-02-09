import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'
import  { useState, useEffect } from 'react';
export default function Agence() {
  useEffect(() => {
    setShowText(true);
    }, []); 
    const [showText, setShowText] = useState(false);
  return (
    <div className='Agence main-content'>
      <div className='Agence__header'>
        <div className={`header__title ${showText ? 'show slide-down' : ''}`}>
         
            <h1 className='Agence_text'>Réalisez vos ambitions, nous en faisons une réussite !</h1>
   

         
            <div className='Agence__boutton'>
              <Link to='/demande-devis'>Parlez nous de votre projet
              </Link></div>
          

        </div>


      </div>

      <div className="how-it-works">
        <h2 className='how-it-works__titre'>Comment ça marche ?</h2>
        <h4 className='how-it-works__sousTitre'> Discutez avec nos experts, recevez un devis personnalisé et connectez-vous avec les professionnels adaptés à vos besoins.</h4>
        <div className="steps">
          {/* Étape 1 */}
          <div className="step">

            <div className="step-image">
              <span className='numero'>1</span>
              <img src="image/image_agence/6eb716cd5481bed280fec69c25f54e3b.jpg" alt="Présentez votre projet" />
            </div>
            <h3>Décrivez vos besoins</h3>
            <p>Remplissez le formulaire en ligne pour partager les détails de votre projet.</p>
            <button className='step__button' > <Link to='/demande-devis'>Je me lance!</Link></button>
          </div>
          {/* Étape 2 */}
          <div className="step">

            <div className="step-image">
              <span className='numero'>2</span>
              <img src="image/image_agence/16941f5da3715644a891ef9c929d560d.jpg" alt="Obtenez des devis gratuits" />
            </div>
            <h3>Un expert vous contacte</h3>
            <p>L’expert vous propose des solutions sur mesure.</p>
            <button className='step__button' ><Link to='/demande-devis'>Je me lance!</Link></button>
          </div>
          {/* Étape 3 */}
          <div className="step">

            <div className="step-image">
              <span className='numero'>3</span>
              <img src="image/image_agence/1f18c5ce664ddf7435ae59dd2595fd9a.jpg" alt="Démarrage des travaux" />
            </div>
            <h3>Réalisez vos ambitions</h3>
            <p>Sélectionnez en toute liberté vos artisans, et les travaux peuvent commencer !</p>
            <button className='step__button' ><Link to='/demande-devis'>Je me lance!</Link></button>
          </div>
        </div>
      </div>

    </div>
  )
}
