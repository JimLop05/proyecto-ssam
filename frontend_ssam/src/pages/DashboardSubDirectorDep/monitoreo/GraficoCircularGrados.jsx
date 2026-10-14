/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/GraficoCircularGrados.jsx */
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// ============================================================
// Colores por grado:
// - Grado actual (elegido): VERDE
// - Grados inferiores: azules en distintos tonos (más oscuro cuanto más cercano)
// - Grados superiores: gris (raro)
// ============================================================
const COLOR_GRADO_ACTUAL = '#10b981';   // verde
const COLORES_INFERIORES = {
    // Cuanto más cerca al grado actual, más oscuro el azul
    distancia1: '#3b82f6',   // un grado abajo
    distancia2: '#60a5fa',   // dos grados abajo
    distancia3: '#93c5fd',   // tres grados abajo
    distancia4: '#bfdbfe',   // cuatro o más grados abajo
};
const COLOR_SUPERIOR = '#9ca3af';  // gris para grados superiores (raro)

// ============================================================
// Asignar color según grado
// ============================================================
function asignarColor(item, gradoActual, todosLosGrados) {
    if (item.id_grado === gradoActual) {
        return COLOR_GRADO_ACTUAL;
    }
    if (item.id_grado < gradoActual) {
        // Grado inferior
        const distancia = gradoActual - item.id_grado;
        if (distancia === 1) return COLORES_INFERIORES.distancia1;
        if (distancia === 2) return COLORES_INFERIORES.distancia2;
        if (distancia === 3) return COLORES_INFERIORES.distancia3;
        return COLORES_INFERIORES.distancia4;
    }
    // Grado superior (no debería pasar pero por las dudas)
    return COLOR_SUPERIOR;
}

// ============================================================
// Tooltip personalizado
// ============================================================
function TooltipCircular({ active, payload }) {
    if (!active || !payload || !payload.length) return null;

    const d = payload[0].payload;
    const etiqueta = d.es_grado_actual ? 'Grado actual' : 'Grado inferior';

    return (
        <div className="grafico-tooltip">
            <p className="grafico-tooltip__titulo">{d.grado}</p>
            <p
                className="grafico-tooltip__valor"
                style={{ color: payload[0].payload.fill }}
            >
                {d.items} items · {d.porcentaje}%
            </p>
            <p className="grafico-tooltip__detalle">{etiqueta}</p>
        </div>
    );
}

// ============================================================
// Etiqueta dentro/dentro del círculo
// ============================================================
function renderLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Solo mostramos si el % es >= 5% (para que no se amontonen)
    if (percent < 0.05) return null;

    return (
        <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
            fontWeight={700}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
}

// ============================================================
// Componente principal
// ============================================================
function GraficoCircularGrados({ porGrado, gradoActualId, contexto }) {
    if (!porGrado || porGrado.length === 0) {
        return (
            <div className="grafico-card">
                <div className="grafico-card__header">
                    <h3 className="grafico-card__titulo">
                        Distribución de Items por Grado
                    </h3>
                </div>
                <p className="empty-message">Sin items planificados para mostrar.</p>
            </div>
        );
    }

    // Preparar datos con color asignado
    const data = porGrado.map((g) => ({
        ...g,
        fill: asignarColor(g, gradoActualId, porGrado)
    }));

    // Calcular "desfase" = % que NO es del grado actual
    const porcentajeDesfase = data
        .filter((g) => !g.es_grado_actual)
        .reduce((acc, g) => acc + g.porcentaje, 0);

    // Interpretación textual
    let interpretacion = '';
    if (porcentajeDesfase === 0) {
        interpretacion = '✅ Todo el contenido planificado es del grado actual. ¡Al día!';
    } else if (porcentajeDesfase < 15) {
        interpretacion = `⚠️ Desfase leve: ${porcentajeDesfase.toFixed(1)}% del contenido es de grados inferiores.`;
    } else if (porcentajeDesfase < 40) {
        interpretacion = `⚠️ Desfase moderado: ${porcentajeDesfase.toFixed(1)}% del contenido es de grados inferiores.`;
    } else {
        interpretacion = `🚨 Desfase alto: ${porcentajeDesfase.toFixed(1)}% del contenido es de grados inferiores.`;
    }

    return (
        <div className="grafico-card">
            <div className="grafico-card__header">
                <h3 className="grafico-card__titulo">
                    Distribución de Items por Grado — {contexto?.distrito || 'Todos los distritos'}
                </h3>
                <p className="grafico-card__subtitulo">
                    Verde = grado actual · Azules = grados inferiores (más oscuro = más cercano)
                </p>
            </div>

            <div className="grafico-circular-wrapper">
                <ResponsiveContainer width="100%" height={320}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="items"
                            nameKey="grado"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            labelLine={false}
                            label={renderLabel}
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip content={<TooltipCircular />} />
                    </PieChart>
                </ResponsiveContainer>

                {/* Leyenda a la derecha */}
                <div className="grafico-circular-leyenda">
                    {data.map((g, i) => (
                        <div key={i} className="leyenda-item">
                            <span
                                className="leyenda-color"
                                style={{ background: g.fill }}
                            />
                            <div className="leyenda-texto">
                                <span className="leyenda-nombre">{g.grado}</span>
                                <span className="leyenda-valor">
                                    {g.items} items ({g.porcentaje}%)
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grafico-interpretacion">
                {interpretacion}
            </div>
        </div>
    );
}

export default GraficoCircularGrados;