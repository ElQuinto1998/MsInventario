const jwt = require("jsonwebtoken");
const moment = require('moment');

module.exports = {

    decodeToken: (token) => {

        const decoded = new Promise((resolve, reject) => {
            try {
                const payload = jwt.decode(token, process.env.SECRET_KEY);
                if (payload.exp < moment.unix()) {
                    reject({
                        status: 401,
                        message: 'Token has expired'
                    });
                }
                resolve(payload.sub);
            } catch (e) {
                reject({
                    status: 500,
                    message: 'Invalid token'
                });
            }
        });

        return decoded;
    }
};




