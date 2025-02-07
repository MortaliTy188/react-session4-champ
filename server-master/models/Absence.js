const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Absence = sequelize.define('Absence', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    absence_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    substitute_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'absence',
    timestamps: false
});

module.exports = Absence;