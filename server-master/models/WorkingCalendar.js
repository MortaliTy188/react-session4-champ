const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const WorkingCalendar = sequelize.define('WorkingCalendar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    exceptiondate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    isworkingday: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'workingcalendar',
    timestamps: false
});

module.exports = WorkingCalendar;