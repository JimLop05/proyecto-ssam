// Ruta: backend-ssam/src/routes/authRoutes.js
// ============================================================
// RUTAS DE AUTENTICACIÓN
// Define los endpoints para registro, login y perfil
// ============================================================

const express = require('express');
const { 
    register, 
    login, 
    getProfile, 
    validarCodigoMaestro,        // 👈 Nueva
    registrarMaestroCompleto     // 👈 Nueva
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Ruta pública: registro de usuario
router.post('/register', register);

// Ruta pública: inicio de sesión
router.post('/login', login);

// 👇 NUEVAS RUTAS PARA MAESTROS
router.post('/validar-codigo-maestro', validarCodigoMaestro);
router.post('/registro-maestro', registrarMaestroCompleto);

// Ruta protegida: obtener perfil del usuario autenticado
router.get('/profile', authMiddleware, getProfile);

module.exports = router;