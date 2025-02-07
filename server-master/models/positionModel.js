const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Position = sequelize.define('position', {
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
    tableName: 'position',
    timestamps: false
});

module.exports = Position;