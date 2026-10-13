// backend_ssam/src/routes/claseRoutes.js

const express = require('express');
const router = express.Router();
const {
    getDatosFormulario,
    crearClase,
    getMisClases,
    getEstudiantesDeClase,
    getEstadisticasResumen,
    getEstadisticasMatriz,
    getEstadisticasEstudiante,
    cambiarEstadoEstudianteEnClase,
    quitarEstudianteDeClase,
} = require('../controllers/claseController');
const auth = require('../middlewares/auth');

// ============================================================
// FORMULARIO
// ============================================================
router.get('/datos-formulario', auth, getDatosFormulario);

// ============================================================
// CLASES
// ============================================================
router.post('/crear', auth, crearClase);
router.get('/mis-clases', auth, getMisClases);

// ============================================================
// ESTUDIANTES DE UNA CLASE
// ============================================================
router.get('/:id_clase/estudiantes', auth, getEstudiantesDeClase);
router.patch('/:id_clase/estudiantes/:id_usuarioE/estado', auth, cambiarEstadoEstudianteEnClase);
router.delete('/:id_clase/estudiantes/:id_usuarioE', auth, quitarEstudianteDeClase);

// ============================================================
// ESTADÍSTICAS DE LA CLASE
// ============================================================
router.get('/:id_clase/estadisticas/resumen', auth, getEstadisticasResumen);
router.get('/:id_clase/estadisticas/matriz', auth, getEstadisticasMatriz);
router.get('/:id_clase/estadisticas/estudiante/:id_usuarioE', auth, getEstadisticasEstudiante);

module.exports = router;