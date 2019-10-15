const Categoria = require("../../models/categoria/Categoria");

const controller = {};

controller.getCategorias = (req, res) => {

    Categoria.find()
        .then((categorias) => {
            if(!categorias){
                res.send({message: 'Not categories'})
            }else {
                res.json(categorias );
            }
        }).catch(err => {
            console.log(err);
    })

};

module.exports = controller;
