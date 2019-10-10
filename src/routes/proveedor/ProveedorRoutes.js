const express = require('express');
const router = express.Router();

const controller = require('../../controller/proveedor/ProveedorController');

const auth = require('../../middlewares/auth');

router.get('/proveedores', controller.getProveedores);
router.get('/proveedores/:idProveedor', controller.getProveedorById);
router.post('/proveedores', controller.saveProveedor);
router.put('/proveedores', controller.updateProveedor);
router.delete('/proveedores/:idProveedor', controller.delete);

module.exports = router;
