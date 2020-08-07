const fs = require('fs');
const path = require('path');
const db = require('../db.js');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const models = {};

models.conn = db();

fs.readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = models.conn.import(path.join(__dirname, file));
        const name = file.split('.')[0];
        models[name] = model;
    });

const {
    Product = require('./Product.js'),
        Category = require('./Category.js'),
        User = require('./User.js'),
        Orden = require('./Orden.js'),
        Review = require('./Review.js'),
        Productoxorden = require('./Productoxorden.js')
} = models

// Add model relationships here
db.Sequelize = Sequelize;


Product.belongsToMany(Category, { as: "category", through: 'productoxcategorias' }); //sprint1
Category.belongsToMany(Product, { as: "product", through: 'productoxcategorias' });

Product.hasMany(Review);
User.hasMany(Review);

User.hasMany(Orden); //sprint2

Product.belongsToMany(Orden, { as: "orden", through: Productoxorden }); //sprint2
Orden.belongsToMany(Product, { as: "product", through: Productoxorden });

module.exports = models;