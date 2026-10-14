/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/MonitoreoPlanificacion.jsx */
import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, ClipboardList, FileText, BookOpen } from 'lucide-react';
import api from '../../../api/axios';
import FiltrosMonitoreo from './FiltrosMonitoreo';
import GestionBadge from './GestionBadge';
import GraficoCircularGrados from './GraficoCircularGrados';
import GraficoBarrasUnidades from './GraficoBarrasUnidades';

function MonitoreoPlanificacion() {
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

            const res = await api.get(`/subdirector/monitoreo/planificacion?${params.toString()}`);
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setError(res.data.message || 'Error al cargar datos');
            }
        } catch (err) {
            console.error('Error en MonitoreoPlanificacion:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

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
                    <h3>📅 Monitoreo de Planificación Docente</h3>
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
            {filtrosCompletos && !loading && !error && data && data.contexto.total_planificaciones === 0 && (
                <div className="placeholder-panel">
                    <h3>📭 Sin planificaciones</h3>
                    <p>
                        No se encontraron planificaciones con esa asignatura y grado en el distrito seleccionado.
                    </p>
                </div>
            )}

            {/* Estado: con datos */}
            {filtrosCompletos && !loading && !error && data && data.contexto.total_planificaciones > 0 && (
                <>
                    {/* KPIs */}
                    <div className="mr-kpis">
                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--purple">
                                <ClipboardList size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Planificaciones</span>
                                <span className="mr-kpi__value">{data.contexto.total_planificaciones}</span>
                            </div>
                        </div>

                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--blue">
                                <FileText size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Items Usados</span>
                                <span className="mr-kpi__value">{data.contexto.total_items_usados}</span>
                            </div>
                        </div>

                        <div className="mr-kpi">
                            <div className="mr-kpi__icon mr-kpi__icon--green">
                                <BookOpen size={20} />
                            </div>
                            <div className="mr-kpi__body">
                                <span className="mr-kpi__label">Unidades Trabajadas</span>
                                <span className="mr-kpi__value">{data.por_unidad.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Gráfico circular por grado */}
                    <GraficoCircularGrados
                        porGrado={data.por_grado}
                        gradoActualId={parseInt(filtros.id_grado)}
                        contexto={data.contexto}
                    />

                    <GraficoBarrasUnidades
                        porUnidad={data.por_unidad}
                        gradoActualId={parseInt(filtros.id_grado)}
                        contexto={data.contexto}
                    />

                    {/* Debug temporal */}
                    <details style={{ marginTop: 16 }}>
                        <summary style={{ cursor: 'pointer', color: '#7c3aed' }}>
                            Ver JSON de respuesta (debug)
                        </summary>
                        <pre style={{ textAlign: 'left', marginTop: 12, fontSize: 12 }}>
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </details>
                </>
            )}
        </div>
    );
}

export default MonitoreoPlanificacion;