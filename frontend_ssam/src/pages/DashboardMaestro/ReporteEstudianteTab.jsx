// frontend_ssam/src/pages/DashboardMaestro/ReporteEstudianteTab.jsx
// ============================================================
// REPORTE POR ESTUDIANTE · Detalle individual
// ============================================================

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, User, Info } from 'lucide-react';
import api from '../../api/axios';
import {
    getRubrica,
    fmt,
    COLOR_SIN_EVALUAR,
} from '../../utils/rubrica';

function ReporteEstudianteTab({ idClase }) {
    const [loadingEst, setLoadingEst] = useState(true);
    const [errorEst, setErrorEst] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [idSeleccionado, setIdSeleccionado] = useState('');

    const [loadingDetalle, setLoadingDetalle] = useState(false);
    const [errorDetalle, setErrorDetalle] = useState('');
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        if (!idClase) return;
        cargarEstudiantes();
    }, [idClase]);

    const cargarEstudiantes = async () => {
        setLoadingEst(true);
        setErrorEst('');
        try {
            const res = await api.get(`/clases/${idClase}/estudiantes`);
            if (res.data.success) {
                setEstudiantes(res.data.data.estudiantes || []);
            } else {
                setErrorEst(
                    res.data.message || 'Error al cargar estudiantes'
                );
            }
        } catch (err) {
            console.error('Error al cargar estudiantes:', err);
            setErrorEst(
                err.response?.data?.message ||
                    'Error al conectar con el servidor'
            );
        } finally {
            setLoadingEst(false);
        }
    };

    useEffect(() => {
        if (!idSeleccionado) {
            setDetalle(null);
            return;
        }
        cargarDetalle(idSeleccionado);
    }, [idSeleccionado]);

    const cargarDetalle = async (idEst) => {
        setLoadingDetalle(true);
        setErrorDetalle('');
        try {
            const res = await api.get(
                `/clases/${idClase}/estadisticas/estudiante/${idEst}`
            );
            if (res.data.success) {
                setDetalle(res.data.data);
            } else {
                setErrorDetalle(
                    res.data.message || 'Error al cargar el detalle'
                );
            }
        } catch (err) {
            console.error('Error al cargar detalle:', err);
            setErrorDetalle(
                err.response?.data?.message ||
                    'Error al conectar con el servidor'
            );
        } finally {
            setLoadingDetalle(false);
        }
    };

    if (loadingEst) {
        return (
            <div className="ec-tab-loading">
                <Loader2 className="dm-spin" size={24} />
                <p>Cargando estudiantes...</p>
            </div>
        );
    }

    if (errorEst) {
        return (
            <div className="ec-tab-error">
                <AlertCircle size={20} />
                <p>{errorEst}</p>
            </div>
        );
    }

    if (estudiantes.length === 0) {
        return (
            <div className="ec-empty">
                <Info size={28} />
                <p className="ec-empty__title">
                    No hay estudiantes inscritos
                </p>
                <p className="ec-empty__text">
                    Cuando se inscriban estudiantes podrás ver su rendimiento
                    individual aquí.
                </p>
            </div>
        );
    }

    return (
        <div className="ec-estudiante-wrapper">
            <div className="ec-est-selector">
                <label className="ec-est-selector__label">
                    <User size={16} />
                    Selecciona un estudiante
                </label>
                <select
                    className="ec-est-selector__select"
                    value={idSeleccionado}
                    onChange={(e) => setIdSeleccionado(e.target.value)}
                >
                    <option value="">— Elegir estudiante —</option>
                    {estudiantes.map((e) => (
                        <option key={e.id_usuario} value={e.id_usuario}>
                            {e.apellido1} {e.apellido2 || ''}, {e.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {!idSeleccionado && (
                <div className="ec-est-empty">
                    <User size={36} />
                    <p>Elige un estudiante para ver su rendimiento</p>
                </div>
            )}

            {idSeleccionado && loadingDetalle && (
                <div className="ec-tab-loading">
                    <Loader2 className="dm-spin" size={24} />
                    <p>Cargando rendimiento...</p>
                </div>
            )}

            {idSeleccionado && errorDetalle && (
                <div className="ec-tab-error">
                    <AlertCircle size={20} />
                    <p>{errorDetalle}</p>
                </div>
            )}

            {idSeleccionado && detalle && !loadingDetalle && (
                <div className="ec-est-detalle">
                    {/* Card resumen */}
                    <div className="ec-est-resumen">
                        <div className="ec-est-resumen__avatar">
                            {detalle.estudiante.nombre?.[0]}
                            {detalle.estudiante.apellido1?.[0]}
                        </div>
                        <div className="ec-est-resumen__info">
                            <h3 className="ec-est-resumen__name">
                                {detalle.estudiante.nombre}{' '}
                                {detalle.estudiante.apellido1}{' '}
                                {detalle.estudiante.apellido2 || ''}
                            </h3>
                            <p className="ec-est-resumen__sub">
                                Rendimiento general
                            </p>
                        </div>
                        <div className="ec-est-resumen__promedio">
                            <span className="ec-est-resumen__promedio-label">
                                Promedio
                            </span>
                            <span
                                className="ec-est-resumen__promedio-value"
                                style={{
                                    color: getRubrica(
                                        detalle.promedio_general
                                    ).color,
                                }}
                            >
                                {fmt(detalle.promedio_general)}
                            </span>
                            <span className="ec-est-resumen__promedio-nivel">
                                {getRubrica(detalle.promedio_general).nivel}
                            </span>
                        </div>
                    </div>

                    {/* Cards por unidad */}
                    <div className="ec-est-unidades">
                        {detalle.unidades.map((u) => {
                            const rub = getRubrica(u.promedio_unidad);
                            return (
                                <div
                                    key={u.id_unid_tem}
                                    className="ec-est-unidad-card"
                                >
                                    <div className="ec-est-unidad-card__head">
                                        <div>
                                            <h4 className="ec-est-unidad-card__title">
                                                {u.nombreUT}
                                            </h4>
                                            <span className="ec-est-unidad-card__meta">
                                                {u.intentos}{' '}
                                                {u.intentos === 1
                                                    ? 'intento'
                                                    : 'intentos'}
                                            </span>
                                        </div>
                                        <div
                                            className="ec-est-unidad-card__prom"
                                            style={{
                                                background: `${rub.color}22`,
                                                color: rub.color,
                                                borderColor: rub.color,
                                            }}
                                        >
                                            {fmt(u.promedio_unidad)}
                                        </div>
                                    </div>

                                    <div className="ec-est-unidad-card__grid">
                                        {u.preguntas.map((p) => {
                                            const r = getRubrica(p.promedio);
                                            const bg =
                                                p.promedio !== null &&
                                                p.promedio !== undefined
                                                    ? `${r.color}cc`
                                                    : `${COLOR_SIN_EVALUAR}33`;
                                            return (
                                                <div
                                                    key={p.id_pregunta}
                                                    className="ec-est-preg"
                                                    style={{ background: bg }}
                                                    title={`Item: ${
                                                        p.nombreItem || '—'
                                                    }\nPromedio: ${
                                                        p.promedio !== null
                                                            ? `${p.promedio}%`
                                                            : 'Sin evaluar'
                                                    }\nIntentos: ${
                                                        p.intentos
                                                    }`}
                                                >
                                                    <span className="ec-est-preg__num">
                                                        P{p.numero}
                                                    </span>
                                                    <span className="ec-est-preg__val">
                                                        {p.promedio !== null
                                                            ? Math.round(
                                                                  p.promedio
                                                              )
                                                            : '—'}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReporteEstudianteTab;