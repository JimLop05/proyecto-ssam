/* frontend_ssam/src/pages/DashboardEstudiante/index.jsx */
// ============================================================
// DASHBOARD ESTUDIANTE
// Secciones: Mi Perfil | Mis Evaluaciones | Mis Clases
// Con botón para unirse a una clase por contraseña
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import './DashboardEstudiante.css';
import EvaluacionClase from './EvaluacionClase';
import PreguntasUnidad from './PreguntasUnidad';

function DashboardEstudiante() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const [clases, setClases] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState([]);
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

            const clasesRes = await api.get('/estudiante/mis-clases');
            setClases(clasesRes.data.data);

            const rendimientoRes = await api.get('/estudiante/mi-rendimiento');
            setRendimiento(rendimientoRes.data.data);

            try {
                const evalRes = await api.get('/estudiante/mis-evaluaciones');
                setEvaluaciones(evalRes.data.data || []);
            } catch (err) {
                console.warn('⚠️ Endpoint /mis-evaluaciones aún no disponible');
                setEvaluaciones([]);
            }
        } catch (error) {
            console.error('❌ Error al cargar datos del estudiante:', error);
            if (error.response?.status === 401) handleLogout();
        } finally {
            setLoading(false);
        }
    };

    // Recarga solo las clases (usado después de unirse)
    const recargarClases = async () => {
        try {
            const clasesRes = await api.get('/estudiante/mis-clases');
            setClases(clasesRes.data.data);
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
                setMensajeUnirse('✅ ' + response.data.message);
                setPasswordClase('');

                // Esperar 1.5s para que se vea el mensaje, luego cerrar y recargar
                setTimeout(async () => {
                    setShowModalUnirse(false);
                    setMensajeUnirse('');
                    await recargarClases();
                }, 1500);
            } else {
                setMensajeUnirse('❌ ' + response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Error al conectar con el servidor';
            setMensajeUnirse('❌ ' + msg);
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
                <h1>📚 Cargando tu información...</h1>
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
            return <MiPerfil user={user} estudiante={estudiante} rendimiento={rendimiento} />;
        case 'evaluaciones':
            return <MisEvaluaciones evaluaciones={evaluaciones} />;
        case 'clases':
            return (
                <MisClases
                    clases={clases}
                    onUnirse={() => setShowModalUnirse(true)}
                    onAbrirClase={(clase) => setClaseSeleccionada(clase)}
                />
            );
        default:
            return <MiPerfil user={user} estudiante={estudiante} rendimiento={rendimiento} />;
    }
};

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="/LogoSSAM.png" alt="SSAM" className="logo" />
                    <h1>Dashboard Estudiante</h1>
                </div>
                <div className="header-right">
                    <span className="user-name">{user?.nombre} {user?.apellido1}</span>
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
                            👤 Mi Perfil
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'evaluaciones' ? 'active' : ''}`}
                            onClick={() => setActiveSection('evaluaciones')}
                        >
                            📝 Mis Evaluaciones
                        </button>
                        <button
                            className={`sidebar-item ${activeSection === 'clases' ? 'active' : ''}`}
                            onClick={() => setActiveSection('clases')}
                        >
                            📚 Mis Clases
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
                            <h3>🔑 Unirme a una Clase</h3>
                            <button className="modal-close" onClick={cerrarModalUnirse}>✕</button>
                        </div>

                        <form onSubmit={handleUnirseAClase}>
                            <p style={{ marginBottom: '15px', color: '#555', fontSize: '14px' }}>
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
                                <div className={`mensaje ${mensajeUnirse.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}`}>
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
// ============================================================
function MiPerfil({ user, estudiante, rendimiento }) {
    return (
        <div className="section">
            <h2>👤 Mi Perfil</h2>

            <div className="profile-card">
                <div className="profile-grid">
                    <div>
                        <p><strong>Nombre:</strong> {user?.nombre} {user?.apellido1} {user?.apellido2 || ''}</p>
                        <p><strong>Username:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Rol:</strong> {user?.rol}</p>
                        <p><strong>Estado:</strong> <span className="estado-badge activo">{user?.estado}</span></p>
                    </div>
                    {estudiante && (
                        <div>
                            <p><strong>Fecha de Nacimiento:</strong> {new Date(estudiante.fecha_nacimiento).toLocaleDateString()}</p>
                            <p><strong>Sexo:</strong> {estudiante.sexo === 'M' ? 'Masculino' : estudiante.sexo === 'F' ? 'Femenino' : 'Otro'}</p>
                            <p><strong>Tipo de Estudiante:</strong> {estudiante.tipo_estudiante}</p>
                        </div>
                    )}
                </div>
            </div>

            {rendimiento && (
                <div className="profile-card">
                    <h3>📊 Mi Rendimiento</h3>
                    <div className="profile-grid">
                        <div>
                            <p><strong>Total Evaluaciones:</strong> {rendimiento.total_evaluaciones}</p>
                            <p><strong>Total Intentos:</strong> {rendimiento.total_intentos}</p>
                        </div>
                        <div>
                            <p>
                                <strong>Promedio General:</strong>{' '}
                                <span className="promedio-badge">{rendimiento.promedio_general || 0}%</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// SECCIÓN: MIS EVALUACIONES
// ============================================================
function MisEvaluaciones({ evaluaciones }) {
    return (
        <div className="section">
            <h2>📝 Mis Evaluaciones</h2>

            {evaluaciones.length === 0 ? (
                <p className="empty-message">
                    Aún no tienes evaluaciones asignadas. Cuando tu maestro cree una, aparecerá aquí.
                </p>
            ) : (
                <div className="clases-grid">
                    {evaluaciones.map((ev) => (
                        <div key={ev.id_evaluacion} className="clase-card">
                            <h3>{ev.concepto || 'Evaluación'}</h3>
                            <p><strong>Clase:</strong> {ev.nombre_clase || 'N/A'}</p>
                            <p><strong>Asignatura:</strong> {ev.nombre_asignatura || 'N/A'}</p>
                            <p><strong>Ponderación:</strong> {ev.ponderacion || 0}%</p>
                            <p><strong>Fecha inicio:</strong> {ev.fecha_inicio ? new Date(ev.fecha_inicio).toLocaleDateString() : 'N/A'}</p>
                            <p>
                                <strong>Estado:</strong>{' '}
                                <span className="estado-badge activo">{ev.estado_nivel || 'Pendiente'}</span>
                            </p>
                            <button className="btn-ver-clase">Iniciar Evaluación →</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ============================================================
// SECCIÓN: MIS CLASES (con botón UNIRME)
// ============================================================
function MisClases({ clases, onUnirse, onAbrirClase }) {
    return (
        <div className="section">
            <div className="section-header">
                <h2>📚 Mis Clases</h2>
                <button className="btn-crear-clase-header" onClick={onUnirse}>
                    + UNIRME A UNA CLASE
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
                            style={{ cursor: 'pointer' }}
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
                            <button className="btn-ver-clase">Ver Clase →</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashboardEstudiante;