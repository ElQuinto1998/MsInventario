'use strict';

let express = require('express');
let distribucionController = require('../../controller/distribucion/DistribucionController');
let sesionControl = require('../../controller/usuario/usuarioController');

let router = express.Router();

router.get('/distribucion', /*sesionControl.verificarToken,*/ distribucionController.getPuntosDistribucion);
router.get('/distribucion/:codigo', /*sesionControl.verificarToken,*/ distribucionController.getPuntosDistribucionPorCodigo);
router.post('/distribucion/guardar', /*sesionControl.verificarToken,*/ distribucionController.guardarPuntosDistribucion);
router.post('/distribucion/actualizar', /*sesionControl.verificarToken,*/ distribucionController.actualizarPuntoDistribucion);
router.post('/distribucion/eliminar/:codigo', /*sesionControl.verificarToken,*/ distribucionController.eliminarPuntoDistribucion);

module.exports = router;
