let Medicamento = require('../../model/medicamento/Medicamento');
let {database} = require('../../database/firebase/DatabaseConfiguration');
let sesionControl = require('../usuario/UsuarioController');

/*let medicamento1 = new Medicamento("213", "Injection", 34, 40, 60, "cajas", "urlImagen", "Vicar farmacéutica");
let medicamento2 = new Medicamento("643", "Ampoya", 20, 22, 38, "cajas", "urlImagen", "Aspen colombia");
let medicamento3 = new Medicamento("134", "Ibuprofeno", 56, 60, 25, "cajas", "urlImagen", "GMEDICAL S.A.S");*/

let currentUser = {};

module.exports = {


    getMedicamentos: async (req, res) => {

        let medicamentos = {};
        currentUser = req.body.currentUser;

        //console.log(currentUser);

        if (currentUser && currentUser.rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser un administrador");
            return;
        }

        await database.ref("medicamentos").on('value', (data) => {
            medicamentos = data.val();
            res.json(medicamentos);
        });

    },

    getMedicamentoByCode: async (req, res) => {

        let codigo = req.params.codigo;

        /*await database.ref("medicamentos"). on('value', (data) => {
            medicamentos = data.val();
            res.json(medicamentos);
        });*/

        res.send(codigo);

    },

    guardarMedicamento: async (req, res) => {

        console.log(req.body);

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra, req.body.precioVenta, req.body.existencias, req.body.unidad, req.body.imagen, req.body.proveedor);
        await database.ref("medicamentos").push(medicamento);

        res.send("Medicamento guardado con exito");

    },

    validarRol: (rol) => {
        /*if(rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser un administrador");
        };*/
    }

};
