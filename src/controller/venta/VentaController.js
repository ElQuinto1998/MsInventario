let Venta = require('../../model/venta/Venta');
let {database} = require('../../database/firebase/DatabaseConfiguration');
let sesionControl = require('../usuario/UsuarioController');

let currentUser = {};

module.exports = {

    getVentas: async (req, res) => {


        currentUser = req.body.currentUser;

        if (currentUser && (currentUser.rol.id !== 1 || currentUser.rol.id !== 2)){
            res.status(401).send("No esta autorizado, debe ser administrador o farmacéutico");
            return;
        }

        let ventas;

        await database.ref("ventas").on('value', (snapshot) => {
            ventas = snapshot.val();
            console.log(ventas);
            res.json(ventas);
        });

    },

    getVentasByCode: async (req, res) => {

        let ventaCode = req.params.codigoTransaccion;
        await res.send(ventaCode);

    },

    getVentasPorFecha: async (req, res) => {

    },

    getVentasPorcodigoMedicamento: async (req, res) => {

    }

};
