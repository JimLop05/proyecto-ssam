/* frontend_ssam/src/pages/DashboardSubDirectorDep/ReporteSubDir.jsx */
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import GestionBadge from './monitoreo/GestionBadge';

function ReporteSubDir() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await api.get('/subdirector/reporte');
                setData(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar reporte');
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    if (loading) return <p className="empty-message">Generando reporte...</p>;
    if (error)   return <p className="empty-message">{error}</p>;
    if (!data)   return <p className="empty-message">Sin datos</p>;

    const { departamento, anio_gestion, totales, por_distrito, por_tipo_ue } = data;

    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Reporte — {departamento}</h2>
                    <p className="section-subtitle">Resumen consolidado del departamento</p>
                </div>
                <GestionBadge anio={anio_gestion} />
            </div>

            {/* Cards de totales */}
            <div className="reporte-cards">
                <div className="reporte-card">
                    <span className="reporte-card__label">Distritos</span>
                    <span className="reporte-card__valor">{totales.total_distritos}</span>
                </div>
                <div className="reporte-card">
                    <span className="reporte-card__label">Unidades Educativas</span>
                    <span className="reporte-card__valor">{totales.total_ue.toLocaleString()}</span>
                </div>
                <div className="reporte-card">
                    <span className="reporte-card__label">Estudiantes</span>
                    <span className="reporte-card__valor">{totales.total_estudiantes.toLocaleString()}</span>
                </div>
                <div className="reporte-card">
                    <span className="reporte-card__label">Maestros</span>
                    <span className="reporte-card__valor">{totales.total_maestros}</span>
                </div>
            </div>

            {/* Por tipo de UE */}
            {por_tipo_ue && por_tipo_ue.length > 0 && (
                <div className="profile-card">
                    <h3 className="card-title">Unidades por Tipo</h3>
                    <div className="tipos-lista">
                        {por_tipo_ue.map((t, i) => (
                            <div key={i} className="tipo-item">
                                <span className="tipo-nombre">{t.tipo}</span>
                                <span className="tipo-cantidad">{t.cantidad}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Por distrito */}
            <div className="profile-card">
                <h3 className="card-title">Detalle por Distrito</h3>
                <div className="tabla-wrapper">
                    <table className="tabla-datos">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Distrito</th>
                                <th>Código</th>
                                <th className="num">UE</th>
                                <th className="num">Estudiantes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {por_distrito.map((d, i) => (
                                <tr key={d.id_distrito}>
                                    <td>{i + 1}</td>
                                    <td>{d.distrito}</td>
                                    <td>{d.codigo_distrito || '—'}</td>
                                    <td className="num">{d.total_ue}</td>
                                    <td className="num">
                                        {(d.total_estudiantes || 0).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReporteSubDir;