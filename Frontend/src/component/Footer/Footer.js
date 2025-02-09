
import React from 'react';
import './style.scss';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className="footer_logo">
        <div className='icons_svg'>
          <img src="icons/layers copy.svg" alt="Logo de l'agence" />
        </div>
        <div className='logo_text'>
          <span className='text_h1'>Renova</span>
          <span className='text_h3'>Architects</span>
          
        </div>
      </div>
      <div className="footer_social">
        <h3>Suivez-nous</h3>
        <div className="social_icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
      <div className="footer_contact">
        <h3>Contactez-nous</h3>
        <p>Adresse : 9 Rue Charles Friedel Paris 75020, France</p>
        <p>Téléphone : +33 6 95 40 76 14</p>
        <p>Email : contact@renova-architects.fr</p>
      </div>
    </footer>
  );
}
