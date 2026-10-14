// frontend_ssam/src/pages/Home/index.jsx
// ============================================================
// PÁGINA PRINCIPAL — Landing + Elección de rol
// ============================================================

import Hero from '../../components/sections/Hero';
import ModuleTiles from '../../components/sections/ModuleTiles';
import About from '../../components/sections/About';
import Footer from '../../components/sections/Footer';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    GraduationCap,
    Presentation,
    ArrowRight,
    Loader2,
} from 'lucide-react';
import api from '../../api/axios';
import './Home.css';

// Fallback: SVG inline (más confiable que servicios externos)
const logoFallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="16" fill="#1E3A8A"/>
            <text x="50" y="62" font-family="Arial,sans-serif" font-size="32"
                  font-weight="700" text-anchor="middle" fill="#FFFFFF">SS</text>
        </svg>`
    );

function Home() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await api.get('/config');
                setConfig(response.data.data);
            } catch (error) {
                console.error('Error al cargar configuración:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    if (loading) {
        return (
            <div className="home-loading">
                <Loader2 className="home-loading__spinner" />
                <p>Cargando plataforma...</p>
            </div>
        );
    }

    const systemName = config?.nombre_plataforma || 'SSRA';
    const vision = config?.vision || 'Bienvenido a la Plataforma';
    const mision = config?.mision || 'Sistema de seguimiento y rendimiento académico en matemáticas';

    const handleScrollToRegistro = () => {
        document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home">

            {/* ==================== HEADER ==================== */}
            <header className="home__header">
                <div className="home__header-inner">
                    <button className="home__brand" onClick={() => navigate('/')}>
                        <img
                            src={config?.logo_url || logoFallback}
                            alt="Logo"
                            className="home__logo"
                            onError={(e) => { e.target.src = logoFallback; }}
                        />
                        <div className="home__brand-text">
                            <span className="home__brand-name">{systemName}</span>
                        </div>
                    </button>

                    <nav className="home__nav">
                        <button
                            className="btn btn--ghost-light"
                            onClick={() => navigate('/login')}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className="btn btn--primary"
                            onClick={handleScrollToRegistro}
                        >
                            Registrarse
                        </button>
                    </nav>
                </div>
            </header>

            {/* ==================== HERO ==================== */}
            <Hero
                vision={vision}
                mision={mision}
                onComenzar={handleScrollToRegistro}
                onLogin={() => navigate('/login')}
            />

            {/* ==================== MÓDULOS (TILES) ==================== */}
            <ModuleTiles onModuleClick={() => navigate('/login')} />

            {/* ==================== ABOUT / QUIÉNES SOMOS ==================== */}
            <About
                vision={vision}
                mision={mision}
                systemName={systemName}
            />

            {/* ==================== REGISTRO / ELEGIR ROL ==================== */}
            <section id="registro" className="home__registro">
                <div className="home__section-head">
                    <span className="home__badge home__badge--accent">Registro</span>
                    <h2>¿Cómo deseas registrarte?</h2>
                    <p>Elige tu rol para comenzar. Podrás acceder a funcionalidades específicas según tu perfil.</p>
                </div>

                <div className="home__roles-grid">
                    {/* Estudiante */}
                    <button
                        className="role-card role-card--estudiante"
                        onClick={() => navigate('/registro/estudiante')}
                    >
                        <div className="role-card__icon">
                            <GraduationCap size={32} strokeWidth={2} />
                        </div>
                        <h3 className="role-card__title">Estudiante</h3>
                        <p className="role-card__desc">
                            Accede a evaluaciones, revisa tu progreso por unidad y consulta el material de tus clases.
                        </p>
                        <span className="role-card__cta">
                            Registrarme como Estudiante
                            <ArrowRight size={16} />
                        </span>
                    </button>

                    {/* Maestro */}
                    <button
                        className="role-card role-card--maestro"
                        onClick={() => navigate('/registro/maestro')}
                    >
                        <div className="role-card__icon">
                            <Presentation size={32} strokeWidth={2} />
                        </div>
                        <h3 className="role-card__title">Maestro</h3>
                        <p className="role-card__desc">
                            Planifica clases, gestiona evaluaciones y realiza seguimiento de tus estudiantes.
                        </p>
                        <span className="role-card__cta">
                            Registrarme como Maestro
                            <ArrowRight size={16} />
                        </span>
                    </button>
                </div>

                <p className="home__login-hint">
                    ¿Ya tienes una cuenta?{' '}
                    <button
                        className="link-button"
                        onClick={() => navigate('/login')}
                    >
                        Inicia Sesión aquí
                    </button>
                </p>
            </section>

            {/* ==================== FOOTER ==================== */}
            <Footer
                config={config}
                logoFallback={logoFallback}
                systemName={systemName}
            />

        </div>
    );
}

export default Home;