/* frontend_ssam/src/pages/DashboardEstudiante/EvaluacionClase.jsx */
// ============================================================
// VISTA INTERNA DE UNA CLASE (ESTUDIANTE)
// Muestra info de la clase + unidades temáticas en mosaicos
// Los ítems NO se muestran; el mosaico es clickeable
// Se omiten las unidades tipo "Laboratorio"
// ============================================================

import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './EvaluacionClase.css';
import DebugPreguntas from './DebugPreguntas';  // 👈 TEMPORAL

// Paleta rotativa para los mosaicos
const COLORES_MOSAICO = [
    'verde',
    'azul',
    'naranja',
    'morado',
    'rojo',
    'turquesa',
    'amarillo',
    'rosa',
];

function EvaluacionClase({ idClase, volver, onIniciarUnidad }) {
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [debugTipo, setDebugTipo] = useState(null); // 'preguntas' | 'respuestas' | null 👈 TEMPORAL

    // Estado del modal de confirmación
    const [unidadPendiente, setUnidadPendiente] = useState(null);

    useEffect(() => {
        cargarDetalle();
    }, [idClase]);

    const cargarDetalle = async () => {
        try {
            const res = await api.get(`/estudiante/clase/${idClase}`);
            if (res.data.success) {
                setDetalle(res.data.data);
            } else {
                setError(res.data.message || 'Error al cargar la clase');
            }
        } catch (err) {
            console.error('Error al cargar detalle:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // Abre el modal
    const handleClickUnidad = (unidad) => {
        setUnidadPendiente(unidad);
    };

    // Cancela el modal
    const cancelarInicio = () => {
        setUnidadPendiente(null);
    };

    // Confirma y avisa al padre
    const confirmarInicio = () => {
        if (unidadPendiente && onIniciarUnidad) {
            const unidad = unidadPendiente;
            setUnidadPendiente(null);
            onIniciarUnidad(unidad);
        }
    };

    if (loading) {
        return (
            <div className="section">
                <p className="empty-message">Cargando información de la clase...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section">
                <div className="section-header">
                    <h2>❌ Error</h2>
                    <button className="btn-volver" onClick={volver}>← Volver</button>
                </div>
                <p className="empty-message">{error}</p>
            </div>
        );
    }

    const { clase, unidades } = detalle;

    // Filtrar unidades tipo "Laboratorio"
    const unidadesFiltradas = unidades.filter(
        (u) => !u.nombreut.toLowerCase().includes('laboratorio')
    );

    // 👈 TEMPORAL — Vista de debug
    if (debugTipo) {
        return (
            <DebugPreguntas
                idClase={idClase}
                tipo={debugTipo}
                volver={() => setDebugTipo(null)}
            />
        );
    }

    return (
        <div className="section clase-detalle-estudiante">
            {/* HEADER CON VOLVER */}
            <div className="section-header">
                <h2>📖 {clase.nombrec}</h2>
                <div className="header-actions">
                    {/* 👈 TEMPORAL — Botones de debug */}
                    <button
                        className="btn-debug-header"
                        onClick={() => setDebugTipo('preguntas')}
                    >
                        🔍 Ver Preguntas
                    </button>
                    <button
                        className="btn-debug-header"
                        onClick={() => setDebugTipo('respuestas')}
                    >
                        🔍 Ver Respuestas
                    </button>
                    <button className="btn-volver" onClick={volver}>← Volver a Mis Clases</button>
                </div>
            </div>

            {/* INFO DE LA CLASE */}
            <div className="info-clase-grid">
                <div className="info-item">
                    <label>Asignatura</label>
                    <p>{clase.asignatura || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Grado</label>
                    <p>{clase.grado || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Maestro</label>
                    <p>{clase.maestro || 'No asignado'}</p>
                </div>
                <div className="info-item">
                    <label>Unidad Educativa</label>
                    <p>{clase.unidad_educativa || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Período</label>
                    <p>{clase.periodo || 'N/A'}</p>
                </div>
                <div className="info-item">
                    <label>Estado</label>
                    <p>
                        <span className="estado-badge activo">{clase.estado_clase}</span>
                    </p>
                </div>
            </div>

            {/* UNIDADES TEMÁTICAS EN MOSAICOS */}
            <div className="unidades-section">
                <h3>📚 Unidades Temáticas</h3>

                {unidadesFiltradas.length === 0 ? (
                    <p className="empty-message">
                        Esta clase aún no tiene unidades temáticas asignadas.
                    </p>
                ) : (
                    <div className="unidades-mosaico-grid">
                        {unidadesFiltradas.map((unidad, index) => {
                            const colorClase = COLORES_MOSAICO[index % COLORES_MOSAICO.length];
                            return (
                                <div
                                    key={unidad.id_unid_tem}
                                    className={`mosaico-unidad ${colorClase} mosaico-clickeable`}
                                    onClick={() => handleClickUnidad(unidad)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            handleClickUnidad(unidad);
                                        }
                                    }}
                                >
                                    {/* Espacio reservado para el ícono */}
                                    <div className="mosaico-icono">📘</div>

                                    <div className="mosaico-contenido">
                                        <div className="mosaico-numero">
                                            Unidad {index + 1}
                                        </div>
                                        <h4>{unidad.nombreut}</h4>
                                        {unidad.objetivo && (
                                            <p className="mosaico-objetivo">
                                                {unidad.objetivo.length > 100
                                                    ? unidad.objetivo.substring(0, 100) + '...'
                                                    : unidad.objetivo}
                                            </p>
                                        )}
                                    </div>

                                    {/* 👈 NUEVO: datos de rendimiento */}
                                    <div className="mosaico-stats">
                                        <div className="mosaico-stat">
                                            <span className="stat-icono">🔄</span>
                                            <span className="stat-texto">
                                                Intentos: <strong>{unidad.evalua?.nro_intentos || 0}</strong>
                                            </span>
                                        </div>
                                        <div className="mosaico-stat">
                                            <span className="stat-icono">🏆</span>
                                            <span className="stat-texto">
                                                Nota alta: <strong>
                                                    {unidad.evalua?.nota_alta != null ? `${unidad.evalua.nota_alta}%` : '—'}
                                                </strong>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ===== MODAL CONFIRMAR INICIO ===== */}
            {unidadPendiente && (
                <div className="modal-overlay" onClick={cancelarInicio}>
                    <div
                        className="modal-content modal-confirmar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h3>🚀 Comenzar la prueba</h3>
                            <button className="modal-close" onClick={cancelarInicio}>✕</button>
                        </div>

                        <div className="modal-body-confirmar">
                            <p className="modal-pregunta">
                                ¿Estás seguro que deseas comenzar la prueba de esta unidad?
                            </p>
                            <div className="modal-unidad-info">
                                <span className="modal-unidad-label">Unidad:</span>
                                <span className="modal-unidad-nombre">
                                    {unidadPendiente.nombreut}
                                </span>
                            </div>
                            {unidadPendiente.objetivo && (
                                <div className="modal-unidad-info">
                                    <span className="modal-unidad-label">Objetivo:</span>
                                    <span className="modal-unidad-nombre">
                                        {unidadPendiente.objetivo}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-cancelar"
                                onClick={cancelarInicio}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn-guardar"
                                onClick={confirmarInicio}
                            >
                                Sí, comenzar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EvaluacionClase;