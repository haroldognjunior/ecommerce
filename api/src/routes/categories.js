 const server = require('express').Router();
 const { Category, Product } = require('../models');


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
     Category.findAll()
         .then(function(category) {
             return res.status(200).send(category); //despues quitar
         });
 })

 server.get('/products/:id', function(req, res) {

     Category.findByPk(req.params.id)

     .then((categoria) => {
             categoria.getProduct({ categoria }).then((productos) => {
                 if (productos.length === 0)
                     return res.status(200).send(productos)
                 return res.send(productos)
             });
         })
         .catch(err => res.status(400).send("Sin productos"));
 })


 server.post('/agregar', loggedIn, isAdmin, function(req, res) {
     Category.create({
             nombre: req.body.nombre,
         })
         .then(() => {
             return res.send('Se ha agregado una nueva categoria');
         })
         .catch(() => {
             return res.status(400).send('No se agrego categoria')
         })
 });

 server.put('/modificar/:id', loggedIn, isAdmin, (req, res) => {
     const id = req.params.id;

     Category.update(req.body, {
             where: {
                 idCat: id,
             },
             returning: true,
         }).then(function(category) {
             category.update({
                 nombre: req.body.nombre,
             })
         })
         .then(() => {
             return res.send('Categoria Modificada')
         })

 });


 server.delete('/delete/:id', loggedIn, isAdmin, (req, res) => {
     const id = req.params.id;
     Category.destroy({
             where: { idCat: id },
         })
         .then(() => {
             return res.send("se ha borrado");
         })

 });

 server.put("/adddelete/:productId", loggedIn, isAdmin, function(req, res) {
     var product = function() {
         return Product.findByPk(req.params.productId);
     };
     var categoria = function() {
         return Category.findOne({
             where: {
                 nombre: req.body.nombre,
             }
         });
     };

     if (req.body.accion === 'add') {
         Promise.all([product(), categoria()]).then((response) => {
             if (response[0] && response[1]) {
                 response[0].addCategory(response[1]);
                 return res.send("Categoria Agregada");
             } else {
                 res.status(404).send("La categoria o el producto no existe");
             };
         }).catch(() => res.sendStatus(400));




     } else if (req.body.accion === 'remove') {
         Promise.all([product(), categoria()]).then((response) => {
             if (response[0] && response[1]) {
                 response[0].removeCategory(response[1]);
                 return res.send("Categoria Eliminada");
             } else {
                 res.status(404).send("La categoria o el producto no existe");
             };
         }).catch(() => res.sendStatus(400));
     } else { res.status(400).send("La accion debe existir y debe ser add o remove") }
 })

 module.exports = server;