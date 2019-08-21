var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('<h1>MS Inventario</h1>');
});

app.listen(8000,() => {
    console.log('Corriendo en el puerto 8000!');
});
