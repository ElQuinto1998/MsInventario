const express = require('express');
const router = express.Router();

const controller = require('../../controller/centros/PuntoController');

router.get('/puntosDistribucion', controller.getPuntosDistribucion);

module.exports = router;
