const express = require('express');
const {
    getEmployeesByDepartment,
    getEmployeeTrainings,
    getEmployeeAbsences,
    getEmployeeLeaves,
    updateEmployee,
    deleteEmployeeTraining,
    deleteEmployeeAbsence,
    deleteEmployeeLeave,
    addEmployeeAbsence,
    addEmployee,
    getAllEmployees,
    fireEmployee
} = require('../controllers/employeeController');
const router = express.Router();

router.get('/employees/:departmentId', getEmployeesByDepartment);
router.get('/employee/:id/trainings', getEmployeeTrainings);
router.get('/employee/:id/absences', getEmployeeAbsences);
router.get('/employee/:id/leaves', getEmployeeLeaves);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id/trainings/:trainingId', deleteEmployeeTraining);
router.delete('/employee/:id/absences/:absenceId', deleteEmployeeAbsence);
router.delete('/employee/:id/leaves/:leaveId', deleteEmployeeLeave);
router.post('/employee/:id/absences', addEmployeeAbsence);
router.post('/employee/', addEmployee);
router.get('/employees/', getAllEmployees);
router.put('/employee/fire/:id', fireEmployee);

module.exports = router;