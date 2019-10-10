const express = require('express');
const config = require('./server/config');

const app = config(express());

require('./database/dbConection');

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});
