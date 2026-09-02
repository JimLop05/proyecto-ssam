// Ruta: backend-ssam/src/controllers/configController.js
// ============================================================
// CONTROLADOR DE CONFIGURACIÓN
// Devuelve los datos de la plataforma desde la tabla CONFIGURACION
// ============================================================

const pool = require('../config/db');

const getConfig = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM configuracion LIMIT 1');
        if (result.rows.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No se encontró configuración de la plataforma.' 
            });
        }
        res.json({
            success: true,
            data: result.rows[0]
        });
    } catch (error) {
        console.error('Error al obtener configuración:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener la configuración de la plataforma.' 
        });
    }
};

module.exports = { getConfig };