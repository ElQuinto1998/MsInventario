const Medicamento = require("../../models/medicamento/Medicamento");

const controller = {};
const imagen = 'http://www.osrja.org.ar/web/images/Medicamentos.png';

controller.createMedicamento = (req, res) => {

    let medicamento = {
        code: req.body.code,
        name: req.body.name,
        salePrice: req.body.salePrice,
        purchasePrice: req.body.purchasePrice,
        image: imagen,
        stock: req.body.stock,
        category: req.body.category,
        proveedor: req.body.proveedor,
        puntoDistribucion: req.body.puntoDistribucion
    };

    Medicamento.findOne({
        code: req.body.code
    }).then(medic => {
        if (!medic) {
            Medicamento.create(medicamento)
                .then(() => {
                    res.json({message: 'Medicamento created'});
                }).catch(err => {
                res.send('error: ' + err);
            });
        } else {
            res.json({error: 'Medicamento already exists'});
        }
    }).catch(err => {
        res.send('error: ' + err);
    });

};

controller.getMedicamentos = (req, res) => {
    Medicamento.find().then(medicamentos => {
        if(!medicamentos){
            res.send({message: 'No medications'});
        }else {
            res.json(medicamentos);
        }
    });

};

controller.getMedicamentoByCode = (req, res) => {
    Medicamento.findOne({code: req.params.code}).then(medicamento => {
        if(!medicamento){
            res.send({message: 'Medicamento not found'});
        }else {
            res.send({data: medicamento});
        }
    });
};

controller.updateMedicamento = (req, res) => {
    Medicamento.findOne({code: req.body.code}).then(medicamento => {
        if(!medicamento){
            res.send({error: 'Medicamento not found'});
        }else {
            let medicamentoUpdate = req.body;
            Medicamento.update({ code: req.body.code }, { $set:medicamentoUpdate })
                .exec()
                .then(() => {
                    res.send({message: 'Medicament updated'});
                })
                .catch((err) => {
                    res.send({error: 'Error, try later'});
                });
        }
    });
};

controller.deleteMedicamento = (req, res) => {
    Medicamento.deleteOne({code: req.params.code})
        .then(() => {
            res.send({message: "Medicamento deleted"});
        }).catch(err => {
        res.send({error: err});
    })
};

module.exports = controller;
