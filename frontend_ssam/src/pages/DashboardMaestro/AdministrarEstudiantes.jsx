// frontend_ssam/src/pages/DashboardMaestro/AdministrarEstudiantes.jsx
// ============================================================
// ADMINISTRAR ESTUDIANTES DE UNA CLASE
// ============================================================

import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Search,
    Users,
    BookOpen,
    GraduationCap,
    Building2,
    Eye,
    UserX,
    UserCheck,
    Trash2,
    X,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Mail,
    User as UserIcon,
    Mars,
    Venus,
    CircleHelp,
    Calendar,
    Clock,
    BarChart3,
} from 'lucide-react';
import api from '../../api/axios';
import ConfirmModal from '../../components/ui/ConfirmModal';
import './AdministrarEstudiantes.css';

function AdministrarEstudiantes({ clase, volver, onVerRendimiento }) {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [toast, setToast] = useState(null);

    const [estudianteAEliminar, setEstudianteAEliminar] = useState(null);
    const [estudianteDetalle, setEstudianteDetalle] = useState(null);

    const mostrarToast = (mensaje, tipo = 'exito') => {
        setToast({ mensaje, tipo });
        setTimeout(() => setToast(null), 3200);
    };

    useEffect(() => {
        cargarEstudiantes();
    }, [clase.id_clase]);

    const cargarEstudiantes = async () => {
        try {
            setLoading(true);
            setError('');
            const res = await api.get(`/clases/${clase.id_clase}/estudiantes`);
            if (res.data.success) {
                setEstudiantes(res.data.data.estudiantes || []);
            } else {
                setError(res.data.message || 'Error al cargar los estudiantes');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.response?.data?.message || 'Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    // ========== ACCIONES ==========
    const handleEliminar = async () => {
        if (!estudianteAEliminar) return;

        try {
            const res = await api.delete(
                `/clases/${clase.id_clase}/estudiantes/${estudianteAEliminar.id_usuario}`
            );

            if (res.data.success) {
                setEstudiantes((prev) =>
                    prev.filter((e) => e.id_usuario !== estudianteAEliminar.id_usuario)
                );
                mostrarToast(
                    `"${estudianteAEliminar.nombre} ${estudianteAEliminar.apellido1}" fue quitado de la clase`,
                    'exito'
                );
            } else {
                mostrarToast(res.data.message || 'No se pudo eliminar al estudiante', 'error');
            }
        } catch (err) {
            console.error('Error:', err);
            mostrarToast(err.response?.data?.message || 'Error al conectar con el servidor', 'error');
        } finally {
            setEstudianteAEliminar(null);
        }
    };

    const handleToggleEstado = async (estudiante) => {
        const estadoActual = estudiante.estado_en_clase || 'ACTIVO';
        const nuevoEstado = estadoActual === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';

        try {
            const res = await api.patch(
                `/clases/${clase.id_clase}/estudiantes/${estudiante.id_usuario}/estado`,
                { estado_en_clase: nuevoEstado }
            );

            if (res.data.success) {
                setEstudiantes((prev) =>
                    prev.map((e) =>
                        e.id_usuario === estudiante.id_usuario
                            ? { ...e, estado_en_clase: nuevoEstado }
                            : e
                    )
                );
                mostrarToast(
                    `Estudiante ${nuevoEstado === 'ACTIVO' ? 'reactivado' : 'suspendido'} correctamente`,
                    'exito'
                );
            } else {
                mostrarToast(res.data.message || 'No se pudo cambiar el estado', 'error');
            }
        } catch (err) {
            console.error('Error:', err);
            mostrarToast(err.response?.data?.message || 'Error al conectar con el servidor', 'error');
        }
    };

    // ========== HELPERS ==========
    const calcularEdad = (fechaNac) => {
        if (!fechaNac) return null;
        const hoy = new Date();
        const nac = new Date(fechaNac);
        let edad = hoy.getFullYear() - nac.getFullYear();
        const mes = hoy.getMonth() - nac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nac.getDate())) edad--;
        return edad;
    };

    const formatearFecha = (fecha) => {
        if (!fecha) return '—';
        return new Date(fecha).toLocaleDateString('es-BO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const formatearFechaHora = (fecha) => {
        if (!fecha) return '—';
        const d = new Date(fecha);
        return d.toLocaleString('es-BO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const IconoSexo = ({ sexo }) => {
        if (sexo === 'M') return <Mars size={14} />;
        if (sexo === 'F') return <Venus size={14} />;
        return <CircleHelp size={14} />;
    };

    const labelSexo = (sexo) => {
        if (sexo === 'M') return 'Masculino';
        if (sexo === 'F') return 'Femenino';
        if (sexo === 'O') return 'Otro';
        return '—';
    };

    // ========== FILTRADO ==========
    const estudiantesFiltrados = estudiantes.filter((est) => {
        const texto = busqueda.toLowerCase();
        const nombreCompleto =
            `${est.nombre} ${est.apellido1} ${est.apellido2 || ''}`.toLowerCase();
        return (
            nombreCompleto.includes(texto) ||
            est.username.toLowerCase().includes(texto) ||
            est.email.toLowerCase().includes(texto)
        );
    });

    // ========== RENDER ==========
    return (
        <div className="ae-container">
            {toast && (
                <div className={`ae-toast ae-toast--${toast.tipo === 'exito' ? 'success' : 'error'}`}>
                    {toast.tipo === 'exito' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span>{toast.mensaje}</span>
                </div>
            )}

            {/* HEADER */}
            <header className="ae-header">
                <button className="ae-btn ae-btn--ghost ae-btn--sm" onClick={volver}>
                    <ArrowLeft size={16} />
                    Volver al Detalle
                </button>

                <div className="ae-header__titles">
                    <div className="ae-header__icon">
                        <Users size={18} />
                    </div>
                    <div>
                        <h2 className="ae-header__title">Estudiantes de la Clase</h2>
                        <p className="ae-header__subtitle">{clase.nombrec}</p>
                    </div>
                </div>
            </header>

            {/* INFO DE LA CLASE */}
            <div className="ae-info-bar">
                <div className="ae-info-bar__item">
                    <BookOpen size={14} />
                    <span>{clase.nombre_asignatura || 'N/A'}</span>
                </div>
                <div className="ae-info-bar__item">
                    <GraduationCap size={14} />
                    <span>{clase.nombre_grado || 'N/A'}</span>
                </div>
                <div className="ae-info-bar__item">
                    <Building2 size={14} />
                    <span>{clase.nombre_ue || 'N/A'}</span>
                </div>
            </div>

            {/* LOADING */}
            {loading && (
                <div className="ae-loading">
                    <Loader2 size={20} className="ae-spin" />
                    Cargando estudiantes...
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="ae-alert ae-alert--error">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* CONTENIDO */}
            {!loading && !error && (
                <>
                    {/* TOOLBAR */}
                    <div className="ae-toolbar">
                        <div className="ae-search">
                            <Search size={16} className="ae-search__icon" />
                            <input
                                type="text"
                                className="ae-search__input"
                                placeholder="Buscar por nombre, usuario o email..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            {busqueda && (
                                <button
                                    className="ae-search__clear"
                                    onClick={() => setBusqueda('')}
                                    aria-label="Limpiar búsqueda"
                                    type="button"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        <div className="ae-counter">
                            <strong>{estudiantesFiltrados.length}</strong> de{' '}
                            <strong>{estudiantes.length}</strong> estudiantes
                        </div>
                    </div>

                    {/* SIN ESTUDIANTES */}
                    {estudiantes.length === 0 ? (
                        <div className="ae-empty">
                            <Users size={40} className="ae-empty__icon" />
                            <p className="ae-empty__title">Aún no hay estudiantes inscritos</p>
                            <p className="ae-empty__text">
                                Comparte la contraseña <strong>"{clase.password_clase}"</strong> para que se unan.
                            </p>
                        </div>
                    ) : estudiantesFiltrados.length === 0 ? (
                        <div className="ae-empty">
                            <Search size={40} className="ae-empty__icon" />
                            <p className="ae-empty__title">Sin resultados</p>
                            <p className="ae-empty__text">No se encontraron estudiantes con "{busqueda}"</p>
                        </div>
                    ) : (
                        <div className="ae-table-wrapper">
                            <table className="ae-table">
                                <thead>
                                    <tr>
                                        <th className="ae-th-num">#</th>
                                        <th>Estudiante</th>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                        <th className="ae-th-actions">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantesFiltrados.map((est, index) => {
                                        const estaSuspendido = est.estado_en_clase === 'SUSPENDIDO';
                                        return (
                                            <tr key={est.id_usuario}>
                                                <td className="ae-td-num">{index + 1}</td>
                                                <td>
                                                    <div className="ae-cell-user">
                                                        <div className="ae-avatar">
                                                            {est.nombre?.[0]}
                                                            {est.apellido1?.[0]}
                                                        </div>
                                                        <div className="ae-cell-user__info">
                                                            <span className="ae-cell-user__name">
                                                                {est.nombre} {est.apellido1}{' '}
                                                                {est.apellido2 || ''}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="ae-td-mono">{est.username}</td>
                                                <td>
                                                    <span
                                                        className={`ae-badge ae-badge--${estaSuspendido ? 'suspendido' : 'activo'}`}
                                                    >
                                                        {estaSuspendido ? 'Suspendido' : 'Activo'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="ae-actions">
                                                        <button
                                                            className="ae-icon-btn"
                                                            onClick={() => setEstudianteDetalle(est)}
                                                            title="Ver detalle"
                                                            aria-label="Ver detalle"
                                                            type="button"
                                                        >
                                                            <Eye size={15} />
                                                        </button>

                                                        <button
                                                            className="ae-icon-btn"
                                                            onClick={() => handleToggleEstado(est)}
                                                            title={estaSuspendido ? 'Reactivar' : 'Suspender'}
                                                            aria-label={estaSuspendido ? 'Reactivar' : 'Suspender'}
                                                            type="button"
                                                        >
                                                            {estaSuspendido ? (
                                                                <UserCheck size={15} />
                                                            ) : (
                                                                <UserX size={15} />
                                                            )}
                                                        </button>

                                                        <button
                                                            className="ae-icon-btn ae-icon-btn--danger"
                                                            onClick={() => setEstudianteAEliminar(est)}
                                                            title="Eliminar de la clase"
                                                            aria-label="Eliminar"
                                                            type="button"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}

            {/* MODAL ELIMINAR */}
            <ConfirmModal
                open={!!estudianteAEliminar}
                variant="danger"
                title="¿Quitar al estudiante de la clase?"
                message={
                    estudianteAEliminar
                        ? `Se quitará a "${estudianteAEliminar.nombre} ${estudianteAEliminar.apellido1}" de la clase "${clase.nombrec}". Podrá volver a unirse con la contraseña.`
                        : ''
                }
                confirmText="Sí, quitar"
                cancelText="Cancelar"
                onConfirm={handleEliminar}
                onClose={() => setEstudianteAEliminar(null)}
            />

            {/* MODAL DETALLE */}
            {estudianteDetalle && (
                <div className="ae-modal" onClick={() => setEstudianteDetalle(null)}>
                    <div className="ae-modal__content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="ae-modal__close"
                            onClick={() => setEstudianteDetalle(null)}
                            aria-label="Cerrar"
                            type="button"
                        >
                            <X size={18} />
                        </button>

                        <div className="ae-modal__avatar">
                            {estudianteDetalle.nombre?.[0]}
                            {estudianteDetalle.apellido1?.[0]}
                        </div>

                        <h3 className="ae-modal__name">
                            {estudianteDetalle.nombre} {estudianteDetalle.apellido1}{' '}
                            {estudianteDetalle.apellido2 || ''}
                        </h3>

                        <span
                            className={`ae-badge ae-badge--${estudianteDetalle.estado_en_clase === 'SUSPENDIDO' ? 'suspendido' : 'activo'}`}
                        >
                            {estudianteDetalle.estado_en_clase === 'SUSPENDIDO' ? 'Suspendido' : 'Activo'}
                        </span>

                        <div className="ae-modal__info">
                            <div className="ae-modal__row">
                                <UserIcon size={14} />
                                <span className="ae-modal__label">Usuario</span>
                                <span className="ae-modal__value">{estudianteDetalle.username}</span>
                            </div>

                            <div className="ae-modal__row">
                                <Mail size={14} />
                                <span className="ae-modal__label">Correo</span>
                                <span className="ae-modal__value">{estudianteDetalle.email}</span>
                            </div>

                            <div className="ae-modal__row">
                                <IconoSexo sexo={estudianteDetalle.sexo} />
                                <span className="ae-modal__label">Sexo</span>
                                <span className="ae-modal__value">{labelSexo(estudianteDetalle.sexo)}</span>
                            </div>


                            <div className="ae-modal__row">
                                <Calendar size={14} />
                                <span className="ae-modal__label">Se unió a la clase</span>
                                <span className="ae-modal__value">
                                    {formatearFecha(estudianteDetalle.fecha_inscripcion_clase)}
                                </span>
                            </div>

                            <div className="ae-modal__row">
                                <Clock size={14} />
                                <span className="ae-modal__label">Última conexión</span>
                                <span className="ae-modal__value">
                                    {formatearFechaHora(estudianteDetalle.fecha_ultimo_acceso)}
                                </span>
                            </div>
                        </div>

                        {onVerRendimiento && (
                            <button
                                className="ae-modal__action-btn"
                                onClick={() => {
                                    onVerRendimiento(estudianteDetalle);
                                    setEstudianteDetalle(null);
                                }}
                                type="button"
                            >
                                <BarChart3 size={16} />
                                Ver rendimiento completo
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdministrarEstudiantes;