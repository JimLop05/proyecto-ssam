// frontend_ssam/src/pages/DashboardMaestro/EstadisticasClase.jsx
// ============================================================
// ESTADÍSTICAS DE CLASE
// - Panel global (inscritos / aforo / promedio)
// - Pestañas: Reporte de Clase | Reporte Estudiante
// ============================================================

import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    BarChart3,
    Users,
    GraduationCap,
    Loader2,
    AlertCircle,
    TrendingUp,
} from 'lucide-react';
import api from '../../api/axios';
import { getRubrica, fmt } from '../../utils/rubrica';
import ReporteClaseTab from './ReporteClaseTab';
import ReporteEstudianteTab from './ReporteEstudianteTab';
import './EstadisticasClase.css';

function EstadisticasClase({ clase, volver, estudianteInicialId = null }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [resumen, setResumen] = useState(null);
    const [tabActiva, setTabActiva] = useState(
        estudianteInicialId ? 'estudiante' : 'clase'
    );

    useEffect(() => {
        if (!clase?.id_clase) return;
        cargarResumen();
    }, [clase]);

    const cargarResumen = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get(
                `/clases/${clase.id_clase}/estadisticas/resumen`
            );
            if (res.data.success) {
                setResumen(res.data.data);
            } else {
                setError(res.data.message || 'Error al cargar el resumen');
            }
        } catch (err) {
            console.error('Error al cargar resumen:', err);
            setError(
                err.response?.data?.message ||
                    'Error al conectar con el servidor'
            );
        } finally {
            setLoading(false);
        }
    };

    if (!clase) return null;

    if (loading) {
        return (
            <div className="ec-section">
                <button className="dm-btn dm-btn--ghost" onClick={volver}>
                    <ArrowLeft size={16} />
                    Volver
                </button>
                <div className="ec-loading">
                    <Loader2 className="dm-spin" size={28} />
                    <p>Cargando estadísticas...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ec-section">
                <button className="dm-btn dm-btn--ghost" onClick={volver}>
                    <ArrowLeft size={16} />
                    Volver
                </button>
                <div className="ec-error">
                    <AlertCircle size={24} />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const rub = getRubrica(resumen?.promedio_clase);

    return (
        <div className="ec-section">
            {/* ============ HEADER ============ */}
            <div className="ec-header">
                <button className="dm-btn dm-btn--ghost" onClick={volver}>
                    <ArrowLeft size={16} />
                    Volver a la clase
                </button>

                <div className="ec-header__title">
                    <div className="ec-header__icon">
                        <BarChart3 size={22} />
                    </div>
                    <div>
                        <h2 className="dm-section__title">
                            Estadísticas de la Clase
                        </h2>
                        <p className="dm-section__subtitle">
                            {clase.nombrec || clase.nombreC} ·{' '}
                            {clase.nombre_grado || 'Grado'} ·{' '}
                            {clase.nombre_asignatura || 'Asignatura'}
                        </p>
                    </div>
                </div>
            </div>

            {/* ============ PANEL GLOBAL ============ */}
            <div className="ec-kpis">
                <div className="ec-kpi">
                    <div className="ec-kpi__icon ec-kpi__icon--blue">
                        <Users size={20} />
                    </div>
                    <div className="ec-kpi__body">
                        <span className="ec-kpi__label">Inscritos</span>
                        <span className="ec-kpi__value">
                            {resumen.inscritos}
                            <span className="ec-kpi__value-sub">
                                {' '}
                                / {resumen.aforo}
                            </span>
                        </span>
                        <div className="ec-kpi__bar">
                            <div
                                className="ec-kpi__bar-fill"
                                style={{
                                    width: `${resumen.porcentaje_ocupacion}%`,
                                }}
                            />
                        </div>
                        <span className="ec-kpi__hint">
                            {resumen.porcentaje_ocupacion}% de ocupación
                        </span>
                    </div>
                </div>

                <div className="ec-kpi">
                    <div
                        className="ec-kpi__icon"
                        style={{ background: `${rub.color}22`, color: rub.color }}
                    >
                        <TrendingUp size={20} />
                    </div>
                    <div className="ec-kpi__body">
                        <span className="ec-kpi__label">Promedio general</span>
                        <span
                            className="ec-kpi__value"
                            style={{ color: rub.color }}
                        >
                            {fmt(resumen.promedio_clase)}
                        </span>
                        <span className="ec-kpi__hint">{rub.nivel}</span>
                    </div>
                </div>

                <div className="ec-kpi">
                    <div className="ec-kpi__icon ec-kpi__icon--purple">
                        <GraduationCap size={20} />
                    </div>
                    <div className="ec-kpi__body">
                        <span className="ec-kpi__label">
                            Estudiantes evaluados
                        </span>
                        <span className="ec-kpi__value">
                            {resumen.estudiantes_con_intentos}
                            <span className="ec-kpi__value-sub">
                                {' '}
                                / {resumen.inscritos}
                            </span>
                        </span>
                        <span className="ec-kpi__hint">
                            {resumen.total_unidades} unidades temáticas
                        </span>
                    </div>
                </div>
            </div>

            {/* ============ TABS ============ */}
            <div className="ec-tabs">
                <button
                    className={`ec-tab ${
                        tabActiva === 'clase' ? 'is-active' : ''
                    }`}
                    onClick={() => setTabActiva('clase')}
                >
                    Reporte de Clase
                </button>
                <button
                    className={`ec-tab ${
                        tabActiva === 'estudiante' ? 'is-active' : ''
                    }`}
                    onClick={() => setTabActiva('estudiante')}
                >
                    Reporte Estudiante
                </button>
            </div>

            {/* ============ CONTENIDO TAB ============ */}
            <div className="ec-tab-content">
                {tabActiva === 'clase' && (
                    <ReporteClaseTab idClase={clase.id_clase} />
                )}
                {tabActiva === 'estudiante' && (
                    <ReporteEstudianteTab
                        idClase={clase.id_clase}
                        estudianteInicialId={estudianteInicialId}
                    />
                )}
            </div>
        </div>
    );
}

export default EstadisticasClase;