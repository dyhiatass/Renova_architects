import { useEffect, useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll'
import "animate.css/animate.min.css";

export default function Extension() {
  const [showText, setShowText] = useState(false)
  useEffect(() => {

    setShowText(true);
  }, []);
  return (
    <div className="extension main-content">
      <div className="extension_header">
        <div className={`extension_header_title ${showText ? 'show slide-down' : ''}`}>
          <h2 className="extension_text">
            Transformez vos idées en une extension sur-mesure qui sublime votre espace.
          </h2>
          <div className="extension__boutton">
            <Link to="/demande-devis">Parlez-nous de votre projet</Link>
          </div>
        </div>
      </div>


      <section className="why-extension">
        <h2>Pourquoi choisir une extension ?</h2>
        <div className={`reasons ${showText ? 'show' : ''}`}>

          <div className="reason">
            <img src='image/extension/86f0874571af929a55cf9b00e2cfd108 (1).jpg' />
            <div className='accordion'>
              <h3>Agrandir votre espace</h3>

            </div>

          </div>

          <div className="reason">
            <img src='image/extension/dbc096d065927973597469f147b01f9f.jpg' />
            <div className='accordion'>
              <h3>Valoriser votre bien</h3>

            </div>
          </div>

          <div className="reason">
            <img src='image/extension/12dd87f16a1c26587dbf73aaa80051d7.jpg' />
            <div className='accordion'>
              <h3>Optimiser votre confort</h3>

            </div>
          </div>


        </div>
      </section>
      <section className="missions">
        <h2>Notre expertise à votre service</h2>
        <div className="mission-list">
          <div className="mission-item">
            <div className="icon">
              <i className="fas fa-pencil-ruler"></i>
            </div>
            <p>Création et conception des plans sur mesure.</p>
          </div>
          <div className="mission-item">
            <div className="icon">
              <i className="fas fa-palette"></i>
            </div>
            <p>Design intérieur et choix des matériaux.</p>
          </div>
          <div className="mission-item">
            <div className="icon">
              <i className="fas fa-project-diagram"></i>
            </div>
            <p>Gestion des projets et coordination des équipes.</p>
          </div>
          <div className="mission-item">
            <div className="icon">
              <i className="fas fa-hard-hat"></i>
            </div>
            <p>Supervision des travaux pour garantir la qualité.</p>
          </div>
          <div className="mission-item">
            <div className="icon">
              <i className="fas fa-tree"></i>
            </div>
            <p>Conception durable et respect de l'environnement.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* <section className="gallery">
        <h2>Nos réalisations</h2>
        <div className="gallery-images">
          <img src="image1.jpg" alt="Extension 1" />
          <img src="image2.jpg" alt="Extension 2" />
          <img src="image3.jpg" alt="Extension 3" />
        </div>
      </section> */}
    </div>
  );
}
