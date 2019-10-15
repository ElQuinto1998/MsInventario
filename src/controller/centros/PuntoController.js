const PuntoDistribucion = require("../../models/centros/PuntoDistribucion");

const controller = {};

controller.getPuntosDistribucion = (req, res) => {

    PuntoDistribucion.find()
        .then((centros) => {
            if(!centros){
                res.send({message: 'Not puntos de distribución'})
            }else {
                res.json(centros);
            }
        }).catch(err => {
        console.log(err);
    })

};

module.exports = controller;
