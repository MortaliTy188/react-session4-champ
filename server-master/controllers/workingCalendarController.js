const WorkingCalendar = require('../models/WorkingCalendar');

exports.getWorkingCalendar = async (req, res) => {
    try {
        const workingCalendar = await WorkingCalendar.findAll();
        res.json(workingCalendar);
    } catch (error) {
        console.error('Ошибка получения данных производственного календаря:', error);
        res.status(500).json({ error: 'Ошибка получения данных производственного календаря' });
    }
};