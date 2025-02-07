const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Department = require('./departmentModel');
const Position = require('./positionModel');
const Office = require('./officeModel');

const Employee = sequelize.define('employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id'
        }
    },
    position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Position,
            key: 'id'
        }
    },
    work_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    personal_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    assistant_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middle_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    additional_info: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Fired: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fired_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'employee',
    timestamps: false
});

module.exports = Employee;