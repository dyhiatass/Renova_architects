import React, { useState, useEffect } from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';


export default function PermisConsruction() {
  useEffect(() => {
    setShowText(true);
  }, []);
  const [showText, setShowText] = useState(false);
  return (
    <div className='permis main-content'>
      <div className='permis_header'>
        <h1>PERMIS DE CONSTRUCTION</h1>
        <div className={`container_para ${showText ? 'show slide-down' : ''}`}>
          <p className='para'> Obtenez une estimation claire pour votre Permis de Construire et un devis détaillé pour vos travaux, en toute simplicité.</p>
          <button className='permis__botton'><Link to='/demande-devis'>Demander une estimation</Link></button>
        </div>
      </div>

      <div className="permis-container">

        <h2>Nos Services pour le Permis de Construction</h2>
        <div className='permis_contenent'>
          <div className="text-content">

            <div className='item'>
              <h3><FontAwesomeIcon icon={faSquare} className='icon' />Constitution du Dossier Administratif</h3>
              <p>Nous rassemblons et préparons avec soin tous les documents requis, incluant plans, formulaires et pièces complémentaires, pour garantir un dossier complet et conforme.</p>

            </div>
            <div className='item'>
              <h3><FontAwesomeIcon icon={faSquare} className='icon' />Suivi des Démarches Administratives</h3>
              <p>Nous déposons votre dossier auprès des autorités et assurons un suivi rigoureux jusqu’à l’obtention de votre permis, tout en vous tenant informé à chaque étape.</p>

            </div>
            <div className='item'>
              <h3><FontAwesomeIcon icon={faSquare} className='icon' />Anticipation des Défis</h3>
              <p>Nous identifions les contraintes spécifiques à votre projet et proposons des solutions sur mesure pour minimiser les retards et les complications.

              </p>

            </div>
            <div className='item'>
              <h3><FontAwesomeIcon icon={faSquare} className='icon' />Assistance Personnalisée</h3>
              <p>Nous simplifions vos démarches administratives grâce à un accompagnement personnalisé et un suivi régulier tout au long du processus.</p>

            </div>

          </div>
          <div className="image-content">

          </div>

        </div>

      </div>
      <div className='permis_step'>
        <h2 className='permis_step_titre'>Pourquoi faire confiance à Renova Architects pour votre permis de construire ? </h2>
        <div className='permis_step_container'>

          <div className='permis_step_container_text'>
            <div className='permis_step_container_list'>
              <div><span className="material-icons">person</span> <p>Accompagnement personnalisé</p></div>
              <div><span className="material-icons">verified</span> <p>Architectes certifiés et expérimentés</p></div>
              <div><span className="material-icons">gavel</span> <p>Dossiers conformes aux normes</p></div>

              <div><span className="material-icons">schedule</span> <p>Gain de temps assuré</p></div>
              <div><span className="material-icons">done_all</span> <p>Validation rapide des plans</p></div>
            </div>
            <button><Link to='/demande-devis'>Je me lance</Link></button>
          </div>
          <div className='permis_step_container_img'>
            <img src='image/permis_construction/2ca2460333e82bb20c5c61257a8595a4.jpg' />
          </div>
        </div>
      </div>

    </div>
  )
}

//les types de demandes administaratives
// permis de construire maison individuel (PCMI)/ déclaration préalable (DP)/ autorisation de travaux(ATERP)/ les autorisations préalables (AP)