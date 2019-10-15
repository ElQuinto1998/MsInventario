const Proveedor = require("../../models/proveedor/Proveedor");

const controller = {};

controller.getProveedores = (req, res) => {

    Proveedor.find()
        .then((proveedores) => {
            if(!proveedores){
                res.send({message: 'Not proveedores'})
            }else {
                res.json(proveedores);
            }
        }).catch(err => {
        console.log(err);
    })

};

controller.getProveedorById = (req, res) => {
    Proveedor.findOne({idProveedor: req.params.idProveedor}).then(proveedor => {
        if(!proveedor){
            res.send({message: 'Proveedor not found'});
        }else {
            res.json(proveedor);
        }
    });
};

controller.saveProveedor = async (req, res) => {

    let id = parseInt((Math.random() * 10000) + 1).toString();

    let proveedor = {
        idProveedor: id,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone
    };

    Proveedor.findOne({idProveedor: id})
        .then(prov => {
            if (!prov) {
                Proveedor.create(proveedor)
                    .then(() => {
                        res.json({message: 'Proveedor created'});
                    }).catch(err => {
                    res.send('error: ' + err);
                });
            } else {
                res.json({error: 'Proveedor already exists'});
            }
        }).catch(err => {
        res.send('error: ' + err);
    });

};

controller.updateProveedor = (req, res) => {
    Proveedor.findOne({idProveedor: req.body.idProveedor}).then(proveedor => {
        if(!proveedor){
            res.send({error: 'Proveedor not found'});
        }else {
            let proveedorUpdate = req.body;
            Proveedor.update({ idProveedor: req.body.idProveedor }, { $set:proveedorUpdate })
                .exec()
                .then(() => {
                    res.send({message: 'Proveedor updated'});
                })
                .catch((err) => {
                    res.send({error: 'Error, try later'});
                });
        }
    });
};

controller.delete = (req, res) => {
    Proveedor.deleteOne({idProveedor: req.params.idProveedor})
        .then(() => {
            res.send({message: "Proveedor deleted"});
        }).catch(err => {
        res.send({error: err});
    })
};

module.exports = controller;
