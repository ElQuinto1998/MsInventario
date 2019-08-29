'use strict';

let express = require('express');
let medicamentoController = require('../../controller/medicamento/MedicamentoController');
let sesionControl = require('../../controller/usuario/usuarioController');

let router = express.Router();

router.get('/medicamentos', sesionControl.verificarToken, medicamentoController.getMedicamentos);
router.get('/medicamentos/:codigo', sesionControl.verificarToken, medicamentoController.getMedicamentoByCode);
router.post('/medicamentos/guardar', sesionControl.verificarToken, medicamentoController.guardarMedicamento);
router.post('/medicamentos/actualizar', sesionControl.verificarToken, medicamentoController.actualizarMedicamento);
router.post('/medicamentos/eliminar/:codigo', sesionControl.verificarToken, medicamentoController.eliminarMedicamento);

module.exports = router;
