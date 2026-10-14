// src/components/sections/Footer.jsx
// ============================================================
// Footer institucional — Reutilizable en toda la app
// Columnas: marca, recursos, institución, contacto
// ============================================================

import {
    BookOpen,
    Mail,
    Phone,
    MapPin,
} from 'lucide-react';
import './Footer.css';

function Footer({ config, logoFallback, systemName }) {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__inner">

                {/* ---------- Columna 1: Marca ---------- */}
                <div className="footer__col footer__col--brand">
                    <div className="footer__brand">
                        <img
                            src={config?.logo_url || logoFallback}
                            alt={`Logo ${systemName}`}
                            className="footer__logo"
                            onError={(e) => { e.target.src = logoFallback; }}
                        />
                        <div>
                            <h3 className="footer__brand-name">{systemName}</h3>
                            <p className="footer__tagline">
                                Plataforma Educativa Institucional
                            </p>
                        </div>
                    </div>

                    <p className="footer__desc">
                        Sistema de Seguimiento y Rendimiento Académico para
                        instituciones educativas.
                    </p>
                </div>

                {/* ---------- Columna 2: Recursos ---------- */}
                <div className="footer__col">
                    <h4 className="footer__title">Recursos</h4>
                    <ul className="footer__links">
                        {/*<li>
                            <a href={config?.url_manual_usuario || '#'}>
                                <BookOpen size={14} />
                                Manual de Usuario
                            </a>
                        </li>*/}
                        <li>
                            <a href="#modulos">Módulos del sistema</a>
                        </li>
                        <li>
                            <a href="#about">Quiénes somos</a>
                        </li>
                        <li>
                            <a href="#registro">Registro</a>
                        </li>
                    </ul>
                </div>

                {/* ---------- Columna 3: Institución ---------- */}
                <div className="footer__col">
                    <h4 className="footer__title">Institución</h4>
                    <ul className="footer__links footer__links--plain">
                        <li>Dirección Departamental de Educación</li>
                        <li>La Paz, Bolivia</li>
                    </ul>
                </div>

            </div>

            {/* ---------- Bottom bar ---------- */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                    <p>
                        © {year} {systemName}. Todos los derechos reservados.
                    </p>
                    <ul className="footer__legal">
                        <li><a href="#">Términos</a></li>
                        <li><a href="#">Privacidad</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;