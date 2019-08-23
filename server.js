let express = require('express');
let bodyParser = require('body-parser');

let app = express();

//Importing Routes
let routesMedicamento = require('./src/routes/medicamento/medicamentoRoutes');
let routesRegistroMedicamentos = require('./src/routes/registroMedicamento/RegistroMedicamentoRoutes');
let routesUsuario = require('./src/routes/usuario/UsuarioRoutes');

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar CORS


//Using routes
app.use('/inventario', routesMedicamento, routesRegistroMedicamentos, routesUsuario);

//Running server
app.listen(8000,() => {
    console.log("Corriendo en puerto 8000");
});
