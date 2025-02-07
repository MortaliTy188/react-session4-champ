const Employee = require('./employeeModel');
const Department = require('./departmentModel');
const Position = require('./positionModel');
const Office = require('./officeModel');
const Training = require('./Training');
const TrainingEmployee = require('./TrainingEmployee');
const TrainingCategory = require('./TrainingCategory');
const Absence = require('./Absence');

// Настройка ассоциаций
Department.hasMany(Employee, { foreignKey: 'department_id', as: 'employees' });
Employee.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });

Position.hasMany(Employee, { foreignKey: 'position_id', as: 'employees' });
Employee.belongsTo(Position, { foreignKey: 'position_id', as: 'position' });

Office.hasMany(Department, { foreignKey: 'office_id', as: 'departments' });
Department.belongsTo(Office, { foreignKey: 'office_id', as: 'office' });

Training.belongsTo(TrainingCategory, { foreignKey: 'category_id', as: 'category' });
TrainingCategory.hasMany(Training, { foreignKey: 'category_id', as: 'trainings' });

Employee.hasMany(TrainingEmployee, { foreignKey: 'employee_id', as: 'trainings' });
TrainingEmployee.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

Training.hasMany(TrainingEmployee, { foreignKey: 'training_id', as: 'trainingEmployees' });
TrainingEmployee.belongsTo(Training, { foreignKey: 'training_id', as: 'training' });

Employee.hasMany(Absence, { foreignKey: 'employee_id', as: 'absences' });
Absence.belongsTo(Employee, { foreignKey: 'employee_id', as: 'employee' });

module.exports = {
    Employee,
    Department,
    Position,
    Office,
    Training,
    TrainingEmployee,
    TrainingCategory,
    Absence
};