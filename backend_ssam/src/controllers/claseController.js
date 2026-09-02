// backend_ssam/src/controllers/claseController.js

const { Pool } = require('pg');
const pool = require('../config/db');

// Obtener datos para el formulario de creación de clases
const getDatosFormulario = async (req, res) => {
    try {
        // Obtener el id del maestro desde el token
        const id_maestro = req.user.id;

        // Obtener el departamento del maestro
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

        // Obtener grados
        const gradosResult = await pool.query(
            'SELECT id_grado, tituloG, ordenG FROM GRADO ORDER BY ordenG'
        );

        // Obtener asignaturas
        const asignaturasResult = await pool.query(
            'SELECT id_asig, nombreA FROM ASIGNATURA ORDER BY nombreA'
        );

        // Obtener DISTRITOS del departamento del maestro
        const distritosResult = await pool.query(
            `SELECT id_distrito, nombreD, codigo_distrito 
             FROM DISTRITO 
             WHERE id_departamento = $1 
             ORDER BY nombreD`,
            [id_departamento]
        );

        // Obtener UNIDADES EDUCATIVAS del departamento del maestro
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
                departamento: {
                    id: id_departamento,
                    nombre: nombreDepartamento
                },
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
// FUNCIÓN: CREAR CLASE
// ============================================================
const crearClase = async (req, res) => {
    try {
        // Obtener datos del body
        const { 
            nombreC, 
            id_ue, 
            id_grado, 
            id_asig, 
            numEst,
            password_clase,
            turno,
            tipo_ue,
            estado_clase
        } = req.body;
        
        // Obtener el id del maestro desde el token
        const id_maestro = req.user.id;

        // Validar que todos los campos obligatorios estén presentes
        if (!nombreC || !id_ue || !id_grado || !id_asig || !numEst || !password_clase || !turno || !tipo_ue) {
            return res.status(400).json({
                success: false,
                message: 'Faltan campos obligatorios: nombreC, id_ue, id_grado, id_asig, numEst, password_clase, turno, tipo_ue'
            });
        }

        // Verificar que el usuario sea un maestro
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

        // ============================================================
        // VALIDACIÓN: Verificar que numEst no supere el num_est de la UE
        // ============================================================
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

        // Insertar la nueva clase
        const result = await pool.query(
            `INSERT INTO CLASE 
             (nombreC, numEst, password_clase, periodo, estado_clase, id_ue, id_grado, id_maestro, id_asig) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
             RETURNING *`,
            [
                nombreC,
                parseInt(numEst),
                password_clase,
                '2026-A', // Período por defecto
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
        // Obtener el id del maestro desde el token
        const id_maestro = req.user.id;

        // Verificar que el usuario sea un maestro
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

        // Obtener todas las clases del maestro
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

module.exports = {
    getDatosFormulario,
    crearClase,
    getMisClases  
};