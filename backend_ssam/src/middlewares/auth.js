//Ruta: backend-ssam/src/middlewares/auth.js
// ============================================================
// MIDDLEWARE DE AUTENTICACIÓN
// Verifica que el token JWT sea válido y adjunta los datos del usuario a la petición
// ============================================================

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    // 1. Obtener el token del header 'Authorization'
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    // 2. El token viene como "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no válido.' });
    }

    // 3. Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adjuntamos los datos del usuario al objeto 'req'
        next(); // Continúa con la siguiente función
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = authMiddleware;