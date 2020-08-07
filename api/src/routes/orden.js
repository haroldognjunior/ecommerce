const server = require('express').Router();
const { Orden, User, Product, Productoxorden } = require("../models");



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

//RUTA RETORNA TODAS LAS ORDENES 
//-FUNCIONANDO Y REVISADO-
server.get('/', loggedIn, isAdmin, function(req, res) {
    Orden.findAll()
        .then(function(ordenes) {
            return res.send(ordenes);
        });
});

//RUTA RETORNA TODAS LAS ORDENES 
//-FUNCIONANDO Y REVISADO-
server.get('/estado/:estado', function(req, res) {
    Orden.findAll({
            where: {
                estado: req.params.estado
            }
        })
        .then(function(ordenes) {
            return res.send(ordenes);
        });
});

//RUTA MODIFICA ESTADO DE LA ORDEN  DE UN USUARIO A PROCESANDO
//-FUNCIONANDO y REVISADO-
server.put('/modificar/:id', function(req, res) {

    Orden.findOne({
            where: {
                idOrden: req.params.id,
            }
        }).then(function(orden) {
            orden.update({
                estado: 'Procesando',
            })
        })
        .then(() => {
            return res.send('Orden Cerrada')
        })
        .catch(() => {
            return res.status(400).send('No se modifico');
        })
});

//RUTA MODIFICA ESTADO DE LA ORDEN  DE UN USUARIO A COMPLETO
//-FUNCIONANDO y REVISADO-
server.put('/completar/:id', function(req, res) {

    Orden.findOne({
            where: {
                idOrden: req.params.id,
            }
        }).then(function(orden) {
            orden.update({
                estado: 'Completa',
            })
        })
        .then(() => {
            return res.send('Orden Completa')
        })
        .catch(() => {
            return res.status(400).send('No se modifico');
        })
});

//RUTA MODIFICA ESTADO DE LA ORDEN  DE UN USUARIO A CANCELADA
//-FUNCIONANDO y REVISADO-
server.put('/cancelar/:id', function(req, res) {

    Orden.findOne({
            where: {
                idOrden: req.params.id,
            }
        }).then(function(orden) {
            orden.update({
                estado: 'Cancelada',
            })
        })
        .then(() => {
            return res.send('Orden Cancelada')
        })
        .catch(() => {
            return res.status(400).send('No se modifico');
        })
});

//RUTA AGREGA ITEMS AL CARRITO DE UN USUARIO, SI NO TIENE ORDEN ABIERTA, CREA UNA
//SI TIENE ORDEN, PERO SIN ESE PRODUCTO, SE LO AGREGA, SI YA TIENE EL PRODUCTO
//LE AGREGA +1 EN CANTIDAD DE ESE PRODUCTO 
//-REVISADO Y FUNCIONANDO-

server.post('/agregaritem/:idUsuario/:idProducto', function(req, res) {

    Orden.findOne({
            where: {
                userIdUser: req.params.idUsuario,
                estado: "Abierta"
            }
        })
        .then(response => {

            if (response !== null) {
                return response
            } else {
                Orden.create({
                    estado: "Abierta",
                    userIdUser: req.params.idUsuario
                }).then(ordenCreada => {
                    Productoxorden.create({
                        cantidad: 1,
                        productId: req.params.idProducto,
                        ordenIdOrden: ordenCreada.idOrden
                    }).then(() => {
                        res.send('Se Agrego producto a Orden Creada')
                    })
                })
            }
        }).then((response) => {
            Productoxorden.findOne({
                where: {
                    productId: req.params.idProducto,
                    ordenIdOrden: response.idOrden
                }
            }).then((response) => {
                if (response !== null) {
                    response.update({
                        cantidad: response.cantidad + 1
                    }, {
                        where: {
                            productId: req.params.idProducto,
                            ordenIdOrden: response.idOrden
                        }
                    })
                } else {
                    Orden.findOne({
                        where: {
                            userIdUser: req.params.idUsuario,
                            estado: "Abierta"
                        }
                    }).then(response => {
                        Productoxorden.create({
                            cantidad: 1,
                            productId: req.params.idProducto,
                            ordenIdOrden: response.idOrden
                        })

                    })
                }
                res.send('encontro orden con ese producto')
            })

        })

})

//RUTA RETORNA TODOS LOS PRODUCTOS DE UNA ORDEN/CARRITO
//-REVISADO Y FUNCIONANDO-
server.get('/products/:iduser', function(req, res) {
    Orden.findOne({
        where: {
            userIdUser: req.params.iduser,
            estado: "Abierta"
        },
        include: {
            model: Product,
            as: "product"
        }
    }).then(response => {
        if (response !== null) {
            return res.send(response.product);
        } else {
            return res.send([])
        }
    })
})

//TRAE TODOS LOS PRODUCTOS DE UNA ORDEN(CERRADA O ABIERTA)
server.get('/products/:idUser/:idOrden/detalleorden', function(req, res) {
    Orden.findOne({
        where: {
            userIdUser: req.params.idUser,
            idOrden: req.params.idOrden,
        },
        include: {
            model: Product,
            as: "product"
        }
    }).then(response => {
        if (response !== null) {
            return res.send(response.product);
        } else {
            return res.send([])
        }
    })
})

//ELIMINA TODOS LOS PRODUCTOS DEL CARRITO (ELIMINANDO LA ORDEN)
//-REVISADO Y FUNCIONANDO-
server.delete('/:id', (req, res) => {
    const id = req.params.id;
    Orden.destroy({
            where: { idOrden: id },
        })
        .then(() => {
            res.send("Orden eliminada");
        })
        .catch(res.send);
});


//RUTA RETORNA TODAS LAS ORDENES DE UN USUARIO 
//-REVISADO y FUNCIONANDO-
server.get('/:user', function(req, res) {

    Orden.findAll({ where: { userIdUser: req.params.user } })

    .then((ordenes) => {
        return res.send(ordenes)

    })
})


//SE CREA ORDEN AL USUARIO 
//-REVISADO Y FUNCIONANDO-
server.post("/crear/:idUser", (req, res) => {

    Orden.create({
            estado: "Abierta",
            userIdUser: req.params.idUser
        })
        .then(() => {
            res.send("Se Creo Orden");
        })

});

//SUMA 1 o RESTA 1 AL PRODUCTO DE LA ORDEN
server.put("/modificarcantidad/:iduser/:idProducto", (req, res) => {
    const { accion } = req.body;

    Orden.findOne({
        where: {
            userIdUser: req.params.iduser,
            estado: "Abierta"
        }
    }).then(response => {
        Productoxorden.findOne({
                where: {
                    productId: req.params.idProducto,
                    ordenIdOrden: response.idOrden
                }
            })
            .then(response => {

                if (accion === "sumar") {
                    response.update({
                        cantidad: response.cantidad + 1
                    }, {
                        where: {
                            productId: req.params.idProducto,
                        }
                    })
                    return res.send("Se agrego uno al producto")
                }
                if (accion === "restar") {
                    response.update({
                        cantidad: response.cantidad - 1
                    }, {
                        where: {
                            productId: req.params.idProducto,
                        }
                    })
                    if (response.cantidad === 0) {
                        Productoxorden.destroy({
                            where: {
                                productId: req.params.idProducto,
                            }
                        })
                    }
                    return res.send("Se resto uno al producto")
                }
            })

    })


});

//ELIMINA PRODUCTO DE UNA ORDEN
//-REVISADO Y FUNCIONANDO-
server.delete('/producto/:idProducto/:idOrden', (req, res) => {
    Productoxorden.destroy({
        where: {
            productId: req.params.idProducto,
            ordenIdOrden: req.params.idOrden
        }
    }).then(() => {
        return res.send('Producto Eliminado')

    })
})

//AGREAGA DIRECCION DE ENVIO A LA ORDEN
server.put('/envio/:id', function(req, res) {
    console.log(req.body.direccionEnvio)
    Orden.findOne({
            where: {
                idOrden: req.params.id,
            }
        }).then(function(orden) {
            orden.update({
                direccionEnvio: req.body.direccionEnvio,
            })
        })
        .then(() => {
            return res.send('Direccion agregada')
        })
        .catch(() => {
            return res.status(400).send('No se modifico');
        })
});


module.exports = server;