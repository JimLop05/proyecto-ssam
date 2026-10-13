/* backend_ssam/src/controllers/subdirectorController.js */
// ============================================================
// CONTROLLER: SUBDIRECTOR DEPARTAMENTAL
// ============================================================
const pool = require('../config/db');

// ============================================================
// Helper: obtener id_departamento del subdirector autenticado
// ============================================================
async function getDepartamentoDelSubdirector(idUsuario) {
    const query = `
        SELECT d.id_departamento, d.nombreD
        FROM subdir_dep sd
        JOIN departamento d ON d.id_usuariosd = sd.id_usuariosd
        WHERE sd.id_usuariosd = $1
        LIMIT 1
    `;
    const result = await pool.query(query, [idUsuario]);
    return result.rows[0] || null;
}

// ============================================================
// GET /api/subdirector/mi-perfil
// ============================================================
const getMiPerfil = async (req, res) => {
    const idUsuario = req.user.id;   // 👈 corregido

    try {
        const userQuery = `
            SELECT
                u.id_usuario,
                u.username,
                u.nombre,
                u.apellido1,
                u.apellido2,
                u.email,
                u.estado,
                u.fecha_creacion,
                u.fecha_ultimo_acceso
            FROM usuario u
            WHERE u.id_usuario = $1
        `;
        const userResult = await pool.query(userQuery, [idUsuario]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }

        const depto = await getDepartamentoDelSubdirector(idUsuario);

        if (!depto) {
            return res.json({
                success: true,
                data: {
                    usuario: userResult.rows[0],
                    departamento: null,
                    contadores: {
                        distritos: 0,
                        unidades_educativas: 0,
                        estudiantes: 0,
                        maestros: 0
                    }
                }
            });
        }

        const statsQuery = `
            SELECT
                (SELECT COUNT(*) FROM distrito WHERE id_departamento = $1)::int AS distritos,
                (SELECT COUNT(*) FROM ue u
                    JOIN distrito di ON di.id_distrito = u.id_distrito
                    WHERE di.id_departamento = $1)::int AS unidades_educativas,
                (SELECT COALESCE(SUM(ue.num_est), 0) FROM ue u
                    JOIN distrito di ON di.id_distrito = u.id_distrito
                    WHERE di.id_departamento = $1)::int AS estudiantes,
                (SELECT COUNT(*) FROM maestro WHERE id_departamento = $1)::int AS maestros
        `;
        const statsResult = await pool.query(statsQuery, [depto.id_departamento]);
        const contadores = statsResult.rows[0];

        const deptoQuery = `
            SELECT
                d.id_departamento,
                d.nombreD,
                d.codigo_acceso,
                d.codigo_maestro,
                d.codigo_distrital,
                d.codigo_directorue,
                d.num_estD
            FROM departamento d
            WHERE d.id_departamento = $1
        `;
        const deptoResult = await pool.query(deptoQuery, [depto.id_departamento]);

        return res.json({
            success: true,
            data: {
                usuario: userResult.rows[0],
                departamento: deptoResult.rows[0],
                contadores
            }
        });

    } catch (error) {
        console.error('Error en getMiPerfil (subdirector):', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener perfil del subdirector'
        });
    }
};

// ============================================================
// GET /api/subdirector/distritos
// ============================================================
const getDistritos = async (req, res) => {
    const idUsuario = req.user.id;   // 👈 corregido

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const query = `
            SELECT
                di.id_distrito,
                di.nombreD           AS distrito,
                di.numUE,
                di.codigo_distrito,
                di.num_estD,
                u.username           AS dir_username,
                u.nombre             AS dir_nombre,
                u.apellido1          AS dir_apellido1,
                u.apellido2          AS dir_apellido2,
                (SELECT COUNT(*) FROM ue WHERE id_distrito = di.id_distrito)::int AS total_ue
            FROM distrito di
            LEFT JOIN dir_dis dd ON dd.id_usuarioDD = di.id_dir_dis
            LEFT JOIN usuario u  ON u.id_usuario    = dd.id_usuarioDD
            WHERE di.id_departamento = $1
            ORDER BY di.nombreD ASC
        `;

        const result = await pool.query(query, [depto.id_departamento]);

        return res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Error en getDistritos (subdirector):', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener distritos'
        });
    }
};

// ============================================================
// GET /api/subdirector/unidades-educativas
// ============================================================
const getUnidadesEducativas = async (req, res) => {
    const idUsuario = req.user.id;   // 👈 corregido

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const query = `
            SELECT
                ue.id_ue,
                ue.nombre,
                ue.num_est,
                ue.tipo,
                ue.codigo_ue,
                ue.direccion,
                ue.telefonoUE,
                ue.zona,
                di.id_distrito,
                di.nombreD           AS distrito,
                u.username           AS dir_username,
                u.nombre             AS dir_nombre,
                u.apellido1          AS dir_apellido1,
                u.apellido2          AS dir_apellido2
            FROM ue
            JOIN distrito di ON di.id_distrito = ue.id_distrito
            LEFT JOIN dir_ue du ON du.id_usuarioDU = ue.id_dir_ue
            LEFT JOIN usuario u ON u.id_usuario    = du.id_usuarioDU
            WHERE di.id_departamento = $1
            ORDER BY di.nombreD ASC, ue.nombre ASC
        `;

        const result = await pool.query(query, [depto.id_departamento]);

        return res.json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Error en getUnidadesEducativas (subdirector):', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener unidades educativas'
        });
    }
};

// ============================================================
// GET /api/subdirector/reporte
// ============================================================
const getReporte = async (req, res) => {
    const idUsuario = req.user.id;   // 👈 corregido

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const porDistritoQuery = `
            SELECT
                di.id_distrito,
                di.nombreD                    AS distrito,
                di.codigo_distrito,
                COUNT(DISTINCT ue.id_ue)      AS total_ue,
                COALESCE(SUM(ue.num_est), 0)::int AS total_estudiantes
            FROM distrito di
            LEFT JOIN ue ON ue.id_distrito = di.id_distrito
            WHERE di.id_departamento = $1
            GROUP BY di.id_distrito, di.nombreD, di.codigo_distrito
            ORDER BY di.nombreD ASC
        `;
        const porDistrito = await pool.query(porDistritoQuery, [depto.id_departamento]);

        const totalesQuery = `
            SELECT
                (SELECT COUNT(*) FROM distrito WHERE id_departamento = $1)::int AS total_distritos,
                (SELECT COUNT(*) FROM ue u
                    JOIN distrito di ON di.id_distrito = u.id_distrito
                    WHERE di.id_departamento = $1)::int AS total_ue,
                (SELECT COALESCE(SUM(ue.num_est), 0) FROM ue u
                    JOIN distrito di ON di.id_distrito = u.id_distrito
                    WHERE di.id_departamento = $1)::int AS total_estudiantes,
                (SELECT COUNT(*) FROM maestro WHERE id_departamento = $1)::int AS total_maestros
        `;
        const totales = await pool.query(totalesQuery, [depto.id_departamento]);

        const porTipoQuery = `
            SELECT
                COALESCE(ue.tipo, 'Sin tipo') AS tipo,
                COUNT(*)::int AS cantidad
            FROM ue
            JOIN distrito di ON di.id_distrito = ue.id_distrito
            WHERE di.id_departamento = $1
            GROUP BY ue.tipo
            ORDER BY cantidad DESC
        `;
        const porTipo = await pool.query(porTipoQuery, [depto.id_departamento]);

        return res.json({
            success: true,
            data: {
                departamento: depto.nombreD,
                por_distrito: porDistrito.rows,
                por_tipo_ue: porTipo.rows,
                totales: totales.rows[0]
            }
        });

    } catch (error) {
        console.error('Error en getReporte (subdirector):', error);
        return res.status(500).json({
            success: false,
            message: 'Error al generar reporte'
        });
    }
};

module.exports = {
    getMiPerfil,
    getDistritos,
    getUnidadesEducativas,
    getReporte
};