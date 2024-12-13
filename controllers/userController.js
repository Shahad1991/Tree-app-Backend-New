const userModel = require('../models/userModel');

const getUsersWithPoints = (req, res) => {
    userModel.getUsersWithPoints((err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

const getUserData = (req, res) => {
    const userId = req.userId;

    userModel.getUserById(userId, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
};

const updateUserPointsAndLevel = (req, res) => {
    const userId = req.userId;
    const { points, level } = req.body;

    userModel.updateUserPointsAndLevel(userId, points, level, (err) => {
        if (err) {
            console.error('Error updating user points and level:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'User points and level updated successfully' });
    });
};

module.exports = {
    getUsersWithPoints,
    getUserData,
    updateUserPointsAndLevel
};