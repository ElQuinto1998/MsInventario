let admin = require('firebase-admin');

let serviceAccount = require('./prueba-c0a90-firebase-adminsdk-q50xt-1f58694b13');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://prueba-c0a90.firebaseio.com/'
});

let db = admin.database();

module.exports = {database: db};
