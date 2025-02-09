import React,{ useState, useEffect } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll'
export default function Amenagement() {
    useEffect(() => {
        setShowText(true);
        }, []); 
        const [showText, setShowText] = useState(false);
    const services = [
        {
            img: 'image/amenagement_services/douglas-sheppard-9rYfG8sWRVo-unsplash.jpg',
            title: 'Aménagement Résidentiel',
            description: 'Optimisation des espaces de vie, décoration intérieure, création de rangements.',
        },
        {
            img: 'image/amenagement_services/a441a2f4e9c35a645350e2ebdbb38f3d (1).jpg',
            title: 'Aménagement Commercial',
            description: 'Design et agencement de boutiques, restaurants, bureaux et espaces professionnels.',
        },
        {
            img: 'image/amenagement_services/2fd13f13b7e8c3b9fb7671b21db1cf12.jpg',
            title: 'Espaces Extérieurs',
            description: 'Conception de terrasses, jardins, et aménagements paysagers modernes.',
        },
    ];




    return (
        <div className='amenagement main-content'>

            <div className='amenagement_header'>
                <div className={`amenagement_header_container ${showText ? 'show slide-down' : ''}`}>
                   
                        <h1 className='amenagement_titre'>Créer des espaces harmonieux et fonctionnels</h1>
                   
                        <button className='amenagement__boutton'>
                            <Link to='/demande-devis'>Discutons de votre projet dès aujourd'hui !</Link></button>
                    
                </div>
            </div>
            <div className='amenagement_main'>
                {/* <h2>Optimiser l’espace pour sublimer le quotidien</h2> */}
                <h2>Nos Services en Aménagement</h2>
                <p>Chez <span>Renova Architects</span> , nous révélons le potentiel unique de chaque espace en alliant esthétique et fonctionnalité. Qu’il s’agisse d’un intérieur chaleureux, d’un bureau stimulant ou d’un espace commercial accueillant, nos aménagements sur mesure s’adaptent aux besoins et aspirations de nos clients. En jouant avec la lumière, les matériaux et les volumes, nous créons des environnements harmonieux qui inspirent et améliorent le quotidien, tout en respectant les principes d’aménagement durable</p>
                <p><em>Les modèles présentés ci-dessous sont des inspirations issues de projets remarquables, reflétant les styles et ambiances que nous pouvons adapter à vos besoins.</em></p>
            </div>

            <div className='amenagement_solution' >
                {/* <ScrollAnimation
                        className='amenagement_solution_scroll'
                        animateIn="slideInUp"
                        delay={200} // Applique un délai progressif
                        offset={-100}
                    > */}
                <div className='services_list'>
                    {services.map((service, index) => (

                        <div className="service_item">
                            <div className="service_item_img">
                                <img src={service.img} alt={service.title} />
                                <h3>{service.title}</h3>
                            </div>
                            <div className="service_item_texte">
                                <p>{service.description}</p>
                            </div>
                        </div>

                    ))}
                </div>
                {/* </ScrollAnimation> */}
            </div>
            {/* <section className="renovation_before_after">
                <h2>Découvrez nos réalisations.</h2>
                <div className="before-after-container">
                    <div className="before-after-item">
                        <div class="diagonal-split">

                            <div class="image">
                                <img src="image/aménagement_apres/3A94BE12-E707-413F-8B97-E56CD1C4E454.jpeg" alt="Avant rénovation" />
                            </div>


                            <div class="image">
                                <img src="image/aménagement_apres/A6D65CBF-F5C0-4B36-8FD7-9460EEFCB3D3.jpeg" alt="Après rénovation 1" />

                            </div>
                            <div class="image">
                                <img src="image/aménagement_apres/BD874460-424D-4C98-81AA-D1FC5D962246.jpeg" alt="Après rénovation 1" />

                            </div>
                            <div class="image">
                                <img src="image/aménagement_apres/F18EBBAE-C07F-45EF-A81B-8064B583D5F9.jpeg" alt="Après rénovation 1" />

                            </div>
                            

                        </div>
                    </div>


                </div>
            </section> */}
        </div>
    )
}

//prestation de dessin
//sa.agouar@renovarchitects.fr