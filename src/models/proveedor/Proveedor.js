const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProveedorSchema = new Schema({
    idProveedor: {type: String, required: true},
    name: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: String, required: true}
});

module.exports = mongoose.model('proveedore', ProveedorSchema);
