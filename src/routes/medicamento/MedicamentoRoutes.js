const express = require('express');
const router = express.Router();

const controller = require('../../controller/medicamento/MedicamentoController');
const auth = require('../../middlewares/auth');

router.post('/medicamentos', auth.isAuth,  controller.createMedicamento);
router.get('/medicamentos', controller.getMedicamentos);
router.get('/medicamentos/:code', controller.getMedicamentoByCode);
router.put('/medicamentos', auth.isAuth, controller.updateMedicamento);
router.delete('/medicamentos/:code', auth.isAuth, controller.deleteMedicamento);

module.exports = router;
