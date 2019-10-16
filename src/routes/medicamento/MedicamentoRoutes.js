const express = require('express');
const router = express.Router();
//
const controller = require('../../controller/medicamento/MedicamentoController');

router.post('/medicamentos',  controller.createMedicamento);
router.get('/medicamentos', controller.getMedicamentos);
router.get('/medicamentos/:code', controller.getMedicamentoByCode);
router.put('/medicamentos', controller.updateMedicamento);
router.delete('/medicamentos/:code', controller.deleteMedicamento);

module.exports = router;
