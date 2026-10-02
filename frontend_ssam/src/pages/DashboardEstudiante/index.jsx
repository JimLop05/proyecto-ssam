/* frontend_ssam/src/pages/DashboardEstudiante/index.jsx */
// ============================================================
// DASHBOARD ESTUDIANTE
// Secciones: Mi Perfil | Mi Rendimiento | Mis Clases
// Con botón para unirse a una clase por contraseña
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './DashboardEstudiante.css';
import EvaluacionClase from './EvaluacionClase';
import PreguntasUnidad from './PreguntasUnidad';
import MiRendimiento, { getRubrica } from './MiRendimiento';

function DashboardEstudiante() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const [clases, setClases] = useState([]);
    const [rendimiento, setRendimiento] = useState(null);
    const [activeSection, setActiveSection] = useState('perfil');
    const [loading, setLoading] = useState(true);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

    // Estados del modal "Unirse a clase"
    const [showModalUnirse, setShowModalUnirse] = useState(false);
    const [passwordClase, setPasswordClase] = useState('');
    const [mensajeUnirse, setMensajeUnirse] = useState('');
    const [loadingUnirse, setLoadingUnirse] = useState(false);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(userData);
        cargarDatos();
    }, [navigate]);

    const cargarDatos = async () => {
        try {
            const perfilRes = await api.get('/estudiante/mi-perfil');
            setEstudiante(perfilRes.data.data);

            // 🔧 CAMBIO: usar /mi-rendimiento-clases para traer clases enriquecidas con promedio_clase
            const clasesRes = await api.get('/estudiante/mi-rendimiento-clases');
            setClases(clasesRes.data.data.clases);

            const rendimientoRes = await api.get('/estudiante/mi-rendimiento');
            setRendimiento(rendimientoRes.data.data);
        } catch (error) {
            console.error('Error al cargar datos del estudiante:', error);
            if (error.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    // Recarga solo las clases (usado después de unirse)
    const recargarClases = async () => {
        try {
            // 🔧 CAMBIO: misma fuente que cargarDatos
            const clasesRes = await api.get('/estudiante/mi-rendimiento-clases');
            setClases(clasesRes.data.data.clases);
        } catch (error) {
            console.error('Error al recargar clases:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // ============================================================
    // Unirse a una clase
    // ============================================================
    const handleUnirseAClase = async (e) => {
        e.preventDefault();
        setLoadingUnirse(true);
        setMensajeUnirse('');

        try {
            const response = await api.post('/estudiante/unirse-clase', {
                password_clase: passwordClase
            });

            if (response.data.success) {
                setMensajeUnirse('Éxito: ' + response.data.message);
                setPasswordClase('');

                setTimeout(async () => {
                    setShowModalUnirse(false);
                    setMensajeUnirse('');
                    await recargarClases();
                }, 1500);
            } else {
                setMensajeUnirse('Error: ' + response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al conectar con el servidor';
            setMensajeUnirse('Error: ' + msg);
        } finally {
            setLoadingUnirse(false);
        }
    };

    const cerrarModalUnirse = () => {
        setShowModalUnirse(false);
        setPasswordClase('');
        setMensajeUnirse('');
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
        // 1. Si hay una unidad seleccionada → vista de preguntas
        if (unidadSeleccionada && claseSeleccionada) {
            return (
                <PreguntasUnidad
                    unidad={unidadSeleccionada}
                    clase={claseSeleccionada}
                    volver={() => setUnidadSeleccionada(null)}
                />
            );
        }

        // 2. Si hay una clase seleccionada → detalle de la clase
        if (claseSeleccionada) {
            return (
                <EvaluacionClase
                    idClase={claseSeleccionada.id_clase}
                    volver={() => setClaseSeleccionada(null)}
                    onIniciarUnidad={(unidad) => setUnidadSeleccionada(unidad)}
                />
            );
        }

        // 3. Vista normal por sección
        switch (activeSection) {
            case 'perfil':
                return <MiPerfil user={user} estudiante={estudiante} rendimiento={rendimiento} clases={clases} />;
            case 'rendimiento':
                return <MiRendimiento />;
            case 'clases':
                return (
                    <MisClases
                        clases={clases}
                        onUnirse={() => setShowModalUnirse(true)}
                        onAbrirClase={(clase) => setClaseSeleccionada(clase)}
                    />
                );
            default:
                return <MiPerfil user={user} estudiante={estudiante} rendimiento={rendimiento} clases={clases} />;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="/LogoSSAM.png" alt="SSAM" className="logo" />
                    <div className="header-titles">
                        <h1>Panel del Estudiante</h1>
                        <span className="header-subtitle">Sistema de Seguimiento y Rendimiento Académico</span>
                    </div>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <span className="user-name">{user?.nombre} {user?.apellido1}</span>
                        <span className="user-role">{user?.rol}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-logout">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="dashboard-body">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <button
                            className={`sidebar-item ${activeSection === 'perfil' ? 'active' : ''}`}
                            onClick={() => setActiveSection('perfil')}
                        >
                            Mi Perfil
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'rendimiento' ? 'active' : ''}`}
                            onClick={() => setActiveSection('rendimiento')}
                        >
                            Mi Rendimiento
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'clases' ? 'active' : ''}`}
                            onClick={() => setActiveSection('clases')}
                        >
                            Mis Clases
                        </button>
                    </nav>
                </aside>

                <main className="main-content">
                    {renderContent()}
                </main>
            </div>

            {/* ===== MODAL UNIRSE A CLASE ===== */}
            {showModalUnirse && (
                <div className="modal-overlay" onClick={cerrarModalUnirse}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Unirme a una Clase</h3>
                            <button className="modal-close" onClick={cerrarModalUnirse}>×</button>
                        </div>

                        <form onSubmit={handleUnirseAClase}>
                            <p className="modal-description">
                                Ingresa la contraseña que te proporcionó tu maestro para unirte a la clase.
                            </p>

                            <div className="form-group">
                                <label>Contraseña de la Clase *</label>
                                <input
                                    type="text"
                                    value={passwordClase}
                                    onChange={(e) => setPasswordClase(e.target.value)}
                                    placeholder="Ej: 123456"
                                    autoFocus
                                    required
                                />
                            </div>

                            {mensajeUnirse && (
                                <div className={`mensaje ${mensajeUnirse.startsWith('Éxito') ? 'mensaje-exito' : 'mensaje-error'}`}>
                                    {mensajeUnirse}
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" className="btn-cancelar" onClick={cerrarModalUnirse}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-guardar" disabled={loadingUnirse}>
                                    {loadingUnirse ? 'Uniéndome...' : 'Unirme'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// SECCIÓN: MI PERFIL
// - Datos sensibles ocultos (nombre, sexo, tipo, fecha nac.)
// - Username protagonista + email
// - Edad calculada
// - Resumen por asignatura con rúbrica
// ============================================================
function MiPerfil({ user, estudiante, rendimiento, clases }) {

    // Calcular edad a partir de fecha_nacimiento
    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return '—';
        const hoy = new Date();
        const nac = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nac.getFullYear();
        const m = hoy.getMonth() - nac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) {
            edad--;
        }
        return edad;
    };

    // Inicial del username para el avatar
    const inicialUsername = (user?.username || '?')[0].toUpperCase();

    // Agrupar clases por asignatura (promedio por asignatura)
    const resumenPorAsignatura = (() => {
        if (!clases || clases.length === 0) return [];

        const mapa = {};
        clases.forEach((c) => {
            const asig = c.asignatura || 'Sin asignatura';
            if (!mapa[asig]) {
                mapa[asig] = { asignatura: asig, sumas: 0, cantidad: 0 };
            }
            // Forzar número (el backend puede devolver string)
            if (c.promedio_clase !== null && c.promedio_clase !== undefined) {
                const valor = Number(c.promedio_clase);
                if (!isNaN(valor)) {
                    mapa[asig].sumas += valor;
                    mapa[asig].cantidad += 1;
                }
            }
        });

        return Object.values(mapa)
            .map((a) => ({
                asignatura: a.asignatura,
                promedio: a.cantidad > 0 ? Math.round(a.sumas / a.cantidad) : null,
            }))
            .sort((a, b) => a.asignatura.localeCompare(b.asignatura));
    })();

    return (
        <div className="section">
            {/* ===== TARJETA DE IDENTIDAD ===== */}
            <div className="perfil-identidad-card">
                <div className="perfil-avatar">
                    {inicialUsername}
                </div>
                <div className="perfil-identidad-info">
                    <h3 className="perfil-username">{user?.username}</h3>
                    <p className="perfil-email">{user?.email}</p>
                    <div className="perfil-badges">
                        <span className="perfil-badge rol">{user?.rol}</span>
                        <span className="perfil-badge estado">{user?.estado}</span>
                    </div>
                </div>
            </div>

                        {/* ===== TARJETA DE DATOS ACADÉMICOS ===== */}
            {estudiante && (
                <div className="profile-card">
                    <h3 className="card-title">Información Académica</h3>
                    <div className="datos-grid">
                        <div className="dato-item">
                            <span className="dato-label">Edad</span>
                            <span className="dato-valor">
                                {calcularEdad(estudiante.fecha_nacimiento)} años
                            </span>
                        </div>

                        {clases.length > 0 && (
                            <div className="dato-item">
                                <span className="dato-label">Unidad Educativa</span>
                                <span className="dato-valor dato-valor-texto">
                                    {clases[0].unidad_educativa || '—'}
                                </span>
                            </div>
                        )}

                        {clases.length > 0 && (
                            <div className="dato-item">
                                <span className="dato-label">Gestión</span>
                                <span className="dato-valor">
                                    {clases[0].periodo || '—'}
                                </span>
                            </div>
                        )}

                        {estudiante.fecha_creacion && (
                            <div className="dato-item">
                                <span className="dato-label">Fecha de Registro</span>
                                <span className="dato-valor">
                                    {new Date(estudiante.fecha_creacion).toLocaleDateString()}
                                </span>
                            </div>
                        )}

                        {estudiante.fecha_ultimo_acceso && (
                            <div className="dato-item">
                                <span className="dato-label">Último Acceso</span>
                                <span className="dato-valor">
                                    {new Date(estudiante.fecha_ultimo_acceso).toLocaleDateString()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Clases inscritas (listado aparte por ser varios) */}
                    {clases.length > 0 && (
                        <div className="clases-inscritas-bloque">
                            <span className="dato-label">Clases Inscritas</span>
                            <div className="clases-inscritas-lista">
                                {clases.map((c) => (
                                    <span key={c.id_clase} className="clase-chip">
                                        <strong>{c.nombrec}</strong> · {c.asignatura}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ===== RESUMEN POR ASIGNATURA ===== */}
            <div className="profile-card">
                <h3 className="card-title">Resumen de Rendimiento por Asignatura</h3>

                {resumenPorAsignatura.length === 0 ? (
                    <p className="empty-message">
                        Aún no tienes evaluaciones registradas en tus clases.
                    </p>
                ) : (
                    <div className="rendimiento-asignaturas">
                        {resumenPorAsignatura.map((a) => {
                            const rub = getRubrica(a.promedio);
                            return (
                                <div key={a.asignatura} className="asignatura-row">
                                    <div className="asignatura-nombre" title={a.asignatura}>
                                        {a.asignatura}
                                    </div>
                                    <div className="asignatura-barra-track">
                                        <div
                                            className="asignatura-barra-fill"
                                            style={{
                                                width: `${a.promedio || 0}%`,
                                                background: rub.color,
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="asignatura-valor"
                                        style={{ color: rub.color }}
                                    >
                                        {a.promedio !== null ? `${a.promedio}%` : '—'}
                                    </div>
                                    <div className="asignatura-nivel">
                                        <span
                                            className="nivel-chip"
                                            style={{ background: rub.color, color: '#fff' }}
                                        >
                                            {rub.nivel}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================
// SECCIÓN: MIS CLASES
// ============================================================
function MisClases({ clases, onUnirse, onAbrirClase }) {
    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Mis Clases</h2>
                    <p className="section-subtitle">Clases en las que estás inscrito</p>
                </div>
                <button className="btn-primary" onClick={onUnirse}>
                    Unirme a una Clase
                </button>
            </div>

            {clases.length === 0 ? (
                <p className="empty-message">No estás inscrito en ninguna clase.</p>
            ) : (
                <div className="clases-grid">
                    {clases.map((clase) => (
                        <div
                            key={clase.id_clase}
                            className="clase-card"
                            onClick={() => onAbrirClase(clase)}
                        >
                            <h3>{clase.nombrec}</h3>
                            <p><strong>Código:</strong> {clase.id_clase}</p>
                            <p><strong>Asignatura:</strong> {clase.asignatura}</p>
                            <p><strong>Grado:</strong> {clase.grado}</p>
                            <p><strong>UE:</strong> {clase.unidad_educativa}</p>
                            <p><strong>Período:</strong> {clase.periodo}</p>
                            <p>
                                <strong>Estado:</strong>{' '}
                                <span className="estado-badge activo">{clase.estado_clase}</span>
                            </p>
                            <button className="btn-ver-clase">Ver Clase</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashboardEstudiante;