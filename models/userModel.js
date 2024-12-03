const bcrypt = require('bcrypt');
const db = require('../config/db');

const createUser = (name, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
    db.query(sql, [name, hashedPassword], callback);
};

const updateUser = (id, name, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'UPDATE users SET name = ?, password = ? WHERE user_id = ?';
    db.query(sql, [name, hashedPassword, id], callback);
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

const getUserById = (id, callback) => {
    const sql = 'SELECT user_id, name FROM users WHERE user_id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
    });
};

const authenticateUser = (name, password, callback) => {
    const sql = 'SELECT user_id, name, password FROM users WHERE name = ?';
    db.query(sql, [name], (err, results) => {
        if (err) return callback(err);
        if (results.length > 0) {
            const user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                callback(null, { user_id: user.user_id, name: user.name });
            } else {
                callback(null, null);
            }
        } else {
            callback(null, null);
        }
    });
};

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUsersWithPoints,
    getUserById,
    authenticateUser
};