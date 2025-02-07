const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');

router.get('/positions/', positionController.getAllPositions);

module.exports = router;