let express = require('express');
let bodyParser = require('body-parser');
const cors = require('cors');

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
app.options("/*", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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
