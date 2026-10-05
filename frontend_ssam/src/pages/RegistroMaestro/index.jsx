// frontend_ssam/src/pages/RegistroMaestro/index.jsx
// ============================================================
// REGISTRO DE MAESTRO CON CÓDIGO DE VERIFICACIÓN
// Paso 1: Código → Paso 2: Formulario → Paso 3: Éxito
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Presentation,
    KeyRound,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Building2,
    BookOpen,
    Award,
} from 'lucide-react';
import api from '../../api/axios';
import './RegistroMaestro.css';

function RegistroMaestro() {
    const navigate = useNavigate();
    const [step, setStep] = useState('codigo'); // 'codigo' | 'formulario'
    const [codigo, setCodigo] = useState('');
    const [codigoError, setCodigoError] = useState('');
    const [departamentoInfo, setDepartamentoInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Estados para mostrar/ocultar contraseñas
    const [showCodigo, setShowCodigo] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                codigo: codigo.trim(),
            });

            if (response.data.success) {
                setDepartamentoInfo(response.data.data);
                setStep('formulario');
            }
        } catch (err) {
            setCodigoError(
                'Código de maestro inválido. Verifica e intenta de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    };

    // ========== MANEJAR CAMBIOS ==========
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ========== ENVIAR REGISTRO ==========
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

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

            // 1. Crear la cuenta de maestro
            const response = await api.post('/auth/registro-maestro', payload);
            console.log('✅ Registro exitoso:', response.data);

            // 2. Login automático con las mismas credenciales
            const loginResponse = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            const { token, user } = loginResponse.data;

            // 3. Guardar sesión
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // 4. Mostrar éxito y redirigir
            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
                navigate('/dashboard/maestro', { replace: true });
            }, 2000);
        } catch (err) {
            console.error('❌ Error en registro:', err);
            setError(
                err.response?.data?.message ||
                    'Error al registrar. Intenta de nuevo.'
            );
            setLoading(false);
        }
    };

    // ==================== ÉXITO ====================
    if (success) {
        return (
            <div className="rm-page">
                <div className="rm-card rm-card--success">
                    <div className="rm-success-icon">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="rm-success-title">¡Registro exitoso!</h1>
                    <p className="rm-success-text">
                        Tu cuenta de maestro ha sido creada correctamente.
                    </p>
                    {departamentoInfo?.nombre && (
                        <div className="rm-success-badge">
                            <Building2 size={16} />
                            {departamentoInfo.nombre}
                        </div>
                    )}
                    <p className="rm-success-hint">
                        Redirigiendo a tu panel de maestro...
                    </p>
                    <Loader2 className="rm-success-spinner" size={20} />
                </div>
            </div>
        );
    }

    // ==================== PASO 1: CÓDIGO ====================
    if (step === 'codigo') {
        return (
            <div className="rm-page">
                <button
                    className="rm-back"
                    onClick={() => navigate('/')}
                    type="button"
                >
                    <ArrowLeft size={18} />
                    Volver al inicio
                </button>

                <div className="rm-card">
                    <header className="rm-header">
                        <div className="rm-header-icon rm-header-icon--warning">
                            <Presentation size={28} />
                        </div>
                        <h1 className="rm-title">Registro de Maestro</h1>
                        <p className="rm-subtitle">
                            Ingresa el código de verificación para continuar
                        </p>
                    </header>

                    <form onSubmit={handleValidarCodigo} className="rm-form">
                        <div className="rm-field">
                            <label htmlFor="codigo" className="rm-label">
                                Código de Maestro
                            </label>
                            <div className="rm-input-wrapper">
                                <KeyRound className="rm-input-icon" size={18} />
                                <input
                                    id="codigo"
                                    type={showCodigo ? 'text' : 'password'}
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    required
                                    className="rm-input rm-input--with-toggle"
                                    placeholder="*******"
                                    disabled={loading}
                                    autoComplete="off"
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    className="rm-input-toggle"
                                    onClick={() => setShowCodigo(!showCodigo)}
                                    aria-label={
                                        showCodigo
                                            ? 'Ocultar código'
                                            : 'Mostrar código'
                                    }
                                    tabIndex={-1}
                                >
                                    {showCodigo ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                            {codigoError && (
                                <p className="rm-field-error">
                                    <AlertCircle size={14} />
                                    {codigoError}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="rm-btn-submit rm-btn-submit--warning"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        className="rm-btn-spinner"
                                        size={18}
                                    />
                                    Validando...
                                </>
                            ) : (
                                <>
                                    Validar Código
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>

                        <p className="rm-footer">
                            ¿Ya tienes cuenta?{' '}
                            <Link to="/login" className="rm-link">
                                Inicia Sesión
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    // ==================== PASO 2: FORMULARIO ====================
    return (
        <div className="rm-page">
            <button
                className="rm-back"
                onClick={() => setStep('codigo')}
                type="button"
            >
                <ArrowLeft size={18} />
                Volver al código
            </button>

            <div className="rm-card">
                <header className="rm-header">
                    <div className="rm-header-icon rm-header-icon--warning">
                        <Presentation size={28} />
                    </div>
                    <h1 className="rm-title">Datos del Maestro</h1>
                    <p className="rm-subtitle">
                        Completa tu información profesional
                    </p>

                    {departamentoInfo?.nombre && (
                        <div className="rm-department-badge">
                            <Building2 size={16} />
                            {departamentoInfo.nombre}
                        </div>
                    )}
                </header>

                {error && (
                    <div className="rm-alert rm-alert--error" role="alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="rm-form">
                    {/* ===== Datos personales ===== */}
                    <div className="rm-row">
                        <div className="rm-field">
                            <label htmlFor="username" className="rm-label">
                                Usuario
                            </label>
                            <div className="rm-input-wrapper">
                                <User className="rm-input-icon" size={18} />
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="rm-input"
                                    placeholder="ej: juan.perez"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="rm-field">
                            <label htmlFor="nombre" className="rm-label">
                                Nombre
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="rm-input rm-input--standalone"
                                placeholder="Juan"
                                autoComplete="given-name"
                            />
                        </div>
                    </div>

                    <div className="rm-row">
                        <div className="rm-field">
                            <label htmlFor="apellido1" className="rm-label">
                                Apellido Paterno
                            </label>
                            <input
                                id="apellido1"
                                type="text"
                                name="apellido1"
                                value={formData.apellido1}
                                onChange={handleChange}
                                required
                                className="rm-input rm-input--standalone"
                                placeholder="Pérez"
                                autoComplete="family-name"
                            />
                        </div>

                        <div className="rm-field">
                            <label htmlFor="apellido2" className="rm-label">
                                Apellido Materno{' '}
                                <span className="rm-label-optional">
                                    (opcional)
                                </span>
                            </label>
                            <input
                                id="apellido2"
                                type="text"
                                name="apellido2"
                                value={formData.apellido2}
                                onChange={handleChange}
                                className="rm-input rm-input--standalone"
                                placeholder="García"
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div className="rm-field">
                        <label htmlFor="email" className="rm-label">
                            Correo Electrónico
                        </label>
                        <div className="rm-input-wrapper">
                            <Mail className="rm-input-icon" size={18} />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="rm-input"
                                placeholder="juan@email.com"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* ===== Contraseñas ===== */}
                    <div className="rm-row">
                        <div className="rm-field">
                            <label htmlFor="password" className="rm-label">
                                Contraseña
                            </label>
                            <div className="rm-input-wrapper">
                                <Lock className="rm-input-icon" size={18} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="rm-input rm-input--with-toggle"
                                    placeholder="Mínimo 6 caracteres"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="rm-input-toggle"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    aria-label={
                                        showPassword
                                            ? 'Ocultar contraseña'
                                            : 'Mostrar contraseña'
                                    }
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="rm-field">
                            <label
                                htmlFor="confirmPassword"
                                className="rm-label"
                            >
                                Confirmar Contraseña
                            </label>
                            <div className="rm-input-wrapper">
                                <Lock className="rm-input-icon" size={18} />
                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="rm-input rm-input--with-toggle"
                                    placeholder="Repite tu contraseña"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="rm-input-toggle"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    aria-label={
                                        showConfirmPassword
                                            ? 'Ocultar contraseña'
                                            : 'Mostrar contraseña'
                                    }
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ===== Datos profesionales ===== */}
                    <div className="rm-section-label">
                        <span className="rm-section-line" />
                        <span className="rm-section-text">
                            Datos profesionales
                        </span>
                        <span className="rm-section-line" />
                    </div>

                    <div className="rm-row">
                        <div className="rm-field">
                            <label htmlFor="especialidad" className="rm-label">
                                Especialidad
                            </label>
                            <div className="rm-input-wrapper">
                                <BookOpen className="rm-input-icon" size={18} />
                                <select
                                    id="especialidad"
                                    name="especialidad"
                                    value={formData.especialidad}
                                    onChange={handleChange}
                                    className="rm-input rm-select"
                                >
                                    <option value="Matemáticas">
                                        Matemáticas
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div className="rm-field">
                            <label htmlFor="categoria" className="rm-label">
                                Categoría
                            </label>
                            <div className="rm-input-wrapper">
                                <Award className="rm-input-icon" size={18} />
                                <select
                                    id="categoria"
                                    name="categoria"
                                    value={formData.categoria}
                                    onChange={handleChange}
                                    className="rm-input rm-select"
                                >
                                    <option value="Primera">Primera</option>
                                    <option value="Segunda">Segunda</option>
                                    <option value="Tercera">Tercera</option>
                                    <option value="Cuarta">Cuarta</option>
                                    <option value="Quinta">Quinta</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* ===== Submit ===== */}
                    <button
                        type="submit"
                        className="rm-btn-submit rm-btn-submit--warning"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    className="rm-btn-spinner"
                                    size={18}
                                />
                                Registrando...
                            </>
                        ) : (
                            <>
                                <Presentation size={18} />
                                Registrarme como Maestro
                            </>
                        )}
                    </button>

                    <p className="rm-footer">
                        ¿Ya tienes cuenta?{' '}
                        <Link to="/login" className="rm-link">
                            Inicia Sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default RegistroMaestro;