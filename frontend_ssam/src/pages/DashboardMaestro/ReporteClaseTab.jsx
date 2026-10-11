// frontend_ssam/src/pages/DashboardMaestro/ReporteClaseTab.jsx
// ============================================================
// REPORTE DE CLASE · Matriz de rúbrica (mapa de calor)
// Filas = Unidades Temáticas · Columnas = P1..P10
// ============================================================

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Info } from 'lucide-react';
import api from '../../api/axios';
import {
    RUBRICA,
    getRubrica,
    COLOR_SIN_EVALUAR,
} from '../../utils/rubrica';

function ReporteClaseTab({ idClase }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [unidades, setUnidades] = useState([]);
    const [celdas, setCeldas] = useState([]);
    const [totalPreguntas, setTotalPreguntas] = useState(10);

    useEffect(() => {
        if (!idClase) return;
        cargarMatriz();
    }, [idClase]);

    const cargarMatriz = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get(
                `/clases/${idClase}/estadisticas/matriz`
            );
            if (res.data.success) {
                setUnidades(res.data.data.unidades || []);
                setCeldas(res.data.data.celdas || []);
                setTotalPreguntas(
                    res.data.data.total_preguntas_por_unidad || 10
                );
            } else {
                setError(res.data.message || 'Error al cargar la matriz');
            }
        } catch (err) {
            console.error('Error al cargar matriz:', err);
            setError(
                err.response?.data?.message ||
                    'Error al conectar con el servidor'
            );
        } finally {
            setLoading(false);
        }
    };

    const getCelda = (idUnidad, numero) => {
        return celdas.find(
            (c) => c.id_unid_tem === idUnidad && c.numero === numero
        );
    };

    const buildTooltip = (celda, nombreUnidad) => {
        if (!celda) return '';
        const rub = getRubrica(celda.promedio);
        const prom =
            celda.promedio !== null && celda.promedio !== undefined
                ? `${celda.promedio}%`
                : 'Sin evaluar';
        return [
            `Unidad: ${nombreUnidad}`,
            `Item: ${celda.nombreItem || '—'}`,
            `Pregunta ${celda.numero}`,
            `Promedio: ${prom} (${rub.nivel})`,
            `Intentos: ${celda.intentos}`,
        ].join('\n');
    };

    if (loading) {
        return (
            <div className="ec-tab-loading">
                <Loader2 className="dm-spin" size={24} />
                <p>Cargando matriz...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ec-tab-error">
                <AlertCircle size={20} />
                <p>{error}</p>
            </div>
        );
    }

    if (unidades.length === 0) {
        return (
            <div className="ec-empty">
                <Info size={28} />
                <p className="ec-empty__title">
                    Sin unidades temáticas configuradas
                </p>
                <p className="ec-empty__text">
                    Asegúrate de tener unidades creadas para este grado y
                    asignatura.
                </p>
            </div>
        );
    }

    const columnas = Array.from({ length: totalPreguntas }, (_, i) => i + 1);

    return (
        <div className="ec-matriz-wrapper">
            {/* ===== LEYENDA ===== */}
            <div className="ec-leyenda">
                <span className="ec-leyenda__title">Rúbrica:</span>
                {RUBRICA.map((r) => (
                    <span
                        key={r.clase}
                        className="ec-leyenda__chip"
                        style={{
                            background: `${r.color}22`,
                            borderColor: r.color,
                            color: r.color,
                        }}
                    >
                        <span
                            className="ec-leyenda__dot"
                            style={{ background: r.color }}
                        />
                        {r.nivel} ({r.min}–{r.max})
                    </span>
                ))}
                <span
                    className="ec-leyenda__chip"
                    style={{
                        background: `${COLOR_SIN_EVALUAR}22`,
                        borderColor: COLOR_SIN_EVALUAR,
                        color: COLOR_SIN_EVALUAR,
                    }}
                >
                    <span
                        className="ec-leyenda__dot"
                        style={{ background: COLOR_SIN_EVALUAR }}
                    />
                    Sin evaluar
                </span>
            </div>

            {/* ===== MATRIZ ===== */}
            <div className="ec-matriz-scroll">
                <table className="ec-matriz">
                    <thead>
                        <tr>
                            <th className="ec-matriz__head-unidad">
                                Unidad Temática
                            </th>
                            {columnas.map((n) => (
                                <th key={n} className="ec-matriz__head-preg">
                                    P{n}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {unidades.map((u) => (
                            <tr key={u.id_unid_tem}>
                                <td className="ec-matriz__unidad">
                                    <span className="ec-matriz__unidad-num">
                                        {u.orden}
                                    </span>
                                    <span className="ec-matriz__unidad-nombre">
                                        {u.nombreUT}
                                    </span>
                                </td>

                                {columnas.map((n) => {
                                    const celda = getCelda(u.id_unid_tem, n);
                                    const rub = getRubrica(
                                        celda?.promedio ?? null
                                    );
                                    const bg =
                                        celda?.promedio !== null &&
                                        celda?.promedio !== undefined
                                            ? `${rub.color}cc`
                                            : `${COLOR_SIN_EVALUAR}33`;

                                    return (
                                        <td
                                            key={n}
                                            className="ec-matriz__celda"
                                            style={{ background: bg }}
                                            title={buildTooltip(
                                                celda,
                                                u.nombreUT
                                            )}
                                        >
                                            <span className="ec-matriz__celda-valor">
                                                {celda?.promedio !== null &&
                                                celda?.promedio !== undefined
                                                    ? Math.round(
                                                          celda.promedio
                                                      )
                                                    : '—'}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="ec-matriz__hint">
                💡 Pasa el mouse sobre una celda para ver el ítem y el
                detalle del promedio.
            </p>
        </div>
    );
}

export default ReporteClaseTab;