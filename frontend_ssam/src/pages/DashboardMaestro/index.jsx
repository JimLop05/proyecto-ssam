// frontend_ssam/src/pages/DashboardMaestro/index.jsx
// ============================================================
// DASHBOARD DEL MAESTRO
// Secciones: Perfil · Clases · Planificación · Estadísticas
// ============================================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    BookOpen,
    ClipboardList,
    Plus,
    LogOut,
    X,
    ArrowLeft,
    GraduationCap,
    Users,
    BarChart3,
    Calendar,
    Building2,
    KeyRound,
    Loader2,
    AlertCircle,
    CheckCircle2,
    Settings,
    School,
    Menu,
    Copy,
    Check,
    Lock,
    Info,
} from 'lucide-react';
import api from '../../api/axios';
import './DashboardMaestro.css';
import PlanificacionGestion from './PlanificacionGestion';
import AdministrarEstudiantes from './AdministrarEstudiantes';
import EstadisticasClase from './EstadisticasClase';

function DashboardMaestro() {
    const navigate = useNavigate();

    // ========== ESTADOS PRINCIPALES ==========
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('perfil');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [clases, setClases] = useState([]);
    const [showPlanificacion, setShowPlanificacion] = useState(false);
    const [administrarEstudiantes, setAdministrarEstudiantes] = useState(false);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);
    const [config, setConfig] = useState(null);
    const [showEstadisticas, setShowEstadisticas] = useState(false);
    const [estudianteInicialId, setEstudianteInicialId] = useState(null);

    // ========== ESTADOS DEL FORMULARIO DE CREAR CLASE ==========
    const [formData, setFormData] = useState({
        nombreC: '',
        id_distrito: '',
        id_ue: '',
        tipo_ue: '',
        numEst: '',
        turno: '',
        id_grado: '',
        id_asig: '',
    });

    const [grados, setGrados] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [unidadesEducativas, setUnidadesEducativas] = useState([]);
    const [unidadesFiltradas, setUnidadesFiltradas] = useState([]);

    // ========== ESTADOS DE UI ==========
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

    // ========== ESTADO DEL MODAL DE ÉXITO ==========
    const [claseCreada, setClaseCreada] = useState(null);
    const [copiado, setCopiado] = useState(false);

    // ========== EFECTOS INICIALES ==========
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(userData);
        cargarConfig();
        cargarClases();
    }, [navigate]);

    const cargarConfig = async () => {
        try {
            const res = await api.get('/config');
            setConfig(res.data.data);
        } catch (err) {
            console.error('Error al cargar config:', err);
        }
    };

    const cargarClases = async () => {
        try {
            const res = await api.get('/clases/mis-clases');
            if (res.data.success) setClases(res.data.data);
        } catch (error) {
            console.error('Error al cargar clases:', error);
        }
    };

    const cargarDatosFormulario = async () => {
        try {
            const res = await api.get('/clases/datos-formulario');
            if (res.data.success) {
                const gradosFiltrados = res.data.data.grados.filter(
                    (g) => g.id_grado === 6
                );
                setGrados(gradosFiltrados);
                setAsignaturas(res.data.data.asignaturas || []);
                setDistritos(res.data.data.distritos || []);
                setUnidadesEducativas(res.data.data.unidadesEducativas || []);
                setUnidadesFiltradas(res.data.data.unidadesEducativas || []);
            }
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    };

    // ========== HANDLERS ==========
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/', { replace: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDistritoChange = (e) => {
        const id_distrito = e.target.value;
        setFormData({ ...formData, id_distrito, id_ue: '' });

        if (id_distrito) {
            const filtradas = unidadesEducativas.filter(
                (ue) => ue.id_distrito === parseInt(id_distrito)
            );
            setUnidadesFiltradas(filtradas);
        } else {
            setUnidadesFiltradas(unidadesEducativas);
        }
    };

    const abrirModal = () => {
        setShowModal(true);
        cargarDatosFormulario();
    };

    const cerrarModal = () => {
        setShowModal(false);
        setMensaje('');
    };

    const handleSubmitClase = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMensaje('');

        try {
            // 🆕 Ya no se envía password_clase
            const datosEnvio = {
                nombreC: formData.nombreC,
                id_ue: parseInt(formData.id_ue),
                id_grado: parseInt(formData.id_grado),
                id_asig: parseInt(formData.id_asig),
                numEst: parseInt(formData.numEst),
                turno: formData.turno,
                tipo_ue: formData.tipo_ue,
                estado_clase: 'ACTIVA',
            };

            const response = await api.post('/clases/crear', datosEnvio);

            if (response.data.success) {
                // 🆕 Guardamos la clase creada para mostrar el modal de éxito
                setClaseCreada(response.data.data);

                // Resetear formulario
                setFormData({
                    nombreC: '',
                    id_distrito: '',
                    id_ue: '',
                    tipo_ue: '',
                    numEst: '',
                    turno: '',
                    id_grado: '',
                    id_asig: '',
                });
                setUnidadesFiltradas([]);
                cargarClases();

                // Cerrar modal del formulario
                setShowModal(false);
            } else {
                setMensaje('Error: ' + response.data.message);
            }
        } catch (error) {
            const msg =
                error.response?.data?.message ||
                'Error al conectar con el servidor';
            setMensaje('Error: ' + msg);
        } finally {
            setLoading(false);
        }
    };

    // ========== RENDER DE CONTENIDO ==========
    const renderContent = () => {
        if (administrarEstudiantes && claseSeleccionada) {
            return (
                <AdministrarEstudiantes
                    clase={claseSeleccionada}
                    volver={() => setAdministrarEstudiantes(false)}
                    onVerRendimiento={(estudiante) => {
                        setEstudianteInicialId(estudiante.id_usuario);
                        setAdministrarEstudiantes(false);
                        setShowEstadisticas(true);
                    }}
                />
            );
        }

        if (showEstadisticas && claseSeleccionada) {
            return (
                <EstadisticasClase
                    clase={claseSeleccionada}
                    volver={() => {
                        setShowEstadisticas(false);
                        setEstudianteInicialId(null);   // 👈 limpiar al volver
                    }}
                    estudianteInicialId={estudianteInicialId}   // 👈 nuevo
                />
            );
        }

        if (showPlanificacion) {
            return (
                <PlanificacionGestion
                    user={user}
                    volver={() => setShowPlanificacion(false)}
                />
            );
        }

        switch (activeSection) {
            case 'perfil':
                return <MiPerfil user={user} />;
            case 'clases':
                return (
                    <MisClases
                        user={user}
                        clases={clases}
                        setClaseSeleccionada={setClaseSeleccionada}
                        setActiveSection={setActiveSection}
                    />
                );
            case 'detalleClase':
                return (
                    <DetalleClase
                        clase={claseSeleccionada}
                        volver={() => {
                            setClaseSeleccionada(null);
                            setActiveSection('clases');
                        }}
                        onAdministrarEstudiantes={() =>
                            setAdministrarEstudiantes(true)
                        }
                        onVerEstadisticas={() => setShowEstadisticas(true)}
                    />
                );
            case 'planificacion':
                return (
                    <MiPlanificacion
                        onPlanificar={() => setShowPlanificacion(true)}
                    />
                );
            default:
                return <MiPerfil user={user} />;
        }
    };

    // ========== NOMBRE DEL SISTEMA ==========
    const systemName = config?.nombre_plataforma || 'SSAM';
    const logoSrc = config?.logo_url || '/LogoSSAM.png';

    return (
        <div className="dm-container">
            {/* ==================== HEADER ==================== */}
            <header className="dm-header">
                <div className="dm-header__inner">

                    {/* Hamburger */}
                    <button
                        className="dm-header__toggle"
                        onClick={() => {
                            if (window.innerWidth <= 900) {
                                setSidebarOpenMobile(!sidebarOpenMobile);
                            } else {
                                setSidebarCollapsed(!sidebarCollapsed);
                            }
                        }}
                        aria-label="Menú"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Brand */}
                    <div className="dm-header__brand">
                        <img
                            src={logoSrc}
                            alt="SSRA"
                            className="dm-header__logo"
                            onError={(e) => { e.target.src = '/LogoSSAM.png'; }}
                        />
                        <div className="dm-header__titles">
                            <h1 className="dm-header__title">SSRA</h1>
                            <p className="dm-header__subtitle">Plataforma Educativa</p>
                        </div>
                    </div>

                    {/* Badge Panel Maestro */}
                    <span className="dm-header__panel-badge">
                        Panel Maestro
                    </span>

                    {/* Zona derecha */}
                    <div className="dm-header__right">

                        {/* Botón Crear Clase */}
                        <button
                            className="dm-btn dm-btn--primary"
                            onClick={abrirModal}
                        >
                            <Plus size={16} />
                            Crear Clase
                        </button>

                        {/* User info */}
                        <div className="dm-header__user">
                            <span className="dm-header__user-name">
                                {user?.nombre} {user?.apellido1}
                            </span>
                            <span className="dm-header__user-role">
                                DOCENTE
                            </span>
                        </div>

                        {/* Botón Logout */}
                        <button
                            className="dm-btn dm-btn--ghost"
                            onClick={handleLogout}
                        >
                            Cerrar Sesión
                        </button>

                    </div>
                </div>
            </header>

            {/* ==================== BODY ==================== */}
            <div className={`dm-body ${sidebarCollapsed ? 'dm-body--collapsed' : ''}`}>
                {/* Overlay móvil */}
                {sidebarOpenMobile && (
                    <div
                        className="dm-sidebar-overlay"
                        onClick={() => setSidebarOpenMobile(false)}
                    />
                )}

                <aside
                    className={`dm-sidebar ${sidebarCollapsed ? 'dm-sidebar--collapsed' : ''} ${sidebarOpenMobile ? 'dm-sidebar--open' : ''}`}
                >
                    {/* Botón cerrar (solo móvil) */}
                    <button
                        className="dm-sidebar__close"
                        onClick={() => setSidebarOpenMobile(false)}
                        aria-label="Cerrar menú"
                    >
                        <X size={20} />
                    </button>

                    <nav className="dm-sidebar__nav">
                        <button
                            className={`dm-sidebar__item ${activeSection === 'perfil' ? 'is-active' : ''}`}
                            onClick={() => setActiveSection('perfil')}
                            title="Mi Perfil"
                        >
                            <User size={18} />
                            <span className="dm-sidebar__label">Mi Perfil</span>
                        </button>

                        <button
                            className={`dm-sidebar__item ${activeSection === 'clases' ? 'is-active' : ''}`}
                            onClick={() => setActiveSection('clases')}
                            title="Mis Clases"
                        >
                            <BookOpen size={18} />
                            <span className="dm-sidebar__label">Mis Clases</span>
                            {clases.length > 0 && (
                                <span className="dm-sidebar__badge">
                                    {clases.length}
                                </span>
                            )}
                        </button>

                        <button
                            className={`dm-sidebar__item ${activeSection === 'planificacion' ? 'is-active' : ''}`}
                            onClick={() => setActiveSection('planificacion')}
                            title="Mi Planificación"
                        >
                            <ClipboardList size={18} />
                            <span className="dm-sidebar__label">Mi Planificación</span>
                        </button>
                    </nav>

                    <div className="dm-sidebar__footer">
                        <p className="dm-sidebar__hint">
                            Sistema de Seguimiento Académico
                        </p>
                    </div>
                </aside>

                {/* Main */}
                <main className="dm-main">{renderContent()}</main>
            </div>

            {/* ==================== MODAL CREAR CLASE ==================== */}
            {showModal && (
                <div className="dm-modal" onClick={cerrarModal}>
                    <div
                        className="dm-modal__content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="dm-modal__header">
                            <div>
                                <h3 className="dm-modal__title">
                                    Crear Nueva Clase
                                </h3>
                                <p className="dm-modal__subtitle">
                                    Completa los datos para crear una clase
                                </p>
                            </div>
                            <button
                                className="dm-modal__close"
                                onClick={cerrarModal}
                                type="button"
                                aria-label="Cerrar"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitClase} className="dm-modal__form">

                            {/* ============ SECCIÓN: DATOS DE LA CLASE ============ */}
                            <div className="dm-form-section">
                                <div className="dm-form-section__header">
                                    <BookOpen size={16} />
                                    <span>Datos de la Clase</span>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">Nombre de la Clase *</label>
                                    <input
                                        type="text"
                                        name="nombreC"
                                        value={formData.nombreC}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Matemáticas 5to A"
                                        className="dm-input"
                                        required
                                    />
                                </div>

                                <div className="dm-row">
                                    <div className="dm-field">
                                        <label className="dm-label">Turno *</label>
                                        <select
                                            name="turno"
                                            value={formData.turno}
                                            onChange={handleInputChange}
                                            className="dm-input dm-select"
                                            required
                                        >
                                            <option value="">Seleccionar Turno</option>
                                            <option value="Mañana">Mañana</option>
                                            <option value="Tarde">Tarde</option>
                                            <option value="Noche">Noche</option>
                                        </select>
                                    </div>

                                    <div className="dm-field">
                                        <label className="dm-label">Tipo de UE *</label>
                                        <select
                                            name="tipo_ue"
                                            value={formData.tipo_ue}
                                            onChange={handleInputChange}
                                            className="dm-input dm-select"
                                            required
                                        >
                                            <option value="">Seleccionar Tipo</option>
                                            <option value="Fiscal">Fiscal</option>
                                            <option value="Privada">Privada</option>
                                            <option value="Convenio">Convenio</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* ============ SECCIÓN: UBICACIÓN ============ */}
                            <div className="dm-form-section">
                                <div className="dm-form-section__header">
                                    <Building2 size={16} />
                                    <span>Ubicación</span>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">Distrito *</label>
                                    <select
                                        name="id_distrito"
                                        value={formData.id_distrito || ''}
                                        onChange={handleDistritoChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">Seleccionar Distrito</option>
                                        {distritos.map((d) => (
                                            <option key={d.id_distrito} value={d.id_distrito}>
                                                {d.nombred}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">Unidad Educativa *</label>
                                    <select
                                        name="id_ue"
                                        value={formData.id_ue}
                                        onChange={handleInputChange}
                                        className="dm-input dm-select"
                                        required
                                        disabled={!formData.id_distrito}
                                    >
                                        <option value="">
                                            {formData.id_distrito
                                                ? 'Seleccionar UE'
                                                : 'Primero elige un distrito'}
                                        </option>
                                        {unidadesFiltradas.map((ue) => (
                                            <option key={ue.id_ue} value={ue.id_ue}>
                                                {ue.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {unidadesFiltradas.length === 0 && formData.id_distrito && (
                                        <p className="dm-hint dm-hint--error">
                                            No hay Unidades Educativas en este distrito
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ============ SECCIÓN: DATOS ACADÉMICOS ============ */}
                            <div className="dm-form-section">
                                <div className="dm-form-section__header">
                                    <GraduationCap size={16} />
                                    <span>Datos Académicos</span>
                                </div>

                                <div className="dm-row">
                                    <div className="dm-field">
                                        <label className="dm-label">Grado *</label>
                                        <select
                                            name="id_grado"
                                            value={formData.id_grado}
                                            onChange={handleInputChange}
                                            className="dm-input dm-select"
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            {grados.map((g) => (
                                                <option key={g.id_grado} value={g.id_grado}>
                                                    {g.titulog}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="dm-field">
                                        <label className="dm-label">Asignatura *</label>
                                        <select
                                            name="id_asig"
                                            value={formData.id_asig}
                                            onChange={handleInputChange}
                                            className="dm-input dm-select"
                                            required
                                        >
                                            <option value="">Seleccionar</option>
                                            {asignaturas.map((a) => (
                                                <option key={a.id_asig} value={a.id_asig}>
                                                    {a.nombrea}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">Número de Estudiantes *</label>
                                    <input
                                        type="number"
                                        name="numEst"
                                        value={formData.numEst}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 25"
                                        min="1"
                                        className="dm-input"
                                        required
                                    />
                                    {formData.id_ue && (
                                        <p className="dm-hint">
                                            Capacidad máxima:{' '}
                                            {unidadesFiltradas.find(
                                                (ue) => ue.id_ue === parseInt(formData.id_ue)
                                            )?.num_est || 'N/A'}{' '}
                                            estudiantes
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* ============ INFO: CONTRASEÑA AUTOMÁTICA ============ */}
                            <div className="dm-form-info">
                                <Info size={16} />
                                <span>
                                    La contraseña de acceso se generará automáticamente al crear la clase.
                                </span>
                            </div>

                            {/* ============ MENSAJE DE ERROR ============ */}
                            {mensaje && (
                                <div className="dm-alert dm-alert--error">
                                    <AlertCircle size={16} />
                                    <span>{mensaje}</span>
                                </div>
                            )}

                            {/* ============ ACCIONES ============ */}
                            <div className="dm-modal__actions">
                                <button
                                    type="button"
                                    className="dm-btn dm-btn--ghost"
                                    onClick={cerrarModal}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="dm-btn dm-btn--primary"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="dm-spin" size={16} />
                                            Creando...
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={16} />
                                            Crear Clase
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ==================== MODAL: CLASE CREADA ==================== */}
            {claseCreada && (
                <div
                    className="dm-modal"
                    onClick={() => {
                        setClaseCreada(null);
                        setCopiado(false);
                    }}
                >
                    <div
                        className="dm-modal__content dm-modal__content--success"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="dm-success">
                            <div className="dm-success__icon">
                                <CheckCircle2 size={48} />
                            </div>

                            <h3 className="dm-success__title">
                                ¡Clase creada exitosamente!
                            </h3>

                            <p className="dm-success__subtitle">
                                <strong>{claseCreada.nombreC}</strong>
                            </p>

                            <div className="dm-success__password-block">
                                <div className="dm-success__password-label">
                                    <Lock size={14} />
                                    Contraseña de acceso
                                </div>

                                <div className="dm-success__password-box">
                                    <span className="dm-success__password-value">
                                        {claseCreada.password_clase}
                                    </span>
                                    <button
                                        className="dm-success__copy-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText(claseCreada.password_clase);
                                            setCopiado(true);
                                            setTimeout(() => setCopiado(false), 2000);
                                        }}
                                        type="button"
                                        title="Copiar al portapapeles"
                                    >
                                        {copiado ? (
                                            <>
                                                <Check size={14} />
                                                Copiado
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} />
                                                Copiar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <p className="dm-success__hint">
                                Comparte esta contraseña con tus estudiantes para que se unan a la clase.
                            </p>

                            <button
                                className="dm-btn dm-btn--primary dm-success__close-btn"
                                onClick={() => {
                                    setClaseCreada(null);
                                    setCopiado(false);
                                }}
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ============================================================
// SECCIONES
// ============================================================

function MiPerfil({ user }) {
    return (
        <div className="dm-section">
            <header className="dm-section__head">
                <div className="dm-section__icon">
                    <User size={22} />
                </div>
                <div>
                    <h2 className="dm-section__title">Mi Perfil</h2>
                    <p className="dm-section__subtitle">
                        Información de tu cuenta
                    </p>
                </div>
            </header>

            <div className="dm-profile-card">
                <div className="dm-profile-card__avatar">
                    {user?.nombre?.[0]}
                    {user?.apellido1?.[0]}
                </div>
                <div className="dm-profile-card__info">
                    <p className="dm-profile-card__name">
                        {user?.nombre} {user?.apellido1}{' '}
                        {user?.apellido2 || ''}
                    </p>
                    <p className="dm-profile-card__role">Docente</p>
                </div>
            </div>

            <div className="dm-info-grid">
                <div className="dm-info-item">
                    <span className="dm-info-item__label">Usuario</span>
                    <span className="dm-info-item__value">
                        {user?.username}
                    </span>
                </div>
                <div className="dm-info-item">
                    <span className="dm-info-item__label">
                        Correo Electrónico
                    </span>
                    <span className="dm-info-item__value">{user?.email}</span>
                </div>
                <div className="dm-info-item">
                    <span className="dm-info-item__label">Rol</span>
                    <span className="dm-info-item__value">
                        {user?.rol}
                    </span>
                </div>
                <div className="dm-info-item">
                    <span className="dm-info-item__label">Departamento</span>
                    <span className="dm-info-item__value">
                        {user?.departamento || 'No asignado'}
                    </span>
                </div>
            </div>
        </div>
    );
}

function MisClases({ clases, setClaseSeleccionada, setActiveSection }) {
    const handleVerClase = (clase) => {
        setClaseSeleccionada(clase);
        setActiveSection('detalleClase');
    };

    return (
        <div className="dm-section">
            <header className="dm-section__head">
                <div className="dm-section__icon">
                    <BookOpen size={22} />
                </div>
                <div>
                    <h2 className="dm-section__title">Mis Clases</h2>
                    <p className="dm-section__subtitle">
                        {clases.length}{' '}
                        {clases.length === 1 ? 'clase creada' : 'clases creadas'}
                    </p>
                </div>
            </header>

            {clases.length > 0 ? (
                <div className="dm-clases-grid">
                    {clases.map((clase) => (
                        <button
                            key={clase.id_clase}
                            className="dm-clase-card"
                            onClick={() => handleVerClase(clase)}
                        >
                            <div className="dm-clase-card__head">
                                <h3 className="dm-clase-card__title">
                                    {clase.nombrec}
                                </h3>
                                <span
                                    className={`dm-badge dm-badge--${(clase.estado_clase || '').toLowerCase()}`}
                                >
                                    {clase.estado_clase}
                                </span>
                            </div>

                            <div className="dm-clase-card__stats">
                                <div className="dm-stat">
                                    <Users size={14} />
                                    <span>{clase.numest || 0} est.</span>
                                </div>
                                <div className="dm-stat">
                                    <Calendar size={14} />
                                    <span>
                                        {clase.turno || 'Sin turno'}
                                    </span>
                                </div>
                            </div>

                            <div className="dm-clase-card__footer">
                                <span className="dm-clase-card__cta">
                                    Ver detalles
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="dm-empty">
                    <BookOpen size={40} className="dm-empty__icon" />
                    <p className="dm-empty__title">Sin clases creadas</p>
                    <p className="dm-empty__text">
                        Haz clic en "Crear Clase" para comenzar
                    </p>
                </div>
            )}
        </div>
    );
}

function MiPlanificacion({ onPlanificar }) {
    const beneficios = [
        { icon: CheckCircle2, text: 'Planifica por trimestres y semanas' },
        { icon: BookOpen, text: 'Asigna unidades temáticas a cada semana' },
        { icon: BarChart3, text: 'Visualiza el avance de tu planificación' },
    ];

    return (
        <div className="dm-section">
            <div className="dm-planning-hero">
                <div className="dm-planning-hero__icon">
                    <ClipboardList size={36} />
                </div>
                <h2 className="dm-planning-hero__title">
                    Planificación Académica
                </h2>
                <p className="dm-planning-hero__subtitle">
                    Organiza tus clases, distribuye los contenidos por semanas
                    y mantén un seguimiento claro de tu enseñanza.
                </p>

                <div className="dm-planning-benefits">
                    {beneficios.map(({ icon: Icon, text }) => (
                        <div key={text} className="dm-benefit">
                            <Icon size={18} />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>

                <button
                    className="dm-btn dm-btn--primary dm-btn--lg"
                    onClick={onPlanificar}
                >
                    <ClipboardList size={18} />
                    Comenzar Planificación
                </button>
            </div>
        </div>
    );
}

function DetalleClase({
    clase,
    volver,
    onAdministrarEstudiantes,
    onVerEstadisticas,
}) {
    // 🆕 Estado para el feedback de "Copiado"
    const [copiado, setCopiado] = useState(false);

    if (!clase) return null;

    const items = [
        {
            label: 'Número de Estudiantes',
            value: clase.numest || 0,
            icon: Users,
        },
        {
            label: 'Unidad Educativa',
            value: clase.nombre_ue || 'No asignada',
            icon: Building2,
        },
        { label: 'Grado', value: clase.nombre_grado || 'No asignado', icon: School },
        {
            label: 'Asignatura',
            value: clase.nombre_asignatura || 'No asignada',
            icon: BookOpen,
        },
    ];

    const handleCopiarPassword = () => {
        if (!clase.password_clase) return;
        navigator.clipboard.writeText(clase.password_clase);
        setCopiado(true);
        setTimeout(() => setCopiado(false), 2000);
    };

    return (
        <div className="dm-section">
            <button className="dm-btn dm-btn--ghost" onClick={volver}>
                <ArrowLeft size={16} />
                Volver a Mis Clases
            </button>

            <header className="dm-detail-header">
                <div className="dm-section__icon">
                    <BookOpen size={22} />
                </div>
                <div>
                    <h2 className="dm-section__title">{clase.nombrec}</h2>
                    <p className="dm-section__subtitle">Detalle de la clase</p>
                </div>
                <span
                    className={`dm-badge dm-badge--${(clase.estado_clase || '').toLowerCase()}`}
                >
                    {clase.estado_clase}
                </span>
            </header>

            <div className="dm-info-grid dm-info-grid--wide">
                {items.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="dm-info-item">
                        <div className="dm-info-item__head">
                            <Icon size={14} />
                            <span className="dm-info-item__label">{label}</span>
                        </div>
                        <span className="dm-info-item__value">{value}</span>
                    </div>
                ))}
            </div>

            {/* ============ CONTRASEÑA CON BOTÓN COPIAR ============ */}
            <div className="dm-password-card">
                <div className="dm-password-card__head">
                    <KeyRound size={14} />
                    <span className="dm-password-card__label">Contraseña de Acceso</span>
                </div>
                <div className="dm-password-card__body">
                    <span className="dm-password-card__value">
                        {clase.password_clase || 'No definida'}
                    </span>
                    <button
                        className={`dm-password-card__copy ${copiado ? 'is-copiado' : ''}`}
                        onClick={handleCopiarPassword}
                        type="button"
                        title="Copiar al portapapeles"
                    >
                        {copiado ? (
                            <>
                                <Check size={14} />
                                ¡Copiado!
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                Copiar
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="dm-detail-actions">
                <h4 className="dm-detail-actions__title">Acciones</h4>
                <div className="dm-detail-actions__buttons">
                    <button
                        className="dm-btn dm-btn--primary"
                        onClick={onAdministrarEstudiantes}
                    >
                        <GraduationCap size={16} />
                        Ver Estudiantes
                    </button>
                    <button
                        className="dm-btn dm-btn--ghost"
                        onClick={onVerEstadisticas}
                    >
                        <BarChart3 size={16} />
                        Ver Estadísticas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardMaestro;