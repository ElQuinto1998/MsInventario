const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicamentoSchema = new Schema({
    code: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    salePrice: {type: Number, required: true},
    purchasePrice: {type: Number, required: true},
    image: {type: String, required: true},
    stock: {type: Number, required: true},
    proveedor: {type: Object, required: true},
    category: {type: Object, required: true},
    puntoDistribucion: {type: Object, required: true}
});

module.exports = User = mongoose.model('medicamento', MedicamentoSchema);
