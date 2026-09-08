// Ruta: backend-ssam/src/controllers/authController.js
// ============================================================
// CONTROLADOR DE AUTENTICACIÓN (VERSIÓN DEFINITIVA)
// Todas las columnas están limpias (sin acentos ni ñ)
// ============================================================

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
    try {
        const { 
            username, nombre, apellido1, apellido2, email, password, rol,
            telefono, especialidad, categoria, fecha_nacimiento, sexo, 
            tipo_estudiante, fecha_ingreso, gestion
        } = req.body;

        if (!password) {
            return res.status(400).json({ 
                message: 'La contraseña es obligatoria.' 
            });
        }

        const userExists = await pool.query(
            'SELECT * FROM usuario WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ 
                message: 'El usuario o email ya están registrados.' 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            `INSERT INTO usuario 
            (username, nombre, apellido1, apellido2, email, password, estado) 
            VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVO') 
            RETURNING id_usuario, username, nombre, apellido1, apellido2, email, estado`,
            [username, nombre, apellido1, apellido2, email, hashedPassword]
        );

        const userId = newUser.rows[0].id_usuario;
        let rolAsignado = 'USUARIO';

        if (rol === 'ADMINISTRADOR') {
            await pool.query(
                'INSERT INTO administrador (id_usuarioA, telefono) VALUES ($1, $2)',
                [userId, telefono || null]
            );
            rolAsignado = 'ADMINISTRADOR';

        } else if (rol === 'MAESTRO') {
            await pool.query(
                'INSERT INTO maestro (id_usuarioM, especialidad, categoria, fecha_asignacion) VALUES ($1, $2, $3, $4)',
                [userId, especialidad || 'Matemáticas', categoria || 'Titular', new Date()]
            );
            rolAsignado = 'MAESTRO';

        } else if (rol === 'ESTUDIANTE') {
            await pool.query(
                'INSERT INTO estudiante (id_usuarioE, fecha_nacimiento, estado, sexo, tipo_estudiante) VALUES ($1, $2, $3, $4, $5)',
                [userId, fecha_nacimiento || '2000-01-01', 'ACTIVO', sexo || 'M', tipo_estudiante || 'PUBLICO']
            );
            rolAsignado = 'ESTUDIANTE';

        } else if (rol === 'DIR_UE') {
            await pool.query(
                'INSERT INTO dir_ue (id_usuarioDU, telefono) VALUES ($1, $2)',
                [userId, telefono || null]
            );
            rolAsignado = 'DIR_UE';

        } else if (rol === 'DIR_DIS') {
            await pool.query(
                'INSERT INTO dir_dis (id_usuarioDD, fecha_ingreso, gestion) VALUES ($1, $2, $3)',
                [userId, fecha_ingreso || new Date(), gestion || 2026]
            );
            rolAsignado = 'DIR_DIS';

        } else if (rol === 'SUBDIR_DEP') {
            await pool.query(
                'INSERT INTO subdir_dep (id_usuarioSD) VALUES ($1)',
                [userId]
            );
            rolAsignado = 'SUBDIR_DEP';

        } else {
            rolAsignado = 'USUARIO';
        }

        const token = jwt.sign(
            { id: userId, username: username, rol: rolAsignado },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: {
                id_usuario: userId,
                username: username,
                nombre: nombre,
                apellido1: apellido1,
                apellido2: apellido2,
                email: email,
                estado: 'ACTIVO',
                rol: rolAsignado
            }
        });

    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userResult = await pool.query(
            'SELECT * FROM usuario WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        await pool.query(
            'UPDATE usuario SET fecha_ultimo_acceso = NOW() WHERE id_usuario = $1',
            [user.id_usuario]
        );

            // 4. Determinar el rol del usuario (con departamento para maestro)
        let rol = 'USUARIO';
        let departamento = null;
        let idDepartamento = null;

        const adminCheck = await pool.query('SELECT * FROM administrador WHERE id_usuarioA = $1', [user.id_usuario]);
        if (adminCheck.rows.length > 0) {
            rol = 'ADMINISTRADOR';
        }

        const maestroCheck = await pool.query(
            `SELECT m.*, d.nombreD as departamento_nombre, d.id_departamento 
            FROM maestro m 
            LEFT JOIN departamento d ON m.id_departamento = d.id_departamento 
            WHERE m.id_usuarioM = $1`,
            [user.id_usuario]
        );
        if (maestroCheck.rows.length > 0) {
            rol = 'MAESTRO';
            departamento = maestroCheck.rows[0].departamento_nombre;
            idDepartamento = maestroCheck.rows[0].id_departamento;
        }

        const estudianteCheck = await pool.query('SELECT * FROM estudiante WHERE id_usuarioE = $1', [user.id_usuario]);
        if (estudianteCheck.rows.length > 0) rol = 'ESTUDIANTE';

        const dirUeCheck = await pool.query('SELECT * FROM dir_ue WHERE id_usuarioDU = $1', [user.id_usuario]);
        if (dirUeCheck.rows.length > 0) rol = 'DIR_UE';

        const dirDisCheck = await pool.query('SELECT * FROM dir_dis WHERE id_usuarioDD = $1', [user.id_usuario]);
        if (dirDisCheck.rows.length > 0) rol = 'DIR_DIS';

        const subdirCheck = await pool.query('SELECT * FROM subdir_dep WHERE id_usuarioSD = $1', [user.id_usuario]);
        if (subdirCheck.rows.length > 0) rol = 'SUBDIR_DEP';
        const token = jwt.sign(
            { id: user.id_usuario, username: user.username, rol: rol },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id_usuario: user.id_usuario,
                username: user.username,
                nombre: user.nombre,
                apellido1: user.apellido1,
                apellido2: user.apellido2,
                email: user.email,
                estado: user.estado,
                rol: rol,
                departamento: departamento,      // 👈 Nuevo
                id_departamento: idDepartamento  // 👈 Nuevo
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
};

const getProfile = async (req, res) => {
    try {
        const userResult = await pool.query(
            'SELECT id_usuario, username, nombre, apellido1, apellido2, email, estado, fecha_creacion FROM usuario WHERE id_usuario = $1',
            [req.user.id]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = userResult.rows[0];
        let rol = 'USUARIO';

        const adminCheck = await pool.query('SELECT * FROM administrador WHERE id_usuarioA = $1', [user.id_usuario]);
        if (adminCheck.rows.length > 0) rol = 'ADMINISTRADOR';

        const maestroCheck = await pool.query('SELECT * FROM maestro WHERE id_usuarioM = $1', [user.id_usuario]);
        if (maestroCheck.rows.length > 0) rol = 'MAESTRO';

        const estudianteCheck = await pool.query('SELECT * FROM estudiante WHERE id_usuarioE = $1', [user.id_usuario]);
        if (estudianteCheck.rows.length > 0) rol = 'ESTUDIANTE';

        const dirUeCheck = await pool.query('SELECT * FROM dir_ue WHERE id_usuarioDU = $1', [user.id_usuario]);
        if (dirUeCheck.rows.length > 0) rol = 'DIR_UE';

        const dirDisCheck = await pool.query('SELECT * FROM dir_dis WHERE id_usuarioDD = $1', [user.id_usuario]);
        if (dirDisCheck.rows.length > 0) rol = 'DIR_DIS';

        const subdirCheck = await pool.query('SELECT * FROM subdir_dep WHERE id_usuarioSD = $1', [user.id_usuario]);
        if (subdirCheck.rows.length > 0) rol = 'SUBDIR_DEP';

        res.json({
            ...user,
            rol: rol
        });
    } catch (error) {
        console.error('Error en getProfile:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
};
// ==================== VALIDAR CÓDIGO DE MAESTRO =============
const validarCodigoMaestro = async (req, res) => {
    try {
        const { codigo } = req.body;

        if (!codigo) {
            return res.status(400).json({ 
                success: false, 
                message: 'El código de maestro es requerido' 
            });
        }

        // Buscar el departamento que tenga este código
        const result = await pool.query(
            `SELECT id_departamento, nombreD, codigo_maestro 
             FROM departamento 
             WHERE codigo_maestro = $1`,
            [codigo]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Código de maestro inválido' 
            });
        }

        res.json({
            success: true,
            message: 'Código válido',
            data: {
                id_departamento: result.rows[0].id_departamento,
                nombre: result.rows[0].nombreD
            }
        });

    } catch (error) {
        console.error('Error en validarCodigoMaestro:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al validar código de maestro' 
        });
    }
};
// ==================== REGISTRO DE MAESTRO (SIMPLE) =========
const registrarMaestroCompleto = async (req, res) => {
    const client = await pool.connect();
    try {
        const {
            username, nombre, apellido1, apellido2, email, password,
            especialidad, categoria,
            idDepartamento
        } = req.body;

        // 1. Verificar si el usuario ya existe
        const userExists = await client.query(
            'SELECT * FROM usuario WHERE username = $1 OR email = $2',
            [username, email]
        );
        if (userExists.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({ 
                success: false, 
                message: 'El usuario o email ya están registrados' 
            });
        }

        // 2. Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insertar usuario
        const newUser = await client.query(
            `INSERT INTO usuario 
            (username, nombre, apellido1, apellido2, email, password, estado) 
            VALUES ($1, $2, $3, $4, $5, $6, 'ACTIVO') 
            RETURNING id_usuario`,
            [username, nombre, apellido1, apellido2, email, hashedPassword]
        );
        const userId = newUser.rows[0].id_usuario;

        // 4. Insertar en MAESTRO (con id_departamento)
        await client.query(
            `INSERT INTO maestro 
            (id_usuarioM, especialidad, categoria, fecha_asignacion, id_departamento) 
            VALUES ($1, $2, $3, NOW(), $4)`,
            [userId, especialidad || 'Matemáticas', categoria || 'Titular', idDepartamento]
        );

        await client.query('COMMIT');

        // 5. Generar token JWT
        const token = jwt.sign(
            { id: userId, username: username, rol: 'MAESTRO' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            success: true,
            message: 'Maestro registrado exitosamente',
            token,
            user: {
                id_usuario: userId,
                username,
                nombre,
                apellido1,
                email,
                rol: 'MAESTRO'
            }
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error en registrarMaestroCompleto:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al registrar maestro. Verifica los datos e intenta de nuevo.' 
        });
    } finally {
        client.release();
    }
};

// Obtener perfil del usuario autenticado
const getPerfil = async (req, res) => {
    try {
        const id_usuario = req.user.id_usuario;
        
        const query = await pool.query(
            `SELECT u.id_usuario, u.username, u.nombre, u.apellido1, u.apellido2, 
                    u.email, u.estado, u.fecha_creacion, u.fecha_ultimo_acceso,
                    u.rol
             FROM USUARIO u
             WHERE u.id_usuario = $1`,
            [id_usuario]
        );
        
        if (query.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: query.rows[0]
        });
        
    } catch (error) {
        console.error('Error en getPerfil:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
            error: error.message
        });
    }
};
module.exports = {
    register,
    login,
    getProfile,
    validarCodigoMaestro,        // 👈 Nueva
    registrarMaestroCompleto     // 👈 Nueva
};