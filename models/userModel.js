const db = require('../config/db');

const createUser = (name, callback) => {
    const sql = 'INSERT INTO users (name) VALUES (?)';
    db.query(sql, [name], callback);
};

const updateUser = (id, name, callback) => {
    const sql = 'UPDATE users SET name = ? WHERE user_id = ?';
    db.query(sql, [name, id], callback);
};

const deleteUser = (id, callback) => {
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [id], callback);
};

const getUsersWithPoints = (callback) => {
    const sql = `
        SELECT u.user_id, u.name, p.points
        FROM users u
        LEFT JOIN points p ON u.user_id = p.user_id
    `;
    db.query(sql, callback);
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsersWithPoints
};