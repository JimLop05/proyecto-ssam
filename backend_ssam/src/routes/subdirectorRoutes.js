/* backend_ssam/src/routes/subdirectorRoutes.js */
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const requireRol = require('../middlewares/roles');
const {
    getMiPerfil,
    getDistritos,
    getUnidadesEducativas,
    getReporte,
    getFiltrosMonitoreo,   // 👈 nuevo
    getMonitoreoRendimiento,   // 👈 nuevo
    getMonitoreoPlanificacion   // 👈 nuevo
} = require('../controllers/subdirectorController');

const soloSubdirector = requireRol('SUBDIR_DEP');   // 👈 rol exacto del JWT

router.get('/mi-perfil',           auth, soloSubdirector, getMiPerfil);
router.get('/distritos',           auth, soloSubdirector, getDistritos);
router.get('/unidades-educativas', auth, soloSubdirector, getUnidadesEducativas);
router.get('/reporte',             auth, soloSubdirector, getReporte);
router.get('/monitoreo/filtros', auth, soloSubdirector, getFiltrosMonitoreo);
router.get('/monitoreo/rendimiento', auth, soloSubdirector, getMonitoreoRendimiento);
router.get('/monitoreo/planificacion', auth, soloSubdirector, getMonitoreoPlanificacion);

module.exports = router;