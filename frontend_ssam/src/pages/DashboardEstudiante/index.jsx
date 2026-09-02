// ============================================================
// DASHBOARD ESTUDIANTE
// Muestra datos personales, clases y rendimiento del estudiante
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function DashboardEstudiante() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [estudiante, setEstudiante] = useState(null);
    const [clases, setClases] = useState([]);
    const [rendimiento, setRendimiento] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener datos del usuario desde localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        setUser(userData);

        // Cargar datos del estudiante desde el backend
        const fetchData = async () => {
            try {
                // 1. Obtener perfil completo del estudiante
                const perfilRes = await api.get('/estudiante/mi-perfil');
                setEstudiante(perfilRes.data.data);

                // 2. Obtener clases del estudiante
                const clasesRes = await api.get('/estudiante/mis-clases');
                setClases(clasesRes.data.data);

                // 3. Obtener rendimiento
                const rendimientoRes = await api.get('/estudiante/mi-rendimiento');
                setRendimiento(rendimientoRes.data.data);

                setLoading(false);
            } catch (error) {
                console.error('❌ Error al cargar datos del estudiante:', error);
                if (error.response?.status === 401) {
                    // Token expirado, redirigir al login
                    handleLogout();
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Mostrar carga
    if (loading) {
        return (
            <div style={styles.container}>
                <h1>📚 Cargando tu información...</h1>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <header style={styles.header}>
                <h1>📚 Dashboard Estudiante</h1>
                <button onClick={handleLogout} style={styles.btnLogout}>
                    Cerrar Sesión
                </button>
            </header>

            {/* PERFIL DEL ESTUDIANTE */}
            {user && (
                <div style={styles.card}>
                    <h2>👤 Mi Perfil</h2>
                    <div style={styles.grid}>
                        <div>
                            <p><strong>Nombre:</strong> {user.nombre} {user.apellido1} {user.apellido2 || ''}</p>
                            <p><strong>Username:</strong> {user.username}</p>  
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Rol:</strong> {user.rol}</p>
                            <p><strong>Estado:</strong> <span style={styles.estadoBadge}>{user.estado}</span></p>
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
            )}

            {/* RENDIMIENTO */}
            {rendimiento && (
                <div style={styles.card}>
                    <h2>📊 Mi Rendimiento</h2>
                    <div style={styles.grid}>
                        <div>
                            <p><strong>Total Evaluaciones:</strong> {rendimiento.total_evaluaciones}</p>
                            <p><strong>Total Intentos:</strong> {rendimiento.total_intentos}</p>
                        </div>
                        <div>
                            <p><strong>Promedio General:</strong> <span style={styles.promedioBadge}>{rendimiento.promedio_general || 0}%</span></p>
                        </div>
                    </div>
                </div>
            )}

            {/* CLASES */}
            <div style={styles.card}>
                <h2>📖 Mis Clases</h2>
                {clases.length === 0 ? (
                    <p style={styles.emptyMessage}>No estás inscrito en ninguna clase.</p>
                ) : (
                    <ul style={styles.lista}>
                        {clases.map((clase) => (
                            <li key={clase.id_clase} style={styles.itemClase}>
                                <div style={styles.claseHeader}>
                                    <strong>{clase.nombrec}</strong>
                                    <span style={styles.estadoClaseBadge}>{clase.estado_clase}</span>
                                </div>
                                <div style={styles.claseDetails}>
                                    <span>📖 {clase.asignatura}</span>
                                    <span>🎓 {clase.grado}</span>
                                    <span>🏫 {clase.unidad_educativa}</span>
                                    <span>📅 {clase.periodo}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// ==================== ESTILOS ========================
const styles = {
    container: {
        maxWidth: '1000px',
        margin: '20px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e9ecef'
    },
    btnLogout: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    estadoBadge: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '3px 10px',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold'
    },
    promedioBadge: {
        backgroundColor: '#1A5276',
        color: 'white',
        padding: '4px 15px',
        borderRadius: '20px',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    emptyMessage: {
        color: '#6c757d',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    lista: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    itemClase: {
        backgroundColor: 'white',
        padding: '15px',
        marginBottom: '10px',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
    },
    claseHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    estadoClaseBadge: {
        backgroundColor: '#17a2b8',
        color: 'white',
        padding: '2px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold'
    },
    claseDetails: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        fontSize: '14px',
        color: '#555'
    }
};

export default DashboardEstudiante;