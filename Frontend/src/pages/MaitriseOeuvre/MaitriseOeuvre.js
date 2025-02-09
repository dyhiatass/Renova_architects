import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function MaitriseOeuvre() {
    return (
        <div className='maitre_oeuvre main-content'>
            <div className='maitre_oeuvre_header'>
                <div className='maitre_oeuvre_titre '>
                    <h1>Concrétisez vos projets avec une maîtrise d'œuvre experte</h1>

                    <p>Renova Architects supervise et coordonne chaque étape de vos projets pour garantir qualité, délais et conformité.</p>

                </div>
                <button><Link to='/demande-devis'>Transformez vos idées en réalité</Link></button>
            </div>
            <section class="intro">

                <h2>Une gestion experte pour des projets réalisés en toute sérénité
                </h2>
                <p>
                    Chez <span>Renova Architects</span>, nous vous accompagnons à chaque étape de votre projet, de la conception à la livraison. En tant qu’experts en maîtrise d'œuvre, nous orchestrons avec précision les différents intervenants pour garantir une exécution fluide et conforme à vos attentes. Nous veillons rigoureusement au respect des délais, des budgets et des normes, afin de transformer vos idées en réalisations concrètes et durables.
                </p>

            </section>
            <section className='intro_question'>
                <div className='intro_question_content'>
                    <div className='intro_content_svg'>

                    </div>
                    <h3><img src='icons/list.svg' />Qu'est-ce que la maîtrise d'œuvre&nbsp;?</h3>
                    <p>
                        La maîtrise d'œuvre désigne l’ensemble des missions exercées par un professionnel ou une entreprise, comme <span>Renova Architects</span>, pour piloter et coordonner un projet de construction ou de rénovation. Elle comprend la conception, la gestion des intervenants, le suivi des travaux et le contrôle de la qualité. En d’autres termes, le maître d'œuvre est l’interlocuteur principal qui veille à la bonne réalisation du projet dans les délais impartis, en respectant les budgets et les normes en vigueur.
                    </p>
                </div>
                <div className='img'>
                    <img src='image/maitre_oeuvre/4277624609be60149b841f98b619cd54.jpg' />
                </div>
            </section>
            <section class="missions" >
                <h2>Notre expertise à votre service</h2>
                <div class="mission-list">
                    <div class="mission-item">
                        <div class="icon">
                            <i class="fas fa-drafting-compass"></i>
                        </div>
                        <p>Conception des plans et études techniques.</p>
                    </div>
                    <div class="mission-item">
                        <div class="icon">
                            <i class="fas fa-users-cog"></i>
                        </div>
                        <p>Coordination des artisans et entreprises.</p>
                    </div>
                    <div class="mission-item">
                        <div class="icon">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <p>Élaboration et suivi des plannings.</p>
                    </div>
                    <div class="mission-item">
                        <div class="icon">
                            <i class="fas fa-hard-hat"></i>
                        </div>
                        <p>Supervision des travaux pour garantir la qualité.</p>
                    </div>
                    <div class="mission-item">
                        <div class="icon">
                            <i class="fas fa-balance-scale"></i>
                        </div>
                        <p>Respect des normes et des budgets.</p>
                    </div>
                </div>
            </section>

        </div>

    )
}
