// frontend_ssam/src/pages/DashboardMaestro/PlanificacionGestion.jsx
import { useState, useEffect, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './PlanificacionGestion.css';
import VistaPlanificacion from './VistaPlanificacion';

// ============================================================
// COMPONENTE TOAST (notificación flotante)
// ============================================================
const Toast = ({ toast }) => {
    if (!toast) return null;
    
    return (
        <div className={`toast-notificacion toast-${toast.tipo}`}>
            <span className="toast-icono">
                {toast.tipo === 'exito' ? '✅' : '❌'}
            </span>
            <span className="toast-mensaje">{toast.mensaje}</span>
        </div>
    );
};

// ============================================================
// COMPONENTES DE DRAG & DROP
// ============================================================

// Item que se puede arrastrar (desde la lista de unidades)
const DraggableItem = ({ item, semanasAsignadas }) => {
    // ⭐ Determinar estado visual según cuántas semanas tiene asignadas
    const cantidadSemanas = semanasAsignadas.length;
    const estaBloqueado = cantidadSemanas >= 2; // ya no se puede arrastrar
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id: item.id_item, nombre: item.nombreitem },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: !estaBloqueado, // 🔒 Bloqueado si ya está en 2 semanas
    }));

    // Clase CSS según estado
    let claseEstado = 'disponible'; // 0 semanas
    if (cantidadSemanas === 1) claseEstado = 'una-semana';   // verde claro
    if (cantidadSemanas === 2) claseEstado = 'dos-semanas';  // verde oscuro

    return (
        <div
            ref={drag}
            className={`item-unidad ${claseEstado} ${isDragging ? 'dragging' : ''}`}
            style={{ 
                opacity: isDragging ? 0.5 : 1,
                cursor: estaBloqueado ? 'not-allowed' : 'grab',
                userSelect: 'none'
            }}
        >
            <span className="item-icon">🔹</span>
            <span className="item-nombre">{item.nombreitem}</span>
            
            {/* ⭐ Badge con las semanas donde está asignado */}
            {cantidadSemanas > 0 && (
                <span className="badge-semanas">
                    📅 S{semanasAsignadas.join(', S')}
                </span>
            )}
        </div>
    );
};

// Semana que recibe items (drop zone)
const SemanaDropZone = ({ 
    semana, 
    itemsAsignados, 
    onDropItem, 
    onRemoveItem, 
    trimestre,
    puedeRecibirItem  // ⭐ función que valida si puede recibir el item
}) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item) => {
            onDropItem(item.id, semana.id_semana);
        },
        // ⭐ canDrop: se ejecuta durante el hover para iluminar o no la semana
        canDrop: (item) => {
            const resultado = puedeRecibirItem(item.id, semana.id_semana);
            return resultado.ok;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }));

    const itemsDeSemana = itemsAsignados[semana.id_semana] || [];

    return (
        <div
            ref={drop}
            className={`semana-item ${isOver && canDrop ? 'drop-active' : ''} ${isOver && !canDrop ? 'drop-invalid' : ''}`}
        >
            <div className="semana-header">
                <span className="semana-numero">
                    Semana {semana.numero_semana}
                </span>
                <span className="semana-trimestre">{trimestre}</span>
            </div>
            
            <div className="semana-items">
                {itemsDeSemana.length > 0 ? (
                    itemsDeSemana.map((itemId) => {
                        const item = window.itemsData?.find(i => i.id_item === itemId);
                        return (
                            <div key={itemId} className="item-asignado">
                                <span>📦 {item?.nombreitem || 'Item desconocido'}</span>
                                <button
                                    className="btn-quitar-item"
                                    onClick={() => onRemoveItem(itemId, semana.id_semana)}
                                >
                                    ✕
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="empty-semana">
                        🎯 Soltá un item aquí
                    </div>
                )}
            </div>
            
            <div className="semana-footer">
                <span className="semana-fechas">
                    {new Date(semana.dia_inicio).toLocaleDateString()} - {new Date(semana.dia_fin).toLocaleDateString()}
                </span>
                <span className="semana-item-count">
                    {itemsDeSemana.length} items
                </span>
            </div>
        </div>
    );
};


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
    // ⭐ NUEVO: estado del toast
    const [toast, setToast] = useState(null);
    // ⭐ Controla si estamos viendo el editor o la vista previa
    const [mostrarVista, setMostrarVista] = useState(false);

    // ⭐ Mostrar toast y auto-ocultar en 3 segundos
    const mostrarToast = (mensaje, tipo = 'exito') => {
        setToast({ mensaje, tipo });
        setTimeout(() => setToast(null), 3000);
    };

    // ⭐ Mapa: id_semana → numero_semana (para validar consecutividad)
    const mapaSemanas = useMemo(() => {
        const mapa = {};
        trimestres.forEach(t => {
            t.semanas?.forEach(s => {
                mapa[s.id_semana] = s.numero_semana;
            });
        });
        return mapa;
    }, [trimestres]);

    // Cargar clases del maestro al iniciar
    useEffect(() => {
        cargarClasesMaestro();
    }, []);

    const cargarClasesMaestro = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/planificacion/clases', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
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
            const response = await fetch(`http://localhost:5000/api/planificacion/datos-clase/${idClase}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            
            if (data.success) {
                setTrimestres(data.data.trimestres || []);
                if (data.data.trimestres && data.data.trimestres.length > 0) {
                    setTrimestreActivo(data.data.trimestres[0].id_trimestre);
                }
                setUnidadesTematicas(data.data.unidades || []);
                const allItems = data.data.unidades.flatMap(u => u.items || []);
                setItems(allItems);
                window.itemsData = allItems;
                window.unidadesTematicas = data.data.unidades;
                
                const total = data.data.trimestres.reduce(
                    (acc, t) => acc + (t.semanas?.length || 0), 0
                );
                setTotalSemanas(total);
                
                if (data.data.planificacion) {
                    setPlanificacionId(data.data.planificacion.id_planificacion);
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
        const clase = clases.find(c => c.id_clase === idClase);
        if (clase) {
            setClaseSeleccionada(clase);
            await cargarDatosClase(idClase);
        }
    };

    // ⭐ Devuelve array de números de semana donde está asignado un item
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

    // ⭐ Valida si un item puede ir a una semana destino
    const puedeRecibirItem = (itemId, semanaDestinoId) => {
        // 1. Semanas actuales donde está el item
        const semanasActuales = Object.entries(itemsAsignados)
            .filter(([_, items]) => items.includes(itemId))
            .map(([semanaId]) => parseInt(semanaId));
        
        // 2. ¿Ya está en esa semana?
        if (semanasActuales.includes(semanaDestinoId)) {
            return { ok: false, msg: 'Este item ya está en esa semana' };
        }
        
        // 3. ¿Ya está en 2 semanas?
        if (semanasActuales.length >= 2) {
            return { ok: false, msg: 'Máximo 2 semanas por item' };
        }
        
        // 4. Si está en 1, validar consecutividad
        if (semanasActuales.length === 1) {
            const numActual = mapaSemanas[semanasActuales[0]];
            const numDestino = mapaSemanas[semanaDestinoId];
            
            if (Math.abs(numActual - numDestino) !== 1) {
                return { ok: false, msg: 'Solo semanas consecutivas' };
            }
        }
        
        return { ok: true };
    };

    // Handler para soltar item en semana
    const handleDropItem = (itemId, semanaId) => {
        const validacion = puedeRecibirItem(itemId, semanaId);
        
        if (!validacion.ok) {
            mostrarToast(validacion.msg, 'error');
            return;
        }

        setItemsAsignados(prev => ({
            ...prev,
            [semanaId]: [...(prev[semanaId] || []), itemId]
        }));

        const numSemana = mapaSemanas[semanaId];
        const item = items.find(i => i.id_item === itemId);
        mostrarToast(`"${item?.nombreitem || 'Item'}" asignado a Semana ${numSemana}`, 'exito');
    };

    // Handler para quitar item de semana
    const handleRemoveItem = (itemId, semanaId) => {
        setItemsAsignados(prev => ({
            ...prev,
            [semanaId]: prev[semanaId].filter(id => id !== itemId)
        }));

        const numSemana = mapaSemanas[semanaId];
        mostrarToast(`Item removido de Semana ${numSemana}`, 'exito');
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
            
            const response = await fetch('http://localhost:5000/api/planificacion/guardar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_clase: claseSeleccionada.id_clase,
                    id_planificacion: planificacionId,
                    itemsAsignados: itemsAsignados
                })
            });
            
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
            key => itemsAsignados[key]?.length > 0
        ).length;
        
        const porcentaje = totalSemanas > 0 
            ? Math.round((semanasConItems / totalSemanas) * 100)
            : 0;
        setProgreso(porcentaje);
    }, [itemsAsignados, totalSemanas]);

    // ⭐ Si el usuario clickeó "Ver Planificación", mostramos la vista previa
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

    // Renderizado
    return (
        <DndProvider backend={HTML5Backend}>
            {/* ⭐ Toast flotante */}
            <Toast toast={toast} />
            
            <div className="section planificacion-container">
                {/* HEADER */}
                <div className="planificacion-header-actions">
                    <div className="header-left">
                        <h2>📋 Planificación de Gestión</h2>
                        {claseSeleccionada && (
                            <span className="clase-info">
                                {claseSeleccionada.nombrec} - {claseSeleccionada.nombre_asignatura}
                            </span>
                        )}
                    </div>
                    <button className="btn-volver-planificacion" onClick={volver}>
                        ← Volver
                    </button>
                </div>

                {/* SELECTOR DE CLASE */}
                {clases.length > 0 && (
                    <div className="selector-clase">
                        <label>📚 Seleccionar clase:</label>
                        <select
                            value={claseSeleccionada?.id_clase || ''}
                            onChange={(e) => handleCambiarClase(parseInt(e.target.value))}
                        >
                            {clases.map(clase => (
                                <option key={clase.id_clase} value={clase.id_clase}>
                                    {clase.nombrec} - {clase.nombre_asignatura} ({clase.nombre_grado})
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* BARRA DE PROGRESO */}
                <div className="progreso-bar">
                    <div className="progreso-info">
                        <span>📊 Progreso de planificación</span>
                        <span className="progreso-porcentaje">{progreso}%</span>
                    </div>
                    <div className="progreso-track">
                        <div
                            className="progreso-fill"
                            style={{ width: `${progreso}%` }}
                        ></div>
                    </div>
                    <span className="progreso-detalle">
                        {Object.keys(itemsAsignados).filter(key => itemsAsignados[key]?.length > 0).length} de {totalSemanas} semanas planificadas
                    </span>
                </div>

                {loading && <div className="loading-spinner">⏳ Cargando...</div>}

                {/* CUERPO PRINCIPAL */}
                {!loading && (
                    <div className="planificacion-body">
                        {/* COLUMNA IZQUIERDA: TRIMESTRES */}
                        <div className="planificacion-trimestres">
                            <div className="columna-header">
                                <h3>📅 Trimestres y Semanas</h3>
                            </div>
                            
                            <div className="columna-scroll">
                                {trimestres.length > 0 ? (
                                    trimestres.map((trimestre, index) => (
                                        <div key={trimestre.id_trimestre} className="trimestre-card">
                                            <h3 
                                                className={`trimestre-titulo ${trimestreActivo === trimestre.id_trimestre ? 'activo' : ''}`}
                                                onClick={() => setTrimestreActivo(
                                                    trimestreActivo === trimestre.id_trimestre ? null : trimestre.id_trimestre
                                                )}
                                            >
                                                📅 Trimestre {index + 1} {trimestreActivo === trimestre.id_trimestre ? '▼' : '▶'}
                                                <span className="trimestre-fechas">
                                                    ({new Date(trimestre.fecha_inicio).toLocaleDateString()} - {new Date(trimestre.fecha_fin).toLocaleDateString()})
                                                </span>
                                            </h3>
                                            {trimestreActivo === trimestre.id_trimestre ? (
                                                <div className="semanas-grid">
                                                    {trimestre.semanas?.map((semana) => (
                                                        <SemanaDropZone
                                                            key={semana.id_semana}
                                                            semana={semana}
                                                            trimestre={`T${index + 1}`}
                                                            itemsAsignados={itemsAsignados}
                                                            onDropItem={handleDropItem}
                                                            onRemoveItem={handleRemoveItem}
                                                            puedeRecibirItem={puedeRecibirItem}
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="trimestre-colapsado">
                                                    <p>📅 {trimestre.semanas?.length || 0} semanas - Click para expandir</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>📭 No hay trimestres configurados</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* COLUMNA DERECHA: UNIDADES */}
                        <div className="planificacion-unidades">
                            <div className="unidades-header">
                                <h3>📚 Unidades Temáticas</h3>
                            </div>

                            <div className="unidades-scroll">
                                {unidadesTematicas.length > 0 ? (
                                    unidadesTematicas.map(unidad => {
                                        const estaActiva = unidadActiva === unidad.id_unid_tem;
                                        const itemsDeUnidad = unidad.items || [];
                                        
                                        return (
                                            <div key={unidad.id_unid_tem} className="unidad-card">
                                                <h4 
                                                    className={`unidad-titulo ${estaActiva ? 'activo' : ''}`}
                                                    onClick={() => setUnidadActiva(
                                                        estaActiva ? null : unidad.id_unid_tem
                                                    )}
                                                >
                                                    <span>
                                                        {estaActiva ? '▼' : '▶'} {unidad.nombreut}
                                                    </span>
                                                    <span className="unidad-badge">
                                                        {itemsDeUnidad.length} items
                                                    </span>
                                                </h4>
                                                
                                                {estaActiva ? (
                                                    <div className="unidad-contenido">
                                                        <p className="unidad-objetivo">
                                                            {unidad.objetivo || 'Sin objetivo'}
                                                        </p>
                                                        <div className="items-lista">
                                                            {itemsDeUnidad.length > 0 ? (
                                                                itemsDeUnidad.map(item => (
                                                                    <DraggableItem
                                                                        key={item.id_item}
                                                                        item={item}
                                                                        semanasAsignadas={obtenerSemanasDeItem(item.id_item)}
                                                                    />
                                                                ))
                                                            ) : (
                                                                <p className="empty-items">
                                                                    📦 No hay items en esta unidad
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="unidad-colapsada">
                                                        <p>📖 Click para ver los items</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="empty-state">
                                        <p>📚 No hay unidades temáticas disponibles</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* FOOTER */}
                <div className="planificacion-footer">
                    <button
                        className="btn-ver-planificacion"
                        onClick={() => setMostrarVista(true)}
                        disabled={!planificacionId}
                        title={!planificacionId ? 'Guardá la planificación primero' : 'Ver planificación'}
                    >
                        👁️ Ver Planificación
                    </button>
                    <button
                        className="btn-guardar-planificacion"
                        onClick={guardarPlanificacion}
                        disabled={loading || !claseSeleccionada}
                    >
                        💾 {loading ? 'Guardando...' : 'Guardar Planificación'}
                    </button>
                </div>
            </div>
        </DndProvider>
    );
}

export default PlanificacionGestion;