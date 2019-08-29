let express = require('express');
let usuarioController = require('../../controller/usuario/UsuarioController');

let router = express.Router();

router.get("/usuario", usuarioController.verificarToken, usuarioController.getInformacion);

module.exports = router;
