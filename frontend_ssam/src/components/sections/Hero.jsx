// src/components/sections/Hero.jsx
// ============================================================
// Hero principal — Banner con imagen de fondo + overlay gradiente
// Reutiliza vision y mision desde config (vienen del backend)
// ============================================================

import { ArrowRight } from 'lucide-react';
import './Hero.css';

// Imagen de fondo — reemplaza por tu imagen en assets
import heroBg from '../../assets/hero-bg.jpg';

function Hero({ vision, mision, onComenzar, onLogin }) {
    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${heroBg})` }}
        >
            {/* Overlay gradiente (azul institucional) */}
            <div className="hero__overlay" />

            <div className="hero__inner">
                <span className="hero__badge">
                    Plataforma Educativa Institucional
                </span>

                <h1 className="hero__title">
                    {vision || 'Bienvenido a SSRA'}
                </h1>

                <p className="hero__subtitle">
                    {mision || 'Sistema de Seguimiento y Rendimiento Académico'}
                </p>

                <div className="hero__actions">
                    <button
                        className="btn btn--accent btn--lg"
                        onClick={onComenzar}
                    >
                        Comenzar ahora
                        <ArrowRight size={18} />
                    </button>
                    <button
                        className="btn btn--outline-light btn--lg"
                        onClick={onLogin}
                    >
                        Ya tengo cuenta
                    </button>
                </div>
            </div>

            {/* Indicador de scroll */}
            <a href="#modulos" className="hero__scroll" aria-label="Ver módulos">
                <span />
            </a>
        </section>
    );
}

export default Hero;