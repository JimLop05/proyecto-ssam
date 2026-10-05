// frontend_ssam/src/pages/DashboardMaestro/PlanificacionGestion.jsx
// ============================================================
// PLANIFICACIÓN DE GESTIÓN
// Drag & drop de items a semanas del trimestre
// ============================================================

import { useState, useEffect, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
    ClipboardList,
    ChevronRight,
    ChevronDown,
    ArrowLeft,
    Calendar,
    BookOpen,
    Package,
    Target,
    X,
    Save,
    Eye,
    CheckCircle2,
    AlertCircle,
    Loader2,
    GripVertical,
    School,
    Lock,
    Trash2,
} from 'lucide-react';
import './PlanificacionGestion.css';
import VistaPlanificacion from './VistaPlanificacion';
import ConfirmModal from '../../components/ui/ConfirmModal';

// ============================================================
// TOAST
// ============================================================
const Toast = ({ toast }) => {
    if (!toast) return null;
    const isSuccess = toast.tipo === 'exito';
    return (
        <div className={`pg-toast pg-toast--${isSuccess ? 'success' : 'error'}`}>
            {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.mensaje}</span>
        </div>
    );
};

// ============================================================
// ITEM ARRASTRABLE
// ============================================================
const DraggableItem = ({ item, semanasAsignadas, onBlockedAttempt }) => {
    const cantidadSemanas = semanasAsignadas.length;
    const estaBloqueado = cantidadSemanas >= 2;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id: item.id_item, nombre: item.nombreitem },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
        canDrag: !estaBloqueado,
    }));

    let claseEstado = 'disponible';
    if (cantidadSemanas === 1) claseEstado = 'una-semana';
    if (cantidadSemanas === 2) claseEstado = 'dos-semanas';

    const handlePointerDown = () => {
        if (estaBloqueado) {
            onBlockedAttempt?.(
                `"${item.nombreitem}" ya está en 2 semanas (S${semanasAsignadas.join(
                    ', S'
                )}). Quita una para poder moverlo.`
            );
        }
    };

    const titleText = estaBloqueado
        ? `Ya asignado a S${semanasAsignadas.join(' y S')} — máximo 2 semanas.`
        : 'Arrastra para asignar a una semana';

    return (
        <div
            ref={drag}
            className={`pg-item ${claseEstado} ${
                isDragging ? 'is-dragging' : ''
            }`}
            style={{ cursor: estaBloqueado ? 'not-allowed' : 'grab' }}
            onPointerDown={handlePointerDown}
            title={titleText}
        >
            {estaBloqueado ? (
                <Lock size={14} className="pg-item__grip" />
            ) : (
                <GripVertical size={14} className="pg-item__grip" />
            )}
            <span className="pg-item__name">{item.nombreitem}</span>

            {cantidadSemanas > 0 && (
                <span className="pg-item__badge">
                    {semanasAsignadas.map((n) => `S${n}`).join(' · ')}
                </span>
            )}
        </div>
    );
};

// ============================================================
// SEMANA (DROP ZONE)
// ============================================================
const SemanaDropZone = ({
    semana,
    itemsAsignados,
    onDropItem,
    onRemoveItem,
    trimestre,
    puedeRecibirItem,
}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item) => onDropItem(item.id, semana.id_semana),
        canDrop: (item) => puedeRecibirItem(item.id, semana.id_semana).ok,
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    const itemsDeSemana = itemsAsignados[semana.id_semana] || [];
    const isEmpty = itemsDeSemana.length === 0;

    const dropClass =
        isOver && canDrop
            ? 'drop-active'
            : isOver && !canDrop
            ? 'drop-invalid'
            : '';

    const fechaInicio = new Date(semana.dia_inicio).toLocaleDateString(
        'es-ES',
        { day: '2-digit', month: 'short' }
    );
    const fechaFin = new Date(semana.dia_fin).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
    });

    return (
        <div ref={drop} className={`pg-semana ${dropClass}`}>
            <div className="pg-semana__num">
                <span className="pg-semana__num-value">
                    S{semana.numero_semana}
                </span>
                <span className="pg-semana__num-trim">{trimestre}</span>
            </div>

            <div className="pg-semana__dates">
                <Calendar size={12} />
                <span>
                    {fechaInicio} — {fechaFin}
                </span>
            </div>

            <div className="pg-semana__items">
                {isEmpty ? (
                    <span className="pg-semana__empty">
                        Suelta un item aquí
                    </span>
                ) : (
                    itemsDeSemana.map((itemId) => {
                        const item = window.itemsData?.find(
                            (i) => i.id_item === itemId
                        );
                        return (
                            <span key={itemId} className="pg-chip">
                                {item?.nombreitem || 'Item'}
                                <button
                                    className="pg-chip__remove"
                                    onClick={() =>
                                        onRemoveItem(itemId, semana.id_semana)
                                    }
                                    type="button"
                                    aria-label="Quitar"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        );
                    })
                )}
            </div>
        </div>
    );
};

// ============================================================
// HELPER — Color según % de progreso
// ============================================================
function getProgressColor(porcentaje) {
    if (porcentaje === 0) return 'empty';
    if (porcentaje <= 50) return 'low';
    if (porcentaje < 100) return 'mid';
    return 'complete';
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
function PlanificacionGestion({ user, volver }) {
    const [loading, setLoading] = useState(false);
    const [clases, setClases] = useState([]);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);
    const [trimestres, setTrimestres] = useState([]);
    const [unidadesTematicas, setUnidadesTematicas] = useState([]);
    const [items, setItems] = useState([]);
    const [itemsAsignados, setItemsAsignados] = useState({});
    const [planificacionId, setPlanificacionId] = useState(null);
    const [progreso, setProgreso] = useState(0);
    const [totalSemanas, setTotalSemanas] = useState(0);
    const [trimestreActivo, setTrimestreActivo] = useState(null);
    const [unidadActiva, setUnidadActiva] = useState(null);
    const [toast, setToast] = useState(null);
    const [mostrarVista, setMostrarVista] = useState(false);
    const [trimestreParaLimpiar, setTrimestreParaLimpiar] = useState(null);

    // ⭐ Filtro de grado activo en la columna de unidades
    const [gradoFiltroActivo, setGradoFiltroActivo] = useState(null);

    const mostrarToast = (mensaje, tipo = 'exito') => {
        setToast({ mensaje, tipo });
        setTimeout(() => setToast(null), 3200);
    };

    const mapaSemanas = useMemo(() => {
        const mapa = {};
        trimestres.forEach((t) => {
            t.semanas?.forEach((s) => {
                mapa[s.id_semana] = s.numero_semana;
            });
        });
        return mapa;
    }, [trimestres]);

    // ⭐ Grados disponibles (para el tab-bar)
    const gradosDisponibles = useMemo(() => {
        const mapa = {};
        unidadesTematicas.forEach((u) => {
            if (u.id_grado && !mapa[u.id_grado]) {
                mapa[u.id_grado] = {
                    id_grado: u.id_grado,
                    nombre_grado: u.nombre_grado || `Grado ${u.id_grado}`,
                    cantidad: 0,
                };
            }
            if (u.id_grado) mapa[u.id_grado].cantidad++;
        });
        return Object.values(mapa).sort((a, b) => a.id_grado - b.id_grado);
    }, [unidadesTematicas]);

    // ⭐ Unidades filtradas por grado activo
    const unidadesFiltradas = useMemo(() => {
        if (gradoFiltroActivo === null) return unidadesTematicas;
        return unidadesTematicas.filter((u) => u.id_grado === gradoFiltroActivo);
    }, [unidadesTematicas, gradoFiltroActivo]);

    // ⭐ Cuando cambian los grados disponibles, activar el primero por defecto
    useEffect(() => {
        if (gradosDisponibles.length > 0 && gradoFiltroActivo === null) {
            setGradoFiltroActivo(gradosDisponibles[0].id_grado);
        }
    }, [gradosDisponibles, gradoFiltroActivo]);

    useEffect(() => {
        cargarClasesMaestro();
    }, []);

    const cargarClasesMaestro = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:5000/api/planificacion/clases',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                setClases(data.data);
                setClaseSeleccionada(data.data[0]);
                await cargarDatosClase(data.data[0].id_clase);
            } else {
                mostrarToast('No tienes clases asignadas', 'error');
            }
        } catch (error) {
            console.error('Error cargando clases:', error);
            mostrarToast('Error al cargar las clases', 'error');
        } finally {
            setLoading(false);
        }
    };

    const cargarDatosClase = async (idClase) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(
                `http://localhost:5000/api/planificacion/datos-clase/${idClase}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();

            if (data.success) {
                setTrimestres(data.data.trimestres || []);
                if (data.data.trimestres?.length > 0) {
                    setTrimestreActivo(data.data.trimestres[0].id_trimestre);
                }
                setUnidadesTematicas(data.data.unidades || []);
                const allItems = data.data.unidades.flatMap(
                    (u) => u.items || []
                );
                setItems(allItems);
                window.itemsData = allItems;
                window.unidadesTematicas = data.data.unidades;

                const total = data.data.trimestres.reduce(
                    (acc, t) => acc + (t.semanas?.length || 0),
                    0
                );
                setTotalSemanas(total);

                if (data.data.planificacion) {
                    setPlanificacionId(
                        data.data.planificacion.id_planificacion
                    );
                    setItemsAsignados(data.data.itemsAsignados || {});
                } else {
                    setPlanificacionId(null);
                    setItemsAsignados({});
                }
            } else {
                mostrarToast('Error al cargar datos de la clase', 'error');
            }
        } catch (error) {
            console.error('Error cargando datos de clase:', error);
            mostrarToast('Error al cargar los datos', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleCambiarClase = async (idClase) => {
        const clase = clases.find((c) => c.id_clase === idClase);
        if (clase) {
            setClaseSeleccionada(clase);
            setGradoFiltroActivo(null); // Resetear filtro
            await cargarDatosClase(idClase);
        }
    };

    const obtenerSemanasDeItem = (itemId) => {
        const semanas = [];
        Object.entries(itemsAsignados).forEach(([semanaId, items]) => {
            if (items.includes(itemId)) {
                const numSemana = mapaSemanas[parseInt(semanaId)];
                if (numSemana !== undefined) semanas.push(numSemana);
            }
        });
        return semanas.sort((a, b) => a - b);
    };

    const puedeRecibirItem = (itemId, semanaDestinoId) => {
        const semanasActuales = Object.entries(itemsAsignados)
            .filter(([_, items]) => items.includes(itemId))
            .map(([semanaId]) => parseInt(semanaId));

        if (semanasActuales.includes(semanaDestinoId)) {
            return { ok: false, msg: 'Este item ya está en esa semana' };
        }
        if (semanasActuales.length >= 2) {
            return { ok: false, msg: 'Máximo 2 semanas por item' };
        }
        if (semanasActuales.length === 1) {
            const numActual = mapaSemanas[semanasActuales[0]];
            const numDestino = mapaSemanas[semanaDestinoId];
            if (Math.abs(numActual - numDestino) !== 1) {
                return {
                    ok: false,
                    msg: `Solo semanas consecutivas (S${numActual} → S${numDestino} no es válido)`,
                };
            }
        }
        return { ok: true };
    };

    const handleDropItem = (itemId, semanaId) => {
        const validacion = puedeRecibirItem(itemId, semanaId);
        if (!validacion.ok) {
            mostrarToast(validacion.msg, 'error');
            return;
        }
        setItemsAsignados((prev) => ({
            ...prev,
            [semanaId]: [...(prev[semanaId] || []), itemId],
        }));
        const numSemana = mapaSemanas[semanaId];
        const item = items.find((i) => i.id_item === itemId);
        mostrarToast(
            `"${item?.nombreitem || 'Item'}" asignado a S${numSemana}`,
            'exito'
        );
    };

    const handleRemoveItem = (itemId, semanaId) => {
        setItemsAsignados((prev) => ({
            ...prev,
            [semanaId]: prev[semanaId].filter((id) => id !== itemId),
        }));
        const numSemana = mapaSemanas[semanaId];
        mostrarToast(`Item removido de S${numSemana}`, 'exito');
    };

    // ========== LIMPIAR TRIMESTRE ==========
    const handleAbrirLimpiarTrimestre = (trimestre) => {
        setTrimestreParaLimpiar(trimestre);
    };

    const handleConfirmarLimpiarTrimestre = () => {
        if (!trimestreParaLimpiar) return;

        const semanasDelTrimestre = trimestreParaLimpiar.semanas || [];
        const idsSemanas = semanasDelTrimestre.map((s) => s.id_semana);

        let asignacionesEliminadas = 0;
        const nuevosItems = { ...itemsAsignados };

        idsSemanas.forEach((idSemana) => {
            if (nuevosItems[idSemana]?.length > 0) {
                asignacionesEliminadas += nuevosItems[idSemana].length;
                delete nuevosItems[idSemana];
            }
        });

        setItemsAsignados(nuevosItems);

        const indexTrimestre =
            trimestres.findIndex(
                (t) => t.id_trimestre === trimestreParaLimpiar.id_trimestre
            ) + 1;

        mostrarToast(
            `Trimestre ${indexTrimestre} limpiado — ${asignacionesEliminadas} ${
                asignacionesEliminadas === 1
                    ? 'item liberado'
                    : 'items liberados'
            }`,
            'exito'
        );

        setTrimestreParaLimpiar(null);
    };

    const guardarPlanificacion = async () => {
        if (!claseSeleccionada) {
            mostrarToast('No hay clase seleccionada', 'error');
            return;
        }
        if (Object.keys(itemsAsignados).length === 0) {
            mostrarToast('No hay items asignados', 'error');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:5000/api/planificacion/guardar',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_clase: claseSeleccionada.id_clase,
                        id_planificacion: planificacionId,
                        itemsAsignados,
                    }),
                }
            );
            const data = await response.json();
            if (data.success) {
                mostrarToast('Planificación guardada exitosamente', 'exito');
                if (data.data.id_planificacion) {
                    setPlanificacionId(data.data.id_planificacion);
                }
            } else {
                mostrarToast('Error: ' + data.message, 'error');
            }
        } catch (error) {
            console.error('Error guardando planificación:', error);
            mostrarToast('Error al guardar', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const semanasConItems = Object.keys(itemsAsignados).filter(
            (key) => itemsAsignados[key]?.length > 0
        ).length;
        const porcentaje =
            totalSemanas > 0
                ? Math.round((semanasConItems / totalSemanas) * 100)
                : 0;
        setProgreso(porcentaje);
    }, [itemsAsignados, totalSemanas]);

    if (mostrarVista) {
        return (
            <VistaPlanificacion
                user={user}
                claseSeleccionada={claseSeleccionada}
                trimestres={trimestres}
                itemsAsignados={itemsAsignados}
                items={items}
                unidadesTematicas={unidadesTematicas}
                onVolver={() => setMostrarVista(false)}
            />
        );
    }

    const semanasPlanificadas = Object.keys(itemsAsignados).filter(
        (key) => itemsAsignados[key]?.length > 0
    ).length;

    return (
        <DndProvider backend={HTML5Backend}>
            <Toast toast={toast} />

            <div className="pg-container">
                {/* ==================== HEADER ==================== */}
                <header className="pg-header">
                    <button
                        className="pg-btn pg-btn--ghost pg-btn--sm"
                        onClick={volver}
                    >
                        <ArrowLeft size={16} />
                        Volver
                    </button>

                    <div className="pg-header__titles">
                        <div className="pg-header__icon">
                            <ClipboardList size={18} />
                        </div>
                        <div>
                            <h2 className="pg-header__title">
                                Planificación de Gestión
                            </h2>
                            {claseSeleccionada && (
                                <p className="pg-header__subtitle">
                                    {claseSeleccionada.nombrec} ·{' '}
                                    {claseSeleccionada.nombre_asignatura}
                                </p>
                            )}
                        </div>
                    </div>
                </header>

                {/* ==================== TOOLBAR ==================== */}
                <div className="pg-toolbar">
                    {clases.length > 0 && (
                        <div className="pg-selector">
                            <label className="pg-selector__label">
                                <School size={14} />
                                Clase
                            </label>
                            <select
                                className="pg-selector__select"
                                value={claseSeleccionada?.id_clase || ''}
                                onChange={(e) =>
                                    handleCambiarClase(
                                        parseInt(e.target.value)
                                    )
                                }
                            >
                                {clases.map((clase) => (
                                    <option
                                        key={clase.id_clase}
                                        value={clase.id_clase}
                                    >
                                        {clase.nombrec} —{' '}
                                        {clase.nombre_asignatura} (
                                        {clase.nombre_grado})
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="pg-progress">
                        <div className="pg-progress__head">
                            <span className="pg-progress__label">
                                Progreso
                            </span>
                            <span className="pg-progress__value">
                                {progreso}%
                            </span>
                        </div>
                        <div className="pg-progress__track">
                            <div
                                className="pg-progress__fill"
                                style={{ width: `${progreso}%` }}
                            />
                        </div>
                        <span className="pg-progress__detail">
                            {semanasPlanificadas} de {totalSemanas} semanas
                        </span>
                    </div>
                </div>

                {loading && (
                    <div className="pg-loading">
                        <Loader2 size={20} className="pg-spin" />
                        Cargando...
                    </div>
                )}

                {/* ==================== BODY ==================== */}
                {!loading && (
                    <div className="pg-body">
                        {/* ---------- COLUMNA TRIMESTRES ---------- */}
                        <section className="pg-column pg-column--trimestres">
                            <header className="pg-column__head">
                                <Calendar size={16} />
                                <h3>Trimestres y Semanas</h3>
                            </header>

                            <div className="pg-column__scroll">
                                {trimestres.length > 0 ? (
                                    trimestres.map((trimestre, index) => {
                                        const isActive =
                                            trimestreActivo ===
                                            trimestre.id_trimestre;

                                        const semanasTrimestre =
                                            trimestre.semanas || [];
                                        const totalSemTrim =
                                            semanasTrimestre.length;
                                        const completadas =
                                            semanasTrimestre.filter(
                                                (s) =>
                                                    (itemsAsignados[
                                                        s.id_semana
                                                    ]?.length || 0) > 0
                                            ).length;
                                        const pctTrim =
                                            totalSemTrim > 0
                                                ? Math.round(
                                                      (completadas /
                                                          totalSemTrim) *
                                                          100
                                                  )
                                                : 0;
                                        const colorClass =
                                            getProgressColor(pctTrim);
                                        const tieneAsignaciones =
                                            semanasTrimestre.some(
                                                (s) =>
                                                    (itemsAsignados[
                                                        s.id_semana
                                                    ]?.length || 0) > 0
                                            );

                                        return (
                                            <div
                                                key={trimestre.id_trimestre}
                                                className="pg-trimestre"
                                            >
                                                <div
                                                    className={`pg-trimestre__head ${
                                                        isActive
                                                            ? 'is-active'
                                                            : ''
                                                    }`}
                                                >
                                                    <button
                                                        className="pg-trimestre__toggle"
                                                        onClick={() =>
                                                            setTrimestreActivo(
                                                                isActive
                                                                    ? null
                                                                    : trimestre.id_trimestre
                                                            )
                                                        }
                                                        type="button"
                                                    >
                                                        <span className="pg-trimestre__chevron">
                                                            {isActive ? (
                                                                <ChevronDown
                                                                    size={16}
                                                                />
                                                            ) : (
                                                                <ChevronRight
                                                                    size={16}
                                                                />
                                                            )}
                                                        </span>
                                                        <span className="pg-trimestre__title">
                                                            Trimestre{' '}
                                                            {index + 1}
                                                        </span>
                                                    </button>

                                                    {/* Barra de progreso del trimestre */}
                                                    <div
                                                        className={`pg-trimestre__progress pg-trimestre__progress--${colorClass}`}
                                                        title={`${completadas} de ${totalSemTrim} semanas`}
                                                    >
                                                        <div className="pg-trimestre__progress-track">
                                                            <div
                                                                className="pg-trimestre__progress-fill"
                                                                style={{
                                                                    width: `${pctTrim}%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="pg-trimestre__progress-value">
                                                            {pctTrim}%
                                                        </span>
                                                    </div>

                                                    {/* Botón limpiar */}
                                                    <button
                                                        className="pg-trimestre__clear"
                                                        onClick={() =>
                                                            handleAbrirLimpiarTrimestre(
                                                                trimestre
                                                            )
                                                        }
                                                        type="button"
                                                        disabled={
                                                            !tieneAsignaciones
                                                        }
                                                        title={
                                                            tieneAsignaciones
                                                                ? 'Borrar semanas de este trimestre'
                                                                : 'Sin asignaciones'
                                                        }
                                                        aria-label="Limpiar trimestre"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>

                                                {isActive && (
                                                    <div className="pg-trimestre__semanas">
                                                        {semanasTrimestre.map(
                                                            (semana) => (
                                                                <SemanaDropZone
                                                                    key={
                                                                        semana.id_semana
                                                                    }
                                                                    semana={
                                                                        semana
                                                                    }
                                                                    trimestre={`T${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                    itemsAsignados={
                                                                        itemsAsignados
                                                                    }
                                                                    onDropItem={
                                                                        handleDropItem
                                                                    }
                                                                    onRemoveItem={
                                                                        handleRemoveItem
                                                                    }
                                                                    puedeRecibirItem={
                                                                        puedeRecibirItem
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="pg-empty">
                                        <Calendar size={28} />
                                        <p>No hay trimestres configurados</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* ---------- COLUMNA UNIDADES ---------- */}
                        <section className="pg-column pg-column--unidades">
                            <header className="pg-column__head">
                                <BookOpen size={16} />
                                <h3>Unidades Temáticas</h3>
                            </header>

                            {/* ⭐ Tab-bar de filtro por grado */}
                            {gradosDisponibles.length > 0 && (
                                <div className="pg-grados-tabs">
                                    {gradosDisponibles.map((g) => (
                                        <button
                                            key={g.id_grado}
                                            type="button"
                                            className={`pg-grado-tab ${
                                                gradoFiltroActivo ===
                                                g.id_grado
                                                    ? 'is-active'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setGradoFiltroActivo(
                                                    g.id_grado
                                                );
                                                setUnidadActiva(null);
                                            }}
                                        >
                                            {g.nombre_grado}
                                            <span className="pg-grado-tab__badge">
                                                {g.cantidad}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="pg-column__scroll">
                                {unidadesFiltradas.length > 0 ? (
                                    unidadesFiltradas.map((unidad) => {
                                        const isActive =
                                            unidadActiva ===
                                            unidad.id_unid_tem;
                                        const itemsDeUnidad =
                                            unidad.items || [];
                                        return (
                                            <div
                                                key={unidad.id_unid_tem}
                                                className="pg-unidad"
                                            >
                                                <button
                                                    className={`pg-unidad__head ${
                                                        isActive
                                                            ? 'is-active'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        setUnidadActiva(
                                                            isActive
                                                                ? null
                                                                : unidad.id_unid_tem
                                                        )
                                                    }
                                                    type="button"
                                                >
                                                    <span className="pg-unidad__chevron">
                                                        {isActive ? (
                                                            <ChevronDown
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <ChevronRight
                                                                size={16}
                                                            />
                                                        )}
                                                    </span>
                                                    <span className="pg-unidad__title">
                                                        {unidad.nombreut}
                                                    </span>
                                                    <span className="pg-unidad__badge">
                                                        {itemsDeUnidad.length}
                                                    </span>
                                                </button>

                                                {isActive && (
                                                    <div className="pg-unidad__body">
                                                        <p className="pg-unidad__objetivo">
                                                            <Target size={12} />
                                                            {unidad.objetivo ||
                                                                'Sin objetivo'}
                                                        </p>

                                                        <div className="pg-unidad__items">
                                                            {itemsDeUnidad.length >
                                                            0 ? (
                                                                itemsDeUnidad.map(
                                                                    (item) => (
                                                                        <DraggableItem
                                                                            key={
                                                                                item.id_item
                                                                            }
                                                                            item={
                                                                                item
                                                                            }
                                                                            semanasAsignadas={obtenerSemanasDeItem(
                                                                                item.id_item
                                                                            )}
                                                                            onBlockedAttempt={(
                                                                                msg
                                                                            ) =>
                                                                                mostrarToast(
                                                                                    msg,
                                                                                    'error'
                                                                                )
                                                                            }
                                                                        />
                                                                    )
                                                                )
                                                            ) : (
                                                                <p className="pg-unidad__empty">
                                                                    <Package
                                                                        size={
                                                                            14
                                                                        }
                                                                    />
                                                                    No hay items
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="pg-empty">
                                        <BookOpen size={28} />
                                        <p>
                                            No hay unidades para este grado
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}

                {/* ==================== FOOTER ==================== */}
                <footer className="pg-footer">
                    <button
                        className="pg-btn pg-btn--ghost"
                        onClick={() => setMostrarVista(true)}
                        disabled={!planificacionId}
                        title={
                            !planificacionId
                                ? 'Guarda la planificación primero'
                                : 'Ver planificación'
                        }
                    >
                        <Eye size={16} />
                        Ver Planificación
                    </button>

                    <button
                        className="pg-btn pg-btn--primary"
                        onClick={guardarPlanificacion}
                        disabled={loading || !claseSeleccionada}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="pg-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                Guardar Planificación
                            </>
                        )}
                    </button>
                </footer>
            </div>

            {/* MODAL LIMPIAR TRIMESTRE */}
            <ConfirmModal
                open={!!trimestreParaLimpiar}
                variant="danger"
                title="¿Borrar semanas planificadas?"
                message={
                    trimestreParaLimpiar
                        ? `Se borrarán todas las asignaciones del Trimestre ${
                              trimestres.findIndex(
                                  (t) =>
                                      t.id_trimestre ===
                                      trimestreParaLimpiar.id_trimestre
                              ) + 1
                          }. Esta acción no se puede deshacer hasta que guardes la planificación.`
                        : ''
                }
                confirmText="Sí, borrar"
                cancelText="Cancelar"
                onConfirm={handleConfirmarLimpiarTrimestre}
                onClose={() => setTrimestreParaLimpiar(null)}
            />
        </DndProvider>
    );
}

export default PlanificacionGestion;