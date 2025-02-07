const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Office = require('./officeModel');

const Department = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    office_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Office,
            key: 'id'
        }
    }
}, {
    tableName: 'department',
    timestamps: false
});


module.exports = Department;