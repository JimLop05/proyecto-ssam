// src/components/sections/About.jsx
// ============================================================
// Sección "Quiénes somos" — Describe el sistema SSRA
// Reutiliza vision y mision desde config
// ============================================================

import { ShieldCheck, Zap, HeartHandshake, Lightbulb } from 'lucide-react';
import './About.css';

const VALUES = [
    {
        icon: ShieldCheck,
        title: 'Confiabilidad',
        desc: 'Datos seguros y consistentes para la toma de decisiones.',
    },
    {
        icon: Zap,
        title: 'Rapidez',
        desc: 'Resultados al instante, sin esperas ni procesos engorrosos.',
    },
    {
        icon: HeartHandshake,
        title: 'Compromiso',
        desc: 'Pensado para acompañar a estudiantes y docentes en su día a día.',
    },
    {
        icon: Lightbulb,
        title: 'Innovación',
        desc: 'Herramientas modernas al servicio de la educación.',
    },
];

function About({ vision, mision, systemName = 'SSRA' }) {
    return (
        <section id="about" className="about">
            <div className="about__inner">

                {/* Columna izquierda: texto */}
                <div className="about__content">
                    <span className="about__badge">Quiénes somos</span>

                    <h2 className="about__title">
                        {systemName} — Educación con datos, no con suposiciones
                    </h2>

                    <p className="about__lead">
                        {vision || 'Transformamos la manera en que las instituciones educativas acompañan el rendimiento de sus estudiantes.'}
                    </p>

                    <p className="about__text">
                        {mision || 'Nuestro sistema integra planificación docente, evaluaciones en línea, seguimiento personalizado y reportes institucionales en una sola plataforma accesible para todos los roles.'}
                    </p>

                    <div className="about__stats">
                        <div className="about__stat">
                            <strong>+5</strong>
                            <span>Roles del sistema</span>
                        </div>
                        <div className="about__stat">
                            <strong>100%</strong>
                            <span>En línea</span>
                        </div>
                        <div className="about__stat">
                            <strong>24/7</strong>
                            <span>Disponibilidad</span>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: valores */}
                <div className="about__values">
                    {VALUES.map(({ icon: Icon, title, desc }) => (
                        <article key={title} className="about__value">
                            <div className="about__value-icon">
                                <Icon size={22} strokeWidth={2} />
                            </div>
                            <div>
                                <h4>{title}</h4>
                                <p>{desc}</p>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default About;