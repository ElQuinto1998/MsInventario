'use strict';

let express = require('express');
let agregadoController = require('../../controller/agregados/AgregadosController');

let router = express.Router();

router.get('/agregados/categorias', agregadoController.getCategorias);

module.exports = router;
