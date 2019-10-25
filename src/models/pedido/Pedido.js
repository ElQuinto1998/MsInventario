const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    numberPedido: {type: String, unique: true, required: true},
    userEmail: {type: String, required: true},
    state: {type: String, required: true},
    items: {type: Array, required: true},
    dateSolicitud: {type: Date, default: Date.now, required: true},
    dateAprobacion: {type: Date},
    total: {type: Number, required: true}
});

module.exports = User = mongoose.model('Pedido', PedidoSchema);
