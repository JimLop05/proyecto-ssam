/* frontend_ssam/src/pages/DashboardSubDirectorDep/DistritosSubDir.jsx */
import { useState } from 'react';
import MonitoreoRendimiento from './monitoreo/MonitoreoRendimiento';
import MonitoreoPlanificacion from './monitoreo/MonitoreoPlanificacion';
import './monitoreo/monitoreo.css';

function DistritosSubDir() {
    const [pestana, setPestana] = useState('rendimiento');

    return (
        <div className="section monitoreo-container">
            <div className="section-header">
                <div className="section-header-simple">
                    <h2>Distritos</h2>
                    <p className="section-subtitle">
                        Monitoreo del departamento por distrito
                    </p>
                </div>
            </div>

            {/* Pestañas */}
            <div className="tabs">
                <button
                    className={`tab ${pestana === 'rendimiento' ? 'tab--active' : ''}`}
                    onClick={() => setPestana('rendimiento')}
                >
                    Monitoreo de Rendimiento
                </button>
                <button
                    className={`tab ${pestana === 'planificacion' ? 'tab--active' : ''}`}
                    onClick={() => setPestana('planificacion')}
                >
                    Monitoreo de Planificación Docente
                </button>
            </div>

            {/* Contenido de la pestaña activa */}
            <div className="tab-content">
                {pestana === 'rendimiento' && <MonitoreoRendimiento />}
                {pestana === 'planificacion' && <MonitoreoPlanificacion />}
            </div>
        </div>
    );
}

export default DistritosSubDir;