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
// Helper: obtener la gestión activa (o fallback)
// ============================================================
async function getGestionActual() {
    // 1. Intentar con estado = 'ACTIVA'
    let result = await pool.query(`
        SELECT id_gestion, anio, estado
        FROM gestion
        WHERE estado = 'ACTIVA'
        ORDER BY anio ASC
        LIMIT 1
    `);

    // 2. Fallback: el año más cercano al actual
    if (result.rows.length === 0) {
        result = await pool.query(`
            SELECT id_gestion, anio, estado
            FROM gestion
            ORDER BY ABS(anio - EXTRACT(YEAR FROM CURRENT_DATE)) ASC
            LIMIT 1
        `);
    }

    // 3. Último fallback: hardcode 2026
    return result.rows[0] || { id_gestion: null, anio: 2026, estado: 'ACTIVA' };
}

// ============================================================
// GET /api/subdirector/mi-perfil
// ============================================================
const getMiPerfil = async (req, res) => {
    const idUsuario = req.user.id;

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
                (SELECT COUNT(*) FROM ue ue1
                    JOIN distrito di ON di.id_distrito = ue1.id_distrito
                    WHERE di.id_departamento = $1)::int AS unidades_educativas,
                (SELECT COALESCE(SUM(ue2.num_est), 0) FROM ue ue2
                    JOIN distrito di ON di.id_distrito = ue2.id_distrito
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
    const idUsuario = req.user.id;

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
    const idUsuario = req.user.id;

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        // 0. Gestión actual
        const gestionQuery = `
            SELECT id_gestion, anio, estado
            FROM gestion
            WHERE estado = 'ACTIVA'
            ORDER BY anio DESC
            LIMIT 1
        `;
        let gestionRes = await pool.query(gestionQuery);
        if (gestionRes.rows.length === 0) {
            gestionRes = await pool.query(`
                SELECT id_gestion, anio, estado
                FROM gestion
                ORDER BY anio DESC
                LIMIT 1
            `);
        }
        const gestionActual = gestionRes.rows[0] || { anio: 2026 };

        // 1. UE del departamento
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
            data: {
                anio_gestion: gestionActual.anio,
                unidades: result.rows
            }
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
    const idUsuario = req.user.id;

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        // 0. Gestión actual (activa o la más reciente)
        const gestionQuery = `
            SELECT id_gestion, anio, estado
            FROM gestion
            WHERE estado = 'ACTIVA'
            ORDER BY anio DESC
            LIMIT 1
        `;
        let gestionRes = await pool.query(gestionQuery);

        // Fallback: si no hay activa, tomar la más reciente
        if (gestionRes.rows.length === 0) {
            gestionRes = await pool.query(`
                SELECT id_gestion, anio, estado
                FROM gestion
                ORDER BY anio DESC
                LIMIT 1
            `);
        }

        const gestionActual = gestionRes.rows[0] || { anio: 2026 };

        // 1. Por distrito
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

        // 2. Totales generales
        const totalesQuery = `
            SELECT
                (SELECT COUNT(*) FROM distrito WHERE id_departamento = $1)::int AS total_distritos,
                (SELECT COUNT(*) FROM ue ue1
                    JOIN distrito di ON di.id_distrito = ue1.id_distrito
                    WHERE di.id_departamento = $1)::int AS total_ue,
                (SELECT COALESCE(SUM(ue2.num_est), 0) FROM ue ue2
                    JOIN distrito di ON di.id_distrito = ue2.id_distrito
                    WHERE di.id_departamento = $1)::int AS total_estudiantes,
                (SELECT COUNT(*) FROM maestro WHERE id_departamento = $1)::int AS total_maestros
        `;
        const totales = await pool.query(totalesQuery, [depto.id_departamento]);

        // 3. Por tipo de UE
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
                anio_gestion: gestionActual.anio,
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

// ============================================================
// GET /api/subdirector/monitoreo/filtros
// Devuelve distritos, asignaturas, grados y gestiones para los selects
// ============================================================
const getFiltrosMonitoreo = async (req, res) => {
    const idUsuario = req.user.id;

    try {
        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const idDepto = depto.id_departamento;

        // 1. Distritos del departamento
        const distritosQuery = `
            SELECT id_distrito, nombreD AS nombre, codigo_distrito
            FROM distrito
            WHERE id_departamento = $1
            ORDER BY nombreD ASC
        `;
        const distritos = await pool.query(distritosQuery, [idDepto]);

        // 2. Asignaturas que aparecen en clases de UE del depto
        const asignaturasQuery = `
            SELECT DISTINCT a.id_asig, a.nombreA AS nombre
            FROM asignatura a
            JOIN clase c ON c.id_asig = a.id_asig
            JOIN ue ue ON ue.id_ue = c.id_ue
            JOIN distrito di ON di.id_distrito = ue.id_distrito
            WHERE di.id_departamento = $1
            ORDER BY a.nombreA ASC
        `;
        const asignaturas = await pool.query(asignaturasQuery, [idDepto]);

        // 3. Grados que aparecen en clases de UE del depto
        const gradosQuery = `
            SELECT DISTINCT g.id_grado, g.tituloG AS nombre, g.ordenG
            FROM grado g
            JOIN clase c ON c.id_grado = g.id_grado
            JOIN ue ue ON ue.id_ue = c.id_ue
            JOIN distrito di ON di.id_distrito = ue.id_distrito
            WHERE di.id_departamento = $1
            ORDER BY g.ordenG ASC
        `;
        const grados = await pool.query(gradosQuery, [idDepto]);

        // 4. Gestiones disponibles
        const gestionesQuery = `
            SELECT id_gestion, anio, estado
            FROM gestion
            ORDER BY anio DESC
        `;
        const gestiones = await pool.query(gestionesQuery);

        return res.json({
            success: true,
            data: {
                distritos: distritos.rows,
                asignaturas: asignaturas.rows,
                grados: grados.rows,
                gestiones: gestiones.rows
            }
        });

    } catch (error) {
        console.error('Error en getFiltrosMonitoreo:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener filtros',
            detalle: error.message
        });
    }
};

// ============================================================
// GET /api/subdirector/monitoreo/rendimiento
// Monitoreo de rendimiento por distrito / asignatura / grado
// ============================================================
const getMonitoreoRendimiento = async (req, res) => {
    const idUsuario = req.user.id;
    const {
        id_distrito = null,
        id_asig = null,
        id_grado = null
    } = req.query;

    try {
        // 0. Validaciones
        if (!id_asig || !id_grado) {
            return res.status(400).json({
                success: false,
                message: 'Debes seleccionar asignatura y grado'
            });
        }

        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const idDepto = depto.id_departamento;
        const idDistritoParam = id_distrito ? parseInt(id_distrito) : null;
        const idAsigParam = parseInt(id_asig);
        const idGradoParam = parseInt(id_grado);

        // 1. Contexto (totales) + nombres
        const contextoQuery = `
            SELECT 
                (SELECT tituloG FROM grado WHERE id_grado = $2) AS grado,
                (SELECT nombreA FROM asignatura WHERE id_asig = $1) AS asignatura,
                (SELECT nombreD FROM distrito WHERE id_distrito = $4) AS distrito,
                COUNT(DISTINCT c.id_clase)::int AS total_clases,
                COUNT(DISTINCT c.id_ue)::int AS total_ue,
                COUNT(DISTINCT ev.id_usuarioE)::int AS total_estudiantes,
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END)::numeric(5,2) AS promedio_general
            FROM clase c
            JOIN ue ON ue.id_ue = c.id_ue
            JOIN distrito d ON d.id_distrito = ue.id_distrito
            LEFT JOIN evaluacion ev ON ev.id_clase = c.id_clase
            LEFT JOIN intento i ON i.id_evaluacion = ev.id_evaluacion
            LEFT JOIN respuesta r ON r.id_intento = i.id_intento
            WHERE c.id_asig = $1 
            AND c.id_grado = $2
            AND d.id_departamento = $3
            AND ($4::int IS NULL OR d.id_distrito = $4)
        `;
        const contextoRes = await pool.query(contextoQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);
        const contextoRow = contextoRes.rows[0];

        // 2. Unidades temáticas con promedio
        const unidadesQuery = `
            SELECT 
                ut.id_unid_tem,
                ut.nombreUT AS nombre,
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END)::numeric(5,2) AS promedio,
                COUNT(r.id_intento)::int AS total_respuestas,
                COUNT(DISTINCT it.id_item)::int AS total_items
            FROM unidadtematica ut
            LEFT JOIN item it ON it.id_unid_tem = ut.id_unid_tem
            LEFT JOIN pregunta p ON p.id_item = it.id_item
            LEFT JOIN opcion o ON o.id_pregunta = p.id_pregunta
            LEFT JOIN respuesta r ON r.id_opcion = o.id_opcion
            LEFT JOIN intento i ON i.id_intento = r.id_intento
            LEFT JOIN evaluacion ev ON ev.id_evaluacion = i.id_evaluacion
            LEFT JOIN clase c ON c.id_clase = ev.id_clase
            LEFT JOIN ue ON ue.id_ue = c.id_ue
            LEFT JOIN distrito d ON d.id_distrito = ue.id_distrito
            WHERE ut.id_asig = $1
              AND ut.id_grado = $2
              AND (
                    -- Con datos: filtramos por depto/distrito
                    (d.id_departamento = $3 AND ($4::int IS NULL OR d.id_distrito = $4))
                    OR
                    -- Sin datos: la unidad igual entra (LEFT JOIN deja todo null)
                    (r.id_intento IS NULL)
                  )
            GROUP BY ut.id_unid_tem, ut.nombreUT
            ORDER BY ut.id_unid_tem ASC
        `;
        const unidadesRes = await pool.query(unidadesQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);

        // 3. Items con promedio
        const itemsQuery = `
            SELECT 
                it.id_item,
                it.nombreItem AS nombre,
                ut.id_unid_tem,
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END)::numeric(5,2) AS promedio,
                COUNT(DISTINCT p.id_pregunta)::int AS total_preguntas,
                COUNT(r.id_intento)::int AS total_respuestas
            FROM item it
            JOIN unidadtematica ut ON ut.id_unid_tem = it.id_unid_tem
            LEFT JOIN pregunta p ON p.id_item = it.id_item
            LEFT JOIN opcion o ON o.id_pregunta = p.id_pregunta
            LEFT JOIN respuesta r ON r.id_opcion = o.id_opcion
            LEFT JOIN intento i ON i.id_intento = r.id_intento
            LEFT JOIN evaluacion ev ON ev.id_evaluacion = i.id_evaluacion
            LEFT JOIN clase c ON c.id_clase = ev.id_clase
            LEFT JOIN ue ON ue.id_ue = c.id_ue
            LEFT JOIN distrito d ON d.id_distrito = ue.id_distrito
            WHERE ut.id_asig = $1
              AND ut.id_grado = $2
              AND (
                    (d.id_departamento = $3 AND ($4::int IS NULL OR d.id_distrito = $4))
                    OR
                    (r.id_intento IS NULL)
                  )
            GROUP BY it.id_item, it.nombreItem, ut.id_unid_tem
            ORDER BY it.id_item ASC
        `;
        const itemsRes = await pool.query(itemsQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);

        // 4. Ensamblar respuesta
        const itemsPorUnidad = {};
        itemsRes.rows.forEach((it) => {
            if (!itemsPorUnidad[it.id_unid_tem]) itemsPorUnidad[it.id_unid_tem] = [];
            itemsPorUnidad[it.id_unid_tem].push({
                id_item: it.id_item,
                nombre: it.nombre,
                promedio: it.promedio !== null ? Number(it.promedio) : null,
                total_preguntas: it.total_preguntas,
                total_respuestas: it.total_respuestas
            });
        });

        const unidades = unidadesRes.rows.map((u) => ({
            id_unid_tem: u.id_unid_tem,
            nombre: u.nombre,
            promedio: u.promedio !== null ? Number(u.promedio) : null,
            total_items: u.total_items,
            total_respuestas: u.total_respuestas,
            items: itemsPorUnidad[u.id_unid_tem] || []
        }));

        const promedioGeneral = contextoRow.promedio_general !== null
            ? Number(contextoRow.promedio_general)
            : null;

        const gestionActual = await getGestionActual();

        return res.json({
            success: true,
            data: {
                contexto: {
                    distrito: contextoRow.distrito || 'Todos los distritos',
                    asignatura: contextoRow.asignatura,
                    grado: contextoRow.grado,
                    gestion: gestionActual.anio,
                    total_clases: contextoRow.total_clases,
                    total_ue: contextoRow.total_ue,             // 👈 nuevo
                    total_estudiantes: contextoRow.total_estudiantes
                },
                promedio_general: promedioGeneral,
                unidades
            }
        });

    } catch (error) {
        console.error('Error en getMonitoreoRendimiento:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener monitoreo de rendimiento',
            detalle: error.message
        });
    }
};
// ============================================================
// GET /api/subdirector/monitoreo/planificacion
// Monitoreo de planificación docente por distrito / asignatura / grado
// ============================================================
const getMonitoreoPlanificacion = async (req, res) => {
    const idUsuario = req.user.id;
    const {
        id_distrito = null,
        id_asig = null,
        id_grado = null
    } = req.query;

    try {
        // 0. Validaciones
        if (!id_asig || !id_grado) {
            return res.status(400).json({
                success: false,
                message: 'Debes seleccionar asignatura y grado'
            });
        }

        const depto = await getDepartamentoDelSubdirector(idUsuario);
        if (!depto) {
            return res.status(404).json({
                success: false,
                message: 'No tienes un departamento asignado'
            });
        }

        const idDepto = depto.id_departamento;
        const idDistritoParam = id_distrito ? parseInt(id_distrito) : null;
        const idAsigParam = parseInt(id_asig);
        const idGradoParam = parseInt(id_grado);

        // 1. Contexto (totales) + nombres
        const contextoQuery = `
            SELECT 
                (SELECT tituloG FROM grado WHERE id_grado = $2) AS grado,
                (SELECT nombreA FROM asignatura WHERE id_asig = $1) AS asignatura,
                (SELECT nombreD FROM distrito WHERE id_distrito = $4) AS distrito,
                COUNT(DISTINCT p.id_planificacion)::int AS total_planificaciones
            FROM planificacion p
            JOIN clase c ON c.id_clase = p.id_clase
            JOIN ue ON ue.id_ue = c.id_ue
            JOIN distrito d ON d.id_distrito = ue.id_distrito
            WHERE p.id_clase IS NOT NULL
              AND c.id_asig = $1
              AND c.id_grado = $2
              AND d.id_departamento = $3
              AND ($4::int IS NULL OR d.id_distrito = $4)
        `;
        const contextoRes = await pool.query(contextoQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);
        const contextoRow = contextoRes.rows[0];

        // 2. CTE base reutilizable: items únicos por planificación
        const cteBase = `
            WITH items_por_plan AS (
                SELECT DISTINCT 
                    ef.id_planificacion, 
                    ef.id_item
                FROM esta_formado ef
                JOIN planificacion p ON p.id_planificacion = ef.id_planificacion
                JOIN clase c ON c.id_clase = p.id_clase
                JOIN ue ON ue.id_ue = c.id_ue
                JOIN distrito d ON d.id_distrito = ue.id_distrito
                WHERE p.id_clase IS NOT NULL
                  AND c.id_asig = $1
                  AND c.id_grado = $2
                  AND d.id_departamento = $3
                  AND ($4::int IS NULL OR d.id_distrito = $4)
            )
        `;

        // 3. Query circular: distribución por grado de origen de los items
        const porGradoQuery = cteBase + `
            SELECT
                ut.id_grado,
                g.tituloG AS grado,
                COUNT(*)::int AS items
            FROM items_por_plan ipp
            JOIN item i ON i.id_item = ipp.id_item
            JOIN unidadtematica ut ON ut.id_unid_tem = i.id_unid_tem
            JOIN grado g ON g.id_grado = ut.id_grado
            GROUP BY ut.id_grado, g.tituloG
            ORDER BY ut.id_grado DESC
        `;
        const porGradoRes = await pool.query(porGradoQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);

        // 4. Query barras: items por unidad temática
        const porUnidadQuery = cteBase + `
            SELECT
                ut.id_unid_tem,
                ut.nombreUT AS unidad,
                ut.id_grado,
                g.tituloG AS grado,
                COUNT(*)::int AS items_usados,
                COUNT(DISTINCT ipp.id_planificacion)::int AS planificaciones_que_la_incluyen
            FROM items_por_plan ipp
            JOIN item i ON i.id_item = ipp.id_item
            JOIN unidadtematica ut ON ut.id_unid_tem = i.id_unid_tem
            JOIN grado g ON g.id_grado = ut.id_grado
            GROUP BY ut.id_unid_tem, ut.nombreUT, ut.id_grado, g.tituloG
            ORDER BY ut.id_grado DESC, items_usados DESC
        `;
        const porUnidadRes = await pool.query(porUnidadQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);

        // 5. Total items usados (suma de únicos por planificación)
        const totalItemsQuery = cteBase + `
            SELECT COUNT(*)::int AS total
            FROM items_por_plan
        `;
        const totalItemsRes = await pool.query(totalItemsQuery, [
            idAsigParam, idGradoParam, idDepto, idDistritoParam
        ]);

        // 6. Ensamblar respuesta
        const totalItemsUsados = totalItemsRes.rows[0].total;

        // Calcular porcentajes para el circular
        const totalItemsGrado = porGradoRes.rows.reduce((acc, r) => acc + r.items, 0);
        const porGrado = porGradoRes.rows.map((r) => ({
            id_grado: r.id_grado,
            grado: r.grado,
            es_grado_actual: r.id_grado === idGradoParam,
            items: r.items,
            porcentaje: totalItemsGrado > 0
                ? Number(((r.items / totalItemsGrado) * 100).toFixed(1))
                : 0
        }));

        // Calcular promedio items por unidad
        const porUnidad = porUnidadRes.rows.map((r) => ({
            id_unid_tem: r.id_unid_tem,
            unidad: r.unidad,
            id_grado: r.id_grado,
            grado: r.grado,
            es_grado_actual: r.id_grado === idGradoParam,
            items_usados: r.items_usados,
            planificaciones_que_la_incluyen: r.planificaciones_que_la_incluyen,
            promedio_items: r.planificaciones_que_la_incluyen > 0
                ? Number((r.items_usados / r.planificaciones_que_la_incluyen).toFixed(2))
                : 0
        }));

        const gestionActual = await getGestionActual();

        return res.json({
            success: true,
            data: {
                contexto: {
                    distrito: contextoRow.distrito || 'Todos los distritos',
                    asignatura: contextoRow.asignatura,
                    grado: contextoRow.grado,
                    anio_gestion: gestionActual.anio,
                    total_planificaciones: contextoRow.total_planificaciones,
                    total_items_usados: totalItemsUsados
                },
                por_grado: porGrado,
                por_unidad: porUnidad
            }
        });

    } catch (error) {
        console.error('Error en getMonitoreoPlanificacion:', error);
        return res.status(500).json({
            success: false,
            message: 'Error al obtener monitoreo de planificación',
            detalle: error.message
        });
    }
};

module.exports = {
    getMiPerfil,
    getDistritos,
    getUnidadesEducativas,
    getReporte,
    getFiltrosMonitoreo,
    getMonitoreoRendimiento,   // 👈 nuevo
    getMonitoreoPlanificacion   // 👈 nuevo
};