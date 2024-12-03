const db = require('../config/db');

const saveUserData = (req, res) => {
    const { points, level } = req.body;
    const userId = req.userId; // Hent userId fra token
    console.log('Received data:', req.body); // Debug-udskrift

    const userSql = `
        UPDATE users SET level = ? WHERE user_id = ?
    `;
    const pointsSql = `
        INSERT INTO points (user_id, points) VALUES (?, ?)
        ON DUPLICATE KEY UPDATE points = ?
    `;

    db.query(userSql, [level, userId], (err, result) => {
        if (err) {
            console.error('Error saving user data:', err);
            return res.status(500).json({ error: err });
        }
        db.query(pointsSql, [userId, points, points], (err, result) => {
            if (err) {
                console.error('Error saving points:', err);
                return res.status(500).json({ error: err });
            }
            res.json({ message: 'User data and points saved successfully' });
        });
    });
};

module.exports = {
    saveUserData
};