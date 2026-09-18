// frontend_ssam/src/pages/Login/Login.jsx
//============================================================
// PANTALLA DE LOGIN
// Formulario para iniciar sesión y obtener el token JWT
// ============================================================
// ============================================================
// PANTALLA DE LOGIN - VERSIÓN COMPLETA CON TODOS LOS ROLES
// ============================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/auth/login', { email, password });
            const { token, user } = response.data;

            // Guardar token y datos en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // ✅ Redirigir según el rol (con todas las opciones)
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
                    // Si no tiene rol definido, va a login (o a una página de error)
                    navigate('/login');
                    break;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;