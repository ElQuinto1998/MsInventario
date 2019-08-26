let RegistroMedicamento = require('../../model/registroMedicamento/RegistroMedicamento');
let {database} = require('../../database/firebase/DatabaseConfiguration');
let sesionControl = require('../usuario/UsuarioController');

/*let registroM1 = new RegistroMedicamento("ABC-123", new Date(), medicamento1, "Ingreso", 6, "cajas");
let registroM2 = new RegistroMedicamento("GFF-753", new Date(), medicamento2, "Salida", 23, "cajas");
let registroM3 = new RegistroMedicamento("UYT-265", new Date(), medicamento3, "Ingreso", 13, "cajas");

let registrosM = [registroM1, registroM2, registroM3];*/

module.exports = {

    getRegistrosMedicamentos: async (req, res) => {


        let registrosMedicamentos;

        await database.ref("registrosMedicamentos").on('value', (snapshot) => {
            registrosMedicamentos = snapshot.val();
            console.log(registrosMedicamentos);
            res.json(registrosMedicamentos);
        });

    },

    getRegistrosByMedicamentoCode: async (req, res) => {

        let medicamentoCode = req.params.medicamentoCode;
        await res.send(medicamentoCode);

    },

    guardarRegistroMedicamento: async (req, res) => {

        console.log(req.body);

        let registroMedicamento = new RegistroMedicamento(req.body.codigoTransaccion, req.body.fecha, req.body.medicamento, req.body.tipo, req.body.cantidad, req.body.unidad);
        await database.ref("registrosMedicamentos").push(registroMedicamento);

        res.send("Regstro del medicamento guardado con exito");

    }

};
