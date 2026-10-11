// backend_ssam/src/controllers/claseController.js

const { Pool } = require('pg');
const pool = require('../config/db');

// Constantes fijas (por ahora, contexto actual del sistema)
const ID_ASIGNATURA_FIJA = 2;
const ID_GRADO_FIJO = 6;
const PREGUNTAS_POR_UNIDAD = 10;

// ============================================================
// OBTENER DATOS PARA EL FORMULARIO DE CREACIÓN DE CLASES
// ============================================================
const getDatosFormulario = async (req, res) => {
    try {
        const id_maestro = req.user.id;

        const maestroResult = await pool.query(
            `SELECT m.id_departamento, d.nombreD 
             FROM MAESTRO m
             JOIN DEPARTAMENTO d ON m.id_departamento = d.id_departamento
             WHERE m.id_usuarioM = $1`,
            [id_maestro]
        );

        if (maestroResult.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'El usuario no es un maestro registrado'
            });
        }

        const id_departamento = maestroResult.rows[0].id_departamento;
        const nombreDepartamento = maestroResult.rows[0].nombreD;

        const gradosResult = await pool.query(
            'SELECT id_grado, tituloG, ordenG FROM GRADO ORDER BY ordenG'
        );

        const asignaturasResult = await pool.query(
            'SELECT id_asig, nombreA FROM ASIGNATURA ORDER BY nombreA'
        );

        const distritosResult = await pool.query(
            `SELECT id_distrito, nombreD, codigo_distrito 
             FROM DISTRITO 
             WHERE id_departamento = $1 
             ORDER BY nombreD`,
            [id_departamento]
        );

        const ueResult = await pool.query(
            `SELECT ue.id_ue, ue.nombre, ue.codigo_ue, ue.id_distrito, ue.num_est
            FROM UE ue
            JOIN DISTRITO d ON ue.id_distrito = d.id_distrito
            WHERE d.id_departamento = $1
            ORDER BY ue.nombre`,
            [id_departamento]
        );

        res.status(200).json({
            success: true,
            data: {
                departamento: { id: id_departamento, nombre: nombreDepartamento },
                grados: gradosResult.rows,
                asignaturas: asignaturasResult.rows,
                distritos: distritosResult.rows,
                unidadesEducativas: ueResult.rows
            }
        });
    } catch (error) {
        console.error('Error al obtener datos del formulario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener datos del formulario',
            error: error.message
        });
    }
};

// ============================================================
// CREAR CLASE
// ============================================================
const crearClase = async (req, res) => {
    try {
        const { 
            nombreC, id_ue, id_grado, id_asig, numEst,
            password_clase, turno, tipo_ue, estado_clase
        } = req.body;

        const id_maestro = req.user.id;

        if (!nombreC || !id_ue || !id_grado || !id_asig || !numEst || !password_clase || !turno || !tipo_ue) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nombreC, id_ue, id_grado, id_asig, numEst, password_clase, turno, tipo_ue'
            });
        }

        const maestroCheck = await pool.query(
            'SELECT * FROM MAESTRO WHERE id_usuarioM = $1',
            [id_maestro]
        );

        if (maestroCheck.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'El usuario no es un maestro registrado'
            });
        }

        const ueCheck = await pool.query(
            'SELECT num_est FROM UE WHERE id_ue = $1',
            [id_ue]
        );

        if (ueCheck.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'La Unidad Educativa seleccionada no existe'
            });
        }

        const capacidadMaxima = ueCheck.rows[0].num_est;
        if (parseInt(numEst) > capacidadMaxima) {
            return res.status(400).json({
                success: false,
                message: `El número de estudiantes (${numEst}) no puede superar la capacidad de la UE (${capacidadMaxima})`
            });
        }

        const result = await pool.query(
            `INSERT INTO CLASE 
             (nombreC, numEst, password_clase, periodo, estado_clase, id_ue, id_grado, id_maestro, id_asig) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
             RETURNING *`,
            [
                nombreC,
                parseInt(numEst),
                password_clase,
                '2026-A',
                estado_clase || 'ACTIVA',
                parseInt(id_ue),
                parseInt(id_grado),
                id_maestro,
                parseInt(id_asig)
            ]
        );

        const nuevaClase = result.rows[0];

        res.status(201).json({
            success: true,
            message: 'Clase creada exitosamente',
            data: {
                id_clase: nuevaClase.id_clase,
                nombreC: nuevaClase.nombreC,
                password_clase: nuevaClase.password_clase,
                periodo: nuevaClase.periodo,
                estado_clase: nuevaClase.estado_clase,
                numEst: nuevaClase.numEst
            }
        });

    } catch (error) {
        console.error('Error al crear clase:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear la clase',
            error: error.message
        });
    }
};

// ============================================================
// OBTENER CLASES DEL MAESTRO
// ============================================================
const getMisClases = async (req, res) => {
    try {
        const id_maestro = req.user.id;

        const maestroCheck = await pool.query(
            'SELECT * FROM MAESTRO WHERE id_usuarioM = $1',
            [id_maestro]
        );

        if (maestroCheck.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'El usuario no es un maestro registrado'
            });
        }

        const result = await pool.query(
            `SELECT 
                c.id_clase,
                c.nombreC,
                c.numEst,
                c.password_clase,
                c.periodo,
                c.estado_clase,
                c.id_ue,
                c.id_grado,
                c.id_asig,
                ue.nombre AS nombre_ue,
                g.tituloG AS nombre_grado,
                a.nombreA AS nombre_asignatura
             FROM CLASE c
             JOIN UE ue ON c.id_ue = ue.id_ue
             JOIN GRADO g ON c.id_grado = g.id_grado
             JOIN ASIGNATURA a ON c.id_asig = a.id_asig
             WHERE c.id_maestro = $1
             ORDER BY c.id_clase DESC`,
            [id_maestro]
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error('Error al obtener las clases:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las clases',
            error: error.message
        });
    }
};

// ============================================================
// OBTENER ESTUDIANTES INSCRITOS EN UNA CLASE
// ============================================================
const getEstudiantesDeClase = async (req, res) => {
    try {
        const id_maestro = req.user.id;
        const { id_clase } = req.params;

        const maestroCheck = await pool.query(
            'SELECT * FROM MAESTRO WHERE id_usuarioM = $1',
            [id_maestro]
        );

        if (maestroCheck.rows.length === 0) {
            return res.status(403).json({
                success: false,
                message: 'El usuario no es un maestro registrado'
            });
        }

        const claseCheck = await pool.query(
            `SELECT id_clase, nombreC FROM CLASE 
             WHERE id_clase = $1 AND id_maestro = $2`,
            [id_clase, id_maestro]
        );

        if (claseCheck.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Clase no encontrada o no tienes permiso para verla'
            });
        }

        const result = await pool.query(
            `SELECT 
                u.id_usuario,
                u.username,
                u.nombre,
                u.apellido1,
                u.apellido2,
                u.email,
                u.estado AS estado_usuario,
                e.fecha_nacimiento,
                e.sexo,
                e.tipo_estudiante
             FROM PERTENECE p
             INNER JOIN ESTUDIANTE e ON p.id_usuarioE = e.id_usuarioE
             INNER JOIN USUARIO u ON e.id_usuarioE = u.id_usuario
             WHERE p.id_clase = $1
             ORDER BY u.apellido1, u.apellido2, u.nombre`,
            [id_clase]
        );

        res.status(200).json({
            success: true,
            data: {
                clase: claseCheck.rows[0],
                estudiantes: result.rows,
                total: result.rows.length
            }
        });

    } catch (error) {
        console.error('Error al obtener estudiantes de la clase:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los estudiantes de la clase',
            error: error.message
        });
    }
};

// ============================================================
// HELPER: validar que la clase pertenece al maestro
// Devuelve la clase o null si no es válida
// ============================================================
const _verificarClaseDelMaestro = async (id_clase, id_maestro) => {
    const maestroCheck = await pool.query(
        'SELECT 1 FROM MAESTRO WHERE id_usuarioM = $1',
        [id_maestro]
    );
    if (maestroCheck.rows.length === 0) return { error: 'no-maestro' };

    const claseCheck = await pool.query(
        `SELECT c.id_clase, c.nombreC, c.numEst, c.id_grado, c.id_asig,
                ue.nombre AS nombre_ue,
                g.tituloG AS nombre_grado,
                a.nombreA AS nombre_asignatura
         FROM CLASE c
         JOIN UE ue ON c.id_ue = ue.id_ue
         JOIN GRADO g ON c.id_grado = g.id_grado
         JOIN ASIGNATURA a ON c.id_asig = a.id_asig
         WHERE c.id_clase = $1 AND c.id_maestro = $2`,
        [id_clase, id_maestro]
    );
    if (claseCheck.rows.length === 0) return { error: 'no-clase' };

    return { clase: claseCheck.rows[0] };
};

// ============================================================
// ESTADÍSTICAS · RESUMEN GLOBAL DE LA CLASE
// GET /api/clases/:id_clase/estadisticas/resumen
// ============================================================
const getEstadisticasResumen = async (req, res) => {
    try {
        const id_maestro = req.user.id;
        const { id_clase } = req.params;

        const verif = await _verificarClaseDelMaestro(id_clase, id_maestro);
        if (verif.error === 'no-maestro') {
            return res.status(403).json({ success: false, message: 'El usuario no es un maestro registrado' });
        }
        if (verif.error === 'no-clase') {
            return res.status(404).json({ success: false, message: 'Clase no encontrada o sin permiso' });
        }

        const clase = verif.clase;

        // Inscritos reales (PERTENECE)
        const inscritosRes = await pool.query(
            'SELECT COUNT(*)::int AS total FROM PERTENECE WHERE id_clase = $1',
            [id_clase]
        );
        const inscritos = inscritosRes.rows[0].total;

        // Total unidades temáticas aplicables
        const unidadesRes = await pool.query(
            'SELECT COUNT(*)::int AS total FROM UNIDADTEMATICA WHERE id_grado = $1 AND id_asig = $2',
            [ID_GRADO_FIJO, ID_ASIGNATURA_FIJA]
        );
        const total_unidades = unidadesRes.rows[0].total;

        // Promedio general de la clase (todas las respuestas)
        const promedioRes = await pool.query(
            `SELECT 
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END) AS promedio,
                COUNT(DISTINCT ev.id_usuarioE)::int AS estudiantes_con_intentos
             FROM EVALUACION ev
             JOIN INTENTO i ON i.id_evaluacion = ev.id_evaluacion
             JOIN RESPUESTA r ON r.id_intento = i.id_intento
             WHERE ev.id_clase = $1`,
            [id_clase]
        );

        const promedioRaw = promedioRes.rows[0]?.promedio;
        const promedio_clase = promedioRaw !== null && promedioRaw !== undefined
            ? Number(Number(promedioRaw).toFixed(1))
            : null;
        const estudiantes_con_intentos = promedioRes.rows[0]?.estudiantes_con_intentos || 0;

        const porcentaje_ocupacion = clase.numest > 0
            ? Math.round((inscritos / clase.numest) * 100)
            : 0;

        res.status(200).json({
            success: true,
            data: {
                clase: {
                    id_clase: clase.id_clase,
                    nombreC: clase.nombrec,
                    numEst: clase.numest,
                    nombre_ue: clase.nombre_ue,
                    nombre_grado: clase.nombre_grado,
                    nombre_asignatura: clase.nombre_asignatura
                },
                inscritos,
                aforo: clase.numest,
                porcentaje_ocupacion,
                total_unidades,
                promedio_clase,
                estudiantes_con_intentos
            }
        });

    } catch (error) {
        console.error('Error en getEstadisticasResumen:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener el resumen de estadísticas',
            error: error.message
        });
    }
};

// ============================================================
// ESTADÍSTICAS · MATRIZ (rúbrica / mapa de calor)
// GET /api/clases/:id_clase/estadisticas/matriz
// Filas = Unidades Temáticas · Columnas = P1..P10
// ============================================================
const getEstadisticasMatriz = async (req, res) => {
    try {
        const id_maestro = req.user.id;
        const { id_clase } = req.params;

        const verif = await _verificarClaseDelMaestro(id_clase, id_maestro);
        if (verif.error === 'no-maestro') {
            return res.status(403).json({ success: false, message: 'El usuario no es un maestro registrado' });
        }
        if (verif.error === 'no-clase') {
            return res.status(404).json({ success: false, message: 'Clase no encontrada o sin permiso' });
        }

        // 1. Unidades temáticas + preguntas numeradas 1..10
        const preguntasRes = await pool.query(
            `WITH preguntas_ordenadas AS (
                SELECT 
                    ut.id_unid_tem,
                    ut.nombreUT,
                    p.id_pregunta,
                    it.id_item,
                    it.nombreItem,
                    ROW_NUMBER() OVER (
                        PARTITION BY ut.id_unid_tem 
                        ORDER BY it.id_item, p.id_pregunta
                    )::int AS numero
                FROM UNIDADTEMATICA ut
                JOIN ITEM it ON it.id_unid_tem = ut.id_unid_tem
                JOIN PREGUNTA p ON p.id_item = it.id_item
                WHERE ut.id_grado = $1 AND ut.id_asig = $2
            )
            SELECT * FROM preguntas_ordenadas
            ORDER BY id_unid_tem, numero`,
            [ID_GRADO_FIJO, ID_ASIGNATURA_FIJA]
        );

        // 2. Agregado de respuestas por pregunta (solo de esta clase)
        const promediosRes = await pool.query(
            `SELECT 
                o.id_pregunta,
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END) AS promedio,
                COUNT(*)::int AS intentos
             FROM EVALUACION ev
             JOIN INTENTO i ON i.id_evaluacion = ev.id_evaluacion
             JOIN RESPUESTA r ON r.id_intento = i.id_intento
             JOIN OPCION o ON o.id_opcion = r.id_opcion
             WHERE ev.id_clase = $1
             GROUP BY o.id_pregunta`,
            [id_clase]
        );

        const mapPromedios = {};
        promediosRes.rows.forEach((row) => {
            mapPromedios[row.id_pregunta] = {
                promedio: row.promedio !== null
                    ? Number(Number(row.promedio).toFixed(1))
                    : null,
                intentos: row.intentos
            };
        });

        // 3. Construir estructura de unidades + celdas
        const unidadesMap = {};
        const celdas = [];

        preguntasRes.rows.forEach((row) => {
            if (!unidadesMap[row.id_unid_tem]) {
                unidadesMap[row.id_unid_tem] = {
                    id_unid_tem: row.id_unid_tem,
                    nombreUT: row.nombreut,
                    orden: Object.keys(unidadesMap).length + 1
                };
            }

            const datos = mapPromedios[row.id_pregunta] || { promedio: null, intentos: 0 };

            celdas.push({
                id_unid_tem: row.id_unid_tem,
                id_pregunta: row.id_pregunta,
                numero: row.numero,
                promedio: datos.promedio,
                intentos: datos.intentos,
                id_item: row.id_item,
                nombreItem: row.nombreitem
            });
        });

        res.status(200).json({
            success: true,
            data: {
                unidades: Object.values(unidadesMap),
                celdas,
                total_preguntas_por_unidad: PREGUNTAS_POR_UNIDAD
            }
        });

    } catch (error) {
        console.error('Error en getEstadisticasMatriz:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener la matriz de estadísticas',
            error: error.message
        });
    }
};

// ============================================================
// ESTADÍSTICAS · DETALLE POR ESTUDIANTE
// GET /api/clases/:id_clase/estadisticas/estudiante/:id_usuarioE
// ============================================================
const getEstadisticasEstudiante = async (req, res) => {
    try {
        const id_maestro = req.user.id;
        const { id_clase, id_usuarioE } = req.params;

        const verif = await _verificarClaseDelMaestro(id_clase, id_maestro);
        if (verif.error === 'no-maestro') {
            return res.status(403).json({ success: false, message: 'El usuario no es un maestro registrado' });
        }
        if (verif.error === 'no-clase') {
            return res.status(404).json({ success: false, message: 'Clase no encontrada o sin permiso' });
        }

        // 1. Validar que el estudiante pertenezca a la clase
        const perteneceRes = await pool.query(
            `SELECT u.id_usuario, u.nombre, u.apellido1, u.apellido2
             FROM PERTENECE p
             JOIN USUARIO u ON p.id_usuarioE = u.id_usuario
             WHERE p.id_clase = $1 AND p.id_usuarioE = $2`,
            [id_clase, id_usuarioE]
        );

        if (perteneceRes.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'El estudiante no pertenece a esta clase'
            });
        }

        const estudiante = perteneceRes.rows[0];

        // 2. Estructura de unidades + preguntas (mismo orden que la matriz)
        const preguntasRes = await pool.query(
            `WITH preguntas_ordenadas AS (
                SELECT 
                    ut.id_unid_tem,
                    ut.nombreUT,
                    p.id_pregunta,
                    it.id_item,
                    it.nombreItem,
                    ROW_NUMBER() OVER (
                        PARTITION BY ut.id_unid_tem 
                        ORDER BY it.id_item, p.id_pregunta
                    )::int AS numero
                FROM UNIDADTEMATICA ut
                JOIN ITEM it ON it.id_unid_tem = ut.id_unid_tem
                JOIN PREGUNTA p ON p.id_item = it.id_item
                WHERE ut.id_grado = $1 AND ut.id_asig = $2
            )
            SELECT * FROM preguntas_ordenadas
            ORDER BY id_unid_tem, numero`,
            [ID_GRADO_FIJO, ID_ASIGNATURA_FIJA]
        );

        // 3. Promedios del estudiante por pregunta
        const promediosRes = await pool.query(
            `SELECT 
                o.id_pregunta,
                AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END) AS promedio,
                COUNT(*)::int AS intentos
             FROM EVALUACION ev
             JOIN INTENTO i ON i.id_evaluacion = ev.id_evaluacion
             JOIN RESPUESTA r ON r.id_intento = i.id_intento
             JOIN OPCION o ON o.id_opcion = r.id_opcion
             WHERE ev.id_clase = $1 AND ev.id_usuarioE = $2
             GROUP BY o.id_pregunta`,
            [id_clase, id_usuarioE]
        );

        const mapPromedios = {};
        promediosRes.rows.forEach((row) => {
            mapPromedios[row.id_pregunta] = {
                promedio: row.promedio !== null
                    ? Number(Number(row.promedio).toFixed(1))
                    : null,
                intentos: row.intentos
            };
        });

        // 4. Intentos del estudiante por unidad (para promedio_unidad)
        const intentosUnidadRes = await pool.query(
            `SELECT 
                i.id_unidad_tem,
                COUNT(*)::int AS intentos,
                AVG(i.nota_unidad_tematica) AS promedio_unidad
             FROM EVALUACION ev
             JOIN INTENTO i ON i.id_evaluacion = ev.id_evaluacion
             WHERE ev.id_clase = $1 AND ev.id_usuarioE = $2
             GROUP BY i.id_unidad_tem`,
            [id_clase, id_usuarioE]
        );

        const mapIntentosUnidad = {};
        intentosUnidadRes.rows.forEach((row) => {
            mapIntentosUnidad[row.id_unidad_tem] = {
                intentos: row.intentos,
                promedio_unidad: row.promedio_unidad !== null
                    ? Number(Number(row.promedio_unidad).toFixed(1))
                    : null
            };
        });

        // 5. Armar estructura final
        const unidadesMap = {};
        preguntasRes.rows.forEach((row) => {
            if (!unidadesMap[row.id_unid_tem]) {
                const metaUnidad = mapIntentosUnidad[row.id_unid_tem] || {
                    intentos: 0,
                    promedio_unidad: null
                };
                unidadesMap[row.id_unid_tem] = {
                    id_unid_tem: row.id_unid_tem,
                    nombreUT: row.nombreut,
                    promedio_unidad: metaUnidad.promedio_unidad,
                    intentos: metaUnidad.intentos,
                    preguntas: []
                };
            }

            const datos = mapPromedios[row.id_pregunta] || { promedio: null, intentos: 0 };
            unidadesMap[row.id_unid_tem].preguntas.push({
                id_pregunta: row.id_pregunta,
                numero: row.numero,
                promedio: datos.promedio,
                intentos: datos.intentos,
                id_item: row.id_item,
                nombreItem: row.nombreitem
            });
        });

        // 6. Promedio general del estudiante en la clase
        const promedioGeneralRes = await pool.query(
            `SELECT AVG(CASE WHEN r.es_correcta THEN 100.0 ELSE 0.0 END) AS promedio
             FROM EVALUACION ev
             JOIN INTENTO i ON i.id_evaluacion = ev.id_evaluacion
             JOIN RESPUESTA r ON r.id_intento = i.id_intento
             WHERE ev.id_clase = $1 AND ev.id_usuarioE = $2`,
            [id_clase, id_usuarioE]
        );

        const promedioRaw = promedioGeneralRes.rows[0]?.promedio;
        const promedio_general = promedioRaw !== null && promedioRaw !== undefined
            ? Number(Number(promedioRaw).toFixed(1))
            : null;

        res.status(200).json({
            success: true,
            data: {
                estudiante: {
                    id_usuarioE: estudiante.id_usuario,
                    nombre: estudiante.nombre,
                    apellido1: estudiante.apellido1,
                    apellido2: estudiante.apellido2
                },
                promedio_general,
                unidades: Object.values(unidadesMap)
            }
        });

    } catch (error) {
        console.error('Error en getEstadisticasEstudiante:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las estadísticas del estudiante',
            error: error.message
        });
    }
};

module.exports = {
    getDatosFormulario,
    crearClase,
    getMisClases,
    getEstudiantesDeClase,
    getEstadisticasResumen,
    getEstadisticasMatriz,
    getEstadisticasEstudiante
};