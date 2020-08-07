const S = require('sequelize');
const User = (sequelize, S) => {
    // defino el modelo

    const U = sequelize.define('user', {
        idUser: {
            primaryKey: true,
            type: S.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        nombreUser: {
            allowNull: false,
            type: S.STRING,
            unique: true,
        },
        contraUser: {
            allowNull: false,
            type: S.STRING,
            unique: false,
        },
        emailUser: {
            allowNull: false,
            type: S.STRING,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        admin: {
            type: S.BOOLEAN,
            defaultValue: false,
        },
        reset: {
            type: S.BOOLEAN,
            defaultValue: false,
        }
    }, { timestamps: false });

    return U;
};

module.exports = User;