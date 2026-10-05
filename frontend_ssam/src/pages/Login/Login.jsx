// frontend_ssam/src/pages/Login/Login.jsx
// ============================================================
// PANTALLA DE LOGIN — Sistema SSAM
// Redirige al dashboard según el rol del usuario
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ArrowLeft,
    AlertCircle,
    Loader2,
    LogIn,
} from 'lucide-react';
import api from '../../api/axios';
import LogoSSAM from '../../assets/LogoSSAM.png';
import './Login.css';

// Mapa rol → ruta de dashboard
const DASHBOARD_BY_ROLE = {
    ADMINISTRADOR: '/dashboard/administrador',
    MAESTRO:       '/dashboard/maestro',
    ESTUDIANTE:    '/dashboard/estudiante',
    DIR_UE:        '/dashboard/director-ue',
    DIR_DIS:       '/dashboard/director-distrital',
    SUBDIR_DEP:    '/dashboard/subdirector',
};

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            const dashboard = DASHBOARD_BY_ROLE[user?.rol] || '/';
            navigate(dashboard, { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Credenciales incorrectas. Verifica e intenta de nuevo.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Botón volver */}
            <button
                className="login-back"
                onClick={() => navigate('/')}
                type="button"
            >
                <ArrowLeft size={18} />
                Volver al inicio
            </button>

            <div className="login-card">
                {/* Encabezado */}
                <header className="login-header">
                    <div className="login-logo-wrapper">
                        <img
                            src={LogoSSAM}
                            alt="Logo SSAM"
                            className="login-logo"
                        />
                    </div>
                    <h1 className="login-title">Iniciar Sesión</h1>
                    <p className="login-subtitle">
                        Ingresa tus credenciales para acceder al sistema
                    </p>
                </header>

                {/* Alerta de error */}
                {error && (
                    <div className="login-alert" role="alert">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-field">
                        <label htmlFor="email" className="login-label">
                            Correo Electrónico
                        </label>
                        <div className="login-input-wrapper">
                            <Mail className="login-input-icon" size={18} />
                            <input
                                id="email"
                                type="email"
                                className="login-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="usuario@institucion.edu"
                                required
                                autoComplete="email"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="login-field">
                        <label htmlFor="password" className="login-label">
                            Contraseña
                        </label>
                        <div className="login-input-wrapper">
                            <Lock className="login-input-icon" size={18} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                className="login-input login-input--with-toggle"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                className="login-input-toggle"
                                onClick={() => setShowPassword(!showPassword)}
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

                    <button
                        type="submit"
                        className="login-btn-submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2
                                    className="login-btn-spinner"
                                    size={18}
                                />
                                Verificando...
                            </>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Iniciar Sesión
                            </>
                        )}
                    </button>
                </form>

                {/* Separador */}
                <div className="login-divider">
                    <span className="login-divider-line" />
                    <span className="login-divider-text">¿Eres nuevo?</span>
                    <span className="login-divider-line" />
                </div>

                {/* Registro */}
                <p className="login-register-hint">
                    ¿No tienes cuenta?{' '}
                    <Link to="/" className="login-register-link">
                        Regístrate aquí
                        <ArrowRight size={14} />
                    </Link>
                </p>

                {/* Footer */}
                <footer className="login-footer">
                    <p>
                        © {new Date().getFullYear()} SSAM · Todos los
                        derechos reservados
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Login;