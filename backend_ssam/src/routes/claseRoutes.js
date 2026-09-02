// backend_ssam/src/routes/claseRoutes.js

const express = require('express');
const router = express.Router();
const { getDatosFormulario, crearClase, getMisClases } = require('../controllers/claseController');
const auth = require('../middlewares/auth');

// Ruta para obtener datos del formulario (protegida con JWT)
router.get('/datos-formulario', auth, getDatosFormulario);

// NUEVA RUTA: Crear clase
router.post('/crear', auth, crearClase);

// NUEVA RUTA: Obtener clases del maestro
router.get('/mis-clases', auth, getMisClases);

module.exports = router;