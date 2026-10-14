/* frontend_ssam/src/pages/DashboardSubDirectorDep/UnidadesEducativasSubDir.jsx */
import { useEffect, useState, useMemo } from 'react';
import api from '../../api/axios';
import GestionBadge from './monitoreo/GestionBadge';

const POR_PAGINA = 25;

function UnidadesEducativasSubDir() {
    const [ues, setUes] = useState([]);
    const [anioGestion, setAnioGestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [distritoFiltro, setDistritoFiltro] = useState('');
    const [pagina, setPagina] = useState(1);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await api.get('/subdirector/unidades-educativas');
                setUes(res.data.data.unidades);
                setAnioGestion(res.data.data.anio_gestion);
            } catch (err) {
                setError(err.response?.data?.message || 'Error al cargar UE');
            } finally {
                setLoading(false);
            }
        };
        cargar();
    }, []);

    // Lista única de distritos para el filtro
    const distritosUnicos = useMemo(() => {
        const set = new Map();
        ues.forEach((u) => {
            if (u.id_distrito && !set.has(u.id_distrito)) {
                set.set(u.id_distrito, u.distrito);
            }
        });
        return Array.from(set.entries())
            .map(([id, nombre]) => ({ id, nombre }))
            .sort((a, b) => a.nombre.localeCompare(b.nombre));
    }, [ues]);

    const filtrados = useMemo(() => {
        return ues.filter((u) => {
            if (distritoFiltro && String(u.id_distrito) !== distritoFiltro) return false;
            if (busqueda.trim()) {
                const q = busqueda.toLowerCase();
                const coincide =
                    (u.nombre || '').toLowerCase().includes(q) ||
                    (u.codigo_ue || '').toLowerCase().includes(q) ||
                    (u.dir_nombre || '').toLowerCase().includes(q);
                if (!coincide) return false;
            }
            return true;
        });
    }, [ues, busqueda, distritoFiltro]);

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * POR_PAGINA;
    const visibles = filtrados.slice(inicio, inicio + POR_PAGINA);

    useEffect(() => { setPagina(1); }, [busqueda, distritoFiltro]);

    if (loading) return <p className="empty-message">Cargando unidades educativas...</p>;
    if (error)   return <p className="empty-message">{error}</p>;

    return (
        <div className="section">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Unidades Educativas</h2>
                    <p className="section-subtitle">
                        {filtrados.length} de {ues.length} UE
                    </p>
                </div>
                <GestionBadge anio={anioGestion} />
            </div>

            <div className="tabla-buscador tabla-buscador--multi">
                <input
                    type="text"
                    placeholder="Buscar por nombre o código..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select
                    value={distritoFiltro}
                    onChange={(e) => setDistritoFiltro(e.target.value)}
                >
                    <option value="">Todos los distritos</option>
                    {distritosUnicos.map((d) => (
                        <option key={d.id} value={String(d.id)}>{d.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="tabla-wrapper">
                <table className="tabla-datos">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Unidad Educativa</th>
                            <th>Código</th>
                            <th>Distrito</th>
                            <th>Zona</th>
                            <th className="num">Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visibles.map((u, i) => (
                            <tr key={u.id_ue}>
                                <td>{inicio + i + 1}</td>
                                <td>{u.nombre}</td>
                                <td>{u.codigo_ue || '—'}</td>
                                <td>{u.distrito}</td>
                                <td>{u.zona || '—'}</td>
                                <td className="num">{(u.num_est || 0).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {visibles.length === 0 && (
                    <p className="empty-message">No se encontraron UE.</p>
                )}
            </div>

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="paginacion">
                    <button
                        className="btn-pag"
                        disabled={paginaActual === 1}
                        onClick={() => setPagina(paginaActual - 1)}
                    >
                        ← Anterior
                    </button>
                    <span className="pag-info">
                        Página {paginaActual} de {totalPaginas}
                    </span>
                    <button
                        className="btn-pag"
                        disabled={paginaActual === totalPaginas}
                        onClick={() => setPagina(paginaActual + 1)}
                    >
                        Siguiente →
                    </button>
                </div>
            )}
        </div>
    );
}

export default UnidadesEducativasSubDir;