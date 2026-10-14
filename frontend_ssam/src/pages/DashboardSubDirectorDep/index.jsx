/* frontend_ssam/src/pages/DashboardSubDirDep/index.jsx */
// ============================================================
// DASHBOARD SUBDIRECTOR DEPARTAMENTAL
// Secciones: Mi Perfil | Distritos | Unidades Educativas | Reporte
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './DashboardSubDirDep.css';
import {
    Menu, X, User, MapPin, School, FileBarChart
} from 'lucide-react';
import { useIsMobile } from '../../hooks/useIsMobile';

import MiPerfilSubDir from './MiPerfilSubDir';
import DistritosSubDir from './DistritosSubDir';
import UnidadesEducativasSubDir from './UnidadesEducativasSubDir';
import ReporteSubDir from './ReporteSubDir';

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
            case 'perfil':     return <MiPerfilSubDir />;
            case 'distritos':  return <DistritosSubDir />;
            case 'ue':         return <UnidadesEducativasSubDir />;
            case 'reporte':    return <ReporteSubDir />;
            default:           return <MiPerfilSubDir />;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header__inner">

                    <button
                        className="dashboard-header__toggle"
                        onClick={() => {
                            if (isMobile) setSidebarOpenMobile(!sidebarOpenMobile);
                            else setSidebarCollapsed(!sidebarCollapsed);
                        }}
                        aria-label="Menú"
                    >
                        <Menu size={22} />
                    </button>

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

                    <span className="dashboard-header__panel-badge">
                        Panel Subdirector
                    </span>

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
                            onClick={() => { setActiveSection('perfil'); if (isMobile) setSidebarOpenMobile(false); }}
                            title="Mi Perfil"
                        >
                            <User size={20} />
                            <span className="sidebar-item__label">Mi Perfil</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'distritos' ? 'active' : ''}`}
                            onClick={() => { setActiveSection('distritos'); if (isMobile) setSidebarOpenMobile(false); }}
                            title="Distritos"
                        >
                            <MapPin size={20} />
                            <span className="sidebar-item__label">Distritos</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'ue' ? 'active' : ''}`}
                            onClick={() => { setActiveSection('ue'); if (isMobile) setSidebarOpenMobile(false); }}
                            title="Unidades Educativas"
                        >
                            <School size={20} />
                            <span className="sidebar-item__label">Unidades Educativas</span>
                        </button>

                        <button
                            className={`sidebar-item ${activeSection === 'reporte' ? 'active' : ''}`}
                            onClick={() => { setActiveSection('reporte'); if (isMobile) setSidebarOpenMobile(false); }}
                            title="Reporte"
                        >
                            <FileBarChart size={20} />
                            <span className="sidebar-item__label">Reporte</span>
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