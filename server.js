'use strict'

let express = require('express');
var bodyParser = require('body-parser');

let app = express();

//Routes
let routesMedicamento = require('./routes/medicamento/medicamentoRoutes')

//Using routes
app.use('/inventario', routesMedicamento);

//body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar CORS


app.listen(8000,() => {
    console.log("Corriendo en puerto 8000");
});
