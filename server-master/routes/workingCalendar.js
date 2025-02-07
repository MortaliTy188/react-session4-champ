const express = require('express');
const router = express.Router();
const workingCalendarController = require('../controllers/workingCalendarController');

router.get('/', workingCalendarController.getWorkingCalendar);

module.exports = router;