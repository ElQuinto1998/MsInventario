'use strict';

let express = require('express');
let router = express.Router();

let proveedorController = require('../../controller/proveedor/ProveedorController');
let sesionControl = require('../../controller/usuario/usuarioController');

router.get('/proveedores', /*sesionControl.verificarToken,*/ proveedorController.getProveedores);
router.post('/proveedores/guardar', /*sesionControl.verificarToken,*/ proveedorController.guardarProveedor);
router.post('/proveedores/actualizar', /*sesionControl.verificarToken,*/ proveedorController.actualizarProveedor);
router.post('/proveedores/eliminar/:idProveedor', /*sesionControl.verificarToken,*/ proveedorController.eliminarProveedor);

module.exports = router;
