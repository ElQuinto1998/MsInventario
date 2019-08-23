'use strict';

let express = require('express');
let medicamentoController = require('../../controller/medicamento/MedicamentoController');

let router = express.Router();

router.get('/medicamentos', medicamentoController.getMedicamentos);
router.get('/medicamentos/:codigo', medicamentoController.getMedicamentoByCode);
router.post('/medicamentos/guardar', medicamentoController.guardarMedicamento);

module.exports = router;
