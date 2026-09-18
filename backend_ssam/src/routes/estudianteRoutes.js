// Ruta: backend-ssam/src/routes/estudianteRoutes.js
// ============================================================
// RUTAS DE ESTUDIANTES
// Define los endpoints para la gestión de estudiantes
// ============================================================

const express = require('express');
const { 
    getEstudiantes, 
    getMisClases, 
    unirseAClase,
    getMiPerfil,
    getMiRendimiento,
    getDetalleClaseEstudiante,
    getPreguntasUnidad,
    enviarIntentoUnidad,   // 👈 NUEVO
    getDebugTodo   // 👈 TEMPORAL
} = require('../controllers/estudianteController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddleware, getEstudiantes);
router.get('/mi-perfil', authMiddleware, getMiPerfil);
router.get('/mis-clases', authMiddleware, getMisClases);
router.get('/mi-rendimiento', authMiddleware, getMiRendimiento);
router.post('/unirse-clase', authMiddleware, unirseAClase);
router.get('/clase/:id_clase', authMiddleware, getDetalleClaseEstudiante);
router.get('/unidad/:id_unid_tem/preguntas', authMiddleware, getPreguntasUnidad);
router.post('/unidad/:id_unid_tem/enviar-intento', authMiddleware, enviarIntentoUnidad); // 👈 NUEVO
router.get('/clase/:id_clase/debug-todo', authMiddleware, getDebugTodo); // 👈 TEMPORAL

module.exports = router;