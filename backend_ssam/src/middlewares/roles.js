/* backend_ssam/src/middlewares/roles.js */
const requireRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(403).json({
                success: false,
                message: 'Rol no definido en el token.'
            });
        }
        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                success: false,
                message: `Acceso denegado. Se requiere rol: ${rolesPermitidos.join(', ')}`
            });
        }
        next();
    };
};

module.exports = requireRol;