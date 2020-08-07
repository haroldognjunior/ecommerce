const server = require('express').Router();
const { Product, Review, User } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

server.get('/', function(req, res) {
    Product.findAll()
        .then(function(products) {
            return res.status(200).send(products); // despeus quitar
        });
});

server.get('/search/:search', function(req, res) {
    var name = req.params.search;
    Product.findAll({
        where: {
            titulo: {
                [Op.iLike]: '%' + name + '%'
            }
        }


    }).then(function(products) {
        console.log(products);
        return res.status(200).send(products) // despeus quitar
    })
})

server.get('/:id', function(req, res) {

    Product.findOne({
        where: {
            id: req.params.id,
        }
    }).then(function(products) {
        console.log(products);
        return res.status(200).send(products)
    })
})



server.post('/agregar', loggedIn, isAdmin, function(req, res) {
    Product.create({
            titulo: req.body.titulo,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            categoryIdCat: req.body.categoryIdCat
        })
        .then(() => {
            return res.send('Se ha agregado un nuevo producto')
        })
        .catch(() => {
            return res.status(400).send('No se agrego el producto')
        })
});

server.put('/modificar/:id', loggedIn, isAdmin, function(req, res) {

    if (req.body.titulo === "" || req.body.precio === "" || req.body.cantidad === "") {
        return res.status(400).send("faltan parametros")
    }

    Product.findOne({
            where: {
                id: req.params.id,
            }
        }).then(function(product) {
            product.update({
                titulo: req.body.titulo,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                descripcion: req.body.descripcion,
            })
        })
        .then(() => {
            return res.send('Producto Modificado')
        })
        .catch(() => {
            return res.status(400).send('No se modifico');
        })
});

server.delete('/:id', loggedIn, isAdmin, (req, res) => {
    const id = req.params.id;
    Product.destroy({
            where: { id: id },
        })
        .then(deletedProduct => {
            res.json(deletedProduct);
        })
        .catch(res.send);
});

server.post('/reviews/:idProduct/:idUser', loggedIn, function(req, res) {

    var producto = function() {
        return Product.findOne({
            where: {
                id: req.params.idProduct,
            }
        })
    }

    var review = function() {
        return Review.create({
            descripcion: req.body.descripcion,
            puntaje: req.body.puntaje,
        });
    }

    var user = function() {
        return User.findOne({
            where: {
                idUser: req.params.idUser,
            }
        });
    }
    Promise.all([producto(), review(), user()]).then((response) => {

        if (response[0] && response[1]) {
            response[0].addReview(response[1]);
            if (response[1] && response[2]) {
                response[2].addReview(response[1]);
            }
            return res.send('Se ha agregado tu review');
        } else {
            return res.send('No se agrego tu review')
        }
    });
});

server.get('/reviews/products/:idProduct', function(req, res) {
    Review.findAll({
        where: {
            productId: req.params.idProduct
        }
    }).then((reviews) => {
        return res.send(reviews);
    })
});

server.get('/reviews/users/:idUser', loggedIn, function(req, res) {
    Review.findAll({
        where: {
            userIdUser: req.params.idUser
        }
    }).then((reviews) => {
        return res.send(reviews);
    })
});



server.put('/modificarcantidad/', function(req, res) {
    Product.update({
            cantidad: req.body.cantidad,
        }, {
            where: { id: req.body.id }
        })
        .then(() => {
            return res.send("Cantidad modificada")
        })
        .catch(() => {
            return res.send("No se pudo modificar")
        })
})



module.exports = server;