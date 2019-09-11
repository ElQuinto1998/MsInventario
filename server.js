let express = require('express');
let bodyParser = require('body-parser');

let app = express();

//Importing Routes
let routesMedicamento = require('./src/routes/medicamento/MedicamentoRoutes');
let routesRegistroMedicamentos = require('./src/routes/venta/VentaRouter');
let routesUsuario = require('./src/routes/usuario/UsuarioRoutes');
let routerProveedor = require('./src/routes/proveedor/ProveedorRoutes');
let routerAgregados = require('./src/routes/agregados/AgregadosRouter');
let routerDistribucion = require('./src/routes/distribucion/DistribucionRoutes');

app.set('port', (process.env.PORT || 8000));

//Body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Using routes
app.use('/api_inventario', routesMedicamento, routesRegistroMedicamentos, 
        routesUsuario, routerProveedor, routerAgregados, routerDistribucion);

//Running server
app.listen(app.get('port'),() => {
    console.log("Corriendo en puerto "+app.get('port'));
});

module.exports = app;
