/* frontend_ssam/src/pages/DashboardSubDirectorDep/MiPerfilSubDir.jsx */
import { useEffect, useState } from 'react';
import api from '../../api/axios';

function MiPerfilSubDir() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await api.get('/subdirector/mi-perfil');
                setData(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar perfil');
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    if (loading) return <p className="empty-message">Cargando perfil...</p>;
    if (error)   return <p className="empty-message">{error}</p>;
    if (!data)   return <p className="empty-message">Sin datos</p>;

    const { usuario, departamento, contadores } = data;
    const inicial = (usuario.username || '?')[0].toUpperCase();
    const nombreDepto = departamento?.nombreD || departamento?.nombred || '—';

    return (
        <div className="section">
            {/* ===== TARJETA DE IDENTIDAD ===== */}
            <div className="perfil-identidad-card">
                <div className="perfil-avatar">{inicial}</div>
                <div className="perfil-identidad-info">
                    <h3 className="perfil-username">
                        {usuario.nombre} {usuario.apellido1} {usuario.apellido2 || ''}
                    </h3>
                    <p className="perfil-email">{usuario.email}</p>
                    <div className="perfil-badges">
                        <span className="perfil-badge rol">Subdirector Departamental</span>
                        <span className="perfil-badge estado">{usuario.estado}</span>
                    </div>
                </div>
            </div>

            {/* ===== TARJETA DEL DEPARTAMENTO ===== */}
            {departamento && (
                <div className="profile-card depto-card">
                    <div className="depto-header">
                        <span className="depto-label">Departamento a cargo</span>
                        <h2 className="depto-nombre">{nombreDepto}</h2>
                    </div>
                    <div className="depto-meta">
                        <div className="dato-item">
                            <span className="dato-label">Último acceso</span>
                            <span className="dato-valor">
                                {usuario.fecha_ultimo_acceso
                                    ? new Date(usuario.fecha_ultimo_acceso).toLocaleString()
                                    : '—'}
                            </span>
                        </div>
                        <div className="dato-item">
                            <span className="dato-label">Miembro desde</span>
                            <span className="dato-valor">
                                {usuario.fecha_creacion
                                    ? new Date(usuario.fecha_creacion).toLocaleDateString()
                                    : '—'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== CONTADORES COMO CARDS ===== */}
            <div className="profile-card">
                <h3 className="card-title">Resumen del Departamento</h3>
                <div className="contadores-grid">
                    <div className="contador-card">
                        <span className="contador-valor">{contadores.distritos}</span>
                        <span className="contador-label">Distritos</span>
                    </div>
                    <div className="contador-card">
                        <span className="contador-valor">{contadores.unidades_educativas.toLocaleString()}</span>
                        <span className="contador-label">Unidades Educativas</span>
                    </div>
                    <div className="contador-card">
                        <span className="contador-valor">{contadores.estudiantes.toLocaleString()}</span>
                        <span className="contador-label">Estudiantes</span>
                    </div>
                    <div className="contador-card">
                        <span className="contador-valor">{contadores.maestros}</span>
                        <span className="contador-label">Maestros Participantes</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiPerfilSubDir;