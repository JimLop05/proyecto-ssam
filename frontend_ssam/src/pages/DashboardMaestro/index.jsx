// frontend_ssam/src/pages/DashboardMaestro/index.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardMaestro.css';

function DashboardMaestro() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeSection, setActiveSection] = useState('perfil');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [clases, setClases] = useState([]);
    const [showSubmenu, setShowSubmenu] = useState(false);
    
    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        nombreC: '',
        id_distrito: '',
        id_ue: '',
        tipo_ue: '',
        numEst: '',
        password_clase: '',
        turno: '',
        id_grado: '',
        id_asig: ''
    });

    // Estados para los selects
    const [grados, setGrados] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [unidadesEducativas, setUnidadesEducativas] = useState([]);
    const [unidadesFiltradas, setUnidadesFiltradas] = useState([]);
    const [claseSeleccionada, setClaseSeleccionada] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (!userData) {
            navigate('/login');
            return;
        }
        setUser(userData);
        cargarClases();
    }, [navigate]);

    const cargarClases = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/clases/mis-clases', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setClases(data.data);
            }
        } catch (error) {
            console.error('Error al cargar clases:', error);
        }
    };

    // Cargar datos para el formulario
    const cargarDatosFormulario = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/clases/datos-formulario', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
            // Filtrar grados para mostrar solo id_grado = 6
            const gradosFiltrados = data.data.grados.filter(g => g.id_grado === 6);
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Filtrar UE cuando cambia el distrito
    const handleDistritoChange = (e) => {
        const id_distrito = e.target.value;
        setFormData({
            ...formData,
            id_distrito: id_distrito,
            id_ue: '' // Resetear UE
        });
        
        if (id_distrito) {
            const filtradas = unidadesEducativas.filter(ue => ue.id_distrito === parseInt(id_distrito));
            setUnidadesFiltradas(filtradas);
        } else {
            setUnidadesFiltradas(unidadesEducativas);
        }
    };

    // Abrir modal y cargar datos
    const abrirModal = () => {
        setShowModal(true);
        cargarDatosFormulario();
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
                estado_clase: 'ACTIVA' // Se autocompleta
            };

            const response = await fetch('http://localhost:5000/api/clases/crear', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosEnvio)
            });

            const data = await response.json();

            if (data.success) {
                setMensaje('✅ Clase creada exitosamente!');
                setFormData({
                    nombreC: '',
                    id_distrito: '',
                    id_ue: '',
                    tipo_ue: '',
                    numEst: '',
                    password_clase: '',
                    turno: '',
                    id_grado: '',
                    id_asig: ''
                });
                setUnidadesFiltradas([]);
                cargarClases();
                setTimeout(() => {
                    setShowModal(false);
                    setMensaje('');
                }, 2000);
            } else {
                setMensaje('❌ Error: ' + data.message);
            }
        } catch (error) {
            setMensaje('❌ Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch(activeSection) {
            case 'perfil':
                return <MiPerfil user={user} />;
            case 'clases':
                return <MisClases 
                    user={user}
                    clases={clases}
                    setClaseSeleccionada={setClaseSeleccionada}
                    setActiveSection={setActiveSection}
                />;
            case 'detalleClase':
                return <DetalleClase 
                    clase={claseSeleccionada}
                    volver={() => {
                        setClaseSeleccionada(null);
                        setActiveSection('clases');
                    }}
                />;
            case 'estudiantes':
                return <MisEstudiantes />;
            case 'planificacion':
                return <MiPlanificacion />;
            case 'reportes':
                return <MisReportes />;
            default:
                return <MiPerfil user={user} />;
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-left">
                    <img src="/LogoSSAM.png" alt="SSAM" className="logo" />
                    <h1>Dashboard Maestro</h1>
                </div>
                <div className="header-right">
                    <span className="user-name">{user?.nombre} {user?.apellido1}</span>
                    <button className="btn-crear-clase-header" onClick={abrirModal}>
                        + Crear Clase
                    </button>
                    <button onClick={handleLogout} className="btn-logout">
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <div className="dashboard-body">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <button 
                            className={`sidebar-item ${activeSection === 'perfil' ? 'active' : ''}`}
                            onClick={() => setActiveSection('perfil')}
                        >
                            👤 Mi Perfil
                        </button>
                        <button 
                            className={`sidebar-item ${activeSection === 'clases' ? 'active' : ''}`}
                            onClick={() => {
                                setActiveSection('clases');
                                setShowSubmenu(!showSubmenu);
                            }}
                        >
                            📚 Mis Clases {showSubmenu && activeSection === 'clases' ? '▼' : '▶'}
                        </button>
                        {showSubmenu && activeSection === 'clases' && (
                            <div className="submenu">
                                {clases.length > 0 ? (
                                    clases.map(clase => (
                                        <button key={clase.id_clase} className="submenu-item">
                                            📖 {clase.nombrec}
                                        </button>
                                    ))
                                ) : (
                                    <p className="submenu-empty">No tienes clases creadas</p>
                                )}
                            </div>
                        )}
                        <button 
                            className={`sidebar-item ${activeSection === 'estudiantes' ? 'active' : ''}`}
                            onClick={() => setActiveSection('estudiantes')}
                        >
                            👨‍🎓 Mis Estudiantes
                        </button>
                        <button 
                            className={`sidebar-item ${activeSection === 'planificacion' ? 'active' : ''}`}
                            onClick={() => setActiveSection('planificacion')}
                        >
                            📋 Mi Planificación
                        </button>
                        <button 
                            className={`sidebar-item ${activeSection === 'reportes' ? 'active' : ''}`}
                            onClick={() => setActiveSection('reportes')}
                        >
                            📊 Mis Reportes
                        </button>
                    </nav>
                </aside>

                <main className="main-content">
                    {renderContent()}
                </main>
            </div>

            {/* ===== MODAL ===== */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>📝 Crear Nueva Clase</h3>
                            <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleSubmitClase}>
                            <div className="form-group">
                                <label>Nombre de la Clase *</label>
                                <input
                                    type="text"
                                    name="nombreC"
                                    value={formData.nombreC}
                                    onChange={handleInputChange}
                                    placeholder="Ej: Matemáticas 5to A"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Distrito *</label>
                                <select
                                    name="id_distrito"
                                    value={formData.id_distrito || ''}
                                    onChange={handleDistritoChange}
                                    required
                                    className="select-custom"
                                >
                                    <option value="">Seleccionar Distrito</option>
                                    {distritos.map(d => (
                                        <option key={d.id_distrito} value={d.id_distrito}>
                                            {d.nombred}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Unidad Educativa *</label>
                                <select
                                    name="id_ue"
                                    value={formData.id_ue}
                                    onChange={handleInputChange}
                                    required
                                    className="select-custom"
                                >
                                    <option value="">Seleccionar UE</option>
                                    {unidadesFiltradas.map(ue => (
                                        <option key={ue.id_ue} value={ue.id_ue}>
                                            {ue.nombre}
                                        </option>
                                    ))}
                                </select>
                                {unidadesFiltradas.length === 0 && formData.id_distrito && (
                                    <p style={{ color: '#dc3545', fontSize: '13px', marginTop: '5px' }}>
                                        No hay Unidades Educativas en este distrito
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Tipo de Unidad Educativa *</label>
                                <select
                                    name="tipo_ue"
                                    value={formData.tipo_ue}
                                    onChange={handleInputChange}
                                    required
                                    className="select-custom"
                                >
                                    <option value="">Seleccionar Tipo</option>
                                    <option value="Fiscal">Fiscal</option>
                                    <option value="Privada">Privada</option>
                                    <option value="Convenio">Convenio</option>
                                </select>
                            </div>

                            <div className="form-row">
                               <div className="form-group">
                                <label>Número de Estudiantes *</label>
                                <input
                                    type="number"
                                    name="numEst"
                                    value={formData.numEst}
                                    onChange={handleInputChange}
                                    placeholder="Ej: 25"
                                    min="1"
                                    required
                                />
                                {/* Mostrar capacidad máxima si hay UE seleccionada */}
                                {formData.id_ue && (
                                    <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                                        Capacidad máxima de la UE: {unidadesFiltradas.find(ue => ue.id_ue === parseInt(formData.id_ue))?.num_est || 'N/A'} estudiantes
                                    </p>
                                )}
                            </div>

                                <div className="form-group">
                                    <label>Contraseña de la Clase *</label>
                                    <input
                                        type="text"
                                        name="password_clase"
                                        value={formData.password_clase}
                                        onChange={handleInputChange}
                                        placeholder="Ej: 123456"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Turno *</label>
                                <select
                                    name="turno"
                                    value={formData.turno}
                                    onChange={handleInputChange}
                                    required
                                    className="select-custom"
                                >
                                    <option value="">Seleccionar Turno</option>
                                    <option value="Mañana">Mañana</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noche">Noche</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Grado *</label>
                                    <select
                                        name="id_grado"
                                        value={formData.id_grado}
                                        onChange={handleInputChange}
                                        required
                                        className="select-custom"
                                    >
                                        <option value="">Seleccionar</option>
                                        {grados.map(g => (
                                            <option key={g.id_grado} value={g.id_grado}>
                                                {g.titulog}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Asignatura *</label>
                                    <select
                                        name="id_asig"
                                        value={formData.id_asig}
                                        onChange={handleInputChange}
                                        required
                                        className="select-custom"
                                    >
                                        <option value="">Seleccionar</option>
                                        {asignaturas.map(a => (
                                            <option key={a.id_asig} value={a.id_asig}>
                                                {a.nombrea}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {mensaje && (
                                <div className={`mensaje ${mensaje.includes('✅') ? 'mensaje-exito' : 'mensaje-error'}`}>
                                    {mensaje}
                                </div>
                            )}

                            <div className="form-actions">
                                <button type="button" className="btn-cancelar" onClick={() => setShowModal(false)}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-guardar" disabled={loading}>
                                    {loading ? 'Creando...' : 'Crear Clase'}
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
// COMPONENTES DE SECCIONES
// ============================================================

function MiPerfil({ user }) {
    return (
        <div className="section">
            <h2>👤 Mi Perfil</h2>
            <div className="profile-card">
                <p><strong>Nombre:</strong> {user?.nombre} {user?.apellido1} {user?.apellido2 || ''}</p>
                <p><strong>Username:</strong> {user?.username}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Rol:</strong> {user?.rol}</p>
                <p><strong>Departamento:</strong> {user?.departamento || 'No asignado'}</p>
            </div>
        </div>
    );
}

function MisClases({ user, clases, setClaseSeleccionada, setActiveSection }) {
    const handleVerClase = (clase) => {
        setClaseSeleccionada(clase);
        setActiveSection('detalleClase');
    };

    return (
        <div className="section">
            <div className="section-header">
                <h2>📚 Mis Clases</h2>
            </div>
            
            {clases.length > 0 ? (
                <div className="clases-grid">
                    {clases.map(clase => (
                        <div key={clase.id_clase} className="clase-card" onClick={() => handleVerClase(clase)}>
                            <h3>{clase.nombrec}</h3>
                            <p><strong>Código:</strong> {clase.id_clase}</p>
                            <p><strong>Estudiantes:</strong> {clase.numest || 0}</p>
                            <p><strong>Estado:</strong> {clase.estado_clase}</p>
                            <p><strong>Turno:</strong> {clase.turno || 'No especificado'}</p>
                            <button className="btn-ver-clase">Ver Detalles →</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                    No tienes clases creadas aún. Haz clic en "Crear Clase" en el header.
                </p>
            )}
        </div>
    );
}

function MisEstudiantes() {
    return (
        <div className="section">
            <h2>👨‍🎓 Mis Estudiantes</h2>
            <p>Aquí se mostrarán tus estudiantes.</p>
            <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                Próximamente: listado de estudiantes
            </p>
        </div>
    );
}

function MiPlanificacion() {
    return (
        <div className="section">
            <h2>📋 Mi Planificación</h2>
            <p>Aquí podrás gestionar tu planificación académica.</p>
            <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                Próximamente: creación de planificaciones, unidades temáticas, etc.
            </p>
        </div>
    );
}

function MisReportes() {
    return (
        <div className="section">
            <h2>📊 Mis Reportes</h2>
            <p>Aquí se mostrarán tus reportes y estadísticas.</p>
            <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                Próximamente: gráficos y reportes
            </p>
        </div>
    );
}

function DetalleClase({ clase, volver }) {
    return (
        <div className="section">
            <div className="section-header">
                <h2>📖 Detalle de la Clase</h2>
                <button className="btn-volver" onClick={volver}>
                    ← Volver a Mis Clases
                </button>
            </div>

            {clase && (
                <div className="detalle-clase">
                    <div className="detalle-header">
                        <h3>{clase.nombrec}</h3>
                        <span className={`estado-badge ${clase.estado_clase.toLowerCase()}`}>
                            {clase.estado_clase}
                        </span>
                    </div>

                    <div className="detalle-grid">
                        <div className="detalle-item">
                            <label>Código de Clase</label>
                            <p>{clase.id_clase}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Número de Estudiantes</label>
                            <p>{clase.numest || 0}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Contraseña de Acceso</label>
                            <p>{clase.password_clase || 'No definida'}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Período</label>
                            <p>{clase.periodo || 'No definido'}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Turno</label>
                            <p>{clase.turno || 'No especificado'}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Unidad Educativa</label>
                            <p>{clase.nombre_ue || 'No asignada'}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Grado</label>
                            <p>{clase.nombre_grado || 'No asignado'}</p>
                        </div>
                        <div className="detalle-item">
                            <label>Asignatura</label>
                            <p>{clase.nombre_asignatura || 'No asignada'}</p>
                        </div>
                    </div>

                    <div className="detalle-acciones">
                        <h4>Acciones</h4>
                        <div className="acciones-botones">
                            <button className="btn-accion">👨‍🎓 Ver Estudiantes</button>
                            <button className="btn-accion">📝 Crear Evaluación</button>
                            <button className="btn-accion">📊 Ver Estadísticas</button>
                            <button className="btn-accion">⚙️ Gestionar Clase</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardMaestro;