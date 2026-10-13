// frontend_ssam/src/pages/DashboardMaestro/ReporteClaseTab.jsx
// ============================================================
// REPORTE DE CLASE · Matriz de rúbrica (mapa de calor)
// Filas = Unidades Temáticas · Columnas agrupadas por ÍTEM
// Cada ítem ocupa N columnas (N = cantidad de preguntas del ítem)
// Dentro de cada celda: promedio del ÍTEM
// ============================================================

import { useState, useEffect, useMemo } from 'react';
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
                // Filtrar unidades tipo "Laboratorio"
                const unidadesFiltradas = (res.data.data.unidades || []).filter(
                    (u) => !u.nombreUT.toLowerCase().includes('laboratorio')
                );

                const idsValidos = new Set(
                    unidadesFiltradas.map((u) => u.id_unid_tem)
                );
                const celdasFiltradas = (res.data.data.celdas || []).filter(
                    (c) => idsValidos.has(c.id_unid_tem)
                );

                setUnidades(unidadesFiltradas);
                setCeldas(celdasFiltradas);
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

    // ============================================================
    // AGRUPAR CELDAS POR UNIDAD → ÍTEM
    // Devuelve: { [id_unid_tem]: [ { id_item, nombreItem, celdas[] }, ... ] }
    // ============================================================
    const itemsPorUnidad = useMemo(() => {
        const mapa = {};

        celdas.forEach((c) => {
            if (!mapa[c.id_unid_tem]) mapa[c.id_unid_tem] = {};

            if (!mapa[c.id_unid_tem][c.id_item]) {
                mapa[c.id_unid_tem][c.id_item] = {
                    id_item: c.id_item,
                    nombreItem: c.nombreItem || 'Sin ítem',
                    celdas: [],
                };
            }

            mapa[c.id_unid_tem][c.id_item].celdas.push(c);
        });

        // Ordenar celdas internas por número de pregunta
        Object.values(mapa).forEach((itemsMap) => {
            Object.values(itemsMap).forEach((item) => {
                item.celdas.sort((a, b) => a.numero - b.numero);
            });
        });

        const resultado = {};
        Object.entries(mapa).forEach(([idUnidad, itemsMap]) => {
            resultado[idUnidad] = Object.values(itemsMap);
        });

        return resultado;
    }, [celdas]);

    // ============================================================
    // HELPERS
    // ============================================================
    const calcularPromedioItem = (celdasItem) => {
        const conDatos = celdasItem.filter(
            (c) => c.promedio !== null && c.promedio !== undefined
        );
        if (conDatos.length === 0) return null;
        const suma = conDatos.reduce((acc, c) => acc + Number(c.promedio), 0);
        return Math.round(suma / conDatos.length);
    };

    const buildTooltipItem = (item, nombreUnidad) => {
        const prom = calcularPromedioItem(item.celdas);
        const rub = getRubrica(prom);
        const promTexto = prom !== null ? `${prom}%` : 'Sin evaluar';
        return [
            `Unidad: ${nombreUnidad}`,
            `Ítem: ${item.nombreItem}`,
            `Preguntas: ${item.celdas.length}`,
            `Promedio del ítem: ${promTexto} (${rub.nivel})`,
        ].join('\n');
    };

    // ============================================================
    // RENDER
    // ============================================================
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
                            <th
                                className="ec-matriz__head-items"
                                colSpan={
                                    // El total de columnas = max preguntas entre todas las unidades
                                    Math.max(
                                        ...unidades.map((u) => {
                                            const items = itemsPorUnidad[u.id_unid_tem] || [];
                                            return items.reduce(
                                                (acc, it) => acc + it.celdas.length,
                                                0
                                            );
                                        }),
                                        1
                                    )
                                }
                            >
                                ÍTEMS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {unidades.map((u) => {
                            const items = itemsPorUnidad[u.id_unid_tem] || [];
                            const totalPregsUnidad = items.reduce(
                                (acc, it) => acc + it.celdas.length,
                                0
                            );

                            // Si no hay ítems en la unidad
                            if (items.length === 0) {
                                return (
                                    <tr key={u.id_unid_tem}>
                                        <td className="ec-matriz__unidad">
                                            <span className="ec-matriz__unidad-num">
                                                {u.orden}
                                            </span>
                                            <span className="ec-matriz__unidad-nombre">
                                                {u.nombreUT}
                                            </span>
                                        </td>
                                        <td
                                            className="ec-matriz__celda-vacia"
                                            colSpan={10}
                                        >
                                            Sin ítems registrados
                                        </td>
                                    </tr>
                                );
                            }

                            return (
                                <tr key={u.id_unid_tem}>
                                    <td className="ec-matriz__unidad">
                                        <span className="ec-matriz__unidad-num">
                                            {u.orden}
                                        </span>
                                        <span className="ec-matriz__unidad-nombre">
                                            {u.nombreUT}
                                        </span>
                                    </td>

                                    {items.map((item) => {
                                        const prom = calcularPromedioItem(
                                            item.celdas
                                        );
                                        const rub = getRubrica(prom);
                                        const bg =
                                            prom !== null
                                                ? `${rub.color}cc`
                                                : `${COLOR_SIN_EVALUAR}33`;

                                        return (
                                            <td
                                                key={item.id_item}
                                                className="ec-matriz__celda ec-matriz__celda--item"
                                                colSpan={item.celdas.length}
                                                style={{ background: bg }}
                                                title={buildTooltipItem(
                                                    item,
                                                    u.nombreUT
                                                )}
                                            >
                                                <span className="ec-matriz__celda-valor">
                                                    {prom !== null
                                                        ? `${prom}`
                                                        : '—'}
                                                </span>
                                            </td>
                                        );
                                    })}

                                    {/* Relleno si la unidad tiene menos preguntas que el máximo */}
                                    {totalPregsUnidad < 10 && (
                                        <td
                                            className="ec-matriz__celda-vacia-fill"
                                            colSpan={10 - totalPregsUnidad}
                                        />
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <p className="ec-matriz__hint">
                Pasa el mouse sobre una celda para ver el nombre del ítem y su promedio.
            </p>
            {/* ============================================================ */}
            {/* DETALLE POR UNIDAD E ÍTEM                                    */}
            {/* ============================================================ */}
            <div className="ec-detalle-wrapper">
                <h3 className="ec-detalle__title">Detalle por Unidad e Ítem</h3>

                {unidades.map((u) => {
                    const items = itemsPorUnidad[u.id_unid_tem] || [];

                    // Calcular promedio general de la unidad (promedio de promedios de ítems)
                    const promediosItems = items
                        .map((it) => calcularPromedioItem(it.celdas))
                        .filter((p) => p !== null);

                    const promedioUnidad = promediosItems.length > 0
                        ? Math.round(
                            promediosItems.reduce((acc, p) => acc + p, 0) /
                                promediosItems.length
                        )
                        : null;

                    const rubUnidad = getRubrica(promedioUnidad);

                    return (
                        <div key={u.id_unid_tem} className="ec-detalle-unidad">
                            {/* Header de la unidad */}
                            <div className="ec-detalle-unidad__header">
                                <div className="ec-detalle-unidad__info">
                                    <span className="ec-detalle-unidad__num">{u.orden}</span>
                                    <span className="ec-detalle-unidad__nombre">
                                        {u.nombreUT}
                                    </span>
                                </div>
                                <div
                                    className="ec-detalle-unidad__prom"
                                    style={{ color: rubUnidad.color }}
                                >
                                    <span className="ec-detalle-unidad__prom-valor">
                                        {promedioUnidad !== null
                                            ? `${promedioUnidad}%`
                                            : '—'}
                                    </span>
                                    <span
                                        className="ec-detalle-unidad__prom-nivel"
                                        style={{
                                            background: `${rubUnidad.color}22`,
                                            borderColor: rubUnidad.color,
                                            color: rubUnidad.color,
                                        }}
                                    >
                                        {rubUnidad.nivel}
                                    </span>
                                </div>
                            </div>

                            {/* Tabla de ítems */}
                            {items.length === 0 ? (
                                <p className="ec-detalle-vacio">
                                    Sin ítems registrados
                                </p>
                            ) : (
                                <div className="ec-detalle-items">
                                    {items.map((item) => {
                                        const promItem = calcularPromedioItem(item.celdas);
                                        const rubItem = getRubrica(promItem);

                                        const tooltipItem = [
                                            `Ítem: ${item.nombreItem}`,
                                            `Promedio: ${promItem !== null ? `${promItem}%` : 'Sin evaluar'}`,
                                            `Nivel: ${rubItem.nivel}`,
                                        ].join('\n');

                                        return (
                                            <div
                                                key={item.id_item}
                                                className="ec-detalle-item"
                                                title={tooltipItem}
                                            >
                                                <div className="ec-detalle-item__nombre">
                                                    {item.nombreItem}
                                                </div>
                                                <div className="ec-detalle-item__barra-track">
                                                    <div
                                                        className="ec-detalle-item__barra-fill"
                                                        style={{
                                                            width: `${promItem || 0}%`,
                                                            background: rubItem.color,
                                                        }}
                                                    />
                                                </div>
                                                <div
                                                    className="ec-detalle-item__valor"
                                                    style={{ color: rubItem.color }}
                                                >
                                                    {promItem !== null ? `${promItem}%` : '—'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ReporteClaseTab;