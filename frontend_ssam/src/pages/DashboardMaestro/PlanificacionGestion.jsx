// frontend_ssam/src/pages/DashboardMaestro/PlanificacionGestion.jsx
import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './PlanificacionGestion.css';

// ============================================================
// COMPONENTES DE DRAG & DROP
// ============================================================

// Item que se puede arrastrar (desde la lista de unidades)
const DraggableItem = ({ item, estaAsignado }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id: item.id_item, nombre: item.nombreitem },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: !estaAsignado,
    }));

    return (
        <div
            ref={drag}
            className={`item-unidad ${estaAsignado ? 'asignado' : 'disponible'} ${isDragging ? 'dragging' : ''}`}
            style={{ 
                opacity: isDragging ? 0.5 : 1,
                cursor: estaAsignado ? 'not-allowed' : 'grab',
                userSelect: 'none' // 👈 Evita que el texto se seleccione
            }}
            // 👇 Eventos para touchpad
            onTouchStart={(e) => {
                console.log('👆 Touch start en:', item.nombreitem);
            }}
        >
            <span className="item-icon">🔹</span>
            <span className="item-nombre">{item.nombreitem}</span>
            {estaAsignado && <span className="badge-asignado">✅</span>}
        </div>
    );
};

// Semana que recibe items (drop zone)
const SemanaDropZone = ({ semana, itemsAsignados, onDropItem, onRemoveItem, trimestre }) => {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item) => {
            onDropItem(item.id, semana.id_semana);
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
            className={`semana-item ${isOver && canDrop ? 'drop-active' : ''}`}
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
    const [searchTerm, setSearchTerm] = useState('');
    const [progreso, setProgreso] = useState(0);
    const [totalSemanas, setTotalSemanas] = useState(0);
    const [trimestreActivo, setTrimestreActivo] = useState(null);

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
                // Seleccionar la primera clase por defecto
                setClaseSeleccionada(data.data[0]);
                // Cargar datos de la primera clase
                await cargarDatosClase(data.data[0].id_clase);
            } else {
                alert('No tienes clases asignadas. Creá una clase primero.');
            }
        } catch (error) {
            console.error('Error cargando clases:', error);
            alert('Error al cargar las clases');
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
                // Extraer todos los items de las unidades
                const allItems = data.data.unidades.flatMap(u => u.items || []);
                setItems(allItems);
                // Guardar items globalmente para los componentes hijos
                window.itemsData = allItems;
                window.unidadesTematicas = data.data.unidades; // 👈 AGREGÁ ESTA LÍNEA
                window.items = allItems; // 👈 AGREGÁ ESTA LÍNEA
                
                // Calcular total de semanas
                const total = data.data.trimestres.reduce(
                    (acc, t) => acc + (t.semanas?.length || 0), 0
                );
                setTotalSemanas(total);
                
                // Cargar planificación existente
                if (data.data.planificacion) {
                    setPlanificacionId(data.data.planificacion.id_planificacion);
                    setItemsAsignados(data.data.itemsAsignados || {});
                } else {
                    setPlanificacionId(null);
                    setItemsAsignados({});
                }
                
                // Guardar items globalmente para los componentes hijos
                window.itemsData = allItems;
            } else {
                alert('Error al cargar datos de la clase: ' + data.message);
            }
        } catch (error) {
            console.error('Error cargando datos de clase:', error);
            alert('Error al cargar los datos de la clase');
        } finally {
            setLoading(false);
        }
    };

    // Cambiar de clase
    const handleCambiarClase = async (idClase) => {
        const clase = clases.find(c => c.id_clase === idClase);
        if (clase) {
            setClaseSeleccionada(clase);
            await cargarDatosClase(idClase);
        }
    };

    // Handler para soltar item en semana
    const handleDropItem = (itemId, semanaId) => {
        // Verificar si el item ya está asignado
        const itemYaAsignado = Object.values(itemsAsignados).some(
            items => items.includes(itemId)
        );
        
        if (itemYaAsignado) {
            alert('Este item ya está asignado a otra semana');
            return;
        }

        setItemsAsignados(prev => ({
            ...prev,
            [semanaId]: [...(prev[semanaId] || []), itemId]
        }));
    };

    // Handler para quitar item de semana
    const handleRemoveItem = (itemId, semanaId) => {
        setItemsAsignados(prev => ({
            ...prev,
            [semanaId]: prev[semanaId].filter(id => id !== itemId)
        }));
    };

    // Guardar planificación
    const guardarPlanificacion = async () => {
        if (!claseSeleccionada) {
            alert('No hay clase seleccionada');
            return;
        }

        if (Object.keys(itemsAsignados).length === 0) {
            alert('No hay items asignados a ninguna semana');
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
                alert('✅ Planificación guardada exitosamente');
                if (data.data.id_planificacion) {
                    setPlanificacionId(data.data.id_planificacion);
                }
            } else {
                alert('❌ Error: ' + data.message);
            }
        } catch (error) {
            console.error('Error guardando planificación:', error);
            alert('❌ Error al guardar');
        } finally {
            setLoading(false);
        }
    };

    // Calcular progreso
    useEffect(() => {
        const semanasConItems = Object.keys(itemsAsignados).filter(
            key => itemsAsignados[key]?.length > 0
        ).length;
        
        const porcentaje = totalSemanas > 0 
            ? Math.round((semanasConItems / totalSemanas) * 100)
            : 0;
        setProgreso(porcentaje);
    }, [itemsAsignados, totalSemanas]);

    // Filtrar items disponibles
    const itemsDisponibles = items.filter(item => {
        const estaAsignado = Object.values(itemsAsignados).some(
            items => items.includes(item.id_item)
        );
        return !estaAsignado;
    });

    // Filtrar por búsqueda
    const itemsFiltrados = itemsDisponibles.filter(item =>
        item.nombreitem?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Agrupar items por unidad temática
    const itemsPorUnidad = unidadesTematicas.map(unidad => ({
        ...unidad,
        items: itemsFiltrados.filter(item => item.id_unid_tem === unidad.id_unid_tem)
    })).filter(unidad => unidad.items.length > 0);

    // Renderizado
    return (
        <DndProvider backend={HTML5Backend}>
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
    {/* COLUMNA IZQUIERDA: UNIDADES TEMÁTICAS */}
    <div className="planificacion-unidades">
        <div className="unidades-header">
            <h3>📚 Unidades Temáticas</h3>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="🔍 Buscar item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>

        <div className="unidades-scroll">
            {unidadesTematicas.length > 0 ? (
                unidadesTematicas.map(unidad => (
                    <div key={unidad.id_unid_tem} className="unidad-card">
                        <h4 className="unidad-titulo">{unidad.nombreut}</h4>
                        <p className="unidad-objetivo">{unidad.objetivo || 'Sin objetivo'}</p>
                        <div className="items-lista">
                            {unidad.items?.length > 0 ? (
                                unidad.items.map(item => {
                                    const estaAsignado = Object.values(itemsAsignados).some(
                                        items => items.includes(item.id_item)
                                    );
                                    return (
                                        <DraggableItem
                                            key={item.id_item}
                                            item={item}
                                            estaAsignado={estaAsignado}
                                        />
                                    );
                                })
                            ) : (
                                <p style={{ color: '#6c757d', fontSize: '0.8rem' }}>Sin items</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <div className="empty-state">
                    <p>📚 No hay unidades temáticas disponibles</p>
                </div>
            )}
        </div>
    </div>

    {/* COLUMNA DERECHA: TRIMESTRES */}
    <div className="planificacion-trimestres">
        {trimestres.length > 0 ? (
            trimestres.map((trimestre, index) => (
                <div key={trimestre.id_trimestre} className="trimestre-card">
                    <h3 
                        className={`trimestre-titulo ${trimestreActivo === trimestre.id_trimestre ? 'activo' : ''}`}
                        onClick={() => setTrimestreActivo(
                            trimestreActivo === trimestre.id_trimestre ? null : trimestre.id_trimestre
                        )}
                        style={{ cursor: 'pointer' }}
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
                <p>📭 No hay trimestres configurados para esta clase</p>
                <p className="empty-hint">Contacta al administrador para configurar el año académico</p>
            </div>
        )}
    </div>
</div>
                )}

                {/* FOOTER */}
                <div className="planificacion-footer">
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