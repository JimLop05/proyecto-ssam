// frontend_ssam/src/pages/RegistroEstudiante/index.jsx
// ============================================================
// REGISTRO DE ESTUDIANTE
// Formulario público para que un estudiante se registre
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    GraduationCap,
    User,
    Mail,
    Lock,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import api from '../../api/axios';
import './RegistroEstudiante.css';

function RegistroEstudiante() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
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
    const payload = {
        username: formData.username,
        nombre: formData.nombre,
        apellido1: formData.apellido1,
        apellido2: formData.apellido2 || '',
        email: formData.email,
        password: formData.password,
        rol: 'ESTUDIANTE',
        fecha_nacimiento: '2000-01-01',
        sexo: 'M',
        tipo_estudiante: 'PUBLICO',
    };

    // 1. Crear la cuenta
    const registerResponse = await api.post('/auth/register', payload);
    console.log('✅ Registro exitoso:', registerResponse.data);

    // 2. Login automático con las mismas credenciales
    const loginResponse = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
    });

    const { token, user } = loginResponse.data;

    // 3. Guardar sesión
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    // 4. Mostrar éxito y redirigir al dashboard
    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
        // Redirigir según rol (por si acaso el backend devuelve otro)
        switch (user?.rol) {
            case 'ESTUDIANTE':
                navigate('/dashboard/estudiante');
                break;
            case 'MAESTRO':
                navigate('/dashboard/maestro');
                break;
            default:
                navigate('/dashboard/estudiante');
        }
    }, 1500);
} catch (err) {
    console.error('❌ Error en registro:', err);
    setError(
        err.response?.data?.message ||
            'Error al registrar. Intenta de nuevo.'
    );
    setLoading(false);
}
    };

    // ==================== VISTA ÉXITO ====================
    if (success) {
        return (
            <div className="re-page">
                <div className="re-card re-card--success">
                    <div className="re-success-icon">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="re-success-title">¡Registro exitoso!</h1>
                    <p className="re-success-text">
                        Tu cuenta de estudiante ha sido creada correctamente.
                    </p>
                    <p className="re-success-hint">
                        <p className="re-success-hint">
                            Redirigiendo a tu panel de estudiante...
                        </p>
                    </p>
                    <Loader2 className="re-success-spinner" />
                </div>
            </div>
        );
    }

    // ==================== VISTA FORMULARIO ====================
    return (
        <div className="re-page">
            {/* Botón volver */}
            <button
                className="re-back"
                onClick={() => navigate('/')}
                type="button"
            >
                <ArrowLeft size={18} />
                Volver al inicio
            </button>

            <div className="re-card">
                {/* Encabezado */}
                <header className="re-header">
                    <div className="re-header-icon">
                        <GraduationCap size={28} />
                    </div>
                    <h1 className="re-title">Registro de Estudiante</h1>
                    <p className="re-subtitle">
                        Crea tu cuenta para acceder a la plataforma
                    </p>
                </header>

                {/* Alerta de error */}
                {error && (
                    <div className="re-alert re-alert--error" role="alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="re-form">
                    {/* Usuario */}
                    <div className="re-field">
                        <label htmlFor="username" className="re-label">
                            Usuario
                        </label>
                        <div className="re-input-wrapper">
                            <User className="re-input-icon" size={18} />
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="re-input"
                                placeholder="ej: 123JUAN"
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Nombre + Apellido Paterno */}
                    <div className="re-row">
                        <div className="re-field">
                            <label htmlFor="nombre" className="re-label">
                                Nombre
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="re-input re-input--standalone"
                                placeholder="Juan"
                                autoComplete="given-name"
                            />
                        </div>

                        <div className="re-field">
                            <label htmlFor="apellido1" className="re-label">
                                Apellido Paterno
                            </label>
                            <input
                                id="apellido1"
                                type="text"
                                name="apellido1"
                                value={formData.apellido1}
                                onChange={handleChange}
                                required
                                className="re-input re-input--standalone"
                                placeholder="Pérez"
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    {/* Apellido Materno + Email */}
                    <div className="re-row">
                        <div className="re-field">
                            <label htmlFor="apellido2" className="re-label">
                                Apellido Materno{' '}
                            </label>
                            <input
                                id="apellido2"
                                type="text"
                                name="apellido2"
                                value={formData.apellido2}
                                onChange={handleChange}
                                className="re-input re-input--standalone"
                                placeholder="(Opcional)"
                                autoComplete="family-name"
                            />
                        </div>

                        <div className="re-field">
                            <label htmlFor="email" className="re-label">
                                Correo Electrónico
                            </label>
                            <div className="re-input-wrapper">
                                <Mail className="re-input-icon" size={18} />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="re-input"
                                    placeholder="juan@email.com"
                                    autoComplete="email"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password + Confirm */}
                    <div className="re-row">
                        <div className="re-field">
                            <label htmlFor="password" className="re-label">
                                Contraseña
                            </label>
                            <div className="re-input-wrapper">
                                <Lock className="re-input-icon" size={18} />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="re-input"
                                    placeholder="Mínimo 6 caracteres"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>

                        <div className="re-field">
                            <label htmlFor="confirmPassword" className="re-label">
                                Confirmar Contraseña
                            </label>
                            <div className="re-input-wrapper">
                                <Lock className="re-input-icon" size={18} />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="re-input"
                                    placeholder="Repite tu contraseña"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="re-btn-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="re-btn-spinner" size={18} />
                                Registrando...
                            </>
                        ) : (
                            <>
                                <GraduationCap size={18} />
                                Registrarme como Estudiante
                            </>
                        )}
                    </button>

                    {/* Login hint */}
                    <p className="re-footer">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="re-link">
                            Inicia Sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegistroEstudiante;