/* frontend_ssam/src/pages/DashboardSubDirectorDep/monitoreo/GestionBadge.jsx */
function GestionBadge({ anio }) {
    return (
        <span className="gestion-badge">
            <span className="gestion-badge__label">Gestión</span>
            <span className="gestion-badge__valor">{anio || '—'}</span>
        </span>
    );
}

export default GestionBadge;