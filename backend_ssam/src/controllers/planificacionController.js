// backend_ssam/src/controllers/planificacionController.js
const pool = require('../config/db');

// ============================================================
// 1. OBTENER DATOS DE UNA CLASE PARA PLANIFICACIÓN
// ============================================================
const getDatosClase = async (req, res) => {
    try {
        const { id_clase } = req.params;
        const id_usuario = req.user.id;; // Del JWT

        // Verificar que la clase pertenece al maestro
        const claseQuery = await pool.query(
            `SELECT c.*, g.titulog, a.nombrea, ue.nombre as nombre_ue
             FROM CLASE c
             LEFT JOIN GRADO g ON c.id_grado = g.id_grado
             LEFT JOIN ASIGNATURA a ON c.id_asig = a.id_asig
             LEFT JOIN UE ue ON c.id_ue = ue.id_ue
             WHERE c.id_clase = $1 AND c.id_maestro = $2`,
            [id_clase, id_usuario]
        );

        if (claseQuery.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Clase no encontrada o no pertenece al maestro'
            });
        }

        // Obtener trimestres y semanas de la gestión actual
        const gestionActual = await pool.query(
            `SELECT id_gestion FROM GESTION 
             WHERE anio = EXTRACT(YEAR FROM CURRENT_DATE) 
             AND estado = 'ACTIVA'`
        );

        if (gestionActual.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No hay gestión activa para el año actual'
            });
        }

        const id_gestion = gestionActual.rows[0].id_gestion;

        // Obtener trimestres con sus semanas
        const trimestresQuery = await pool.query(
            `SELECT t.*, 
                json_agg(
                    json_build_object(
                        'id_semana', s.id_semana,
                        'numero_semana', s.numero_semana,
                        'dia_inicio', s.dia_inicio,
                        'dia_fin', s.dia_fin,
                        'observacion', s.observacion
                    ) ORDER BY s.numero_semana
                ) as semanas
             FROM TRIMESTRE t
             LEFT JOIN SEMANA s ON t.id_trimestre = s.id_trimestre
             WHERE t.id_gestion = $1
             GROUP BY t.id_trimestre
             ORDER BY t.ordent`,
            [id_gestion]
        );

        // Obtener unidades temáticas e items de la asignatura y grado de la clase
        const unidadesQuery = await pool.query(
            `SELECT ut.id_unid_tem, ut.nombreut, ut.objetivo,
                json_agg(
                    json_build_object(
                        'id_item', i.id_item,
                        'nombreitem', i.nombreitem
                    ) ORDER BY i.id_item
                ) as items
             FROM UNIDADTEMATICA ut
             LEFT JOIN ITEM i ON ut.id_unid_tem = i.id_unid_tem
             WHERE ut.id_grado = $1 AND ut.id_asig = $2
             GROUP BY ut.id_unid_tem
             ORDER BY ut.id_unid_tem`,
            [claseQuery.rows[0].id_grado, claseQuery.rows[0].id_asig]
        );

        // Verificar si ya existe una planificación para esta clase
        const planificacionQuery = await pool.query(
            `SELECT p.id_planificacion, p.anio, p.descripcion, p.estado
             FROM PLANIFICACION p
             WHERE p.id_maestro = $1 AND p.anio = EXTRACT(YEAR FROM CURRENT_DATE)
             AND EXISTS (
                 SELECT 1 FROM ESTA_FORMADO ef
                 JOIN SEMANA s ON ef.id_semana = s.id_semana
                 JOIN TRIMESTRE t ON s.id_trimestre = t.id_trimestre
                 JOIN GESTION g ON t.id_gestion = g.id_gestion
                 WHERE ef.id_planificacion = p.id_planificacion
                 AND g.id_gestion = $2
             )`,
            [id_usuario, id_gestion]
        );

        let planificacion = null;
        let itemsAsignados = {};

        if (planificacionQuery.rows.length > 0) {
            planificacion = planificacionQuery.rows[0];
            
            // Obtener items asignados a semanas
            const itemsAsignadosQuery = await pool.query(
                `SELECT ef.id_semana, ef.id_item
                 FROM ESTA_FORMADO ef
                 WHERE ef.id_planificacion = $1`,
                [planificacion.id_planificacion]
            );

            // Agrupar por semana
            itemsAsignados = itemsAsignadosQuery.rows.reduce((acc, row) => {
                if (!acc[row.id_semana]) {
                    acc[row.id_semana] = [];
                }
                acc[row.id_semana].push(row.id_item);
                return acc;
            }, {});
        }

        res.json({
            success: true,
            data: {
                clase: claseQuery.rows[0],
                trimestres: trimestresQuery.rows,
                unidades: unidadesQuery.rows,
                planificacion: planificacion,
                itemsAsignados: itemsAsignados
            }
        });

    } catch (error) {
        console.error('Error en getDatosClase:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener datos de la clase',
            error: error.message
        });
    }
};

// ============================================================
// 2. GUARDAR PLANIFICACIÓN
// ============================================================
const guardarPlanificacion = async (req, res) => {
    const client = await pool.connect();
    
    try {
        const { id_clase, id_planificacion, itemsAsignados } = req.body;
        const id_usuario = req.user.id;

        await client.query('BEGIN');

        // Verificar que la clase pertenece al maestro
        const claseQuery = await client.query(
            `SELECT id_clase, id_grado, id_asig FROM CLASE 
             WHERE id_clase = $1 AND id_maestro = $2`,
            [id_clase, id_usuario]
        );

        if (claseQuery.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para planificar esta clase'
            });
        }

        // Obtener el año actual
        const anioActual = new Date().getFullYear();

        let planificacionId = id_planificacion;

        // Si no hay planificación, crear una nueva
        if (!planificacionId) {
            const insertPlanificacion = await client.query(
                `INSERT INTO PLANIFICACION (anio, descripcion, fecha_creacion, estado, id_maestro)
                 VALUES ($1, $2, CURRENT_DATE, $3, $4)
                 RETURNING id_planificacion`,
                [anioActual, `Planificación ${anioActual}`, 'BORRADOR', id_usuario]
            );
            planificacionId = insertPlanificacion.rows[0].id_planificacion;
        }

        // Eliminar items anteriores de esta planificación
        await client.query(
            `DELETE FROM ESTA_FORMADO WHERE id_planificacion = $1`,
            [planificacionId]
        );

        // Insertar nuevos items asignados
        let itemsInsertados = 0;
        for (const [id_semana, items] of Object.entries(itemsAsignados)) {
            for (const id_item of items) {
                await client.query(
                    `INSERT INTO ESTA_FORMADO (id_planificacion, id_semana, id_item)
                     VALUES ($1, $2, $3)`,
                    [planificacionId, parseInt(id_semana), id_item]
                );
                itemsInsertados++;
            }
        }

        await client.query('COMMIT');

        res.json({
            success: true,
            message: 'Planificación guardada exitosamente',
            data: {
                id_planificacion: planificacionId,
                items_guardados: itemsInsertados
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error en guardarPlanificacion:', error);
        res.status(500).json({
            success: false,
            message: 'Error al guardar la planificación',
            error: error.message
        });
    } finally {
        client.release();
    }
};

// ============================================================
// 3. OBTENER CLASES DEL MAESTRO (para el selector)
// ============================================================
const getClasesMaestro = async (req, res) => {
    try {
        const id_usuario = req.user.id;

        const query = await pool.query(
            `SELECT c.id_clase, c.nombrec, a.nombrea as nombre_asignatura,
                    g.titulog as nombre_grado
             FROM CLASE c
             LEFT JOIN ASIGNATURA a ON c.id_asig = a.id_asig
             LEFT JOIN GRADO g ON c.id_grado = g.id_grado
             WHERE c.id_maestro = $1
             ORDER BY c.nombrec`,
            [id_usuario]
        );

        res.json({
            success: true,
            data: query.rows
        });

    } catch (error) {
        console.error('Error en getClasesMaestro:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener clases del maestro',
            error: error.message
        });
    }
};

// ============================================================
// EXPORTAR FUNCIONES
// ============================================================
module.exports = {
    getDatosClase,
    guardarPlanificacion,
    getClasesMaestro
};