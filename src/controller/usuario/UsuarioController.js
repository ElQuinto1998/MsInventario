let { firebase, dbCloud } = require('../../database/firebase/DatabaseConfiguration');

module.exports = {

    verificarToken: async (req, res, next) => {

        let idToken = req.header('Authorization');

        try {
            const decodedToken = await firebase.auth().verifyIdToken(idToken.substring(7, idToken.length));
            if (decodedToken) {
                await dbCloud.collection("users").where("uid", "==", decodedToken.uid).get()
                    .then(cuerrentUser => {
                        if(cuerrentUser.empty){
                            console.log("Usuario no encontrado");
                            return;
                        }
                        req.body.currentUser = cuerrentUser.docs[0].data();
                        return next();
                    });

            } else {
                return res.status(401).send("No esta autorizado");
            }
        } catch (e) {
            return res.status(401).send("No esta autorizado"+ e);
        }

    },

    getInformacion: async (req, res) => {
        await res.send(req.body.currentUser);
    }

};
