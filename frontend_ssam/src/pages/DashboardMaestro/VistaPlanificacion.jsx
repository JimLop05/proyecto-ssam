// frontend_ssam/src/pages/DashboardMaestro/VistaPlanificacion.jsx
// ============================================================
// VISTA PREVIA DE PLANIFICACIÓN — Formato documento oficial
// ============================================================

import {
    ArrowLeft,
    Printer,
    Building2,
    Calendar,
    BookOpen,
    GraduationCap,
    User as UserIcon,
    School,
    BookMarked,
} from 'lucide-react';
import './VistaPlanificacion.css';

function VistaPlanificacion({
    user,
    claseSeleccionada,
    trimestres,
    itemsAsignados,
    items,
    unidadesTematicas,
    onVolver,
}) {
    // ============================================================
    // HELPERS
    // ============================================================

    const formatearFecha = (fecha) => {
        if (!fecha) return '—';
        const d = new Date(fecha);
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
        ];
        return `${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
    };

    const formatearFechaCorta = (fecha) => {
        if (!fecha) return '—';
        const d = new Date(fecha);
        const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
                       'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        return `${String(d.getDate()).padStart(2, '0')} ${meses[d.getMonth()]}`;
    };

    const nombreMaestro = () => {
        if (!user) return '—';
        const partes = [user.nombre, user.apellido1, user.apellido2].filter(Boolean);
        return partes.join(' ');
    };

    const obtenerItem = (itemId) => items.find((i) => i.id_item === itemId);

    const obtenerUnidadDeItem = (itemId) => {
        return unidadesTematicas.find((u) =>
            u.items?.some((i) => i.id_item === itemId)
        );
    };

    // Devuelve array de filas { unidad, item } para una semana
    const obtenerFilasSemana = (semanaId) => {
        const itemIds = itemsAsignados[semanaId] || [];
        const filas = [];
        itemIds.forEach((itemId) => {
            const unidad = obtenerUnidadDeItem(itemId);
            const item = obtenerItem(itemId);
            if (!unidad || !item) return;
            filas.push({
                unidad: unidad.nombreut,
                item: item.nombreitem,
            });
        });
        return filas;
    };

    const totalSemanasPlanificadas = Object.keys(itemsAsignados).filter(
        (id) => itemsAsignados[id]?.length > 0
    ).length;

    const totalSemanas = trimestres.reduce(
        (acc, t) => acc + (t.semanas?.length || 0),
        0
    );

    const rangoTrimestre = (t) => {
        return `${formatearFechaCorta(t.fecha_inicio)} — ${formatearFechaCorta(t.fecha_fin)}`;
    };

    const handleImprimir = () => {
        window.print();
    };

    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="vp-container">
            {/* ==================== BARRA DE ACCIONES ==================== */}
            <div className="vp-actions no-print">
                <button className="vp-btn vp-btn--ghost" onClick={onVolver}>
                    <ArrowLeft size={16} />
                    Volver al editor
                </button>

                <button className="vp-btn vp-btn--primary" onClick={handleImprimir}>
                    <Printer size={16} />
                    Imprimir / Guardar PDF
                </button>
            </div>

            {/* ==================== DOCUMENTO ==================== */}
            <article className="vp-doc">
                {/* ---------- ENCABEZADO INSTITUCIONAL ---------- */}
                <header className="vp-doc__header">
                    <div className="vp-doc__header-logo">
                        <img src="/LogoSSAM.png" alt="Logo SSAM" />
                    </div>

                    <div className="vp-doc__header-title">
                        <h1>Planificación de Gestión</h1>
                        <p className="vp-doc__header-subtitle">
                            Sistema de Seguimiento y Rendimiento Académico
                        </p>
                        <p className="vp-doc__header-year">
                            Gestión {new Date().getFullYear()}
                        </p>
                    </div>

                    <div className="vp-doc__header-meta">
                        <div className="vp-doc__meta-row">
                            <Building2 size={13} />
                            <span>
                                <strong>UE:</strong>{' '}
                                {claseSeleccionada?.nombre_ue ||
                                    `ID #${claseSeleccionada?.id_ue || '—'}`}
                            </span>
                        </div>
                        <div className="vp-doc__meta-row">
                            <BookMarked size={13} />
                            <span>
                                <strong>Asignatura:</strong>{' '}
                                {claseSeleccionada?.nombre_asignatura || '—'}
                            </span>
                        </div>
                        <div className="vp-doc__meta-row">
                            <Calendar size={13} />
                            <span>
                                <strong>Semanas:</strong>{' '}
                                {totalSemanasPlanificadas} de {totalSemanas}
                            </span>
                        </div>
                    </div>
                </header>

                {/* ---------- DATOS GENERALES ---------- */}
                <section className="vp-doc__data">
                    <div className="vp-doc__data-item">
                        <span className="vp-doc__data-label">
                            <UserIcon size={12} />
                            Maestro
                        </span>
                        <span className="vp-doc__data-value">
                            {nombreMaestro()}
                        </span>
                    </div>

                    <div className="vp-doc__data-item">
                        <span className="vp-doc__data-label">
                            <BookOpen size={12} />
                            Clase
                        </span>
                        <span className="vp-doc__data-value">
                            {claseSeleccionada?.nombrec || '—'}
                        </span>
                    </div>

                    <div className="vp-doc__data-item">
                        <span className="vp-doc__data-label">
                            <GraduationCap size={12} />
                            Grado
                        </span>
                        <span className="vp-doc__data-value">
                            {claseSeleccionada?.nombre_grado || '—'}
                        </span>
                    </div>

                    <div className="vp-doc__data-item">
                        <span className="vp-doc__data-label">
                            <School size={12} />
                            Departamento
                        </span>
                        <span className="vp-doc__data-value">
                            {user?.departamento || '—'}
                        </span>
                    </div>
                </section>

                {/* ---------- CUERPO: TRIMESTRES ---------- */}
                <main className="vp-doc__body">
                    {trimestres.length > 0 ? (
                        trimestres.map((trimestre, idxTrimestre) => {
                            const semanasConItems = (trimestre.semanas || []).filter(
                                (s) => (itemsAsignados[s.id_semana] || []).length > 0
                            );

                            return (
                                <section
                                    key={trimestre.id_trimestre}
                                    className="vp-trimestre"
                                >
                                    <header className="vp-trimestre__head">
                                        <h2>
                                            Trimestre {idxTrimestre + 1}
                                        </h2>
                                        <span className="vp-trimestre__fechas">
                                            {rangoTrimestre(trimestre)}
                                        </span>
                                        <span className="vp-trimestre__count">
                                            {semanasConItems.length}{' '}
                                            {semanasConItems.length === 1
                                                ? 'semana'
                                                : 'semanas'}
                                        </span>
                                    </header>

                                    {semanasConItems.length > 0 ? (
                                        <table className="vp-tabla">
                                            <thead>
                                                <tr>
                                                    <th className="vp-th-num">
                                                        Sem.
                                                    </th>
                                                    <th className="vp-th-fechas">
                                                        Fechas
                                                    </th>
                                                    <th className="vp-th-unidad">
                                                        Unidad Temática
                                                    </th>
                                                    <th className="vp-th-item">
                                                        Contenido
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {semanasConItems.map((semana) => {
                                                    const filas = obtenerFilasSemana(
                                                        semana.id_semana
                                                    );

                                                    if (filas.length === 0) {
                                                        return (
                                                            <tr key={semana.id_semana}>
                                                                <td className="vp-td-num">
                                                                    <span className="vp-sem-badge">
                                                                        S{semana.numero_semana}
                                                                    </span>
                                                                </td>
                                                                <td className="vp-td-fechas">
                                                                    {formatearFechaCorta(semana.dia_inicio)}
                                                                    <span className="vp-fecha-sep"> → </span>
                                                                    {formatearFechaCorta(semana.dia_fin)}
                                                                </td>
                                                                <td
                                                                    className="vp-td-unidad"
                                                                    colSpan={2}
                                                                >
                                                                    <em className="vp-vacio">
                                                                        Sin contenidos
                                                                    </em>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }

                                                    return filas.map((fila, i) => (
                                                        <tr
                                                            key={`${semana.id_semana}-${i}`}
                                                            className={
                                                                i === 0 ? 'vp-row-first' : 'vp-row-cont'
                                                            }
                                                        >
                                                            {/* Semana y fechas solo en la primera fila */}
                                                            {i === 0 ? (
                                                                <>
                                                                    <td
                                                                        className="vp-td-num"
                                                                        rowSpan={filas.length}
                                                                    >
                                                                        <span className="vp-sem-badge">
                                                                            S{semana.numero_semana}
                                                                        </span>
                                                                    </td>
                                                                    <td
                                                                        className="vp-td-fechas"
                                                                        rowSpan={filas.length}
                                                                    >
                                                                        {formatearFechaCorta(semana.dia_inicio)}
                                                                        <span className="vp-fecha-sep"> → </span>
                                                                        {formatearFechaCorta(semana.dia_fin)}
                                                                    </td>
                                                                </>
                                                            ) : null}

                                                            <td className="vp-td-unidad">
                                                                {fila.unidad}
                                                            </td>
                                                            <td className="vp-td-item">
                                                                {fila.item}
                                                            </td>
                                                        </tr>
                                                    ));
                                                })}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="vp-trimestre__empty">
                                            <Calendar size={16} />
                                            Sin semanas planificadas en este trimestre
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    ) : (
                        <div className="vp-empty">
                            <Calendar size={32} />
                            <p>No hay trimestres configurados para esta clase.</p>
                        </div>
                    )}
                </main>

                {/* ---------- PIE DE FIRMAS ---------- */}
                <footer className="vp-doc__footer">
                    <div className="vp-firma">
                        <div className="vp-firma__line" />
                        <p className="vp-firma__name">{nombreMaestro()}</p>
                        <p className="vp-firma__role">Maestro</p>
                    </div>

                    <div className="vp-firma">
                        <div className="vp-firma__line" />
                        <p className="vp-firma__name">&nbsp;</p>
                        <p className="vp-firma__role">Director de UE</p>
                    </div>
                </footer>

                {/* ---------- PIE DE EMISIÓN ---------- */}
                <div className="vp-doc__emision">
                    Documento generado el {formatearFecha(new Date())}
                </div>
            </article>
        </div>
    );
}

export default VistaPlanificacion;