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

        // 4. Obtener la evaluación del estudiante para esta clase (si existe)
        const evalQuery = await pool.query(
            `SELECT id_evaluacion FROM evaluacion
             WHERE id_usuarioe = $1 AND id_clase = $2`,
            [id_usuarioE, id_clase]
        );
        const id_evaluacion = evalQuery.rows[0]?.id_evaluacion || null;

        // 5. Para cada unidad, obtener sus ítems + datos de EVALUA (si existen)
        const unidades = [];
        for (const unidad of unidadesQuery.rows) {
            const itemsQuery = await pool.query(`
                SELECT id_item, nombreitem
                FROM item
                WHERE id_unid_tem = $1
                ORDER BY id_item
            `, [unidad.id_unid_tem]);

            // 👈 NUEVO: buscar datos de EVALUA para esta unidad
            let evaluaData = null;
            if (id_evaluacion) {
                const evaluaQuery = await pool.query(
                    `SELECT nro_intentos, nota_alta, nota_promedio, estado
                     FROM evalua
                     WHERE id_evaluacion = $1 AND id_unid_tem = $2`,
                    [id_evaluacion, unidad.id_unid_tem]
                );
                evaluaData = evaluaQuery.rows[0] || null;
            }

            unidades.push({
                ...unidad,
                items: itemsQuery.rows,
                evalua: evaluaData  // 👈 NUEVO (null si nunca se rindió)
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
// ============================================================
// Obtener las preguntas de una unidad (para rendir la prueba)
// - Verifica inscripción a la clase
// - Crea la EVALUACION de la clase si no existe
// - Devuelve unidad + items + preguntas + opciones (sin es_correcta)
// ============================================================
const getPreguntasUnidad = async (req, res) => {
    const client = await pool.connect();
    try {
        const id_usuarioE = req.user.id;
        const { id_unid_tem } = req.params;
        const { id_clase } = req.query;

        // 1. Validar parámetros
        if (!id_clase) {
            return res.status(400).json({
                success: false,
                message: 'Falta el parámetro id_clase'
            });
        }

        // 2. Verificar que el estudiante esté inscrito en la clase
        const perteneceCheck = await client.query(
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

        // 3. Obtener datos de la clase (para el concepto de la evaluación)
        const claseQuery = await client.query(
            `SELECT id_clase, nombrec, id_grado, id_asig
             FROM clase WHERE id_clase = $1`,
            [id_clase]
        );

        if (claseQuery.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Clase no encontrada'
            });
        }

        const clase = claseQuery.rows[0];

        // 4. Verificar/crear EVALUACION (una por estudiante + clase)
        let evaluacionQuery = await client.query(
            `SELECT id_evaluacion FROM evaluacion
             WHERE id_usuarioe = $1 AND id_clase = $2`,
            [id_usuarioE, id_clase]
        );

        let id_evaluacion;

        if (evaluacionQuery.rows.length === 0) {
            // Crear la evaluación con concepto por defecto
            const concepto = `Evaluación de ${clase.nombrec}`.substring(0, 100);

            const nuevaEval = await client.query(
                `INSERT INTO evaluacion 
                    (concepto, ponderacion, recomendacion, fecha_inicio, estado_nivel, id_usuarioe, id_clase)
                 VALUES ($1, NULL, NULL, NOW(), 'EN_PROGRESO', $2, $3)
                 RETURNING id_evaluacion`,
                [concepto, id_usuarioE, id_clase]
            );

            id_evaluacion = nuevaEval.rows[0].id_evaluacion;
        } else {
            id_evaluacion = evaluacionQuery.rows[0].id_evaluacion;
        }

        // 5. Obtener datos de la unidad temática
        const unidadQuery = await client.query(
            `SELECT id_unid_tem, nombreut, objetivo, id_grado, id_asig
             FROM unidadtematica
             WHERE id_unid_tem = $1`,
            [id_unid_tem]
        );

        if (unidadQuery.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Unidad temática no encontrada'
            });
        }

        const unidad = unidadQuery.rows[0];

        // 6. Obtener items + preguntas + opciones de la unidad
        //    (opciones SIN es_correcta para no filtrar la respuesta)
        const preguntasQuery = await client.query(
            `SELECT 
                p.id_pregunta,
                p.descripcion,
                p.imagen,
                p.dificultad,
                p.tiempo_limite_segundos,
                p.palabra_clave,
                p.id_item,
                i.nombreitem,
                i.id_unid_tem
             FROM pregunta p
             INNER JOIN item i ON p.id_item = i.id_item
             WHERE i.id_unid_tem = $1
             ORDER BY i.id_item, p.id_pregunta`,
            [id_unid_tem]
        );

        // 7. Para cada pregunta, traer sus opciones (sin es_correcta)
        const preguntas = [];
        for (const p of preguntasQuery.rows) {
            const opcionesQuery = await client.query(
                `SELECT id_opcion, texto, imagen
                 FROM opcion
                 WHERE id_pregunta = $1
                 ORDER BY id_opcion`,
                [p.id_pregunta]
            );

            preguntas.push({
                ...p,
                opciones: opcionesQuery.rows
            });
        }

        res.json({
            success: true,
            data: {
                id_evaluacion,
                unidad: {
                    id_unid_tem: unidad.id_unid_tem,
                    nombreut: unidad.nombreut,
                    objetivo: unidad.objetivo
                },
                total_preguntas: preguntas.length,
                preguntas
            }
        });

    } catch (error) {
        console.error('Error en getPreguntasUnidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener las preguntas de la unidad'
        });
    } finally {
        client.release();
    }
};

// ============================================================
// Enviar el intento de una unidad
// - Recibe: { id_clase, respuestas: [{ id_pregunta, id_opcion }] }
// - Valida las respuestas contra la BD (no confía en el front)
// - Crea INTENTO + guarda RESPUESTAS + actualiza EVALUA
// - Todo dentro de una transacción
// ============================================================
const enviarIntentoUnidad = async (req, res) => {
    const client = await pool.connect();
    try {
        const id_usuarioE = req.user.id;
        const { id_unid_tem } = req.params;
        const { id_clase, respuestas } = req.body;

        // 1. Validaciones básicas
        if (!id_clase) {
            return res.status(400).json({
                success: false,
                message: 'Falta el campo id_clase'
            });
        }
        if (!Array.isArray(respuestas)) {
            return res.status(400).json({
                success: false,
                message: 'El campo respuestas debe ser un array'
            });
        }

        // 2. Verificar que el estudiante esté inscrito en la clase
        const perteneceCheck = await client.query(
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

        // 3. Verificar que exista la evaluación de esa clase
        const evalQuery = await client.query(
            `SELECT id_evaluacion FROM evaluacion
             WHERE id_usuarioe = $1 AND id_clase = $2`,
            [id_usuarioE, id_clase]
        );

        if (evalQuery.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No existe evaluación para esta clase. Primero carga las preguntas.'
            });
        }

        const id_evaluacion = evalQuery.rows[0].id_evaluacion;

        // 4. Contar TOTAL de preguntas reales de la unidad
        //    (para calcular la nota sobre el total, no sobre las respondidas)
        const totalQuery = await client.query(
            `SELECT COUNT(p.id_pregunta) AS total
             FROM pregunta p
             INNER JOIN item i ON p.id_item = i.id_item
             WHERE i.id_unid_tem = $1`,
            [id_unid_tem]
        );

        const totalPreguntas = parseInt(totalQuery.rows[0].total) || 0;

        if (totalPreguntas === 0) {
            return res.status(400).json({
                success: false,
                message: 'Esta unidad no tiene preguntas registradas'
            });
        }

                // 5. Validar cada respuesta contra la BD y contar correctas
            let correctas = 0;
            const respuestasValidas = [];
            const detalle = []; // 👈 NUEVO: detalle por pregunta para el frontend

            for (const r of respuestas) {
                // Si no hay opción (timeout) → marcar como incorrecta en el detalle
                if (!r.id_opcion) {
                    detalle.push({
                        id_pregunta: r.id_pregunta,
                        id_opcion: null,
                        es_correcta: false
                    });
                    continue;
                }

                const opcionQuery = await client.query(
                    `SELECT o.id_opcion, o.es_correcta
                    FROM opcion o
                    INNER JOIN pregunta p ON o.id_pregunta = p.id_pregunta
                    INNER JOIN item i ON p.id_item = i.id_item
                    WHERE o.id_opcion = $1 AND i.id_unid_tem = $2`,
                    [r.id_opcion, id_unid_tem]
                );

                if (opcionQuery.rows.length === 0) {
                    // Opción no pertenece a esta unidad → ignorar para guardar, pero marcar en detalle
                    detalle.push({
                        id_pregunta: r.id_pregunta,
                        id_opcion: r.id_opcion,
                        es_correcta: false
                    });
                    continue;
                }

                const esCorrecta = opcionQuery.rows[0].es_correcta;
                if (esCorrecta) correctas++;

                respuestasValidas.push({
                    id_opcion: r.id_opcion,
                    es_correcta: esCorrecta
                });

                // 👈 NUEVO: agregar al detalle
                detalle.push({
                    id_pregunta: r.id_pregunta,
                    id_opcion: r.id_opcion,
                    es_correcta: esCorrecta
                });
            }

        // 6. Calcular la nota sobre el TOTAL de preguntas
        const nota = Math.round((correctas / totalPreguntas) * 100);

        // 7. INICIAR TRANSACCIÓN
        await client.query('BEGIN');

        // 7a. Crear el INTENTO
        const intentoQuery = await client.query(
            `INSERT INTO intento 
                (fecha_intento, hora_intento, nro_respuestas_correctas, nota_unidad_tematica, id_unidad_tem, id_evaluacion)
             VALUES (CURRENT_DATE, CURRENT_TIME, $1, $2, $3, $4)
             RETURNING id_intento`,
            [correctas, nota, id_unid_tem, id_evaluacion]
        );

        const id_intento = intentoQuery.rows[0].id_intento;

        // 7b. Insertar las RESPUESTAS
        for (const r of respuestasValidas) {
            await client.query(
                `INSERT INTO respuesta (id_intento, id_opcion, es_correcta)
                 VALUES ($1, $2, $3)`,
                [id_intento, r.id_opcion, r.es_correcta]
            );
        }

        // 7c. Upsert en EVALUA
        const evaluaCheck = await client.query(
            `SELECT * FROM evalua WHERE id_evaluacion = $1 AND id_unid_tem = $2`,
            [id_evaluacion, id_unid_tem]
        );

        if (evaluaCheck.rows.length === 0) {
            // Primera vez que se rinde esta unidad → crear EVALUA
            await client.query(
                `INSERT INTO evalua (id_evaluacion, id_unid_tem, nota_alta, nro_intentos, nota_promedio, estado)
                 VALUES ($1, $2, $3, 1, $3, $4)`,
                [id_evaluacion, id_unid_tem, nota, 'EN_PROGRESO']
            );
        } else {
            // Ya existe → recalcular nro_intentos, nota_alta, nota_promedio
            const ev = evaluaCheck.rows[0];
            const nuevoNroIntentos = ev.nro_intentos + 1;
            const nuevaNotaAlta = Math.max(ev.nota_alta || 0, nota);
            const nuevoPromedio = Math.round(
                ((ev.nota_promedio * ev.nro_intentos) + nota) / nuevoNroIntentos
            );

            // Estado según la nota promedio
            let nuevoEstado = 'EN_PROGRESO';
            if (nuevoPromedio >= 51) nuevoEstado = 'APROBADO';
            else if (nuevoNroIntentos >= 3) nuevoEstado = 'REPROBADO';

            await client.query(
                `UPDATE evalua
                 SET nota_alta = $1, nro_intentos = $2, nota_promedio = $3, estado = $4
                 WHERE id_evaluacion = $5 AND id_unid_tem = $6`,
                [nuevaNotaAlta, nuevoNroIntentos, nuevoPromedio, nuevoEstado, id_evaluacion, id_unid_tem]
            );
        }

        // 8. COMMIT
        await client.query('COMMIT');

        // 9. Responder
        res.json({
            success: true,
            message: 'Intento registrado correctamente',
            data: {
                id_intento,
                id_evaluacion,
                id_unid_tem,
                nro_respuestas_correctas: correctas,
                total_preguntas: totalPreguntas,
                nota_unidad_tematica: nota,
                detalle // 👈 NUEVO
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error en enviarIntentoUnidad:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar el intento'
        });
    } finally {
        client.release();
    }
};

module.exports = {
    getEstudiantes,
    getMisClases,
    unirseAClase,
    getMiPerfil,
    getMiRendimiento,
    getDetalleClaseEstudiante,
    getPreguntasUnidad,
    enviarIntentoUnidad  
};