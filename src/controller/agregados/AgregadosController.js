let {database} = require('../../database/firebase/DatabaseConfiguration');

module.exports = {

    getCategorias: async (req, res) => {

        let categorias = [];

        await database.ref("categorias").on('value', (data) => {
            if(data.val() === null){
                res.status(500).send("No hay categorias registradas");
            }else {
                data.forEach((dato) => {
                    let categoria = dato.val();
                    categorias.push(categoria);
                });
                res.send(categorias);
                res.end();
            }

        });

    },


};
