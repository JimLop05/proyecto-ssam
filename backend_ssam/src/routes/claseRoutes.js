// backend_ssam/src/routes/claseRoutes.js

const express = require('express');
const router = express.Router();
const { 
    getDatosFormulario, 
    crearClase, 
    getMisClases,
    getEstudiantesDeClase
} = require('../controllers/claseController');
const auth = require('../middlewares/auth');

// Ruta para obtener datos del formulario (protegida con JWT)
router.get('/datos-formulario', auth, getDatosFormulario);

// Crear clase
router.post('/crear', auth, crearClase);

// Obtener clases del maestro
router.get('/mis-clases', auth, getMisClases);

// Obtener estudiantes inscritos en una clase específica
router.get('/:id_clase/estudiantes', auth, getEstudiantesDeClase);

module.exports = router;