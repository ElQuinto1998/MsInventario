const Pedido = require('../../models/pedido/Pedido');

const controller = {};

const stateInit = 'Solicitado';
const numMin = 1;
const numMax = 10000;

controller.getPedidos = (req, res) => {
    Pedido.find().sort({state: -1})
        .then((pedidos) => {
            if (!pedidos) {
                res.send({message: 'No hay pedidos'})
            } else {
                res.json(pedidos);
            }
        }).catch(err => {
        res.send('Error: ' + err.message);
    })
};

controller.savePedido = (req, res) => {

    let newPedido = {
        numberPedido: getRandomInt(numMin, numMax),
        userEmail: req.body.userEmail,
        state: stateInit,
        items: req.body.items,
        total: req.body.total,
        dateSolicitud: new Date()
    };

    let existe = false;

    do {
        Pedido.findOne({numberPedido: newPedido.numberPedido})
            .then(pedido => {
                if (!pedido) {
                    Pedido.create(newPedido).then(() => {
                        res.json({message: 'Su pedido fue solicitado correctamente'});
                    }).catch(err => {
                        res.send('Error: ' + err.message);
                    });
                } else {
                    existe = true;
                    newPedido.numberPedido = getRandomInt(numMin, numMax);
                }
            }).catch(err => {
            res.send('Error: ' + err.message);
        });
    } while (existe === true);
};

controller.getPedidosByUser = (req, res) => {
    Pedido.findOne({userEmail: req.params.userEmail})
        .then(pedidos => {
            if (!pedidos) {
                res.send({message: 'No ha realizado pedidos'})
            } else {
                res.json(pedidos);
            }
        }).catch(err => {
        res.send('Error: ' + err.message);
    })
};

controller.updatePedido = (req, res) => {

    let pedidoUpdate = {
        state: req.body.state,
        dateAprobacion: new Date(),
        items: req.body.items,
        total: req.body.total
    };

    Pedido.findOne({numberPedido: req.params.numberPedido})
        .then(pedido => {
            if (!pedido) {
                res.send({message: 'No se encontró el pedido'})
            } else {
                Pedido.updateOne({numberPedido: req.params.numberPedido},
                    {
                        $set: {
                            state: pedidoUpdate.state,
                            dateAprobacion: pedidoUpdate.dateAprobacion,
                            items: pedidoUpdate.items,
                            total: pedidoUpdate.total
                        }
                    }, (err, resp) => {
                        if (err) {
                            res.send({error: 'No se actualizó el pedido'})
                        } else {
                            res.send({message: 'Se actualizó el pedido'})
                        }
                    })
            }
        }).catch(err => {
        res.send('Error: ' + err.message);
    })

};

function getRandomInt(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min).toString();
}

module.exports = controller;
