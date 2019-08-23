'use strict'

let express = require('express');

let registroMedicamentoController = require('../../controller/registroMedicamento/RegistroMedicamentoController');

let router = express.Router();

router.get('/registroMedicamentos', registroMedicamentoController.getRegistrosMedicamentos);
router.get('/registroMedicamentos/:medicamentoCode', registroMedicamentoController.getRegistrosByMedicamentoCode);
router.post('/registroMedicamentos/guardar', registroMedicamentoController.guardarRegistroMedicamento);

module.exports = router;
