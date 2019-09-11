let Medicamento = require('../../model/medicamento/Medicamento');
let {database} = require('../../database/firebase/DatabaseConfiguration');

let currentUser = {};

module.exports = {

    getMedicamentos: async (req, res) => {

        currentUser = req.body.currentUser;
        let medicamentos = [];

        if (currentUser && currentUser.rol.id !== "1"){
            res.status(401).send("No esta autorizado, debe ser un administrador");
            return;
        }

        await database.ref("medicamentos").on('value', (data) => {

            if(data.val() === null){
                res.status(500).send("No hay medicamentos registrados");
            }else {
                data.forEach((dato) => {
                    let medicamento = dato.val();
                    medicamentos.push(medicamento);
                });
                res.send(medicamentos);
                res.end();
            }
        });

    },

    getMedicamentoByCode: async (req, res) => {

        let codigo = req.params.codigo;
        let respuesta = null;
        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        await database.ref('medicamentos').orderByChild('codigo').equalTo(codigo).once('value', (data) => {

            if(data.val() === null){
                respuesta = "No se encontró el medicamento";
            }else {
                data.forEach((data) => {
                   respuesta = data.val();
                });
            }
            res.send(respuesta);
            res.end();

        }).catch(error => {
            res.status(500).send("Error, Por favor intente mas tarde");
            res.end();
        });

    },

    guardarMedicamento: async (req, res) => {

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }

        let medicamento = new Medicamento(req.body.codigo, req.body.nombre, req.body.precioCompra,
            req.body.precioVenta, req.body.existencias,
            req.body.unidad, req.body.imagen, req.body.proveedor, req.body.categoria, req.body.puntoDistribucion);
        await database.ref("medicamentos").child(medicamento.codigo).set({
            codigo: medicamento.codigo,
            nombre: medicamento.nombre,
            precioCompra: medicamento.precioCompra,
            precioVenta: medicamento.precioVenta,
            existencias: medicamento.existencias,
            unidad: medicamento.unidad,
            imagen: medicamento.imagen,
            proveedor: medicamento.proveedor,
            categoria: medicamento.categoria,
            puntoDistribucion: medicamento.puntoDistribucion
        }).then(value => {
            res.send("Medicamento guardado exitosamente");
            res.end();
        }).catch(error => {
            res.status(500).send("No se pudo crear el medicamento");
            res.end();
        });

    },

    actualizarMedicamento: async (req, res) => {

        let medicToUpdate = req.body;
        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }
        //console.log(medicToUpdate);
        await database.ref().child('/medicamentos/' + medicToUpdate.codigo)
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
                res.end();
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el medicamento");
                res.end();
            });
    },

    eliminarMedicamento: async (req, res) => {

        currentUser = req.body.currentUser;
        let codigo = req.params.codigo;
        if (currentUser && currentUser.rol.id !== "1"){
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }
        await database.ref("medicamentos/"+codigo).remove(a => {
            res.status(200).send("Medicamento eliminado exitosamente");
            res.end();
        }).catch(error => {
            res.status(500).send("No se pudo eliminar el medicamento");
            res.end();
        });

    },

};
