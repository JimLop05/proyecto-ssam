// Ruta: backend-ssam/src/routes/estudianteRoutes.js
// ============================================================
// RUTAS DE ESTUDIANTES
// Define los endpoints para la gestión de estudiantes
// ============================================================

const express = require('express');
const { getEstudiantes } = require('../controllers/estudianteController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// Ruta protegida: obtener todos los estudiantes (solo usuarios autenticados)
router.get('/', authMiddleware, getEstudiantes);

module.exports = router;