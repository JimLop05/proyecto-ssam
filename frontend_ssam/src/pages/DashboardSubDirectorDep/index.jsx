/* frontend_ssam/src/pages/DashboardSubDirDep/index.jsx */
// ============================================================
// DASHBOARD SUBDIRECTOR DEPARTAMENTAL
// Secciones: Mi Perfil | Estadísticas | Docentes | Departamentos
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './DashboardSubDirDep.css';
import {
    Menu, X, User, BarChart3, Users, Building2, LogOut
} from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

// ============================================================
// SECCIONES (placeholders — a definir)
// ============================================================
function MiPerfil({ user }) {
    const inicial = (user?.username || '?')[0].toUpperCase();
    return (
        <div className="section">
            <div className="perfil-identidad-card">
                <div className="perfil-avatar">{inicial}</div>
                <div className="perfil-identidad-info">
                    <h3 className="perfil-username">{user?.username}</h3>
                    <p className="perfil-email">{user?.email}</p>
                    <div className="perfil-badges">
                        <span className="perfil-badge rol">{user?.rol}</span>
                        <span className="perfil-badge estado">{user?.estado}</span>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <h3 className="card-title">Información del Subdirector</h3>
                <p className="empty-message">
                    🚧 Sección en desarrollo. Aquí verás tus datos institucionales.
                </p>
            </div>
        </div>
    );
}

function Estadisticas() {
    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Estadísticas del Departamento</h2>
                    <p className="section-subtitle">Métricas generales de tu departamento</p>
                </div>
            </div>
            <p className="empty-message">
                🚧 Sección en desarrollo. Aquí verás las estadísticas del departamento.
            </p>
        </div>
    );
}

function Docentes() {
    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Docentes</h2>
                    <p className="section-subtitle">Maestros asignados a tu departamento</p>
                </div>
            </div>
            <p className="empty-message">
                🚧 Sección en desarrollo. Aquí gestionarás los docentes.
            </p>
        </div>
    );
}

function Departamentos() {
    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Departamentos</h2>
                    <p className="section-subtitle">Departamentos que supervisas</p>
                </div>
            </div>
            <p className="empty-message">
                🚧 Sección en desarrollo. Aquí verás los departamentos.
            </p>
        </div>
    );
}

// ============================================================
// DASHBOARD PRINCIPAL
// ============================================================
function DashboardSubDirDep() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('perfil');
    const [loading, setLoading] = useState(true);

    const isMobile = useIsMobile();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(userData);
        setLoading(false);
    }, [navigate]);

    // Auto-cerrar overlay móvil al pasar a desktop
    useEffect(() => {
        if (!isMobile) setSidebarOpenMobile(false);
    }, [isMobile]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/', { replace: true });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <h1>Cargando tu información...</h1>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'perfil':         return <MiPerfil user={user} />;
            case 'estadisticas':   return <Estadisticas />;
            case 'docentes':       return <Docentes />;
            case 'departamentos':  return <Departamentos />;
            default:               return <MiPerfil user={user} />;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header__inner">

                    {/* Botón hamburguesa */}
                    <button
                        className="dashboard-header__toggle"
                        onClick={() => {
                            if (isMobile) {
                                setSidebarOpenMobile(!sidebarOpenMobile);
                            } else {
                                setSidebarCollapsed(!sidebarCollapsed);
                            }
                        }}
                        aria-label="Menú"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Logo + nombre sistema */}
                    <div className="dashboard-header__brand">
                        <img
                            src="/LogoSSAM.png"
                            alt="SSRA"
                            className="dashboard-header__logo"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="dashboard-header__brand-text">
                            <span className="dashboard-header__brand-name">SSRA</span>
                            <span className="dashboard-header__brand-sub">Plataforma Educativa</span>
                        </div>
                    </div>

                    {/* Badge panel */}
                    <span className="dashboard-header__panel-badge">
                        Panel Subdirector
                    </span>

                    {/* Derecha: user + logout */}
                    <div className="dashboard-header__right">
                        <div className="dashboard-header__user">
                            <span className="dashboard-header__user-name">
                                {user?.nombre} {user?.apellido1}
                            </span>
                            <span className="dashboard-header__user-role">{user?.rol}</span>
                        </div>
                        <button onClick={handleLogout} className="btn-logout">
                            Cerrar Sesión
                        </button>
                    </div>

                </div>
            </header>

            <div className="dashboard-body">
                {/* Overlay para móvil */}
                {sidebarOpenMobile && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setSidebarOpenMobile(false)}
                    />
                )}

                <aside
                    className={`sidebar ${sidebarCollapsed ? 'sidebar--collapsed' : ''} ${sidebarOpenMobile ? 'sidebar--open' : ''}`}
                >
                    <button
                        className="sidebar__close"
                        onClick={() => setSidebarOpenMobile(false)}
                        aria-label="Cerrar menú"
                    >
                        <X size={20} />
                    </button>

                    <nav className="sidebar-nav">
                        <button
                            className={`sidebar-item ${activeSection === 'perfil' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection('perfil');
                                if (isMobile) setSidebarOpenMobile(false);
                            }}
                            title="Mi Perfil"
                        >
                            <User size={20} />
                            <span className="sidebar-item__label">Mi Perfil</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'estadisticas' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection('estadisticas');
                                if (isMobile) setSidebarOpenMobile(false);
                            }}
                            title="Estadísticas"
                        >
                            <BarChart3 size={20} />
                            <span className="sidebar-item__label">Estadísticas</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'docentes' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection('docentes');
                                if (isMobile) setSidebarOpenMobile(false);
                            }}
                            title="Docentes"
                        >
                            <Users size={20} />
                            <span className="sidebar-item__label">Docentes</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'departamentos' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection('departamentos');
                                if (isMobile) setSidebarOpenMobile(false);
                            }}
                            title="Departamentos"
                        >
                            <Building2 size={20} />
                            <span className="sidebar-item__label">Departamentos</span>
                        </button>
                    </nav>
                </aside>

                <main className="main-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default DashboardSubDirDep;