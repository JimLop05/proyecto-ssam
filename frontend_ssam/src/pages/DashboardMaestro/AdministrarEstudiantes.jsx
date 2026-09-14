/* frontend_ssam/src/pages/DashboardMaestro/AdministrarEstudiantes.jsx */
// ============================================================
// ADMINISTRAR ESTUDIANTES DE UNA CLASE (MAESTRO)
// Muestra los estudiantes inscritos en la clase seleccionada
// ============================================================

import { useState, useEffect } from 'react';
import './AdministrarEstudiantes.css';

function AdministrarEstudiantes({ clase, volver }) {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarEstudiantes();
    }, [clase.id_clase]);

    const cargarEstudiantes = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:5000/api/clases/${clase.id_clase}/estudiantes`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            const data = await response.json();

            if (data.success) {
                setEstudiantes(data.data.estudiantes);
            } else {
                setError(data.message || 'Error al cargar los estudiantes');
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // Filtrar estudiantes por búsqueda
    const estudiantesFiltrados = estudiantes.filter((est) => {
        const texto = busqueda.toLowerCase();
        const nombreCompleto = `${est.nombre} ${est.apellido1} ${est.apellido2 || ''}`.toLowerCase();
        return (
            nombreCompleto.includes(texto) ||
            est.username.toLowerCase().includes(texto) ||
            est.email.toLowerCase().includes(texto)
        );
    });

    return (
        <div className="section admin-estudiantes">
            {/* HEADER */}
            <div className="section-header">
                <h2>👨‍🎓 Estudiantes de "{clase.nombrec}"</h2>
                <button className="btn-volver" onClick={volver}>
                    ← Volver al Detalle
                </button>
            </div>

            {/* INFO DE LA CLASE */}
            <div className="info-clase-resumen">
                <span>📚 <strong>{clase.nombre_asignatura || 'N/A'}</strong></span>
                <span>🎓 <strong>{clase.nombre_grado || 'N/A'}</strong></span>
                <span>🏫 <strong>{clase.nombre_ue || 'N/A'}</strong></span>
            </div>

            {/* LOADING */}
            {loading && (
                <p className="empty-message">Cargando estudiantes...</p>
            )}

            {/* ERROR */}
            {error && (
                <p className="empty-message" style={{ color: '#dc3545' }}>
                    ❌ {error}
                </p>
            )}

            {/* CONTENIDO */}
            {!loading && !error && (
                <>
                    {/* BARRA DE BÚSQUEDA + CONTADOR */}
                    <div className="admin-toolbar">
                        <input
                            type="text"
                            className="input-busqueda"
                            placeholder="🔍 Buscar por nombre, username o email..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                        <div className="contador-estudiantes">
                            <strong>{estudiantesFiltrados.length}</strong> de{' '}
                            <strong>{estudiantes.length}</strong> estudiantes
                        </div>
                    </div>

                    {/* SIN ESTUDIANTES */}
                    {estudiantes.length === 0 ? (
                        <div className="estado-vacio">
                            <p className="empty-message">
                                📭 Aún no hay estudiantes inscritos en esta clase.
                            </p>
                            <p className="empty-message" style={{ fontSize: '14px' }}>
                                Comparte la contraseña <strong>"{clase.password_clase}"</strong> con tus estudiantes para que se unan.
                            </p>
                        </div>
                    ) : estudiantesFiltrados.length === 0 ? (
                        <p className="empty-message">
                            🔍 No se encontraron estudiantes con "{busqueda}"
                        </p>
                    ) : (
                        /* TABLA DE ESTUDIANTES */
                        <div className="tabla-wrapper">
                            <table className="tabla-estudiantes">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Sexo</th>
                                        <th>Tipo</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantesFiltrados.map((est, index) => (
                                        <tr key={est.id_usuario}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <strong>
                                                    {est.nombre} {est.apellido1} {est.apellido2 || ''}
                                                </strong>
                                            </td>
                                            <td>{est.username}</td>
                                            <td>{est.email}</td>
                                            <td>
                                                {est.sexo === 'M' ? '♂ Masculino' :
                                                 est.sexo === 'F' ? '♀ Femenino' : '—'}
                                            </td>
                                            <td>{est.tipo_estudiante || '—'}</td>
                                            <td>
                                                <span className={`badge-estado ${est.estado_usuario?.toLowerCase()}`}>
                                                    {est.estado_usuario}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default AdministrarEstudiantes;