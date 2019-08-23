module.exports = {

    registerUser: (req, res) => {
        res.send(("Registrando usuario"));
    },

    login: (req, res) => {

        console.log(req.body);

        /*firebase.auth().signInWithEmailAndPassword("abc@gmail.com", "******")
            .then(function(firebaseUser) {
                // Success
            })
            .catch(function(error) {
                // Error Handling
            });*/

        res.send("Ingresando");
    },

    logout: (req, res) => {
        res.send("Saliendo");
    },

    validarSesion: (token) => {
        return token;
    }

};
