const Proveedor = require("../../models/proveedor/Proveedor");
const Centro = require("../../models/centros/PuntoDistribucion");
const Medicamento = require("../../models/medicamento/Medicamento");
const User = require("../../models/user/User");

const controller = {};

controller.getTotals = async (req, res) => {
    let totalProveedores = 0;
    let totalCentros = 0;
    let totalMedicamentos = 0;
    let totalUsers = 0;

    await Proveedor.find().countDocuments()
        .then((count) => {
            totalProveedores = count
        }).catch(err => {
        console.log(err);
    });

    await Centro.find().countDocuments()
        .then((count) => {
            totalCentros = count
        }).catch(err => {
        console.log(err);
    });

    await Medicamento.find().countDocuments()
        .then((count) => {
            totalMedicamentos = count
        }).catch(err => {
        console.log(err);
    });

    await User.find().countDocuments()
        .then((count) => {
            totalUsers = count
        }).catch(err => {
        console.log(err);
    });

    console.log(totalUsers)

    res.send({
        totalProveedores: totalProveedores,
        totalCentros: totalCentros,
        totalMedicamentos: totalMedicamentos,
        totalUsers: totalUsers
    });

};

module.exports = controller;
