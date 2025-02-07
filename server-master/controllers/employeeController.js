// Импорт моделей
const { Employee, TrainingEmployee, Training, TrainingCategory, Absence, Department, Position, Office } = require('../models');
const { Op } = require('sequelize');

// Получение сотрудников по департаменту
exports.getEmployeesByDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
        const employees = await Employee.findAll({
            where: { department_id: departmentId },
            include: [
                {
                    model: Department,
                    as: 'department',
                    include: {
                        model: Office,
                        as: 'office'
                    }
                },
                { model: Position, as: 'position' }
            ]
        });

        if (!employees) {
            return res.status(404).json({ message: 'Сотрудники не найдены' });
        }

        return res.json(employees);
    } catch (error) {
        console.error('Ошибка получения сотрудников:', error);
        return res.status(500).json({ message: 'Ошибка получения сотрудников', error });
    }
};

// Обновление данных сотрудника
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: 'Сотрудник не найден' });
        }
        await employee.update(updateData);
        return res.json({ message: 'Данные сотрудника успешно обновлены', employee });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка обновления данных сотрудника', error });
    }
};

// Добавление нового сотрудника
exports.addEmployee = async (req, res) => {
    const employeeData = req.body;
    try {
        const newEmployee = await Employee.create(employeeData);
        return res.status(201).json({ message: 'Сотрудник успешно добавлен', employee: newEmployee });
    } catch (error) {
        console.error('Ошибка добавления сотрудника:', error);
        return res.status(500).json({ message: 'Ошибка добавления сотрудника', error });
    }
};

// Получение обучений сотрудника
exports.getEmployeeTrainings = async (req, res) => {
    const { id } = req.params;
    try {
        const trainings = await TrainingEmployee.findAll({
            where: { employee_id: id },
            include: [
                {
                    model: Training,
                    as: 'training',
                    include: {
                        model: TrainingCategory,
                        as: 'category'
                    }
                }
            ],
            order: [['training', 'date', 'ASC']]
        });

        if (!trainings.length) {
            return res.status(404).json({ message: 'Обучения не найдены' });
        }

        return res.json(trainings);
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка получения обучений', error });
    }
};

// Удаление обучения сотрудника
exports.deleteEmployeeTraining = async (req, res) => {
    const { id, trainingId } = req.params;
    try {
        await TrainingEmployee.destroy({
            where: { employee_id: id, training_id: trainingId }
        });
        return res.json({ message: 'Обучение успешно удалено' });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка удаления обучения', error });
    }
};

// Получение данных о отгулах сотрудника
exports.getEmployeeAbsences = async (req, res) => {
    const { id } = req.params;
    try {
        const absences = await Absence.findAll({
            where: { employee_id: id, absence_type_id: 1 }
        });

        if (!absences.length) {
            return res.status(404).json({ message: 'Отгулы не найдены' });
        }

        return res.json(absences);
    } catch (error) {
        console.error('Ошибка получения отгулов:', error);
        return res.status(500).json({ message: 'Ошибка получения отгулов', error });
    }
};

// Получение данных об отпусках сотрудника
exports.getEmployeeLeaves = async (req, res) => {
    const { id } = req.params;
    try {
        const leaves = await Absence.findAll({
            where: { employee_id: id, absence_type_id: 2 }
        });

        if (!leaves.length) {
            return res.status(404).json({ message: 'Отпуска не найдены' });
        }

        return res.json(leaves);
    } catch (error) {
        console.error('Ошибка получения отпусков:', error);
        return res.status(500).json({ message: 'Ошибка получения отпусков', error });
    }
};

// Добавление отгула или отпуска сотруднику
exports.addEmployeeAbsence = async (req, res) => {
    const { id } = req.params;
    const absenceData = req.body;
    try {
        const absence = await Absence.create({ ...absenceData, employee_id: id });
        return res.status(201).json({ message: 'Отгул или отпуск успешно добавлен', absence });
    } catch (error) {
        console.error('Ошибка добавления отгула или отпуска:', error);
        return res.status(500).json({ message: 'Ошибка добавления отгула или отпуска', error });
    }
};

// Удаление отгула или отпуска сотрудника
exports.deleteEmployeeAbsence = async (req, res) => {
    const { id, absenceId } = req.params;
    try {
        await Absence.destroy({
            where: { employee_id: id, id: absenceId }
        });
        return res.json({ message: 'Отгул или отпуск успешно удален' });
    } catch (error) {
        console.error('Ошибка удаления отгула или отпуска:', error);
        return res.status(500).json({ message: 'Ошибка удаления отгула или отпуска', error });
    }
};

// Удаление отпуска сотрудника
exports.deleteEmployeeLeave = async (req, res) => {
    const { id, leaveId } = req.params;
    try {
        await Absence.destroy({
            where: { employee_id: id, id: leaveId, absence_type_id: 2 } // Убедитесь, что указаны все условия
        });
        return res.json({ message: 'Отпуск успешно удален' });
    } catch (error) {
        console.error('Ошибка удаления отпуска:', error);
        return res.status(500).json({ message: 'Ошибка удаления отпуска', error });
    }
};

// Увольнение сотрудника
exports.fireEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        // Находим работника по id
        const employee = await Employee.findByPk(id);

        if (!employee) {
            return res.status(404).json({ message: 'Работник не найден' });
        }

        // Проверка наличия будущих обучений
        const futureTrainings = await TrainingEmployee.findAll({
            where: {
                employee_id: id,
                '$training.date$': {
                    [Op.gt]: new Date()
                }
            },
            include: [{
                model: Training,
                as: 'training'
            }]
        });

        if (futureTrainings.length > 0) {
            return res.status(400).json({ message: 'Невозможно уволить сотрудника при наличии будущих обучений' });
        }

        // Обновляем поля Fired и fired_date
        employee.Fired = true;
        employee.fired_date = new Date();

        // Удаляем будущие отгулы и отпуска
        await Absence.destroy({
            where: {
                employee_id: id,
                start_date: {
                    [Op.gt]: new Date()
                }
            }
        });

        // Сохраняем изменения
        await employee.save();

        res.status(200).json({ message: 'Работник успешно уволен и будущие отгулы и отпуска удалены' });
    } catch (error) {
        console.error('Ошибка при увольнении работника:', error);
        res.status(500).json({ message: 'Ошибка при увольнении работника' });
    }
};

// Получение всех сотрудников
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};