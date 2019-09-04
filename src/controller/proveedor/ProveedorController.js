let Proveedor = require('../../model/proveedor/Proveedor');
let {database} = require('../../database/firebase/DatabaseConfiguration');

/*let proveedor1 = new Proveedor("16543", "DrogasW", "235436", "proveedor1@gmail.com", "Cr 24");
let proveedor2 = new Proveedor("6445", "MedicosJ", "78566", "proveedor2@gmail.com", "Cr 75");
let proveedor3 = new Proveedor("2455", "Farma54", "8654", "proveedor3@gmail.com", "Cr 12");*/

let proveedores = {};

module.exports = {

    getProveedores: async (req, res) => {
        await database.ref("proveedores").on('value', (data) => {
            proveedores = data.val();
            res.json(proveedores);
        });
    },

    guardarProveedor: async (req, res) => {

        let proveedor = new Proveedor(req.body.idProveedor, req.body.nombre, req.body.telefono, req.body.correo, req.body.direccion);
        await database.ref("proveedores").child(proveedor.idProveedor).set({
            idProveedor: proveedor.idProveedor,
            nombre: proveedor.nombre,
            telefono: proveedor.telefono,
            correo: proveedor.correo,
            direccion: proveedor.direccion
        }).then(value => {
            res.send("Proveedor guardado exitosamente");
        }).catch(error => {
            res.status(500).send("No se pudo crear el proveedor");
        });
    },

    actualizarProveedor: async (req, res) => {

        let proveedorToUpdate = req.body;

        await database.ref().child('/proveedores/' + proveedorToUpdate.idProveedor)
            .update({
                idProveedor: proveedorToUpdate.idProveedor,
                nombre: proveedorToUpdate.nombre,
                telefono: proveedorToUpdate.telefono,
                correo: proveedorToUpdate.correo,
                direccion: proveedorToUpdate.direccion
            }).then(value => {
                res.send("Proveedor actualizado exitosamente")
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el proveedor");
            });

    },

    eliminarProveedor: async (req, res) => {

        let idproveedor = req.params.idProveedor;

        await database.ref("proveedores/"+idproveedor).remove(a => {
            res.send("Proveedor eliminado exitosamente")
        }).catch(error => {
            res.status(500).send("No se pudo eliminar el proveedor");
        });

    }

};
