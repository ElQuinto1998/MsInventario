let Medicamento = require('../../model/medicamento/Medicamento');
let {database} = require('../../database/firebase/db');
let sesionControl = require('../../controller/usuario/usuarioController');

/*let medicamento1 = new Medicamento("213", "Injection", 34, 40, 60, "cajas", "urlImagen", "Vicar farmacéutica");
let medicamento2 = new Medicamento("643", "Ampoya", 20, 22, 38, "cajas", "urlImagen", "Aspen colombia");
let medicamento3 = new Medicamento("134", "Ibuprofeno", 56, 60, 25, "cajas", "urlImagen", "GMEDICAL S.A.S");*/

module.exports = {

    getMedicamentos: (req, res) => {

        let authorization = req.header('Authorization'); // "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."

        sesionControl.validarSesion(authorization.split())

        let medicamentos;

        database.ref("medicamentos").on('value', (snapshot) => {
           medicamentos = snapshot.val();
            console.log(medicamentos);
            res.json(medicamentos);
        });

    },
    getMedicamentoByCode: (req, res) => {

        let codigo = req.params.codigo;
        res.send(codigo);

    },

    guardarMedicamento: (req, res) => {

        console.log(req.body);

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra, req.body.precioVenta, req.body.stock, req.body.unidad, req.body.imagen, req.body.proveedor);
        database.ref("medicamentos").push(medicamento);

        res.send("Medicamento guardado con exito");

    },

};
