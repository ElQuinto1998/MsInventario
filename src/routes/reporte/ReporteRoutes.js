const express = require('express');
const router = express.Router();

const controller = require('../../controller/reporte/ReporteController');

router.get('/contadores', controller.getTotals);

module.exports = router;
