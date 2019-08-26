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

        //console.log(req.body);

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        //await database.ref("medicamentos/"+codigo).

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra, req.body.precioVenta, req.body.existencias, req.body.unidad, req.body.imagen, req.body.proveedor);
        await database.ref("medicamentos").child(medicamento.codigo).set({
            codigo: medicamento.codigo,
            nombre: medicamento.nombre,
            precioCompra: medicamento.precioCompra,
            precioVenta: medicamento.precioVenta,
            existencias: medicamento.existencias,
            unidad: medicamento.unidad,
            imagen: medicamento.imagen,
            proveedor: medicamento.proveedor
        }).then(value => {
            res.send("Medicamento guardado exitosamente");
        }).catch(error => {
            res.send(500).send("No se pudo crear el medicamento");
        });

    },

    actualizarMedicamento: async (req, res) => {

        let medicToUpdate = req.body;

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        console.log(medicToUpdate);

        await database.ref().child('/medicamentos/' + medicToUpdate.codigo)
            .update({ nombre: medicToUpdate.nombre,
                precioCompra: medicToUpdate.precioCompra,
                precioVenta: medicToUpdate.precioVenta,
                existencias: medicToUpdate.existencias,
                unidad: medicToUpdate.unidad,
                imagen: medicToUpdate.imagen,
                proveedor: medicToUpdate.proveedor
            }).then(value => {
                res.send("Medicamento actualizado exitosamente")
            }).catch(error => {
                res.send(500).send("No se pudo actualizar el medicamento");
            });

    },

    eliminarMedicamento: async (req, res) => {

        currentUser = req.body.currentUser;
        let codigo = req.params.codigo;

        if (currentUser && currentUser.rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        await database.ref("medicamentos/"+codigo).remove(a => {
            res.send("Medicamento eliminado exitosamente")
        }).catch(error => {
            res.send(500).send("No se pudo eliminar el medicamento");
        });

    },

    validarRol: (rol) => {
        /*if(rol !== "admin"){
            res.status(401).send("No esta autorizado, debe ser un administrador");
        };*/
    }

};
