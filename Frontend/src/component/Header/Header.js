import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Header({ isAuthenticated, unlog, setContactModal, setLoginModal }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header_img">
        <div className='icons_svg'>
          <img src="icons/layers.svg" alt="logo" />
        </div>
        <div className='LOGO'>
          <span className='text_h1'>Renova</span>
          <span className='text_h3'>ARCHITECTS</span>
        </div>
      </div>

      <nav className={`${isMenuOpen ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`}>

        <ul>
          <Link to="/" onClick={() => setIsMenuOpen(false)}><li>Agence</li></Link>
          <Link to="/Maître-oeuvre" onClick={() => setIsMenuOpen(false)}><li>Maîtrise d'œuvre</li></Link>
          <Link to="/permis-construction" onClick={() => setIsMenuOpen(false)}><li>Demandes Administratives</li></Link>
          <Link to="/amenagement" onClick={() => setIsMenuOpen(false)}><li>Aménagement</li></Link>
          <Link to="/renovation" onClick={() => setIsMenuOpen(false)}><li>Rénovation</li></Link>
          <Link to="/extension" onClick={() => setIsMenuOpen(false)}><li>Extension</li></Link>
          {isAuthenticated && (<Link to="/admin" onClick={() => setIsMenuOpen(false)}><li>Dashboard</li></Link>)}
        </ul>
      </nav>

      <div className="header_button">

        <button className="btn1" onClick={() => setContactModal(true)} >Contact</button>

        <button className="btn2"><Link to="/demande-devis">Devis</Link></button>
        {isAuthenticated ? (
          <span onClick={unlog} className="icon-button" title="Déconnexion">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </span>
        ) : (
          <span onClick={() => setLoginModal(true)} className="icon-button2" title="Connexion">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </span>
        )}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faBars} size="2x" />
          )}
        </div>
      </div>
    </div>
  );
}
