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

    guardarPuntosDistribucion: async (req, res) => {

        currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        } 

        let puntoDistribucion = new Distribucion(req.body.codigo, req.body.nombre, req.body.localizacion);
        await database.ref("puntosDistribucion").child(puntoDistribucion.codigo).set({
            codigo: puntoDistribucion.codigo,
            nombre: puntoDistribucion.nombre,
            localizacion : puntoDistribucion.localizacion
        }).then(value => {
            res.send("Punto de distribucion guardado exitosamente");
        }).catch(error => {
            res.status(500).send("No se pudo crear el punto de distribucion");
        });

    },

    actualizarPuntoDistribucion: async (req, res) => {

        let puntoDistribucion = req.body;
        /* currentUser = req.body.currentUser;

        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        } */
        //console.log(medicToUpdate);
        await database.ref().child('/distribucion/' + puntoDistribucion.codigo)
            .update({
                nombre: puntoDistribucion.nombre,
                localizacion: puntoDistribucion.precioCompra
            }).then(value => {
                res.status(200).send("Punto de distribucion actualizado exitosamente")
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el Punto de distribucion");
            });
    },

    eliminarPuntoDistribucion: async (req, res) => {

        currentUser = req.body.currentUser;
        let codigo = req.params.codigo;
        if (currentUser && currentUser.rol.id !== "1") {
            res.status(401).send("No esta autorizado, debe ser administrador");
            return;
        }
        await database.ref("distribucion/" + codigo).remove(a => {
            res.status(200).send("Medicamento eliminado exitosamente")
        }).catch(error => {
            res.status(500).send("No se pudo eliminar el medicamento");
        });

    },

    saludar: async (req, res) => {

        return "Hola";

    }
};
