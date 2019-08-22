'use strict'

let express = require('express');
let medicamentoController = require('../../controller/medicamento/MedicamentoController');

let router = express.Router();

router.get('/medicamentos', medicamentoController.getMedicamentos);
router.get('/medicamentos/:code?', medicamentoController.getMedicamentoByCode);
//router.post('/:codigo', movieCtrl.postMovie);

module.exports = router;
