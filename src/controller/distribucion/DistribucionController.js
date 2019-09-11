let Distribucion = require('../../model/distribucion/Distribucion');
let { database } = require('../../database/firebase/DatabaseConfiguration');

let currentUser = {};

module.exports = {


    getPuntosDistribucion: async (req, res) => {

        let distribucionList = {};
        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser un administrador");
            return;
        }

        await database.ref("puntosDistribucion").on('value', (data) => {
            distribucionList = data;
            if (distribucionList === null) {
                res.status(500).send("No hay puntos de distribucion registrados");
            } else {
                console.log(distribucionList);
                res.send(distribucionList);
            }

        });

    },

    getPuntosDistribucionPorCodigo: async (req, res) => {

        let codigo = req.params.codigo;
        currentUser = req.body.currentUser;
        let respuesta = null;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        await database.ref('puntosDistribucion').
            orderByChild('codigo').equalTo(codigo).once('value', (data) => {

                let puntoDistribucion = data.val();
                if (puntoDistribucion === null) {
                    respuesta = "No se encontró el medicamento";
                } else {
                    respuesta = puntoDistribucion;
                }
                res.send(respuesta);

            }).catch(error => {
                res.status(500).send("Error, Por favor intente mas tarde");
            });

    },

    guardarMedicamento: async (req, res) => {

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra, req.body.precioVenta, req.body.existencias, req.body.unidad, req.body.imagen, req.body.proveedor, req.body.categoria);
        await database.ref("medicamentos").child(medicamento.codigo).set({
            codigo: medicamento.codigo,
            nombre: medicamento.nombre,
            precioCompra: medicamento.precioCompra,
            precioVenta: medicamento.precioVenta,
            existencias: medicamento.existencias,
            unidad: medicamento.unidad,
            imagen: medicamento.imagen,
            proveedor: medicamento.proveedor,
            categoria: medicamento.categoria
        }).then(value => {
            res.send("Medicamento guardado exitosamente");
        }).catch(error => {
            res.status(500).send("No se pudo crear el medicamento");
        });

    },

    actualizarMedicamento: async (req, res) => {

        let medicToUpdate = req.body;
        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }
        //console.log(medicToUpdate);
        await database.ref().child('/medicamentos/' + medicToUpdate.codigo)
            .update({
                nombre: medicToUpdate.nombre,
                precioCompra: medicToUpdate.precioCompra,
                precioVenta: medicToUpdate.precioVenta,
                existencias: medicToUpdate.existencias,
                unidad: medicToUpdate.unidad,
                imagen: medicToUpdate.imagen,
                proveedor: medicToUpdate.proveedor
            }).then(value => {
                res.status(200).send("Medicamento actualizado exitosamente")
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el medicamento");
            });
    },

    eliminarMedicamento: async (req, res) => {

        currentUser = req.body.currentUser;
        let codigo = req.params.codigo;
        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }
        await database.ref("medicamentos/" + codigo).remove(a => {
            res.status(200).send("Medicamento eliminado exitosamente")
        }).catch(error => {
            res.status(500).send("No se pudo eliminar el medicamento");
        });

    },

    saludar: async (req, res) => {

        return "Hola";

    }
};
