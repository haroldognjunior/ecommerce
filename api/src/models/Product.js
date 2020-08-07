const S = require('sequelize');
const Product = (sequelize, S) => {
    // defino el modelo
    const P = sequelize.define('product', {
        id: {
            primaryKey: true,
            type: S.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        titulo: {
            allowNull: false,
            type: S.STRING,
        },
        descripcion: {
            type: S.STRING,
        },
        precio: {
            type: S.REAL,
            allowNull: false,
        },
        cantidad: {
            type: S.INTEGER,
            allowNull: false,
        },
        imagen: {
            type: S.STRING,
        }
    }, { timestamps: false });

    return P;
};

module.exports = Product;