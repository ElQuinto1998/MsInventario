const express = require('express');
const router = express.Router();

const controller = require('../../controller/categoria/CategoriaController');

router.get('/categorias', controller.getCategorias);

module.exports = router;
