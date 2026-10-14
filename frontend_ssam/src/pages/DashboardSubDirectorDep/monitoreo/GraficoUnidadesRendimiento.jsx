/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/GraficoUnidadesRendimiento.jsx */
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
import { getRubrica, fmt } from '../../../utils/rubrica';

// ============================================================
// Utilidad: acortar nombre de unidad temática para el eje X
// ============================================================
function truncar(texto, max = 22) {
    if (!texto) return '';
    return texto.length > max ? texto.slice(0, max).trim() + '…' : texto;
}

// ============================================================
// Tooltip personalizado al pasar el mouse sobre una barra
// ============================================================
function TooltipCustom({ active, payload }) {
    if (!active || !payload || !payload.length) return null;

    const d = payload[0].payload;
    const rub = getRubrica(d.promedio);

    return (
        <div className="grafico-tooltip">
            <p className="grafico-tooltip__titulo">{d.nombre}</p>
            {d.promedio !== null ? (
                <>
                    <p className="grafico-tooltip__valor" style={{ color: rub.color }}>
                        {fmt(d.promedio)}
                        <span className="grafico-tooltip__nivel"> · {rub.nivel}</span>
                    </p>
                    <p className="grafico-tooltip__detalle">
                        {d.total_items} items · {d.total_respuestas} respuestas
                    </p>
                </>
            ) : (
                <p className="grafico-tooltip__vacio">Sin datos</p>
            )}
        </div>
    );
}

// ============================================================
// Componente principal
// ============================================================
function GraficoUnidadesRendimiento({ unidades, promedioGeneral, contexto }) {
    if (!unidades || unidades.length === 0) {
        return (
            <div className="placeholder-panel">
                <p>No hay unidades temáticas para mostrar.</p>
            </div>
        );
    }

    // Preparamos los datos con etiqueta corta
    const data = unidades.map((u, i) => ({
        ...u,
        etiqueta: `U${i + 1}`
    }));

    return (
        <div className="grafico-card">
            <div className="grafico-card__header">
                <h3 className="grafico-card__titulo">
                     Promedio por Unidad Temática — {contexto?.distrito || 'Todos los distritos'}
                </h3>
            </div>

            <div className="grafico-wrapper">
                <ResponsiveContainer width="100%" height={340}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#eaecf0" vertical={false} />
                        <XAxis
                            dataKey="etiqueta"
                            tick={{ fontSize: 12, fill: '#667085' }}
                            axisLine={{ stroke: '#d0d5dd' }}
                            tickLine={false}
                            interval={0}
                            angle={-30}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            tick={{ fontSize: 12, fill: '#667085' }}
                            axisLine={false}
                            tickLine={false}
                            label={{
                                value: '% Aciertos',
                                angle: -90,
                                position: 'insideLeft',
                                style: { fontSize: 12, fill: '#667085' }
                            }}
                        />
                        <Tooltip
                            content={<TooltipCustom />}
                            cursor={{ fill: 'rgba(124, 58, 237, 0.05)' }}
                        />

                        {/* Línea horizontal con el promedio general */}
                        {promedioGeneral !== null && (
                            <ReferenceLine
                                y={promedioGeneral}
                                stroke="#7c3aed"
                                strokeDasharray="4 4"
                                strokeWidth={1.5}
                                label={{
                                    value: `Prom. general: ${fmt(promedioGeneral)}`,
                                    position: 'insideTopRight',
                                    fill: '#7c3aed',
                                    fontSize: 11,
                                    fontWeight: 600
                                }}
                            />
                        )}

                        <Bar dataKey="promedio" radius={[6, 6, 0, 0]} maxBarSize={56}>
                            {data.map((entry, i) => {
                                const rub = getRubrica(entry.promedio);
                                return <Cell key={i} fill={rub.color} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default GraficoUnidadesRendimiento;