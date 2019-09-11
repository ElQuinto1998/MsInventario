let {database} = require('../../database/firebase/DatabaseConfiguration');
let Categoria = require('../../model/agregados/categoria/Categoria');

let categoria1 = new Categoria("1", "Receta medica");
let categoria2 = new Categoria("2", "Otra categoria");
let categoria3 = new Categoria("3", "Una categoria");

let categorias = [categoria1, categoria2, categoria3];

module.exports = {

    getCategorias: async (req, res) => {

        //res.status(200).json(categorias);

        await database.ref("categorias").on('value', (data) => {
            categorias = data.val();
            if(categorias === null){
                res.status(500).send("No hay categorias registradas");
            }else {
                res.send(categorias);
            }

        });

    },


};
