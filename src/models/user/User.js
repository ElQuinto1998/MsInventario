const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    avatar: {type: String},
    rol: {type: String, required: true},
    password: {type: String, required: true},
    signUpDate: {type: Date, default: Date.now},
    lastLogin: {type: Date}
});

module.exports = User = mongoose.model('user', UserSchema);
