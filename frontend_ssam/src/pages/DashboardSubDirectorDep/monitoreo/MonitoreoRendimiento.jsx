/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/MonitoreoRendimiento.jsx */
import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, TrendingUp, Users, BookOpen, School } from 'lucide-react';
import api from '../../../api/axios';
import { getRubrica, fmt } from '../../../utils/rubrica';
import FiltrosMonitoreo from './FiltrosMonitoreo';
import GestionBadge from './GestionBadge';
import GraficoUnidadesRendimiento from './GraficoUnidadesRendimiento';

function MonitoreoRendimiento() {
    const [filtros, setFiltros] = useState({
        id_distrito: '',
        id_asig: '',
        id_grado: '',
        id_gestion: null,
        anio_gestion: 2026
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos cada vez que cambian los filtros (si están completos)
    useEffect(() => {
        if (!filtros.id_asig || !filtros.id_grado) {
            setData(null);
            return;
        }
        cargarDatos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtros.id_distrito, filtros.id_asig, filtros.id_grado, filtros.id_gestion]);

    const cargarDatos = async () => {
        setLoading(true);
        setError('');
        try {
            const params = new URLSearchParams();
            if (filtros.id_distrito) params.append('id_distrito', filtros.id_distrito);
            params.append('id_asig', filtros.id_asig);
            params.append('id_grado', filtros.id_grado);
            if (filtros.id_gestion) params.append('id_gestion', filtros.id_gestion);

            const res = await api.get(`/subdirector/monitoreo/rendimiento?${params.toString()}`);
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setError(res.data.message || 'Error al cargar datos');
            }
        } catch (err) {
            console.error('Error en MonitoreoRendimiento:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // Filtros incompletos → no buscar todavía
    const filtrosCompletos = filtros.id_asig && filtros.id_grado;

    return (
        <div>
            <div className="monitoreo-header">
                <FiltrosMonitoreo filtros={filtros} onChange={setFiltros} />
                <GestionBadge anio={filtros.anio_gestion} />
            </div>

            {/* Estado: filtros incompletos */}
            {!filtrosCompletos && (
                <div className="placeholder-panel">
                    <h3>📊 Monitoreo de Rendimiento</h3>
                    <p>Selecciona una <strong>asignatura</strong> y un <strong>grado</strong> para ver el análisis.</p>
                </div>
            )}

            {/* Estado: cargando */}
            {filtrosCompletos && loading && (
                <div className="placeholder-panel">
                    <Loader2 className="dm-spin" size={28} />
                    <p>Cargando datos...</p>
                </div>
            )}

            {/* Estado: error */}
            {filtrosCompletos && !loading && error && (
                <div className="placeholder-panel placeholder-panel--error">
                    <AlertCircle size={24} />
                    <p>{error}</p>
                </div>
            )}

            {/* Estado: sin datos */}
            {filtrosCompletos && !loading && !error && data && data.contexto.total_clases === 0 && (
                <div className="placeholder-panel">
                    <h3>📭 Sin datos</h3>
                    <p>
                        No se encontraron clases con esa asignatura y grado en el distrito seleccionado.
                    </p>
                </div>
            )}

            {/* Estado: con datos */}
            {filtrosCompletos && !loading && !error && data && data.contexto.total_clases > 0 && (
                <>
                    {/* KPIs */}
                    <div className="mr-kpis">
                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--blue">
                                <BookOpen size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Clases en el Distrito</span>
                                <span className="mr-kpi__value">{data.contexto.total_clases}</span>
                            </div>
                        </div>

                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--green">
                                <School size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">UE Participantes</span>
                                <span className="mr-kpi__value">{data.contexto.total_ue}</span>
                            </div>
                        </div>

                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--purple">
                                <Users size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Estudiantes Participantes</span>
                                <span className="mr-kpi__value">{data.contexto.total_estudiantes}</span>
                            </div>
                        </div>

                        <div className="mr-kpi">
                            <div
                                className="mr-kpi__icon"
                                style={{
                                    background: `${getRubrica(data.promedio_general).color}22`,
                                    color: getRubrica(data.promedio_general).color
                                }}
                            >
                                <TrendingUp size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Promedio General</span>
                                <span
                                    className="mr-kpi__value"
                                    style={{ color: getRubrica(data.promedio_general).color }}
                                >
                                    {fmt(data.promedio_general)}
                                </span>
                                <span className="mr-kpi__hint">
                                    {getRubrica(data.promedio_general).nivel}
                                </span>
                            </div>
                        </div>
                    </div>

                   {/* Gráfico de barras por unidad temática */}
                    <GraficoUnidadesRendimiento
                        unidades={data.unidades}
                        promedioGeneral={data.promedio_general}
                        contexto={data.contexto}
                    />
                </>
            )}
        </div>
    );
}

export default MonitoreoRendimiento;