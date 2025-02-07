const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const TrainingEmployee = sequelize.define('TrainingEmployee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    training_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'training_employee',
    timestamps: false
});

module.exports = TrainingEmployee;