'use strict';

let express = require('express');
let agregadoController = require('../../controller/agregados/AgregadosController');

let sesionController = require('../../controller/usuario/UsuarioController');

let router = express.Router();

router.get('/agregados/categorias', /*sesionControl.verificarToken,*/ agregadoController.getCategorias);

module.exports = router;
