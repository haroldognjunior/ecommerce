const server = require('express').Router();
const { Category, Orden, Product, Productoxorden, Review, User } = require('../models');
const Sequelize = require('sequelize');

server.get('/', async function(req, res) {
    const dataProducts = [{
            titulo: "Leche",
            descripcion: "Es una leche comun",
            precio: 55,
            cantidad: 20,
            imagen: "https://statics-cuidateplus.marca.com/datos/native/2018/11/19/img/principal_b.jpg"

        },

        {
            titulo: "Azucar",
            descripcion: "",
            precio: 50,
            cantidad: 10,
            imagen: "https://live.mrf.io/statics/i/ps/www.ecestaticos.com/imagestatic/clipping/d67/a42/d67a42a05e71ae3ef0b1e73a45ce9174/tipos-de-azucar-diferencias-entre-la-glucosa-fructosa-y-sacarosa.jpg?mtime=1579565836"

        },
        {
            titulo: "Yerba",
            descripcion: "La que usa tony",
            precio: 50,
            cantidad: 100,
            imagen: "https://www.fm899.com.ar/public/images/noticias/69234-prohiben-una-yerba-mate-a-la-que-se-le-detecto-salmonella.jpg"

        },
        {
            titulo: "Mermelada",
            descripcion: "",
            precio: 50,
            cantidad: 10,
            imagen: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/A6341A6F-86D6-44F4-B9D6-6A696C3C94A2/Derivates/a1a77120-6b48-478a-868f-691107e62a19.jpg"

        },
        {
            titulo: "Carne",
            descripcion: "",
            precio: 200,
            cantidad: 100,
            imagen: "https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2016/01/ablandarcarne.jpg"

        },
        {
            titulo: "Pollo",
            descripcion: "",
            precio: 150,
            cantidad: 5,
            imagen: "https://www.hola.com/imagenes/cocina/recetas/20190729146642/pollo-asado-al-horno-con-tomillo/0-705-707/pollo-asado-horno-tomillo-m.jpg"

        },
        {
            titulo: "Bebidas",
            descripcion: "",
            precio: 80,
            cantidad: 100,
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTt52RdPCkTZpX4G1EhwWelitXptiIYLMV4HQ&usqp=CAU"

        },
        {
            titulo: "Yogur",
            descripcion: "",
            precio: 50,
            cantidad: 200,
            imagen: "https://fuertesconleche.com/wp-content/uploads/2017/11/yogur-casero.jpg"

        },
        {
            titulo: "Sales",
            descripcion: "",
            precio: 40,
            cantidad: 15,
            imagen: "https://www.caracteristicas.co/wp-content/uploads/2019/02/sales-4-e1586011939392.jpg"

        },
        {
            titulo: "Condimentos",
            descripcion: "",
            precio: 50,
            cantidad: 13,
            imagen: "https://blog.oxfamintermon.org/wp-content/uploads/2019/01/especias-y-condimentos-1.jpg"

        },
        {
            titulo: "Verduras",
            descripcion: "",
            precio: 75,
            cantidad: 9,
            imagen: "https://frutasalexysoler.com/wp-content/uploads/20190811_frutas-y-verduras.jpg"

        },
        {
            titulo: "Queso",
            descripcion: "",
            precio: 35,
            cantidad: 21,
            imagen: "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/entrepadres/b/beneficios-de-comer-queso-en-ninos-%201.jpg"

        },
        {
            titulo: "Frutas",
            descripcion: "",
            precio: 55,
            cantidad: 200,
            imagen: "https://viprecetas.com/wp-content/uploads/2020/01/frutas.png"

        },
        {
            titulo: "Miel",
            descripcion: "",
            precio: 110,
            cantidad: 13,
            imagen: "https://images.clarin.com/2016/04/14/ByXgGZ54g_340x340.jpg"

        }

    ]
    const dataCategoties = [
        { nombre: "Bebidas" },
        { nombre: "Carne" },
        { nombre: "Almacen" },
        { nombre: "Desayunos" },
        { nombre: "Pasteleria" },
        { nombre: "Frutas" },
        { nombre: "Verduras" },
        { nombre: "Fiambreria" },
        { nombre: "Aderezos" },

    ]

    User.create ({
        nombreUser: 'admin',
        contraUser: 'admin',
        emailUser: 'admin@admin.com',
        admin: true
    })

    for (var i = 0; i < dataProducts.length; i++) {
        await Product.create(dataProducts[i]);
    }
    for (var i = 0; i < dataCategoties.length; i++) {
        await Category.create(dataCategoties[i]);
    }

    res.send("Carga exitosa");
});

module.exports = server;