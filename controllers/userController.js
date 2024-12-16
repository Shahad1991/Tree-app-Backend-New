const userModel = require('../models/userModel');

const getUserData = (req, res) => {
    const userId = req.userId;

    userModel.getUserById(userId, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
};

const getUsersWithPoints = (req, res) => {
    userModel.getUsersWithPoints((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch users' });
        }
        res.json(users);
    });
};

const updateUserPointsAndLevel = (req, res) => {
    const userId = req.userId;
    const { points, level } = req.body;

    userModel.updateUserPointsAndLevel(userId, points, level, (err) => {
        if (err) {
            console.error('Error updating user points and level:', err);
            return res.status(500).json({ error: 'Failed to update user points and level' });
        }
        res.json({ message: 'User points and level updated successfully' });
    });
};
const getUserByUsername = (req, res) => {
    const username = req.params.username;

    userModel.getUserByUsername(username, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Failed to fetch user data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(results[0]);
    });
};

module.exports = {
    getUserData,
    getUsersWithPoints,
    updateUserPointsAndLevel,
    getUserByUsername,
};