const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const TrainingCategory = sequelize.define('TrainingCategory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'trainingcategory',
    timestamps: false
});

module.exports = TrainingCategory;