/* frontend_ssam/src/pages/DashboardEstudiante/PreguntasUnidad.jsx */
// ============================================================
// EXAMEN DE UNA UNIDAD (estilo Kahoot)
// - Carga preguntas desde el backend
// - Muestra una por una con temporizador
// - Mezcla las opciones en cada render
// - Al enviar, registra el intento
// ============================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import api from '../../api/axios';
import './PreguntasUnidad.css';

// Mezcla un array (Fisher-Yates)
const mezclar = (arr) => {
    const copia = [...arr];
    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
};

function PreguntasUnidad({ unidad, clase, volver }) {
    // ============ ESTADOS ============
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [preguntas, setPreguntas] = useState([]);
    const [idEvaluacion, setIdEvaluacion] = useState(null);

    // Preguntas ya mezcladas (una sola vez al cargar)
    const [preguntasMezcladas, setPreguntasMezcladas] = useState([]);

    // Índice de la pregunta actual
    const [indiceActual, setIndiceActual] = useState(0);

    // Respuestas: { [id_pregunta]: { id_opcion, estado: 'correcta'|'incorrecta'|'timeout' } }
    const [respuestas, setRespuestas] = useState({});

    // Temporizador
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const timerRef = useRef(null);

    // Estado de envío
    const [enviando, setEnviando] = useState(false);
    const [resultado, setResultado] = useState(null);

    // Bloquea clicks después de responder
    const [bloqueado, setBloqueado] = useState(false);
    // Detalle de corrección por pregunta (solo después de enviar)
    const [detalleCorreccion, setDetalleCorreccion] = useState({});

    // ============ CARGA INICIAL ============
    useEffect(() => {
        cargarPreguntas();
        return () => clearInterval(timerRef.current);
    }, []);

    const cargarPreguntas = async () => {
        try {
            const res = await api.get(
                `/estudiante/unidad/${unidad.id_unid_tem}/preguntas?id_clase=${clase.id_clase}`
            );

            if (!res.data.success) {
                setError(res.data.message || 'Error al cargar preguntas');
                return;
            }

            const data = res.data.data;
            setIdEvaluacion(data.id_evaluacion);
            setPreguntas(data.preguntas);

            // Mezclar preguntas Y opciones UNA VEZ (cada intento es distinto)
            const mezcladas = mezclar(data.preguntas).map((p) => ({
                ...p,
                opciones: mezclar(p.opciones),
            }));
            setPreguntasMezcladas(mezcladas);

            // Iniciar temporizador de la primera pregunta
            if (mezcladas.length > 0) {
                setTiempoRestante(mezcladas[0].tiempo_limite_segundos || 30);
            }
        } catch (err) {
            console.error('Error al cargar preguntas:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // ============ TEMPORIZADOR ============
    const iniciarTimer = useCallback((segundos) => {
        clearInterval(timerRef.current);
        setTiempoRestante(segundos);

        timerRef.current = setInterval(() => {
            setTiempoRestante((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    // Si llega a 0 → auto-avanzar (timeout)
    useEffect(() => {
        if (tiempoRestante === 0 && !bloqueado && preguntasMezcladas.length > 0) {
            const preguntaActual = preguntasMezcladas[indiceActual];
            if (preguntaActual && !respuestas[preguntaActual.id_pregunta]) {
                manejarTimeout(preguntaActual);
            }
        }
    }, [tiempoRestante]);

    // Cuando cambia la pregunta actual → reiniciar timer
    useEffect(() => {
        if (!loading && preguntasMezcladas.length > 0 && !resultado) {
            const p = preguntasMezcladas[indiceActual];
            if (p) {
                setBloqueado(false);
                iniciarTimer(p.tiempo_limite_segundos || 30);
            }
        }
    }, [indiceActual, loading, preguntasMezcladas]);

    // ============ HANDLERS ============
    const manejarTimeout = (pregunta) => {
        setBloqueado(true);
        setRespuestas((prev) => ({
            ...prev,
            [pregunta.id_pregunta]: {
                id_opcion: null,
                estado: 'timeout',
            },
        }));
        // Avanzar en 800ms para que se vea el efecto
        setTimeout(() => avanzarSiguiente(), 800);
    };

    const manejarClickOpcion = (opcion) => {
        if (bloqueado) return;
        setBloqueado(true);
        clearInterval(timerRef.current);

        const pregunta = preguntasMezcladas[indiceActual];

        // Guardamos en memoria — no sabemos si es correcta (backend valida)
        setRespuestas((prev) => ({
            ...prev,
            [pregunta.id_pregunta]: {
                id_opcion: opcion.id_opcion,
                estado: 'respondida',
            },
        }));

        // Avanzar en 400ms para dar feedback visual
        setTimeout(() => avanzarSiguiente(), 400);
    };

   const avanzarSiguiente = () => {
        setIndiceActual((prev) => {
            // Si ya estamos en la última pregunta, NO avanzar
            if (prev >= preguntasMezcladas.length - 1) {
                return prev;
            }
            return prev + 1;
        });
    };

    // ============ ENVIAR INTENTO ============
    const enviarIntento = async () => {
        setEnviando(true);
        try {
            // Construir array de respuestas
            const respuestasArray = preguntasMezcladas.map((p) => {
                const r = respuestas[p.id_pregunta];
                return {
                    id_pregunta: p.id_pregunta,
                    id_opcion: r?.id_opcion || null,
                };
            });

            const res = await api.post(
                `/estudiante/unidad/${unidad.id_unid_tem}/enviar-intento`,
                {
                    id_clase: clase.id_clase,
                    respuestas: respuestasArray,
                }
            );

                        if (res.data.success) {
                setResultado(res.data.data);
            // 👈 NUEVO: guardar el detalle de corrección por pregunta
            if (res.data.data.detalle) {
                    const detalleMap = {};
                    res.data.data.detalle.forEach((d) => {
                        detalleMap[d.id_pregunta] = d.es_correcta;
                    });
                    setDetalleCorreccion(detalleMap);
                }
            } else {
                setError(res.data.message || 'Error al enviar el intento');
            }
        } catch (err) {
            console.error('Error al enviar intento:', err);
            setError(err.response?.data?.message || 'Error al enviar el intento');
        } finally {
            setEnviando(false);
        }
    };

    const reintentar = () => {
        setResultado(null);
        setRespuestas({});
        setDetalleCorreccion({}); // 👈 NUEVO
        setIndiceActual(0);
        setError('');
        setLoading(true);
        cargarPreguntas();
    };

    // ============ RENDER ============
    if (!unidad) {
        return (
            <div className="section">
                <p className="empty-message">No se seleccionó ninguna unidad.</p>
                <button className="btn-volver" onClick={volver}>← Volver</button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="section">
                <p className="empty-message">Cargando preguntas...</p>
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

    // ===== VISTA DE RESULTADO =====
    if (resultado) {
        const aprobado = resultado.nota_unidad_tematica >= 51;
        return (
            <div className="resultado-container">
                <div className={`resultado-card ${aprobado ? 'aprobado' : 'reprobado'}`}>
                    <div className="resultado-icono">
                        {aprobado ? '🎉' : '😢'}
                    </div>
                    <h2>{aprobado ? '¡Aprobado!' : 'No aprobado'}</h2>
                    <p className="resultado-unidad">{unidad.nombreut}</p>

                    <div className="resultado-stats">
                        <div className="stat-item">
                            <span className="stat-label">Correctas</span>
                            <span className="stat-valor">
                                {resultado.nro_respuestas_correctas} / {resultado.total_preguntas}
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Nota</span>
                            <span className="stat-valor">{resultado.nota_unidad_tematica}%</span>
                        </div>
                    </div>

                    <div className="resultado-acciones">
                        <button className="btn-reintentar" onClick={reintentar}>
                            🔄 Reintentar
                        </button>
                        <button className="btn-volver-clase" onClick={volver}>
                            ← Volver a la clase
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ===== VISTA DEL EXAMEN =====
    const preguntaActual = preguntasMezcladas[indiceActual];
    const total = preguntasMezcladas.length;

    // Detectar si estamos en la última pregunta y ya fue respondida
    const esUltima = indiceActual === total - 1;
    const ultimaRespondida =
        esUltima && respuestas[preguntaActual?.id_pregunta];

    // Porcentaje de tiempo para la barra
    const tiempoTotal = preguntaActual?.tiempo_limite_segundos || 30;
    const porcentajeTiempo = (tiempoRestante / tiempoTotal) * 100;

    return (
        <div className="preguntas-unidad-container">
            {/* HEADER */}
            <div className="preguntas-header">
                <div className="preguntas-header-left">
                    <button className="btn-volver" onClick={volver}>
                        ← Volver a la clase
                    </button>
                    <h2>📝 {unidad.nombreut}</h2>
                    <p className="preguntas-subtitulo">
                        {clase?.nombrec} · {clase?.asignatura} · {clase?.grado}
                    </p>
                </div>

                <div className={`preguntas-timer ${tiempoRestante <= 5 ? 'peligro' : ''}`}>
                    <span className="timer-label">⏱ Tiempo</span>
                    <span className="timer-valor">{tiempoRestante}s</span>
                </div>
            </div>

            {/* BARRA DE PROGRESO - Gráfico tipo Kahoot */}
            <div className="progreso-preguntas">
                {preguntasMezcladas.map((p, i) => {
                    const r = respuestas[p.id_pregunta];
                    let claseCirculo = 'pendiente';

                    // Si ya se envió el intento → usar el detalle de corrección
                    if (resultado && detalleCorreccion[p.id_pregunta] !== undefined) {
                        if (detalleCorreccion[p.id_pregunta]) {
                            claseCirculo = 'correcta';
                        } else if (r?.estado === 'timeout') {
                            claseCirculo = 'timeout';
                        } else {
                            claseCirculo = 'incorrecta';
                        }
                    } else if (r) {
                        // Durante el examen: no sabemos si es correcta
                        if (r.estado === 'timeout') claseCirculo = 'timeout';
                        else if (r.estado === 'respondida') claseCirculo = 'respondida';
                    }

                    if (i === indiceActual && !resultado) claseCirculo += ' actual';

                    return (
                        <div key={p.id_pregunta} className={`circulo-progreso ${claseCirculo}`}>
                            {i + 1}
                        </div>
                    );
                })}
            </div>

            {/* BARRA DE TIEMPO */}
            <div className="barra-tiempo">
                <div
                    className={`barra-tiempo-fill ${tiempoRestante <= 5 ? 'peligro' : ''}`}
                    style={{ width: `${porcentajeTiempo}%` }}
                />
            </div>

            {/* PREGUNTA ACTUAL */}
            <div className="pregunta-card">
                <div className="pregunta-numero">
                    Pregunta {indiceActual + 1} de {total}
                </div>
                <h3 className="pregunta-texto">{preguntaActual.descripcion}</h3>
                {preguntaActual.imagen && (
                    <img
                        src={preguntaActual.imagen}
                        alt="Pregunta"
                        className="pregunta-imagen"
                    />
                )}
            </div>

            {/* OPCIONES */}
            <div className="opciones-grid">
                {preguntaActual.opciones.map((op, i) => {
                    const letras = ['A', 'B', 'C', 'D'];
                    const r = respuestas[preguntaActual.id_pregunta];
                    const seleccionada = r?.id_opcion === op.id_opcion;

                    return (
                        <button
                            key={op.id_opcion}
                            className={`opcion-btn ${seleccionada ? 'seleccionada' : ''}`}
                            onClick={() => manejarClickOpcion(op)}
                            disabled={bloqueado}
                        >
                            <span className="opcion-letra">{letras[i] || i + 1}</span>
                            <span className="opcion-texto">{op.texto}</span>
                        </button>
                    );
                })}
            </div>

            {/* BOTÓN ENVIAR (solo en la última pregunta ya respondida) */}
            {ultimaRespondida && (
                <div className="acciones-finales">
                    <button
                        className="btn-enviar"
                        onClick={enviarIntento}
                        disabled={enviando}
                    >
                        {enviando ? 'Enviando...' : '📤 Enviar intento'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default PreguntasUnidad;