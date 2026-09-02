// ============================================================
// REGISTRO DE MAESTRO CON CÓDIGO DE VERIFICACIÓN (VERSIÓN FINAL)
// Valida el código contra la tabla DEPARTAMENTO en la BD
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function RegistroMaestro() {
    const navigate = useNavigate();
    const [step, setStep] = useState('codigo'); // 'codigo' | 'formulario'
    const [codigo, setCodigo] = useState('');
    const [codigoError, setCodigoError] = useState('');
    const [departamentoInfo, setDepartamentoInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    
    // Datos del formulario
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: '',
        confirmPassword: '',
        especialidad: 'Matemáticas',
        categoria: 'Titular',
    });

    // ========== VALIDAR CÓDIGO ==========
    const handleValidarCodigo = async (e) => {
        e.preventDefault();
        setCodigoError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/validar-codigo-maestro', { 
                codigo: codigo.trim() 
            });

            if (response.data.success) {
                setDepartamentoInfo(response.data.data);
                setStep('formulario');
            }
        } catch (err) {
            setCodigoError('❌ Código de maestro inválido. Verifica e intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // ========== MANEJAR CAMBIOS ==========
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ========== ENVIAR REGISTRO ==========
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validaciones
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                username: formData.username,
                nombre: formData.nombre,
                apellido1: formData.apellido1,
                apellido2: formData.apellido2 || '',
                email: formData.email,
                password: formData.password,
                especialidad: formData.especialidad,
                categoria: formData.categoria,
                idDepartamento: departamentoInfo.id_departamento,
            };

            const response = await api.post('/auth/registro-maestro', payload);
            console.log('✅ Registro exitoso:', response.data);

            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
                navigate('/login');
            }, 2500);

        } catch (err) {
            console.error('❌ Error en registro:', err);
            setError(err.response?.data?.message || 'Error al registrar. Intenta de nuevo.');
            setLoading(false);
        }
    };

    // ========== PANTALLA DE ÉXITO ==========
    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <h1 style={{ color: '#28a745' }}>✅ ¡Registro exitoso!</h1>
                    <p>Tu cuenta de maestro ha sido creada correctamente.</p>
                    <p><strong>Departamento asignado:</strong> {departamentoInfo?.nombre}</p>
                    <p>Serás redirigido a la página de inicio de sesión...</p>
                </div>
            </div>
        );
    }

    // ========== PANTALLA DE CÓDIGO ==========
    if (step === 'codigo') {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1 style={styles.title}>👨‍🏫 Registro de Maestro</h1>
                    <p style={styles.subtitle}>Ingresa el código de verificación para continuar</p>

                    <form onSubmit={handleValidarCodigo} style={styles.form}>
                        <div style={styles.field}>
                            <label>Código de Maestro</label>
                            <input
                                type="password"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required
                                style={styles.input}
                                placeholder="Ej: LP2026"
                                disabled={loading}
                            />
                            {codigoError && <p style={styles.errorText}>{codigoError}</p>}
                        </div>

                        <button 
                            type="submit" 
                            style={styles.btnValidar}
                            disabled={loading}
                        >
                            {loading ? 'Validando...' : 'Validar Código'}
                        </button>

                        <p style={styles.footer}>
                            ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} style={styles.link}>Inicia Sesión</span>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    // ========== PANTALLA DE FORMULARIO ==========
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>👨‍🏫 Registro de Maestro</h1>
                <p style={styles.subtitle}>
                    Validado para: <strong>{departamentoInfo?.nombre}</strong>
                </p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* DATOS PERSONALES */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Usuario *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="ej: juan.perez"
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Juan"
                            />
                        </div>
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Apellido Paterno *</label>
                            <input
                                type="text"
                                name="apellido1"
                                value={formData.apellido1}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Pérez"
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Apellido Materno</label>
                            <input
                                type="text"
                                name="apellido2"
                                value={formData.apellido2}
                                onChange={handleChange}
                                style={styles.input}
                                placeholder="García (opcional)"
                            />
                        </div>
                    </div>

                    <div style={styles.field}>
                        <label>Correo Electrónico *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="juan@email.com"
                        />
                    </div>

                    {/* CONTRASEÑAS */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Contraseña *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Mínimo 6 caracteres"
                            />
                        </div>
                        <div style={styles.field}>
                            <label>Confirmar Contraseña *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                style={styles.input}
                                placeholder="Repite tu contraseña"
                            />
                        </div>
                    </div>

                    {/* DATOS PROFESIONALES */}
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Especialidad</label>
                            <select
                                name="especialidad"
                                value={formData.especialidad}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="Matemáticas">Matemáticas</option>
                            </select>
                        </div>
                        <div style={styles.field}>
                            <label>Categoría</label>
                            <select
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                style={styles.input}
                            >
                                <option value="Primera">Primera</option>
                                <option value="Segunda">Segunda</option>
                                <option value="Tercera">Tercera</option>
                                <option value="cuarta">Cuarta</option>
                                <option value="Quinta">Quinta</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        style={styles.btnRegistrar}
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Registrarme como Maestro'}
                    </button>

                    <p style={styles.footer}>
                        ¿Ya tienes cuenta? <span onClick={() => navigate('/login')} style={styles.link}>Inicia Sesión</span>
                    </p>
                </form>
            </div>
        </div>
    );
}

// ==================== ESTILOS ========================
const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f6f8',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        maxWidth: '700px',
        width: '100%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    successCard: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },
    title: {
        fontSize: '28px',
        color: '#F39C12',
        marginBottom: '5px',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: '16px',
        color: '#777',
        marginBottom: '25px',
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    row: {
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
    },
    field: {
        flex: '1',
        minWidth: '200px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '16px',
        boxSizing: 'border-box'
    },
    btnValidar: {
        backgroundColor: '#F39C12',
        color: 'white',
        border: 'none',
        padding: '14px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background 0.2s'
    },
    btnRegistrar: {
        backgroundColor: '#F39C12',
        color: 'white',
        border: 'none',
        padding: '14px',
        borderRadius: '5px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px',
        transition: 'background 0.2s'
    },
    error: {
        backgroundColor: '#fee',
        color: '#c00',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center'
    },
    errorText: {
        color: '#c00',
        fontSize: '14px',
        marginTop: '5px'
    },
    footer: {
        marginTop: '20px',
        textAlign: 'center',
        color: '#555'
    },
    link: {
        color: '#1A5276',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline'
    }
};

export default RegistroMaestro;