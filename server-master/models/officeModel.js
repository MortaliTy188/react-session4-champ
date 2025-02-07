const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Office = sequelize.define('office', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    office: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'office',
    timestamps: false
});

module.exports = Office;