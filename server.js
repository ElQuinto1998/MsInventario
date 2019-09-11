let express = require('express');
let bodyParser = require('body-parser');

let app = express();

//Importing Routes
let routesMedicamento = require('./src/routes/medicamento/MedicamentoRoutes');
let routesRegistroMedicamentos = require('./src/routes/venta/VentaRouter');
let routesUsuario = require('./src/routes/usuario/UsuarioRoutes');
let routerProveedor = require('./src/routes/proveedor/ProveedorRoutes');
let routerAgregados = require('./src/routes/agregados/AgregadosRouter');

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', ' http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Using routes
app.use('/api_inventario', routesMedicamento, routesRegistroMedicamentos, routesUsuario, routerProveedor, routerAgregados);

//Running server
app.listen(8000,() => {
    console.log("Corriendo en puerto 8000");
});

module.exports = app;
