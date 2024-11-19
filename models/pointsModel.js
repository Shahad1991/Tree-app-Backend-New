const db = require('../config/db');

const savePoints = (userId, points, callback) => {
    const sql = 'INSERT INTO points (user_id, points) VALUES (?, ?) ON DUPLICATE KEY UPDATE points = ?';
    console.log('Executing SQL:', sql, [userId, points, points]);
    db.query(sql, [userId, points, points], callback);
};

const deletePointsByUserId = (userId, callback) => {
    const sql = 'DELETE FROM points WHERE user_id = ?';
    console.log('Executing SQL:', sql, [userId]);
    db.query(sql, [userId], callback);
};

module.exports = {
    savePoints,
    deletePointsByUserId
};