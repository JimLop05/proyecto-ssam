/* backend_ssam/src/routes/subdirectorRoutes.js */
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const {
    getMiPerfil,
    getDistritos,
    getUnidadesEducativas,
    getReporte
} = require('../controllers/subdirectorController');

// Todas requieren JWT
router.get('/mi-perfil',            auth, getMiPerfil);
router.get('/distritos',            auth, getDistritos);
router.get('/unidades-educativas',  auth, getUnidadesEducativas);
router.get('/reporte',              auth, getReporte);

module.exports = router;