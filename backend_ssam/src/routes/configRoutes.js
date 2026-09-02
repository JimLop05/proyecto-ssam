// Ruta: backend-ssam/src/routes/configRoutes.js
// ============================================================
// RUTAS DE CONFIGURACIÓN
// ============================================================

const express = require('express');
const { getConfig } = require('../controllers/configController');

const router = express.Router();

// Ruta pública: obtener configuración de la plataforma
router.get('/', getConfig);

module.exports = router;