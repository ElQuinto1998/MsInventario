'use strict';

let express = require('express');
let ventaController = require('../../controller/venta/VentaController');
let sessionControl = require('../../controller/usuario/UsuarioController');

let router = express.Router();

router.get('/ventas', sessionControl.verificarToken, ventaController.getVentas);
router.get('/ventas/:codigoTransaccion', sessionControl.verificarToken, ventaController.getVentasByCode);
router.get('/ventas/:codigoMedicamento', sessionControl.verificarToken, ventaController.getVentasPorcodigoMedicamento);
router.get('/ventas/:fecha', sessionControl.verificarToken, ventaController.getVentasPorFecha);

module.exports = router;
