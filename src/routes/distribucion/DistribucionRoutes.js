'use strict';

let express = require('express');
let distribucionController = require('../../controller/distribucion/DistribucionController');
let sesionControl = require('../../controller/usuario/usuarioController');

let router = express.Router();

router.get('/distribucion', sesionControl.verificarToken, distribucionController.getDistribucion);
router.get('/Distribucion/:codigo', sesionControl.verificarToken, distribucionController.getDistribucionByCode);
router.post('/distribucion/guardar', sesionControl.verificarToken, distribucionController.guardarDistribucion);
router.post('/distribucion/actualizar', sesionControl.verificarToken, distribucionController.actualizarDistribucion);
router.post('/distribucion/eliminar/:codigo', sesionControl.verificarToken, distribucionController.eliminarDistribucion);

module.exports = router;
