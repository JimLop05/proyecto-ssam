/* frontend_ssam/src/pages/DashboardEstudiante/RendimientoClaseDetalle.jsx */
// ============================================================
// DETALLE DE RENDIMIENTO DE UNA CLASE
// 3 pestañas:
//   1. RENDIMIENTO DE LA CLASE  → barras verticales 3D por unidad
//   2. RENDIMIENTO POR UNIDAD   → barras horizontales por ÍTEM
//   3. REPORTE GLOBAL           → tabla de intentos + círculos
// ============================================================

import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { getRubrica } from './MiRendimiento';
import './RendimientoClaseDetalle.css';
import { ArrowLeft } from 'lucide-react';

// Traduce el estado crudo del backend a un término amigable
const getEstadoAmigable = (estado) => {
    const mapa = {
        APROBADO:     { label: 'Óptimo',        color: '#2e7d32' },
        REPROBADO:    { label: 'En Desarrollo', color: '#c62828' },
        EN_PROGRESO:  { label: 'En Progreso',   color: '#f9a825' },
        SIN_INTENTOS: { label: 'Sin Evaluar',   color: '#94a3b8' },
    };
    return mapa[estado] || { label: estado || 'Sin Evaluar', color: '#94a3b8' };
};

const TABS = [
    { id: 'clase',   label: 'Rendimiento de la Clase' },
    { id: 'unidad',  label: 'Rendimiento por Unidad' },
    { id: 'reporte', label: 'Reporte Global' },
];

function RendimientoClaseDetalle({ idClase, volver }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const [tabActiva, setTabActiva] = useState('clase');

    // Unidad seleccionada en la pestaña 2
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

    useEffect(() => {
        cargarRendimiento();
    }, [idClase]);

    const cargarRendimiento = async () => {
        try {
            const res = await api.get(`/estudiante/clase/${idClase}/rendimiento`);
            if (res.data.success) {
                // Filtrar unidades tipo "Laboratorio"
                const dataFiltrada = { ...res.data.data };
                dataFiltrada.por_unidad = res.data.data.por_unidad.filter(
                    (u) => !u.nombreut.toLowerCase().includes('laboratorio')
                );

                // Filtrar por_pregunta para consistencia
                const idsUnidadesValidas = new Set(
                    dataFiltrada.por_unidad.map((u) => u.id_unid_tem)
                );
                dataFiltrada.por_pregunta = res.data.data.por_pregunta.filter(
                    (p) => idsUnidadesValidas.has(p.id_unid_tem)
                );

                // Recalcular total_unidades
                dataFiltrada.resumen = {
                    ...dataFiltrada.resumen,
                    total_unidades: dataFiltrada.por_unidad.length,
                };

                setData(dataFiltrada);

                // Preseleccionar la primera unidad con intentos
                const conIntentos = dataFiltrada.por_unidad.find((u) => u.nro_intentos > 0);
                setUnidadSeleccionada(
                    conIntentos?.id_unid_tem ||
                    dataFiltrada.por_unidad[0]?.id_unid_tem ||
                    null
                );
            } else {
                setError(res.data.message || 'Error al cargar el rendimiento');
            }
        } catch (err) {
            console.error('Error al cargar rendimiento de la clase:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="section">
                <div className="loading-inline">
                    <div className="loading-spinner"></div>
                    <p>Cargando rendimiento de la clase...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section">
                <div className="section-header">
                    <div className="section-header-simple">
                        <h2>Error</h2>
                        <p className="section-subtitle">No se pudo cargar el rendimiento</p>
                    </div>
                    <button className="btn-volver" onClick={volver}>
                        <ArrowLeft size={16} />
                        Volver
                    </button>
                </div>
                <p className="empty-message">{error}</p>
            </div>
        );
    }

    const { clase, resumen, por_unidad, por_pregunta, intentos } = data;
    const rub = getRubrica(resumen.promedio_clase);

    return (
        <div className="section rendimiento-detalle">
            {/* ===== HEADER ===== */}
            <div className="section-header">
                <div className="section-header-simple">
                    <div className="detalle-header-badges">
                        <span className={`asignatura-badge ${rub.clase}`}>
                            {clase.asignatura || 'Sin asignatura'}
                        </span>
                        <span className="clase-periodo">
                            Gestión {clase.periodo}
                        </span>
                    </div>
                    <h2>{clase.nombrec}</h2>
                    <p className="section-subtitle">
                        {clase.grado} · {clase.unidad_educativa}
                    </p>
                </div>
                <button className="btn-volver" onClick={volver}>
                    <ArrowLeft size={16} />
                    Volver
                </button>
            </div>

            {/* ===== TABS ===== */}
            <div className="tabs-horizontal">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        className={`tab-btn ${tabActiva === t.id ? 'active' : ''}`}
                        onClick={() => setTabActiva(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ===== CONTENIDO ===== */}
            <div className="tab-contenido">
                {tabActiva === 'clase' && (
                    <TabRendimientoClase
                        resumen={resumen}
                        porUnidad={por_unidad}
                    />
                )}

                {tabActiva === 'unidad' && (
                    <TabRendimientoUnidad
                        porUnidad={por_unidad}
                        porPregunta={por_pregunta}
                        unidadSeleccionada={unidadSeleccionada}
                        setUnidadSeleccionada={setUnidadSeleccionada}
                    />
                )}

                {tabActiva === 'reporte' && (
                    <TabReporteGlobal
                        resumen={resumen}
                        porUnidad={por_unidad}
                        intentos={intentos}
                    />
                )}
            </div>
        </div>
    );
}

// ============================================================
// TAB 1: RENDIMIENTO DE LA CLASE
// Barras verticales 3D por unidad
// ============================================================
function TabRendimientoClase({ resumen, porUnidad }) {
    const rubGeneral = getRubrica(resumen.promedio_clase);
    const MAX_ESCALA = 100;

    return (
        <div className="tab-panel">
            {/* Resumen superior */}
            <div className="resumen-clase-grid">
                <div className="resumen-clase-card destacado">
                    <span className="resumen-label">Promedio de la Clase</span>
                    <span className="resumen-valor" style={{ color: rubGeneral.color }}>
                        {resumen.promedio_clase !== null ? `${resumen.promedio_clase}%` : '—'}
                    </span>
                    <span className="resumen-hint" style={{ color: rubGeneral.color }}>
                        {rubGeneral.nivel}
                    </span>
                </div>
                <div className="resumen-clase-card">
                    <span className="resumen-label">Unidades evaluadas</span>
                    <span className="resumen-valor">
                        {resumen.unidades_evaluadas}/{resumen.total_unidades}
                    </span>
                </div>
            </div>

            {/* Gráfico de barras verticales 3D */}
            <div className="grafico-barras-card">
                <h3 className="grafico-titulo">Rendimiento por Unidad</h3>

                {porUnidad.length === 0 ? (
                    <p className="empty-message">Esta clase no tiene unidades temáticas.</p>
                ) : (
                    <div className="grafico-barras-vertical">
                        {/* Eje Y */}
                        <div className="eje-y">
                            {[100, 75, 50, 25, 0].map((v) => (
                                <div key={v} className="eje-y-tick">
                                    <span className="tick-label">{v}%</span>
                                    <div className="tick-linea" />
                                </div>
                            ))}
                        </div>

                        {/* Barras */}
                        <div className="barras-container">
                            {porUnidad.map((u) => {
                                const rub = getRubrica(u.nota_promedio);
                                const altura = u.nota_promedio !== null
                                    ? (u.nota_promedio / MAX_ESCALA) * 100
                                    : 0;

                                return (
                                    <div key={u.id_unid_tem} className="barra-columna">
                                        <div className="barra-wrapper">
                                            <div
                                                className={`barra-vertical-3d ${u.nota_promedio === null ? 'sin-datos' : ''}`}
                                                style={{
                                                    height: `${altura}%`,
                                                    '--barra-color': rub.color,
                                                    '--barra-color-dark': rub.color,
                                                }}
                                                title={u.nota_promedio !== null ? `${u.nota_promedio}%` : 'Sin intentos'}
                                            >
                                                {u.nota_promedio !== null && (
                                                    <span className="barra-valor">
                                                        {u.nota_promedio}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="barra-label" title={u.nombreut}>
                                            {u.nombreut.length > 14
                                                ? u.nombreut.substring(0, 14) + '…'
                                                : u.nombreut}
                                        </div>
                                        <div className="barra-sublabel">
                                            {u.nro_intentos > 0
                                                ? `${u.nro_intentos} intento${u.nro_intentos > 1 ? 's' : ''}`
                                                : 'Sin intentos'}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================
// TAB 2: RENDIMIENTO POR UNIDAD
// Muestra solo ÍTEMS con su promedio (sin preguntas individuales)
// ============================================================
function TabRendimientoUnidad({ porUnidad, porPregunta, unidadSeleccionada, setUnidadSeleccionada }) {
    // Filtrar preguntas de la unidad seleccionada
    const preguntasDeUnidad = porPregunta.filter((p) => p.id_unid_tem === unidadSeleccionada);

    // Info de la unidad seleccionada
    const infoUnidad = porUnidad.find((u) => u.id_unid_tem === unidadSeleccionada);

    // Agrupar preguntas por ítem
    const itemsAgrupados = [];
    const itemsMap = {};

    preguntasDeUnidad.forEach((p) => {
        const key = p.id_item;
        if (!itemsMap[key]) {
            itemsMap[key] = {
                id_item: p.id_item,
                nombre_item: p.nombre_item || 'Sin ítem',
                preguntas: [],
            };
            itemsAgrupados.push(itemsMap[key]);
        }
        itemsMap[key].preguntas.push(p);
    });

    // Promedio simple del ítem (solo preguntas con respuestas)
    const calcularPromedioItem = (preguntas) => {
        const conRespuestas = preguntas.filter((p) => p.total_respuestas > 0);
        if (conRespuestas.length === 0) return null;
        const suma = conRespuestas.reduce((sum, p) => sum + p.porcentaje, 0);
        return Math.round(suma / conRespuestas.length);
    };

    return (
        <div className="tab-panel">
            {/* Selector de unidad */}
            <div className="selector-unidad-card">
                <label className="selector-label">Selecciona una unidad:</label>
                <select
                    className="selector-unidad"
                    value={unidadSeleccionada || ''}
                    onChange={(e) => setUnidadSeleccionada(parseInt(e.target.value))}
                >
                    {porUnidad.map((u) => (
                        <option key={u.id_unid_tem} value={u.id_unid_tem}>
                            {u.nombreut}
                        </option>
                    ))}
                </select>
            </div>

            {/* Info de la unidad seleccionada */}
            {infoUnidad && (
                <div className="unidad-info-card">
                    <div className="unidad-info-titulo">{infoUnidad.nombreut}</div>
                    <div className="unidad-info-stats">
                        <div className="info-stat">
                            <span className="info-stat-label">Promedio</span>
                            <span
                                className="info-stat-valor"
                                style={{ color: getRubrica(infoUnidad.nota_promedio).color }}
                            >
                                {infoUnidad.nota_promedio !== null ? `${infoUnidad.nota_promedio}%` : '—'}
                            </span>
                        </div>
                        <div className="info-stat">
                            <span className="info-stat-label">Nota alta</span>
                            <span className="info-stat-valor">
                                {infoUnidad.nota_alta !== null ? `${infoUnidad.nota_alta}%` : '—'}
                            </span>
                        </div>
                        <div className="info-stat">
                            <span className="info-stat-label">Intentos</span>
                            <span className="info-stat-valor">{infoUnidad.nro_intentos}</span>
                        </div>
                        <div className="info-stat">
                            <span className="info-stat-label">Estado</span>
                            <span
                                className="info-stat-valor"
                                style={{ color: getEstadoAmigable(infoUnidad.estado).color }}
                            >
                                {getEstadoAmigable(infoUnidad.estado).label}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Ítems con barra de progreso */}
            <div className="grafico-barras-card">
                <h3 className="grafico-titulo">Desempeño por Ítem</h3>

                {itemsAgrupados.length === 0 ? (
                    <p className="empty-message">
                        Aún no has rendido esta unidad. Cuando lo hagas, verás aquí el desempeño por ítem.
                    </p>
                ) : (
                    <div className="items-lista">
                        {itemsAgrupados.map((item) => {
                            const promedioItem = calcularPromedioItem(item.preguntas);
                            const rubItem = getRubrica(promedioItem);

                            return (
                                <div
                                    key={item.id_item}
                                    className="item-card"
                                    style={{ '--item-color': rubItem.color }}
                                >
                                    <div className="item-card__left">
                                        <div className="item-card__nombre">
                                            {item.nombre_item}
                                        </div>
                                        <div className="item-card__barra-track">
                                            <div
                                                className="item-card__barra-fill"
                                                style={{
                                                    width: `${promedioItem || 0}%`,
                                                    background: rubItem.color,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="item-card__right">
                                        <span
                                            className="item-card__porcentaje"
                                            style={{ color: rubItem.color }}
                                        >
                                            {promedioItem !== null ? `${promedioItem}%` : '—'}
                                        </span>
                                        <span className="item-card__nivel">
                                            {rubItem.nivel}
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
// TAB 3: REPORTE GLOBAL
// ============================================================
function TabReporteGlobal({ resumen, porUnidad, intentos }) {
    const unidadesConPromedio = porUnidad.filter((u) => u.nota_promedio !== null);

    // Agrupar intentos por unidad (solo últimos 3 por unidad)
    const intentosPorUnidad = {};

    intentos.forEach((it) => {
        const nombre = it.nombreut;
        if (!intentosPorUnidad[nombre]) {
            intentosPorUnidad[nombre] = [];
        }
        if (intentosPorUnidad[nombre].length < 3) {
            intentosPorUnidad[nombre].push(it);
        }
    });

    const unidadesConIntentos = porUnidad
        .filter((u) => intentosPorUnidad[u.nombreut]?.length > 0)
        .map((u) => ({
            id_unid_tem: u.id_unid_tem,
            nombreut: u.nombreut,
            nota_promedio: u.nota_promedio,
            nota_alta: u.nota_alta,
            nro_intentos: u.nro_intentos,
            intentos: intentosPorUnidad[u.nombreut],
        }));

    return (
        <div className="tab-panel">
            {/* ===== CÍRCULOS DE PROMEDIO ===== */}
            <div className="circulos-card">
                <h3 className="grafico-titulo">Promedios por Unidad</h3>

                {unidadesConPromedio.length === 0 ? (
                    <p className="empty-message">Aún no tienes promedios registrados.</p>
                ) : (
                    <div className="circulos-grid">
                        {unidadesConPromedio.map((u) => (
                            <CirculoPromedio
                                key={u.id_unid_tem}
                                valor={u.nota_promedio}
                                label={u.nombreut}
                            />
                        ))}

                        <CirculoPromedio
                            valor={resumen.promedio_clase}
                            label="Promedio General"
                            destacado
                        />
                    </div>
                )}
            </div>

            {/* ===== INTENTOS AGRUPADOS POR UNIDAD ===== */}
            <div className="tabla-card">
                <div className="tabla-header">
                    <h3 className="grafico-titulo">Últimos Intentos por Unidad</h3>
                </div>

                {unidadesConIntentos.length === 0 ? (
                    <p className="empty-message">No tienes intentos registrados en esta clase.</p>
                ) : (
                    <div className="unidades-intentos-wrapper">
                        {unidadesConIntentos.map((u) => {
                            const rubProm = getRubrica(u.nota_promedio);
                            return (
                                <div key={u.id_unid_tem} className="unidad-intentos-bloque">
                                    <div className="unidad-intentos-header">
                                        <div className="unidad-intentos-titulo">
                                            <span className="unidad-intentos-nombre">
                                                {u.nombreut}
                                            </span>
                                            <span className="unidad-intentos-meta">
                                                {u.nro_intentos} intento{u.nro_intentos > 1 ? 's' : ''} en total
                                            </span>
                                        </div>
                                        <div
                                            className="unidad-intentos-promedio"
                                            style={{ color: rubProm.color }}
                                        >
                                            <span className="promedio-mini-label">Promedio</span>
                                            <span className="promedio-mini-valor">
                                                {u.nota_promedio !== null ? `${u.nota_promedio}%` : '—'}
                                            </span>
                                            <span className="promedio-mini-nivel">{rubProm.nivel}</span>
                                        </div>
                                    </div>

                                    <div className="tabla-wrapper">
                                        <table className="tabla-intentos">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Correctas</th>
                                                    <th>Nota</th>
                                                    <th>Nivel</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {u.intentos.map((it, idx) => {
                                                    const rub = getRubrica(it.nota_unidad_tematica);
                                                    const numeroIntento = u.nro_intentos - idx;
                                                    return (
                                                        <tr key={it.id_intento}>
                                                            <td>{numeroIntento}</td>
                                                            <td>
                                                                {new Date(it.fecha_intento).toLocaleDateString()}
                                                            </td>
                                                            <td>
                                                                {it.hora_intento?.substring(0, 5) || '—'}
                                                            </td>
                                                            <td>{it.nro_respuestas_correctas}</td>
                                                            <td
                                                                style={{
                                                                    color: rub.color,
                                                                    fontWeight: 700,
                                                                }}
                                                            >
                                                                {it.nota_unidad_tematica}%
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className="estado-chip"
                                                                    style={{
                                                                        background: rub.color,
                                                                        color: '#fff',
                                                                    }}
                                                                >
                                                                    {rub.nivel}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
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
// CÍRCULO DE PROMEDIO (estilo donut con CSS)
// ============================================================
function CirculoPromedio({ valor, label, destacado = false }) {
    const rub = getRubrica(valor);
    const porcentaje = valor || 0;
    const size = destacado ? 140 : 100;
    const strokeWidth = destacado ? 12 : 9;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (porcentaje / 100) * circumference;

    return (
        <div className={`circulo-item ${destacado ? 'destacado' : ''}`}>
            <div className="circulo-svg-wrapper" style={{ width: size, height: size }}>
                <svg width={size} height={size} className="circulo-svg">
                    <circle
                        className="circulo-fondo"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                    />
                    <circle
                        className="circulo-progreso"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke={rub.color}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className="circulo-centro">
                    <span className="circulo-valor" style={{ color: rub.color }}>
                        {valor !== null ? `${valor}%` : '—'}
                    </span>
                </div>
            </div>
            <div className="circulo-label" title={label}>{label}</div>
            {destacado && (
                <div className="circulo-hint">Promedio total</div>
            )}
        </div>
    );
}

export default RendimientoClaseDetalle;