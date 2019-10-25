const express = require('express');
const router = express.Router();

const controller = require('../../controller/pedido/PedidoController');

router.get('/pedidos', controller.getPedidos);
router.get('/pedidos/:userEmail', controller.getPedidosByUser);
router.post('/pedidos', controller.savePedido);
router.put('/pedidos/:numberPedido', controller.updatePedido);

module.exports = router;
