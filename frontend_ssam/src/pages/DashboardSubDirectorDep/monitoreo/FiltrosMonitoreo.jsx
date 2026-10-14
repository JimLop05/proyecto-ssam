/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/FiltrosMonitoreo.jsx */
import { useEffect, useState } from 'react';
import api from '../../../api/axios';

function FiltrosMonitoreo({ filtros, onChange }) {
    const [opciones, setOpciones] = useState({
        distritos: [],
        asignaturas: [],
        grados: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await api.get('/subdirector/monitoreo/filtros');
                const data = res.data.data;
                setOpciones(data);

                // El id_gestion se resuelve acá y se propaga al padre
                const gestionActual =
                    data.gestiones.find((g) => g.estado === 'ACTIVO') ||
                    data.gestiones.find((g) => g.anio === 2026) ||
                    data.gestiones[0] ||
                    null;

                onChange({
                    id_distrito: '',
                    id_asig: '',
                    id_grado: '',
                    id_gestion: gestionActual?.id_gestion || null,
                    anio_gestion: gestionActual?.anio || 2026
                });
            } catch (err) {
                console.error('Error al cargar filtros:', err);
            } finally {
                setLoading(false);
            }
        };
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handle = (campo, valor) => {
        onChange({ ...filtros, [campo]: valor });
    };

    if (loading) return <p className="empty-message">Cargando filtros...</p>;

    return (
        <div className="filtros-monitoreo">
            <div className="filtro-item">
                <label>Distrito</label>
                <select
                    value={filtros.id_distrito || ''}
                    onChange={(e) => handle('id_distrito', e.target.value)}
                >
                    <option value="">Todos</option>
                    {opciones.distritos.map((d) => (
                        <option key={d.id_distrito} value={d.id_distrito}>
                            {d.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filtro-item">
                <label>Asignatura *</label>
                <select
                    value={filtros.id_asig || ''}
                    onChange={(e) => handle('id_asig', e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione una asignatura</option>
                    {opciones.asignaturas.map((a) => (
                        <option key={a.id_asig} value={a.id_asig}>
                            {a.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filtro-item">
                <label>Grado *</label>
                <select
                    value={filtros.id_grado || ''}
                    onChange={(e) => handle('id_grado', e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione un grado</option>
                    {opciones.grados.map((g) => (
                        <option key={g.id_grado} value={g.id_grado}>
                            {g.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default FiltrosMonitoreo;