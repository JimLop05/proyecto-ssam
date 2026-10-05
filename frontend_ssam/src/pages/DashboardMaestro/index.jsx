// frontend_ssam/src/pages/DashboardMaestro/index.jsx
// ============================================================
// DASHBOARD DEL MAESTRO
// Secciones: Perfil · Clases · Planificación
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
} from 'lucide-react';
import api from '../../api/axios';
import './DashboardMaestro.css';
import PlanificacionGestion from './PlanificacionGestion';
import AdministrarEstudiantes from './AdministrarEstudiantes';

function DashboardMaestro() {
    const navigate = useNavigate();
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

    const [formData, setFormData] = useState({
        nombreC: '',
        id_distrito: '',
        id_ue: '',
        tipo_ue: '',
        numEst: '',
        password_clase: '',
        turno: '',
        id_grado: '',
        id_asig: '',
    });

    const [grados, setGrados] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [unidadesEducativas, setUnidadesEducativas] = useState([]);
    const [unidadesFiltradas, setUnidadesFiltradas] = useState([]);

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
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:5000/api/clases/mis-clases',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await response.json();
            if (data.success) setClases(data.data);
        } catch (error) {
            console.error('Error al cargar clases:', error);
        }
    };

    const cargarDatosFormulario = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:5000/api/clases/datos-formulario',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await response.json();
            if (data.success) {
                const gradosFiltrados = data.data.grados.filter(
                    (g) => g.id_grado === 6
                );
                setGrados(gradosFiltrados);
                setAsignaturas(data.data.asignaturas || []);
                setDistritos(data.data.distritos || []);
                setUnidadesEducativas(data.data.unidadesEducativas || []);
                setUnidadesFiltradas(data.data.unidadesEducativas || []);
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
            const token = localStorage.getItem('token');
            const datosEnvio = {
                nombreC: formData.nombreC,
                id_ue: parseInt(formData.id_ue),
                id_grado: parseInt(formData.id_grado),
                id_asig: parseInt(formData.id_asig),
                numEst: parseInt(formData.numEst),
                password_clase: formData.password_clase,
                turno: formData.turno,
                tipo_ue: formData.tipo_ue,
                estado_clase: 'ACTIVA',
            };

            const response = await fetch(
                'http://localhost:5000/api/clases/crear',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(datosEnvio),
                }
            );

            const data = await response.json();

            if (data.success) {
                setMensaje('Clase creada exitosamente');
                setFormData({
                    nombreC: '',
                    id_distrito: '',
                    id_ue: '',
                    tipo_ue: '',
                    numEst: '',
                    password_clase: '',
                    turno: '',
                    id_grado: '',
                    id_asig: '',
                });
                setUnidadesFiltradas([]);
                cargarClases();
                setTimeout(() => {
                    setShowModal(false);
                    setMensaje('');
                }, 1800);
            } else {
                setMensaje('Error: ' + data.message);
            }
        } catch (error) {
            setMensaje('Error al conectar con el servidor');
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
                <div className="dm-header__left">
                    <img
                        src={logoSrc}
                        alt="Logo"
                        className="dm-header__logo"
                        onError={(e) => {
                            e.target.src = '/LogoSSAM.png';
                        }}
                    />
                    <div className="dm-header__titles">
                        <h1 className="dm-header__title">{systemName}</h1>
                        <p className="dm-header__subtitle">Panel del Maestro</p>
                    </div>
                </div>

                <div className="dm-header__right">
                    <button
                        className="dm-btn dm-btn--primary"
                        onClick={abrirModal}
                    >
                        <Plus size={16} />
                        Crear Clase
                    </button>

                    <div className="dm-user-chip">
                        <div className="dm-user-chip__avatar">
                            {user?.nombre?.[0]}
                            {user?.apellido1?.[0]}
                        </div>
                        <div className="dm-user-chip__info">
                            <span className="dm-user-chip__name">
                                {user?.nombre} {user?.apellido1}
                            </span>
                            <span className="dm-user-chip__role">
                                Docente
                            </span>
                        </div>
                    </div>

                    <button
                        className="dm-btn dm-btn--ghost"
                        onClick={handleLogout}
                        title="Cerrar sesión"
                    >
                        <LogOut size={16} />
                        Salir
                    </button>
                </div>
            </header>

            {/* ==================== BODY ==================== */}
            <div className="dm-body">
                {/* Sidebar */}
                <aside className="dm-sidebar">
                    <nav className="dm-sidebar__nav">
                        <button
                            className={`dm-sidebar__item ${
                                activeSection === 'perfil' ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveSection('perfil')}
                        >
                            <User size={18} />
                            Mi Perfil
                        </button>

                        <button
                            className={`dm-sidebar__item ${
                                activeSection === 'clases' ? 'is-active' : ''
                            }`}
                            onClick={() => setActiveSection('clases')}
                        >
                            <BookOpen size={18} />
                            Mis Clases
                            {clases.length > 0 && (
                                <span className="dm-sidebar__badge">
                                    {clases.length}
                                </span>
                            )}
                        </button>

                        <button
                            className={`dm-sidebar__item ${
                                activeSection === 'planificacion'
                                    ? 'is-active'
                                    : ''
                            }`}
                            onClick={() => setActiveSection('planificacion')}
                        >
                            <ClipboardList size={18} />
                            Mi Planificación
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

                        <form
                            onSubmit={handleSubmitClase}
                            className="dm-modal__form"
                        >
                            <div className="dm-field">
                                <label className="dm-label">
                                    Nombre de la Clase *
                                </label>
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
                                    <label className="dm-label">
                                        Distrito *
                                    </label>
                                    <select
                                        name="id_distrito"
                                        value={formData.id_distrito || ''}
                                        onChange={handleDistritoChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar Distrito
                                        </option>
                                        {distritos.map((d) => (
                                            <option
                                                key={d.id_distrito}
                                                value={d.id_distrito}
                                            >
                                                {d.nombred}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">
                                        Unidad Educativa *
                                    </label>
                                    <select
                                        name="id_ue"
                                        value={formData.id_ue}
                                        onChange={handleInputChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar UE
                                        </option>
                                        {unidadesFiltradas.map((ue) => (
                                            <option
                                                key={ue.id_ue}
                                                value={ue.id_ue}
                                            >
                                                {ue.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {unidadesFiltradas.length === 0 &&
                                        formData.id_distrito && (
                                            <p className="dm-hint dm-hint--error">
                                                No hay Unidades Educativas en
                                                este distrito
                                            </p>
                                        )}
                                </div>
                            </div>

                            <div className="dm-row">
                                <div className="dm-field">
                                    <label className="dm-label">
                                        Tipo de UE *
                                    </label>
                                    <select
                                        name="tipo_ue"
                                        value={formData.tipo_ue}
                                        onChange={handleInputChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar Tipo
                                        </option>
                                        <option value="Fiscal">Fiscal</option>
                                        <option value="Privada">
                                            Privada
                                        </option>
                                        <option value="Convenio">
                                            Convenio
                                        </option>
                                    </select>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">
                                        Turno *
                                    </label>
                                    <select
                                        name="turno"
                                        value={formData.turno}
                                        onChange={handleInputChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">
                                            Seleccionar Turno
                                        </option>
                                        <option value="Mañana">Mañana</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noche">Noche</option>
                                    </select>
                                </div>
                            </div>

                            <div className="dm-row">
                                <div className="dm-field">
                                    <label className="dm-label">
                                        Número de Estudiantes *
                                    </label>
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
                                                (ue) =>
                                                    ue.id_ue ===
                                                    parseInt(formData.id_ue)
                                            )?.num_est || 'N/A'}{' '}
                                            estudiantes
                                        </p>
                                    )}
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">
                                        Contraseña de la Clase *
                                    </label>
                                    <input
                                        type="text"
                                        name="password_clase"
                                        value={formData.password_clase}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 123456"
                                        className="dm-input"
                                        required
                                    />
                                </div>
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
                                            <option
                                                key={g.id_grado}
                                                value={g.id_grado}
                                            >
                                                {g.titulog}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="dm-field">
                                    <label className="dm-label">
                                        Asignatura *
                                    </label>
                                    <select
                                        name="id_asig"
                                        value={formData.id_asig}
                                        onChange={handleInputChange}
                                        className="dm-input dm-select"
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        {asignaturas.map((a) => (
                                            <option
                                                key={a.id_asig}
                                                value={a.id_asig}
                                            >
                                                {a.nombrea}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {mensaje && (
                                <div
                                    className={`dm-alert ${
                                        mensaje.includes('exitosamente')
                                            ? 'dm-alert--success'
                                            : 'dm-alert--error'
                                    }`}
                                >
                                    {mensaje.includes('exitosamente') ? (
                                        <CheckCircle2 size={16} />
                                    ) : (
                                        <AlertCircle size={16} />
                                    )}
                                    <span>{mensaje}</span>
                                </div>
                            )}

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
                                            <Loader2
                                                className="dm-spin"
                                                size={16}
                                            />
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
        { icon: ClipboardList, text: 'Clona planificaciones anteriores' },
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

function DetalleClase({ clase, volver, onAdministrarEstudiantes }) {
    if (!clase) return null;

    const items = [
        { label: 'Código de Clase', value: clase.id_clase, icon: KeyRound },
        {
            label: 'Número de Estudiantes',
            value: clase.numest || 0,
            icon: Users,
        },
        {
            label: 'Contraseña de Acceso',
            value: clase.password_clase || 'No definida',
            icon: KeyRound,
        },
        { label: 'Turno', value: clase.turno || 'No especificado', icon: Calendar },
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
                    <button className="dm-btn dm-btn--ghost">
                        <BarChart3 size={16} />
                        Ver Estadísticas
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardMaestro;