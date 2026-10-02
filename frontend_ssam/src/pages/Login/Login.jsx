// frontend_ssam/src/pages/Login/Login.jsx
// ============================================================
// PANTALLA DE LOGIN - SISTEMA DE SEGUIMIENTO Y RENDIMIENTO ACADÉMICO
// Versión mejorada con estilo académico institucional
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import LogoSSAM from '../../assets/LogoSSAM.png';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

            // Guardar token y datos en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirigir según el rol
            switch (user.rol) {
                case 'ADMINISTRADOR':
                    navigate('/dashboard/administrador');
                    break;
                case 'MAESTRO':
                    navigate('/dashboard/maestro');
                    break;
                case 'ESTUDIANTE':
                    navigate('/dashboard/estudiante');
                    break;
                case 'DIR_UE':
                    navigate('/dashboard/director-ue');
                    break;
                case 'DIR_DIS':
                    navigate('/dashboard/director-distrital');
                    break;
                case 'SUBDIR_DEP':
                    navigate('/dashboard/subdirector');
                    break;
                default:
                    navigate('/login');
                    break;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            {/* Fondo decorativo con patrón académico */}
            <div className="login-background-pattern"></div>

            <div className="login-wrapper">
                {/* Marco decorativo doble */}
                <div className="login-frame-outer">
                    <div className="login-frame-inner">

                        {/* Encabezado institucional */}
                        <header className="login-header">
                            <div className="login-logo-container">
                                <img
                                    src={LogoSSAM}
                                    alt="Logo SSAM"
                                    className="login-logo"
                                />
                            </div>

                            <div className="login-titles">
                                <p className="login-institution">
                                    Sistema de Seguimiento y Rendimiento Académico
                                </p>
                                <h1 className="login-welcome">
                                    ¡Bienvenido!
                                </h1>
                                <p className="login-subtitle">
                                    Ingrese sus credenciales para acceder al sistema
                                </p>
                            </div>
                        </header>

                        {/* Línea decorativa */}
                        <div className="login-divider">
                            <span className="login-divider-line"></span>
                            <span className="login-divider-icon">✦</span>
                            <span className="login-divider-line"></span>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="login-form">
                            {error && (
                                <div className="login-error" role="alert">
                                    <span className="login-error-icon">⚠</span>
                                    {error}
                                </div>
                            )}

                            <div className="login-field">
                                <label htmlFor="email" className="login-label">
                                    Correo Electrónico
                                </label>
                                <div className="login-input-wrapper">
                                    <span className="login-input-icon">✉</span>
                                    <input
                                        id="email"
                                        type="email"
                                        className="login-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="usuario@institucion.edu"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="login-field">
                                <label htmlFor="password" className="login-label">
                                    Contraseña
                                </label>
                                <div className="login-input-wrapper">
                                    <span className="login-input-icon">🔒</span>
                                    <input
                                        id="password"
                                        type="password"
                                        className="login-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="login-spinner"></span>
                                        Verificando...
                                    </>
                                ) : (
                                    <>
                                        <span className="login-button-icon">→</span>
                                        Iniciar Sesión
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Pie de página */}
                        <footer className="login-footer">
                            <p>© {new Date().getFullYear()} SSAM · Todos los derechos reservados</p>
                            <p className="login-footer-sub">Plataforma Educativa Institucional</p>
                        </footer>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;