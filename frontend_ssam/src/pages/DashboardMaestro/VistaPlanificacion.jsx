// frontend_ssam/src/pages/DashboardMaestro/VistaPlanificacion.jsx
import './VistaPlanificacion.css';

function VistaPlanificacion({ 
    user, 
    claseSeleccionada, 
    trimestres, 
    itemsAsignados, 
    items,
    unidadesTematicas,
    onVolver 
}) {
    
    // ============================================================
    // HELPERS
    // ============================================================
    
    // Formatear fecha: 2026-02-02 → "2 feb 2026"
    const formatearFecha = (fecha) => {
        if (!fecha) return '—';
        const d = new Date(fecha);
        const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 
                       'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`;
    };
    
    // Obtener nombre completo del maestro
    const nombreMaestro = () => {
        if (!user) return '—';
        const partes = [user.nombre, user.apellido1, user.apellido2].filter(Boolean);
        return partes.join(' ');
    };
    
    // Obtener info de un item por id
    const obtenerItem = (itemId) => {
        return items.find(i => i.id_item === itemId);
    };
    
    // Obtener la unidad temática de un item
    const obtenerUnidadDeItem = (itemId) => {
        const item = obtenerItem(itemId);
        if (!item) return null;
        return unidadesTematicas.find(u => 
            u.items?.some(i => i.id_item === itemId)
        );
    };
    
    // Obtener items de una semana, agrupados por unidad temática
    const obtenerItemsAgrupados = (semanaId) => {
        const itemIds = itemsAsignados[semanaId] || [];
        
        // Agrupar por unidad
        const grupos = {};
        itemIds.forEach(itemId => {
            const unidad = obtenerUnidadDeItem(itemId);
            const item = obtenerItem(itemId);
            if (!unidad || !item) return;
            
            const key = unidad.id_unid_tem;
            if (!grupos[key]) {
                grupos[key] = {
                    unidad: unidad.nombreut,
                    items: []
                };
            }
            grupos[key].items.push(item.nombreitem);
        });
        
        return Object.values(grupos);
    };
    
    // Calcular total de semanas planificadas
    const totalSemanasPlanificadas = () => {
        return Object.keys(itemsAsignados).filter(
            id => itemsAsignados[id]?.length > 0
        ).length;
    };
    
    // Obtener rango de fechas de un trimestre
    const rangoTrimestre = (t) => {
        return `${formatearFecha(t.fecha_inicio)} — ${formatearFecha(t.fecha_fin)}`;
    };
    
    // ============================================================
    // RENDER
    // ============================================================
    
    return (
        <div className="vista-planificacion-container">
            
            {/* HEADER CON BOTÓN VOLVER */}
            <div className="vista-header-actions">
                <button className="btn-volver-editor" onClick={onVolver}>
                    ← Volver al editor
                </button>
            </div>
            
            {/* DOCUMENTO */}
            <div className="documento-planificacion">
                
                {/* ==================== ENCABEZADO ==================== */}
                <header className="doc-encabezado">
                    <div className="doc-logo">
                        <img src="/LogoSSAM.png" alt="Logo" />
                    </div>
                    <div className="doc-titulo-principal">
                        <h1>PLANIFICACIÓN DE GESTIÓN</h1>
                        <p className="doc-subtitulo">
                            Sistema de Seguimiento y Rendimiento Académico
                        </p>
                        <p className="doc-gestion">
                            Gestión {new Date().getFullYear()}
                        </p>
                    </div>
                    <div className="doc-ue-info">
                        <p><strong>UE:</strong> ID #{claseSeleccionada?.id_ue || '—'}</p>
                        <p><strong>Periodo:</strong> {claseSeleccionada?.periodo || '—'}</p>
                    </div>
                </header>
                
                {/* ==================== DATOS GENERALES ==================== */}
                <section className="doc-datos-generales">
                    <div className="doc-campo">
                        <span className="doc-label">Maestro:</span>
                        <span className="doc-valor">{nombreMaestro()}</span>
                    </div>
                    <div className="doc-campo">
                        <span className="doc-label">Clase:</span>
                        <span className="doc-valor">{claseSeleccionada?.nombrec || '—'}</span>
                    </div>
                    <div className="doc-campo">
                        <span className="doc-label">Asignatura:</span>
                        <span className="doc-valor">{claseSeleccionada?.nombre_asignatura || '—'}</span>
                    </div>
                    <div className="doc-campo">
                        <span className="doc-label">Grado:</span>
                        <span className="doc-valor">{claseSeleccionada?.nombre_grado || '—'}</span>
                    </div>
                    <div className="doc-campo">
                        <span className="doc-label">Departamento:</span>
                        <span className="doc-valor">{user?.departamento || '—'}</span>
                    </div>
                    <div className="doc-campo">
                        <span className="doc-label">Semanas planificadas:</span>
                        <span className="doc-valor">
                            {totalSemanasPlanificadas()} de {
                                trimestres.reduce((acc, t) => acc + (t.semanas?.length || 0), 0)
                            }
                        </span>
                    </div>
                </section>
                
                {/* ==================== TRIMESTRES ==================== */}
                <main className="doc-cuerpo">
                    {trimestres.length > 0 ? (
                        trimestres.map((trimestre, idxTrimestre) => {
                            // Filtrar semanas que tienen items asignados
                            const semanasConItems = (trimestre.semanas || []).filter(
                                s => (itemsAsignados[s.id_semana] || []).length > 0
                            );
                            
                            return (
                                <section key={trimestre.id_trimestre} className="doc-trimestre">
                                    
                                    {/* Cabecera del trimestre */}
                                    <div className="doc-trimestre-header">
                                        <h2>
                                            Trimestre {idxTrimestre + 1}
                                        </h2>
                                        <span className="doc-trimestre-fechas">
                                            {rangoTrimestre(trimestre)}
                                        </span>
                                    </div>
                                    
                                    {/* Tabla de semanas */}
                                    {semanasConItems.length > 0 ? (
                                        <table className="doc-tabla">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: '8%' }}>Sem.</th>
                                                    <th style={{ width: '18%' }}>Fechas</th>
                                                    <th style={{ width: '74%' }}>Contenidos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {semanasConItems.map(semana => {
                                                    const grupos = obtenerItemsAgrupados(semana.id_semana);
                                                    
                                                    return (
                                                        <tr key={semana.id_semana}>
                                                            <td className="doc-td-semana">
                                                                <strong>{semana.numero_semana}</strong>
                                                            </td>
                                                            <td className="doc-td-fechas">
                                                                {formatearFecha(semana.dia_inicio)}<br />
                                                                <span className="doc-fecha-sep">a</span><br />
                                                                {formatearFecha(semana.dia_fin)}
                                                            </td>
                                                            <td className="doc-td-contenidos">
                                                                {grupos.length > 0 ? (
                                                                    grupos.map((grupo, idx) => (
                                                                        <div key={idx} className="doc-grupo-unidad">
                                                                            <div className="doc-unidad-nombre">
                                                                                📘 {grupo.unidad}
                                                                            </div>
                                                                            <ul className="doc-items-lista">
                                                                                {grupo.items.map((nombre, i) => (
                                                                                    <li key={i}>{nombre}</li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>
                                                                    ))
                                                                ) : (
                                                                    <em className="doc-vacio">Sin contenidos</em>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="doc-trimestre-vacio">
                                            📭 Sin semanas planificadas en este trimestre
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    ) : (
                        <div className="doc-empty">
                            <p>No hay trimestres configurados para esta clase.</p>
                        </div>
                    )}
                </main>
                
                {/* ==================== PIE DE FIRMAS ==================== */}
                <footer className="doc-firmas">
                    <div className="doc-firma">
                        <div className="doc-firma-linea"></div>
                        <p className="doc-firma-nombre">{nombreMaestro()}</p>
                        <p className="doc-firma-rol">Maestro</p>
                    </div>
                    <div className="doc-firma">
                        <div className="doc-firma-linea"></div>
                        <p className="doc-firma-nombre">________________________</p>
                        <p className="doc-firma-rol">Director de UE</p>
                    </div>
                </footer>
                
                {/* Fecha de emisión */}
                <div className="doc-fecha-emision">
                    Documento generado el {formatearFecha(new Date())}
                </div>
                
            </div>
        </div>
    );
}

export default VistaPlanificacion;