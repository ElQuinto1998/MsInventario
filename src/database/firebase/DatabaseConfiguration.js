let admin = require('firebase-admin');
let credentials = require('./credential');

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://prueba-c0a90.firebaseio.com",
    storageBucket: "prueba-c0a90.appspot.com"
});

//Base de datos
let databaseConfiguration = admin.database();
const db = admin.firestore();

module.exports = {database: databaseConfiguration, firebase: admin, db: db};
