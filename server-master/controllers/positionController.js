const Position = require('../models/positionModel');

// Получение всех департаментов
exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.findAll();
        res.json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};