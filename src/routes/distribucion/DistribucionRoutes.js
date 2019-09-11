'use strict';

let express = require('express');
let distribucionController = require('../../controller/distribucion/DistribucionController');
let sesionControl = require('../../controller/usuario/usuarioController');

let router = express.Router();

router.get('/distribucion', distribucionController.getPuntosDistribucion); 
router.get('/distribucion/:codigo', distribucionController.getPuntosDistribucionPorCodigo);
router.post('/distribucion/guardar', distribucionController.guardarPuntosDistribucion);
router.post('/distribucion/actualizar', distribucionController.actualizarPuntoDistribucion);
router.post('/distribucion/eliminar/:codigo', distribucionController.eliminarPuntoDistribucion); 

module.exports = router;
