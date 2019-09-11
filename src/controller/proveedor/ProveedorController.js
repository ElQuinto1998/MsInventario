let Proveedor = require('../../model/proveedor/Proveedor');
let {database} = require('../../database/firebase/DatabaseConfiguration');

module.exports = {

    getProveedores: async (req, res) => {

        let proveedores = [];

        await database.ref("proveedores").on('value', (data) => {
            if(data.val() === null){
                res.status(500).send("No hay proveedores registrados");
            }else{
                data.forEach((dato) => {
                    let proveedor = dato.val();
                    proveedores.push(proveedor);
                });
                res.send(proveedores);
                res.end();
            }
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
            res.end();
        }).catch(error => {
            res.status(500).send("No se pudo crear el proveedor");
            res.end();
        });
    },

    actualizarProveedor: async (req, res) => {

        let proveedorToUpdate = req.body;

        await database.ref().child('/proveedores/' + proveedorToUpdate.idProveedor)
            .update({
                nombre: proveedorToUpdate.nombre,
                telefono: proveedorToUpdate.telefono,
                correo: proveedorToUpdate.correo,
                direccion: proveedorToUpdate.direccion
            }).then(value => {
                res.send("Proveedor actualizado exitosamente")
                res.end();
            }).catch(error => {
                res.status(500).send("No se pudo actualizar el proveedor");
            });

    },

    eliminarProveedor: async (req, res) => {

        let idproveedor = req.params.idProveedor;

        await database.ref("proveedores/"+idproveedor).remove(a => {
            res.send("Proveedor eliminado exitosamente");
            res.end();
        }).catch(error => {
            res.status(500).send("No se pudo eliminar el proveedor");
        });

    }

};