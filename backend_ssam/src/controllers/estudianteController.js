// Ruta: backend-ssam/src/controllers/estudianteController.js
// ============================================================
// CONTROLADOR DE ESTUDIANTES
// Maneja las operaciones CRUD para estudiantes
// ============================================================

const pool = require('../config/db');

// Obtener todos los estudiantes (con sus datos de usuario
const getEstudiantes = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                u.id_usuario, u.username, u.nombre, u.apellido1, u.apellido2, u.email,
                e.fecha_nacimiento, e.sexo, e.tipo_estudiante
            FROM usuario u
            INNER JOIN estudiante e ON u.id_usuario = e.id_usuarioe
            ORDER BY u.apellido1, u.apellido2
        `);
        
        res.json({
            success: true,
            data: result.rows
        });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener la lista de estudiantes' 
        });
    }
};

module.exports = {
    getEstudiantes
};