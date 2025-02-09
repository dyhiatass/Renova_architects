import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
export default function Renovation() {
    return (
        <div className='renovation main-content'>
            <section className='renovation_header'>
                <div class="renovation_header-content">
                    <h1>Transformez vos espaces, révélez leur potentiel</h1>
                    <p>Renova Architects donne une nouvelle vie à vos espaces en combinant design et fonctionnalité.</p>

                </div>
                <button><a href="/devis">Parlez-nous de votre projet</a></button>
            </section>
            <section class="renovation-services">
                <h2>Nos services de rénovation</h2>
                <div class="services-list">
                    <div class="service-item">
                        <div className='image'>
                            <img src='image/renovation/photo-1600585152220-90363fe7e115.avif' />
                        </div>

                        <div className='service-item_text '>
                            <h3>Rénovation intérieure</h3>
                            <p>Sublimez vos intérieurs avec des rénovations qui allient confort, élégance et fonctionnalité pour un quotidien harmonieux, qu'il s'agisse de salons accueillants, de cuisines modernes, de salles de bain optimisées ou d'espaces professionnels adaptés et inspirants.</p>
                            <button><Link to='/demande-devis'>Je me lance</Link></button>
                        </div>

                    </div>
                    <div class="service-item">
                        <div className='image'>
                            <img src='image/renovation/photo-1512917774080-9991f1c4c750.avif' />
                        </div>
                        <div className='service-item_text '>
                            <h3>Rénovation extérieure</h3>
                            <p>Sublimez vos extérieurs avec des rénovations qui allient charme, durabilité et praticité pour un quotidien harmonieux, qu'il s'agisse de façades élégantes, de terrasses conviviales, de jardins repensés ou d'espaces extérieurs adaptés et fonctionnels.</p>
                            <button><Link to='/demande-devis'>Je me lance</Link></button>
                        </div>

                    </div>
                    <div class="service-item">
                        <div className='image'>
                            <img src='image/renovation/75cb86218f8472badc68f0efc85b56db.jpg' />
                        </div>
                        <div className='service-item_text '>
                            <h3>Rénovation énergétique</h3>
                            <p>Optimisez vos espaces avec des rénovations énergétiques qui allient performance, confort et durabilité pour un quotidien éco-responsable, qu'il s'agisse d'isolation thermique, de systèmes de chauffage efficaces, de fenêtres performantes ou de solutions d'économies d’énergie adaptées. </p>
                            <button><Link to='/demande-devis'>Je me lance</Link></button>
                        </div>


                    </div>
                </div>
            </section>
            <section className="renovation_before_after">
                <h2>Découvrez nos réalisations.</h2>
                <div className="before-after-container">
                    <div className="before-after-item">
                        <div class="diagonal-split">

                            <div class="image">
                                <img src="image/renovation-AVANT_APRES/0c3d87ba-2673-4c3f-82a1-d1e2d3553f89.JPG" alt="Avant rénovation" />
                            </div>



                            <div class="image">
                                <img src="image/renovation-AVANT_APRES/89d30861-6d88-4aaf-b17c-241f1ceb4ea4.JPG" alt="Après rénovation 1" />

                            </div>
                            <div class="image">
                                <img src="image/renovation-AVANT_APRES/33836734-b2ba-4ccf-82e4-49916ed9b9dd.JPG" alt="Après rénovation 1" />

                            </div>
                            <div class="image">
                                <img src="image/renovation-AVANT_APRES/32455cad-7f67-44d8-b89d-e9fe403dc20a.JPG" alt="Après rénovation 1" />

                            </div>
                            <div class="image">
                                <img src="image/renovation-AVANT_APRES/337b61f1-4c67-473a-8e12-facd3d17bb6e.JPG" alt="Après rénovation 1" />

                            </div>

                        </div>
                    </div>


                </div>
            </section>


        </div>
    )
}

