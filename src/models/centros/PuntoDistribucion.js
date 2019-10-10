const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PuntoDistribucionSchema = new Schema({
    name: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true}
});

module.exports = User = mongoose.model('puntoDistribucione', PuntoDistribucionSchema);
