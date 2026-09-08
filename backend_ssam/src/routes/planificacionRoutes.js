// backend_ssam/src/routes/planificacionRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    getDatosClase,
    guardarPlanificacion,
    getClasesMaestro
} = require('../controllers/planificacionController');

// Todas las rutas requieren autenticación
router.use(auth);

// Obtener clases del maestro (para el selector)
router.get('/clases', getClasesMaestro);

// Obtener datos completos de una clase (trimestres, semanas, unidades, items)
router.get('/datos-clase/:id_clase', getDatosClase);

// Guardar planificación
router.post('/guardar', guardarPlanificacion);

module.exports = router;