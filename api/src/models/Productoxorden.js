const S = require('sequelize');

const Productoxorden = (sequelize, S) => {
    const C = sequelize.define("productoxorden", {
        id: {
            type: S.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
        },
        cantidad: {
            type: S.INTEGER,
            allowNull: true,
        }
    }, { timestamps: false });

    return C;
};
module.exports = Productoxorden;