const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/user/User");

process.env.SECRET_KEY = 'secTk$12345fbdsdDfgD';
const avatar = "https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg";

const controller = {};

controller.register = (req, res) => {

    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: avatar,
        rol: req.body.rol,
        password: req.body.password
    };

    User.findOne({
        email: req.body.email
    }).then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then(() => {
                            res.json({message: 'User registered'});
                        })
                        .catch(err => {
                            res.send('error: ' + err);
                        });
                });
            } else {
                res.json({error: 'User already exists'});
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        });

};

controller.login = (req, res) => {

    console.log(req.body);
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        sub: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        avatar: user.avatar,
                        rol: user.rol
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    });
                    res.send({message: 'logged successfully' ,token: token});
                } else {
                    res.json({error: 'Incorrect password'});
                }
            } else {
                res.json({error: 'User does not exist'});
            }
        })
        .catch(err => {
            res.send('error: ' + err);
        })

};

module.exports = controller;
