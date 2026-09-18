/* frontend_ssam/src/pages/DashboardEstudiante/DebugPreguntas.jsx */
// ============================================================
// COMPONENTE TEMPORAL DE DEBUG
// Muestra TODAS las preguntas o TODAS las respuestas de una clase
// BORRAR CUANDO YA NO SE NECESITE
// ============================================================

import { useState, useEffect } from 'react';
import api from '../../api/axios';
import './DebugPreguntas.css';
import MathText from '../../components/MathText';

function DebugPreguntas({ idClase, tipo = 'preguntas', volver }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        cargar();
    }, [idClase, tipo]);

    const cargar = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get(`/estudiante/clase/${idClase}/debug-todo`);
            if (res.data.success) {
                setData(res.data.data);
            } else {
                setError(res.data.message || 'Error al cargar');
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Error al conectar');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="section">
                <p className="empty-message">Cargando datos de debug...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section">
                <div className="section-header">
                    <h2>❌ Error</h2>
                    <button className="btn-volver" onClick={volver}>← Volver</button>
                </div>
                <p className="empty-message">{error}</p>
            </div>
        );
    }

    const titulo = tipo === 'preguntas'
        ? `🔍 DEBUG — Todas las Preguntas`
        : `🔍 DEBUG — Todas las Respuestas`;

    return (
        <div className="debug-container">
            <div className="debug-header">
                <button className="btn-volver" onClick={volver}>← Volver a la clase</button>
                <h2>{titulo}</h2>
                <p className="debug-subtitulo">
                    Clase: <strong>{data.clase.nombrec}</strong> · 
                    Unidades: {data.total_unidades} · 
                    Preguntas: {data.total_preguntas} · 
                    Opciones: {data.total_opciones}
                </p>
                <p className="debug-aviso">
                    ⚠️ Texto CRUDO (sin render). Busca `\\` dobles o `$` sin cerrar.
                </p>
            </div>

            {data.unidades.map((unidad) => (
                <div key={unidad.id_unid_tem} className="debug-unidad-bloque">
                    <div className="debug-unidad-titulo">
                        📘 <strong>{unidad.nombreut}</strong>
                        <span className="debug-unidad-id">id: {unidad.id_unid_tem}</span>
                        <span className="debug-unidad-count">
                            {unidad.preguntas.length} preguntas
                        </span>
                    </div>

                    {/* VISTA PREGUNTAS */}
                    {tipo === 'preguntas' && unidad.preguntas.map((p, i) => (
                        <div key={p.id_pregunta} className="debug-item">
                            <div className="debug-item-header">
                                <span className="debug-numero">#{i + 1}</span>
                                <span className="debug-id">id_pregunta: {p.id_pregunta}</span>
                                <span className="debug-id">id_item: {p.id_item}</span>
                                <span className="debug-tiempo">⏱ {p.tiempo_limite_segundos || '—'}s</span>
                            </div>
                            <div className="debug-texto-render">
                                <MathText>{p.descripcion}</MathText>
                            </div>
                            <div className="debug-texto-crudo">
                                <small>RAW:</small> {p.descripcion}
                            </div>
                        </div>
                    ))}

                    {/* VISTA RESPUESTAS */}
                    {tipo === 'respuestas' && unidad.preguntas.map((p, i) => (
                        <div key={p.id_pregunta} className="debug-item">
                            <div className="debug-item-header">
                                <span className="debug-numero">#{i + 1}</span>
                                <span className="debug-id">id_pregunta: {p.id_pregunta}</span>
                            </div>

                            <div className="debug-pregunta-ref">
                                <strong>Pregunta (render):</strong>
                                <div className="debug-render-line">
                                    <MathText>{p.descripcion}</MathText>
                                </div>
                                <div className="debug-crudo-line">
                                    <small>RAW:</small> {p.descripcion}
                                </div>
                            </div>

                            <div className="debug-opciones-lista">
                                {p.opciones.map((op) => (
                                    <div
                                        key={op.id_opcion}
                                        className={`debug-opcion-item ${op.es_correcta ? 'correcta' : ''}`}
                                    >
                                        <span className="debug-opcion-id">id_opcion: {op.id_opcion}</span>
                                        <span className="debug-opcion-texto">
                                            <MathText>{op.texto}</MathText>
                                            <br />
                                            <small style={{ color: '#999', fontSize: '11px' }}>
                                                RAW: {op.texto}
                                            </small>
                                        </span>
                                        <span className={`debug-opcion-flag ${op.es_correcta ? 'ok' : ''}`}>
                                            {op.es_correcta ? '✅' : '❌'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {unidad.preguntas.length === 0 && (
                        <p className="debug-sin-preguntas">Esta unidad no tiene preguntas.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default DebugPreguntas;