const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Training = sequelize.define('Training', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME
    },
    material_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'training',
    timestamps: false
});

module.exports = Training;