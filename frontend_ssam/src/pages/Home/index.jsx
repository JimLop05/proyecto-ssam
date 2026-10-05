// frontend_ssam/src/pages/Home/index.jsx
// ============================================================
// PÁGINA PRINCIPAL — Landing + Elección de rol
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Target,
    BookOpen,
    GraduationCap,
    Presentation,
    Mail,
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

const FEATURES = [
    {
        icon: BarChart3,
        title: 'Métricas en tiempo real',
        desc: 'Visualiza el rendimiento académico con reportes claros y accionables.',
    },
    {
        icon: Target,
        title: 'Seguimiento personalizado',
        desc: 'Cada estudiante tiene su propio panel de progreso por unidad y clase.',
    },
    {
        icon: BookOpen,
        title: 'Planificación docente',
        desc: 'Crea, organiza y evalúa tus clases de matemáticas con herramientas diseñadas para docentes.',
    },
];

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

    const systemName = config?.nombre_plataforma || 'SSAM';
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
                    <button
                        className="home__brand"
                        onClick={() => navigate('/')}
                    >
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
            <section className="home__hero">
                <div className="home__hero-inner">
                     <h1 className="home__hero-title">{vision}</h1>
                    <p className="home__hero-subtitle">{mision}</p>

                    <div className="home__hero-actions">
                        <button
                            className="btn btn--primary btn--lg"
                            onClick={handleScrollToRegistro}
                        >
                            Comenzar ahora
                            <ArrowRight size={18} />
                        </button>
                        <button
                            className="btn btn--outline-light btn--lg"
                            onClick={() => navigate('/login')}
                        >
                            Ya tengo cuenta
                        </button>
                    </div>
                </div>
            </section>

            {/* ==================== FEATURES ==================== */}
            <section className="home__features">
                <div className="home__section-head">
                    <h2>Todo lo que necesitas en un solo lugar</h2>
                    <p>Diseñado para estudiantes, docentes y directivos de instituciones educativas.</p>
                </div>

                <div className="home__features-grid">
                    {FEATURES.map(({ icon: Icon, title, desc }) => (
                        <article key={title} className="feature-card">
                            <div className="feature-card__icon">
                                <Icon size={26} strokeWidth={2} />
                            </div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </article>
                    ))}
                </div>
            </section>

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
                            Planifica clases, gestiona evaluaciones y realiza seguimiento académico de tus estudiantes.
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
            <footer className="home__footer">
                <div className="home__footer-inner">
                    <div className="home__footer-col">
                        <div className="home__footer-brand">
                            <img
                                src={config?.logo_url || logoFallback}
                                alt="Logo SSAM"
                                className="home__footer-logo"
                                onError={(e) => { e.target.src = logoFallback; }}
                            />
                            <p className="home__footer-tagline">Plataforma Educativa Institucional</p>
                        </div>
                    </div>

                    <div className="home__footer-col">
                        <h4>Recursos</h4>
                        <a href={config?.url_manual_usuario || '#'}>
                            <BookOpen size={14} />
                            Manual de Usuario
                        </a>
                    </div>

                    <div className="home__footer-col">
                        <h4>Institución</h4>
                        <p>Dirección Departamental de Educación La Paz</p>
                    </div>
                </div>

                <div className="home__footer-bottom">
                    <p>© {new Date().getFullYear()} {systemName}. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;