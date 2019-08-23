let express = require('express');
let usuarioController = require('../../controller/usuario/usuarioController');

let router = express.Router();

router.post("/usuario/login", usuarioController.login);
router.post("/usuario/logout", usuarioController.logout);
router.post("/usuario/register", usuarioController.registerUser);

module.exports = router;
