const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriaSchema = new Schema({
    name: {type: String, unique: true, required: true},
});

module.exports = mongoose.model('categoria', CategoriaSchema);
