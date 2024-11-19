const pointsModel = require('../models/pointsModel');

const savePoints = (req, res) => {
    const { userId, points } = req.body;
    console.log('Received data from frontend:', { userId, points });

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    pointsModel.savePoints(userId, points, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'Points saved successfully' });
    });
};

module.exports = {
    savePoints
};