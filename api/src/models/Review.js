const S = require('sequelize');
const Review = (sequelize, S) => {
    // defino el modelo

    const R = sequelize.define('review', {
        idReview: {
            primaryKey: true,
            type: S.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        descripcion: {
            allowNull: false,
            type: S.STRING,
        },
        puntaje: {
            allowNull: false,
            type: S.DECIMAL,
            defaultValue: 1,
        }
    }, { timestamps: false });

    return R;
};

module.exports = Review;