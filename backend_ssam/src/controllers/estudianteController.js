// Ruta: backend-ssam/src/controllers/estudianteController.js
// ============================================================
// CONTROLADOR DE ESTUDIANTES
// Maneja las operaciones CRUD para estudiantes
// ============================================================

const pool = require('../config/db');

// ============================================================
// Obtener todos los estudiantes
// ============================================================
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
        
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener la lista de estudiantes' 
        });
    }
};

// ============================================================
// Obtener las clases del estudiante autenticado
// ============================================================
const getMisClases = async (req, res) => {
    try {
        // ✅ CORREGIDO: el token guarda el id en "req.user.id"
        const id_usuarioE = req.user.id;

        const result = await pool.query(`
            SELECT 
                c.id_clase,
                c.nombrec,
                c.numest,
                c.periodo,
                c.estado_clase,
                ue.nombre AS unidad_educativa,
                g.titulog AS grado,
                a.nombrea AS asignatura
            FROM pertenece p
            INNER JOIN clase c ON p.id_clase = c.id_clase
            LEFT JOIN ue ON c.id_ue = ue.id_ue
            LEFT JOIN grado g ON c.id_grado = g.id_grado
            LEFT JOIN asignatura a ON c.id_asig = a.id_asig
            WHERE p.id_usuarioe = $1
            ORDER BY c.nombrec
        `, [id_usuarioE]);

        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error al obtener mis clases:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tus clases'
        });
    }
};

// ============================================================
// Unirse a una clase con contraseña
// ============================================================
const unirseAClase = async (req, res) => {
    try {
        // ✅ CORREGIDO
        const id_usuarioE = req.user.id;
        const { password_clase } = req.body;

        // 1. Validar que se mande la contraseña
        if (!password_clase || password_clase.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Debes ingresar la contraseña de la clase'
            });
        }

        // 2. Buscar la clase por contraseña
        const claseResult = await pool.query(
            `SELECT id_clase, nombreC, estado_clase 
             FROM clase 
             WHERE password_clase = $1`,
            [password_clase.trim()]
        );

        if (claseResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Contraseña incorrecta. No existe ninguna clase con esa contraseña.'
            });
        }

        const clase = claseResult.rows[0];

        // 3. Verificar que la clase esté activa
        if (clase.estado_clase && clase.estado_clase.toUpperCase() !== 'ACTIVA') {
            return res.status(400).json({
                success: false,
                message: `La clase "${clase.nombrec}" no está activa.`
            });
        }

        // 4. Verificar si ya está inscrito en esa clase
        const yaInscrito = await pool.query(
            `SELECT 1 FROM pertenece 
             WHERE id_usuarioe = $1 AND id_clase = $2`,
            [id_usuarioE, clase.id_clase]
        );

        if (yaInscrito.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Ya estás inscrito en la clase "${clase.nombrec}".`
            });
        }

        // 5. Insertar en PERTENECE
        await pool.query(
            `INSERT INTO pertenece (id_usuarioe, id_clase) 
             VALUES ($1, $2)`,
            [id_usuarioE, clase.id_clase]
        );

        res.json({
            success: true,
            message: `¡Te uniste exitosamente a la clase "${clase.nombrec}"!`,
            data: {
                id_clase: clase.id_clase,
                nombreC: clase.nombrec
            }
        });

    } catch (error) {
        console.error('Error al unirse a clase:', error);
        res.status(500).json({
            success: false,
            message: 'Error al unirse a la clase'
        });
    }
};
// ============================================================
// Obtener el perfil completo del estudiante autenticado
// ============================================================
const getMiPerfil = async (req, res) => {
    try {
        const id_usuario = req.user.id;

        const result = await pool.query(`
            SELECT 
                u.id_usuario, u.username, u.nombre, u.apellido1, u.apellido2,
                u.email, u.estado, u.fecha_creacion, u.fecha_ultimo_acceso,
                e.fecha_nacimiento, e.sexo, e.tipo_estudiante
            FROM usuario u
            INNER JOIN estudiante e ON u.id_usuario = e.id_usuarioe
            WHERE u.id_usuario = $1
        `, [id_usuario]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Estudiante no encontrado'
            });
        }

        res.json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error('Error en getMiPerfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el perfil del estudiante'
        });
    }
};

// ============================================================
// Obtener el rendimiento general del estudiante
// ============================================================
const getMiRendimiento = async (req, res) => {
    try {
        const id_usuarioE = req.user.id;

        // Contar evaluaciones asignadas (vía clases del estudiante)
        const evaluacionesQuery = await pool.query(`
            SELECT COUNT(*) AS total
            FROM evaluacion ev
            INNER JOIN pertenece p ON p.id_clase = ev.id_clase
            WHERE p.id_usuarioe = $1
        `, [id_usuarioE]);

        // Contar intentos totales
        const intentosQuery = await pool.query(`
            SELECT COUNT(*) AS total
            FROM intento i
            INNER JOIN evaluacion ev ON ev.id_evaluacion = i.id_evaluacion
            INNER JOIN pertenece p ON p.id_clase = ev.id_clase
            WHERE p.id_usuarioe = $1
        `, [id_usuarioE]);

        // Promedio general (sobre nota_unidad_tematica de intentos)
        const promedioQuery = await pool.query(`
            SELECT COALESCE(AVG(i.nota_unidad_tematica), 0) AS promedio
            FROM intento i
            INNER JOIN evaluacion ev ON ev.id_evaluacion = i.id_evaluacion
            INNER JOIN pertenece p ON p.id_clase = ev.id_clase
            WHERE p.id_usuarioe = $1
        `, [id_usuarioE]);

        res.json({
            success: true,
            data: {
                total_evaluaciones: parseInt(evaluacionesQuery.rows[0].total) || 0,
                total_intentos: parseInt(intentosQuery.rows[0].total) || 0,
                promedio_general: parseFloat(promedioQuery.rows[0].promedio).toFixed(2) || 0
            }
        });

    } catch (error) {
        console.error('Error en getMiRendimiento:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el rendimiento'
        });
    }
};

// ============================================================
// Obtener el detalle de una clase del estudiante
// (info de la clase + unidades temáticas del grado/asig)
// ============================================================
const getDetalleClaseEstudiante = async (req, res) => {
    try {
        const id_usuarioE = req.user.id;
        const { id_clase } = req.params;

        // 1. Verificar que el estudiante esté inscrito en esa clase
        const perteneceCheck = await pool.query(
            `SELECT 1 FROM pertenece 
             WHERE id_usuarioe = $1 AND id_clase = $2`,
            [id_usuarioE, id_clase]
        );

        if (perteneceCheck.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'No estás inscrito en esta clase'
            });
        }

        // 2. Obtener los datos de la clase
        const claseQuery = await pool.query(`
            SELECT 
                c.id_clase,
                c.nombrec,
                c.numest,
                c.periodo,
                c.estado_clase,
                c.id_grado,
                c.id_asig,
                ue.nombre AS unidad_educativa,
                g.titulog AS grado,
                a.nombrea AS asignatura,
                CONCAT(u.nombre, ' ', u.apellido1, ' ', COALESCE(u.apellido2, '')) AS maestro
            FROM clase c
            LEFT JOIN ue ON c.id_ue = ue.id_ue
            LEFT JOIN grado g ON c.id_grado = g.id_grado
            LEFT JOIN asignatura a ON c.id_asig = a.id_asig
            LEFT JOIN maestro m ON c.id_maestro = m.id_usuariom
            LEFT JOIN usuario u ON m.id_usuariom = u.id_usuario
            WHERE c.id_clase = $1
        `, [id_clase]);

        if (claseQuery.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Clase no encontrada'
            });
        }

        const clase = claseQuery.rows[0];

        // 3. Obtener las unidades temáticas del grado + asignatura de la clase
        const unidadesQuery = await pool.query(`
            SELECT 
                ut.id_unid_tem,
                ut.nombreut,
                ut.objetivo
            FROM unidadtematica ut
            WHERE ut.id_grado = $1 AND ut.id_asig = $2
            ORDER BY ut.id_unid_tem
        `, [clase.id_grado, clase.id_asig]);

        // 4. Para cada unidad, obtener sus ítems
        const unidades = [];
        for (const unidad of unidadesQuery.rows) {
            const itemsQuery = await pool.query(`
                SELECT id_item, nombreitem
                FROM item
                WHERE id_unid_tem = $1
                ORDER BY id_item
            `, [unidad.id_unid_tem]);

            unidades.push({
                ...unidad,
                items: itemsQuery.rows
            });
        }

        res.json({
            success: true,
            data: {
                clase,
                unidades
            }
        });

    } catch (error) {
        console.error('Error en getDetalleClaseEstudiante:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el detalle de la clase'
        });
    }
};

module.exports = {
    getEstudiantes,
    getMisClases,
    unirseAClase,
    getMiPerfil,
    getMiRendimiento,
    getDetalleClaseEstudiante
};