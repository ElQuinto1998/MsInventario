const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const medicRoutes = require('../routes/medicamento/MedicamentoRoutes');
const categoRoutes = require('../routes/categoria/categoriaRoutes');
const proveeRoutes = require('../routes/proveedor/ProveedorRoutes');
const centrosRoutes = require('../routes/centros/CentroRoutes');
const reporteRoutes = require('../routes/reporte/ReporteRoutes');

module.exports = app => {

    app.set('port', process.env.PORT || 9000);

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.urlencoded({extended: false}));

    //Headers
    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.use(express.json());

    app.use('/api_inventario', medicRoutes,
        categoRoutes, proveeRoutes, centrosRoutes, reporteRoutes);

    return app;

};
