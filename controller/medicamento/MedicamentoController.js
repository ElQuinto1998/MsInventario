let Medicamento = require('../../model/medicamento/Medicamento');

let medicamento1 = new Medicamento("213", "Injection");
let medicamento2 = new Medicamento("643", "Ampoya");
let medicamento3 = new Medicamento("134", "Ibuprofeno");

let medicamentos = [medicamento1, medicamento2, medicamento3];

module.exports = {

    getMedicamentos : (req, res) => {
        console.log(medicamentos);
        res.json(medicamentos);
    },
    getMedicamentoByCode : (req, res) => {

    }

};
