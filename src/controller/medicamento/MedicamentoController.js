let Medicamento = require('../../model/medicamento/Medicamento');
let {database, dbCloud} = require('../../database/firebase/DatabaseConfiguration');

let currentUser = {};
let mRef = database.ref("medicamentos/");

module.exports = {

    getMedicamentos: async (req, res) => {

        await mRef.on("value",
            function(snapshot) {
                res.json(snapshot.val());
                mRef.off("value");
            },
            function (errorObject) {
                res.send("The read failed: " + errorObject.code);
            });


    },

    getMedicamentoByCode: async (req, res) => {

        let codigo = req.params.codigo;
        let respuesta = null;

        await mRef.orderByChild('codigo').equalTo(codigo).once('value', (data) => {

            if(data.val() === null){
                respuesta = "No se encontró el medicamento";
            }else {
                data.forEach((data) => {
                   respuesta = data.val();
                });
            }
            res.send(respuesta);

        });

    },

    guardarMedicamento: async (req, res) => {

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra,
            req.body.precioVenta, req.body.existencias,
            req.body.unidad, req.body.imagen, req.body.proveedor, req.body.categoria, req.body.puntoDistribucion);

        let code = parseInt((Math.random() * 10000) + 1);

        await mRef.child(code).set({
            codigo: code,
            nombre: medicamento.nombre,
            precioCompra: medicamento.precioCompra,
            precioVenta: medicamento.precioVenta,
            existencias: medicamento.existencias,
            unidad: medicamento.unidad,
            imagen: "http://buscarempleo.republica.com/files/2017/02/pastilla-680x513.jpg",
            proveedor: medicamento.proveedor,
            categoria: medicamento.categoria,
            puntoDistribucion: medicamento.puntoDistribucion
        }).then(() => {
            res.send("Medicamento guardado exitosamente");
        }).catch((err) => {
            res.send("No se pudo guardar el medicamento");
        });
    },

    actualizarMedicamento: async (req, res) => {

        let medicToUpdate = req.body;

        await mRef.child('/medicamentos/' + medicToUpdate.codigo)
            .update({ nombre: medicToUpdate.nombre,
                precioCompra: medicToUpdate.precioCompra,
                precioVenta: medicToUpdate.precioVenta,
                existencias: medicToUpdate.existencias,
                unidad: medicToUpdate.unidad,
                imagen: medicToUpdate.imagen,
                proveedor: medicToUpdate.proveedor,
                categoria: medicToUpdate.categoria,
                puntoDistribucion: medicToUpdate.puntoDistribucion
            }).then(value => {
                res.status(200).send("Medicamento actualizado exitosamente")
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el medicamento");
            });
    },

    eliminarMedicamento: async (req, res) => {

        let codigo = req.params.codigo;

        await database.ref("medicamentos/"+codigo).remove(() => {
            res.send("Medicamento eliminado exitosamente");
        });

    },

};
