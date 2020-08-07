const server = require('express').Router();
const { User } = require('../models');
const passport = require('passport');


function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.send({
        idUser: 0,
        nombreUser: "Invitado",
        contraUser: "",
        emailUser: "",
        admin: false
    });
}

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.admin === true) {
            return next()
        }
    }
    return res.redirect("http://localhost:3000/");
}




server.post('/', function(req, res) {
    User.create({
            nombreUser: req.body.nombreUser,
            contraUser: req.body.contraUser,
            emailUser: req.body.emailUser,
        })
        .then(() => {
            return res.send('Se ha agregado un nuevo usuario')
        })
        .catch(() => {
            return res.status(400).send('No se agrego el usuario')
        })
});

server.get('/', loggedIn, isAdmin, function(req, res) {
    User.findAll()
        .then((users) => {
            res.send(users);
        });

});

//loggedIn, isAdmin,
//TRAE LA INFORMACION DE UN USUARIO
server.get('/user/:nombreUser', function(req, res) {
    User.findOne({
            where: {
                nombreUser: req.params.nombreUser
            }
        })
        .then((user) => {
            res.send(user);
        });

});
//PIDE QUE EL USUARIO CAMBIE LA CONTRASEÑA
server.put('/user/resetpass/:idUser', function(req, res) {
    User.findByPk(req.params.idUser)
        .then((user) => {
            user.update({
                reset: true
            });
        }).then(() => {
            return res.send('Se ha modificado el usuario');
        })
        .catch(() => {
            return res.send('No se ha podido modificar el usuario');
        })
});


server.put('/user/resetpass/', function(req, res) {
    User.findByPk(req.body.idUser)
        .then((user) => {
            user.update({
                contraUser: req.body.contraUser,
                reset: false
            });
        })
        .then(() => {
            return res.send('Se ha modificado el usuario');
        })
        .catch(() => {
            return res.send('No se ha podido modificar el usuario');
        })
});


server.delete('/:id', loggedIn, function(req, res) {
    User.destroy({
        where: {
            idUser: req.params.id,
        }
    }).then(() => {
        return res.send('Se ha eliminado el usuario');
    });
});

server.put('/:id', loggedIn, function(req, res) {
    if (req.body.nombreUser === "" || req.body.contraUser === "" || req.body.emailUser === "") {
        return res.status(400).send("faltan parametros")
    }
    User.findOne({
            where: {
                idUser: req.params.id,
            },
        })
        .then((user) => {
            user.update({
                nombreUser: req.body.nombreUser,
                contraUser: req.body.contraUser,
                emailUser: req.body.emailUser,
            })
        })
        .then(() => {
            return res.send('Se ha modificado el usuario');
        })
        .catch(() => {
            return res.send('No se ha podido modificar el usuario');
        })

});



server.post('/login',
    passport.authenticate('local'),
    function(req, res) {

        res.json(req.user)

    }
);
server.post('/logout',
    passport.authenticate('local'),
    function(req, res) {

        req.logOut(req.user)
        res.send("usuario Deslogueado")

    }
);

server.get('/login', loggedIn,
    function(req, res) {
        res.json(req.user)

    }
);

server.put('/convertiradmin/:id', loggedIn, isAdmin, function(req, res) {
    User.findOne({
            where: {
                idUser: req.params.id,
            },
        })
        .then((user) => {
            user.update({
                admin: true,
            })
        })
        .then(() => {
            return res.send('Se ha modificado el usuario');
        })
        .catch(() => {
            return res.send('No se ha podido modificar el usuario');
        })

});


module.exports = server;