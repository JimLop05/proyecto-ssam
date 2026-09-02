// frontend_ssam/src/pages/Home/index.jsx
// ============================================================
// PÁGINA PRINCIPAL DE LA PLATAFORMA (HOME)
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

// Fallback: imagen de placeholder si no se carga la local
const logoFallback = 'https://via.placeholder.com/150/1A5276/FFFFFF?text=SSAM';

function Home() {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //const token = localStorage.getItem('token');
    //const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                console.log('📤 Haciendo petición a /config...');
                const response = await api.get('/config');
                console.log('✅ Configuración recibida:', response.data);
                setConfig(response.data.data);
            } catch (error) {
                console.error('❌ Error al cargar configuración:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    if (loading) {
        return (
            <div style={styles.container}>
                <h1>Cargando configuración...</h1>
            </div>
        );
    }

    //const isLoggedIn = !!token && user?.id_usuario;

    const headerStyle = {
        ...styles.header,
        backgroundColor: config?.color_primario || '#1A5276'
    };

    const btnDashboardStyle = {
        ...styles.btnDashboard,
        color: config?.color_primario || '#1A5276'
    };

    return (
        <div style={styles.container}>
            <header style={headerStyle}>
                <div style={styles.logoContainer}>
                    <img 
                        src={config?.logo_url || logoFallback} 
                        alt="Logo" 
                        style={styles.logo}
                        onError={(e) => { e.target.src = logoFallback; }}
                    />
                    <h1 style={styles.title}>
                        {config?.nombre_plataforma || 'Sistema de Seguimiento Académico'}
                    </h1>
                </div>
                <nav style={styles.nav}>
                    <button 
                        onClick={() => navigate('/registro')}
                        style={styles.btnRegistro}
                    >
                        Registrate
                    </button>
                    <button 
                        onClick={() => navigate('/login')}
                        style={styles.btnLogin}
                    >
                        Iniciar Sesión
                    </button>
                </nav>
            </header>

            <section style={styles.hero}>
                <h2 style={styles.heroTitle}>
                    {config?.vision || 'Bienvenido a la Plataforma'}
                </h2>
                <p style={styles.heroSubtitle}>
                    {config?.mision || 'Sistema de seguimiento y rendimiento académico en matemáticas'}
                </p>
            </section>

            <footer style={styles.footer}>
                <p>{config?.leyenda_de_pagina || '© 2026 - Todos los derechos reservados'}</p>
                <p>
                    <a href={config?.url_manual_usuario || '#'} style={styles.link}>
                        📖 Manual de Usuario
                    </a>
                </p>
            </footer>
        </div>
    );
}

// ==================== ESTILOS ========================
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f6f8'
    },
    header: {
        color: 'white',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    logo: {
        height: '60px',
        width: 'auto'
    },
    title: {
        fontSize: '24px',
        margin: 0
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    },
    btnDashboard: {
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    btnLogin: {
        backgroundColor: 'white',
        color: '#1A5276',
        border: 'none',
        padding: '10px 25px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    btnRegistro: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '1px solid white',
    padding: '8px 18px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginRight: '10px'
    },
    hero: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: 'white',
        margin: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    heroTitle: {
        fontSize: '36px',
        color: '#1A5276',
        marginBottom: '20px'
    },
    heroSubtitle: {
        fontSize: '18px',
        color: '#555',
        maxWidth: '700px'
    },
    footer: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        marginTop: '20px'
    },
    link: {
        color: '#1A5276',
        textDecoration: 'none'
    }
    
};

export default Home;