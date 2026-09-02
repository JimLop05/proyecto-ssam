// ============================================================
// REGISTRO DE ESTUDIANTE
// Formulario público para que un estudiante se registre
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function RegistroEstudiante() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        // Validar longitud mínima
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            setLoading(false);
            return;
        }

        try {
            // Datos para el backend (rol fijo: ESTUDIANTE)
            const payload = {
                username: formData.username,
                nombre: formData.nombre,
                apellido1: formData.apellido1,
                apellido2: formData.apellido2 || '', // opcional
                email: formData.email,
                password: formData.password,
                rol: 'ESTUDIANTE',
                // Campos opcionales con valores por defecto
                fecha_nacimiento: '2000-01-01',
                sexo: 'M',
                tipo_estudiante: 'PUBLICO'
            };

            const response = await api.post('/auth/register', payload);
            console.log('✅ Registro exitoso:', response.data);

            setSuccess(true);
            setLoading(false);

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('❌ Error en registro:', err);
            setError(err.response?.data?.message || 'Error al registrar. Intenta de nuevo.');
            setLoading(false);
        }
    };

    // Si el registro fue exitoso, mostrar mensaje de éxito
    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.successCard}>
                    <h1>✅ ¡Registro exitoso!</h1>
                    <p>Tu cuenta de estudiante ha sido creada correctamente.</p>
                    <p>Serás redirigido a la página de inicio de sesión...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>🧑‍🎓 Registro de Estudiante</h1>
                <p style={styles.subtitle}>Crea tu cuenta para acceder a la plataforma</p>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Usuario</label>
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
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Nombre</label>
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
                        <div style={styles.field}>
                            <label>Apellido Paterno</label>
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
                    </div>

                    <div style={styles.row}>
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
                        <div style={styles.field}>
                            <label>Correo Electrónico</label>
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
                    </div>

                    <div style={styles.row}>
                        <div style={styles.field}>
                            <label>Contraseña</label>
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
                            <label>Confirmar Contraseña</label>
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

                    <button type="submit" style={styles.btnRegistrar} disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarme como Estudiante'}
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
    title: {
        fontSize: '28px',
        color: '#1A5276',
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
    btnRegistrar: {
        backgroundColor: '#1A5276',
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
    btnRegistrarDisabled: {
        backgroundColor: '#999',
        cursor: 'not-allowed'
    },
    error: {
        backgroundColor: '#fee',
        color: '#c00',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center'
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

export default RegistroEstudiante;