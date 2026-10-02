/* frontend_ssam/src/pages/DashboardEstudiante/MiRendimiento.jsx */
// ============================================================
// MI RENDIMIENTO (vista principal)
// - Lista de clases con promedio y rúbrica de colores
// - Próximamente: click en clase → detalle con pestañas
// ============================================================

import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './MiRendimiento.css';
import RendimientoClaseDetalle from './RendimientoClaseDetalle';

// ============================================================
// Rúbrica de colores institucional
// Terminología motivadora para estudiantes de secundaria
// ============================================================
export const RUBRICA = [
    { min: 90, max: 100, nivel: 'Óptimo',       color: '#2e7d32', clase: 'optimo' },
    { min: 75, max: 89,  nivel: 'Bueno',        color: '#66bb6a', clase: 'bueno' },
    { min: 51, max: 74,  nivel: 'Aceptable',    color: '#f9a825', clase: 'aceptable' },
    { min: 0,  max: 50,  nivel: 'En Desarrollo', color: '#c62828', clase: 'en-desarrollo' },
];

// Devuelve el objeto de rúbrica según una nota (0-100)
export const getRubrica = (nota) => {
    if (nota === null || nota === undefined) {
        return { nivel: 'Sin evaluar', color: '#94a3b8', clase: 'sin-evaluar' };
    }
    return RUBRICA.find((r) => nota >= r.min && nota <= r.max) || RUBRICA[3];
};

function MiRendimiento() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [clases, setClases] = useState([]);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);

    useEffect(() => {
        cargarRendimiento();
    }, []);

    const cargarRendimiento = async () => {
        try {
            const res = await api.get('/estudiante/mi-rendimiento-clases');
            if (res.data.success) {
                setClases(res.data.data.clases);
            } else {
                setError(res.data.message || 'Error al cargar el rendimiento');
            }
        } catch (err) {
            console.error('Error al cargar rendimiento:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

        // Detalle de clase
        if (claseSeleccionada) {
            return (
                <RendimientoClaseDetalle
                    idClase={claseSeleccionada.id_clase}
                    volver={() => setClaseSeleccionada(null)}
                />
            );
        }
        if (loading) {
            return (
                <div className="section">
                    <div className="loading-inline">
                        <div className="loading-spinner"></div>
                        <p>Cargando tu rendimiento...</p>
                    </div>
                </div>
            );
        }

    if (error) {
        return (
            <div className="section">
                <div className="section-header-simple">
                    <h2>Mi Rendimiento</h2>
                    <p className="section-subtitle">No se pudo cargar la información</p>
                </div>
                <p className="empty-message">{error}</p>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="section-header-simple">
                <h2>Mi Rendimiento</h2>
                <p className="section-subtitle">
                    Selecciona una clase para ver tu desempeño detallado
                </p>
            </div>

            {/* ===== RÚBRICA DE COLORES (leyenda) ===== */}
            <div className="rubrica-leyenda">
                <span className="rubrica-titulo">Rúbrica:</span>
                {RUBRICA.map((r) => (
                    <span key={r.clase} className={`rubrica-chip ${r.clase}`}>
                        {r.nivel} ({r.min}–{r.max})
                    </span>
                ))}
            </div>

            {/* ===== LISTA DE CLASES ===== */}
            <div className="clases-rendimiento-section">
                {clases.length === 0 ? (
                    <p className="empty-message">No estás inscrito en ninguna clase.</p>
                ) : (
                    <div className="clases-rendimiento-grid">
                        {clases.map((clase) => {
                            const rub = getRubrica(clase.promedio_clase);
                            return (
                                <div
                                    key={clase.id_clase}
                                    className="clase-rendimiento-card"
                                    onClick={() => setClaseSeleccionada(clase)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setClaseSeleccionada(clase);
                                        }
                                    }}
                                >
                                    {/* Asignatura resaltada */}
                                    <div className="clase-header">
                                        <span className={`asignatura-badge ${rub.clase}`}>
                                            {clase.asignatura || 'Sin asignatura'}
                                        </span>
                                        <span className="clase-periodo">{clase.periodo}</span>
                                    </div>

                                    <h4 className="clase-nombre">{clase.nombrec}</h4>
                                    <p className="clase-meta">
                                        {clase.grado} · {clase.unidad_educativa}
                                    </p>

                                    {/* Promedio + barra de rúbrica */}
                                    <div className="clase-promedio">
                                        <div className="promedio-info">
                                            <span className="promedio-label">Promedio</span>
                                            <span
                                                className="promedio-valor"
                                                style={{ color: rub.color }}
                                            >
                                                {clase.promedio_clase !== null
                                                    ? `${clase.promedio_clase}%`
                                                    : 'Sin evaluar'}
                                            </span>
                                        </div>
                                        <div className="promedio-barra">
                                            <div
                                                className="promedio-barra-fill"
                                                style={{
                                                    width: `${clase.promedio_clase || 0}%`,
                                                    background: rub.color,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats de unidades */}
                                    <div className="clase-stats-mini">
                                        <div className="mini-stat">
                                            <span className="mini-stat-label">Unidades</span>
                                            <span className="mini-stat-value">
                                                {clase.unidades_evaluadas}/{clase.total_unidades}
                                            </span>
                                        </div>
                                        <div className="mini-stat">
                                            <span className="mini-stat-label">Aprobadas</span>
                                            <span
                                                className="mini-stat-value"
                                                style={{ color: '#2e7d32' }}
                                            >
                                                {clase.unidades_aprobadas}
                                            </span>
                                        </div>
                                    </div>

                                    <button className="btn-ver-detalle">
                                        Ver detalle
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MiRendimiento;