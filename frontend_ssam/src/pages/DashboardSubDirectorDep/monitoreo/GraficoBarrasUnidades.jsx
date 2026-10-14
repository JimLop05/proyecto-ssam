/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/GraficoBarrasUnidades.jsx */
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
    Cell
} from 'recharts';

// ============================================================
// Colores por grado (mismo esquema que el circular)
// ============================================================
const COLOR_GRADO_ACTUAL = '#10b981';
const COLORES_INFERIORES = {
    distancia1: '#3b82f6',
    distancia2: '#60a5fa',
    distancia3: '#93c5fd',
    distancia4: '#bfdbfe',
};
const COLOR_SUPERIOR = '#9ca3af';

function asignarColor(item, gradoActual) {
    if (item.id_grado === gradoActual) return COLOR_GRADO_ACTUAL;
    if (item.id_grado < gradoActual) {
        const distancia = gradoActual - item.id_grado;
        if (distancia === 1) return COLORES_INFERIORES.distancia1;
        if (distancia === 2) return COLORES_INFERIORES.distancia2;
        if (distancia === 3) return COLORES_INFERIORES.distancia3;
        return COLORES_INFERIORES.distancia4;
    }
    return COLOR_SUPERIOR;
}

// ============================================================
// Truncar nombres largos
// ============================================================
function truncar(texto, max = 30) {
    if (!texto) return '';
    return texto.length > max ? texto.slice(0, max).trim() + '…' : texto;
}

// ============================================================
// Tooltip
// ============================================================
function TooltipBarras({ active, payload }) {
    if (!active || !payload || !payload.length) return null;

    const d = payload[0].payload;

    return (
        <div className="grafico-tooltip">
            <p className="grafico-tooltip__titulo">{d.unidad}</p>
            <p className="grafico-tooltip__valor" style={{ color: payload[0].payload.fill }}>
                {d.promedio_items.toFixed(2)} items/plan
            </p>
            <p className="grafico-tooltip__detalle">
                <strong>{d.grado}</strong>
                {d.es_grado_actual ? ' · grado actual' : ' · grado inferior'}
            </p>
            <p className="grafico-tooltip__detalle">
                {d.items_usados} items usados · {d.planificaciones_que_la_incluyen} planificaciones
            </p>
        </div>
    );
}

// ============================================================
// Componente principal
// ============================================================
function GraficoBarrasUnidades({ porUnidad, gradoActualId, contexto }) {
    if (!porUnidad || porUnidad.length === 0) {
        return (
            <div className="grafico-card">
                <div className="grafico-card__header">
                    <h3 className="grafico-card__titulo">
                        Items Planificados por Unidad Temática
                    </h3>
                </div>
                <p className="empty-message">Sin unidades planificadas para mostrar.</p>
            </div>
        );
    }

    // Calcular promedio general (de todos los promedios de unidad)
    const promedioGeneral = porUnidad.length > 0
        ? porUnidad.reduce((acc, u) => acc + u.promedio_items, 0) / porUnidad.length
        : 0;

    // Preparar datos con color y etiqueta corta
    const data = porUnidad.map((u) => ({
        ...u,
        fill: asignarColor(u, gradoActualId),
        etiqueta: truncar(u.unidad, 28)
    }));

    // Altura dinámica según cantidad de unidades
    const alturaGrafico = Math.max(300, data.length * 38);

    return (
        <div className="grafico-card">
            <div className="grafico-card__header">
                <h3 className="grafico-card__titulo">
                    Items Planificados por Unidad Temática — {contexto?.distrito || 'Todos los distritos'}
                </h3>
                <p className="grafico-card__subtitulo">
                    Promedio de items por planificación · Ordenado por grado y luego por promedio
                </p>
            </div>

            <div className="grafico-barras-wrapper" style={{ height: alturaGrafico }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eaecf0" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fontSize: 11, fill: '#667085' }}
                            axisLine={{ stroke: '#d0d5dd' }}
                            tickLine={false}
                        />
                        <YAxis
                            dataKey="etiqueta"
                            type="category"
                            width={200}
                            tick={{ fontSize: 11, fill: '#344054' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            content={<TooltipBarras />}
                            cursor={{ fill: 'rgba(124, 58, 237, 0.05)' }}
                        />

                        {/* Línea vertical con promedio general */}
                        <ReferenceLine
                            x={promedioGeneral}
                            stroke="#7c3aed"
                            strokeDasharray="4 4"
                            strokeWidth={1.5}
                            label={{
                                value: `Prom: ${promedioGeneral.toFixed(2)}`,
                                position: 'top',
                                fill: '#7c3aed',
                                fontSize: 10,
                                fontWeight: 600
                            }}
                        />

                        <Bar dataKey="promedio_items" radius={[0, 6, 6, 0]} maxBarSize={28}>
                            {data.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Leyenda de colores */}
            <div className="grafico-leyenda-inferior">
                <div className="leyenda-chip">
                    <span className="leyenda-color" style={{ background: COLOR_GRADO_ACTUAL }} />
                    <span>Grado actual</span>
                </div>
                <div className="leyenda-chip">
                    <span className="leyenda-color" style={{ background: COLORES_INFERIORES.distancia1 }} />
                    <span>1 grado inferior</span>
                </div>
                <div className="leyenda-chip">
                    <span className="leyenda-color" style={{ background: COLORES_INFERIORES.distancia2 }} />
                    <span>2 grados inferiores</span>
                </div>
            </div>
        </div>
    );
}

export default GraficoBarrasUnidades;