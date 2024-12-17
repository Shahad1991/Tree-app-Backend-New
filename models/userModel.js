const db = require('../config/db');

const createUser = (name, hashedPassword, email, phone, callback) => {
    const userSql = `
        INSERT INTO users (name, password, email, phone)
        VALUES (?, ?, ?, ?)
    `;
    db.query(userSql, [name, hashedPassword, email, phone], callback);
};

const createUserLevel = (userId, callback) => {
    const levelSql = `
        INSERT INTO user_levels (user_id, level)
        VALUES (?, ?)
    `;
    db.query(levelSql, [userId, 1], callback);
};

const createUserPoints = (userId, callback) => {
    const pointsSql = `
        INSERT INTO user_points (user_id, points)
        VALUES (?, ?)
    `;
    db.query(pointsSql, [userId, 0], callback);
};

const getUserById = (userId, callback) => {
    const userSql = `
        SELECT u.user_id AS id, u.name, u.email, u.phone, l.level, p.points
        FROM users u
        JOIN user_levels l ON u.user_id = l.user_id
        JOIN user_points p ON u.user_id = p.user_id
        WHERE u.user_id = ?
    `;
    db.query(userSql, [userId], callback);
};

const getUserByName = (name, callback) => {
    const userSql = `
        SELECT user_id, name, email, phone, password 
        FROM users 
        WHERE LOWER(name) = LOWER(?);
    `;
    db.query(userSql, [name], callback);
};

const getUserLevel = (userId, callback) => {
    const levelSql = `
        SELECT level
        FROM user_levels
        WHERE user_id = ?
    `;
    db.query(levelSql, [userId], callback);
};

const getUserPoints = (userId, callback) => {
    const pointsSql = `
        SELECT points
        FROM user_points
        WHERE user_id = ?
    `;
    db.query(pointsSql, [userId], callback);
};

const getUsersWithPoints = (callback) => {
    const userSql = `
        SELECT u.name, l.level, p.points
        FROM users u
        JOIN user_levels l ON u.user_id = l.user_id
        JOIN user_points p ON u.user_id = p.user_id
        ORDER BY p.points DESC
    `;
    db.query(userSql, callback);
};

const updateUserPointsAndLevel = (userId, points, level, callback) => {
    const updateLevelSql = `
        UPDATE user_levels SET level = ? WHERE user_id = ?
    `;
    const updatePointsSql = `
        UPDATE user_points SET points = ? WHERE user_id = ?
    `;
    db.query(updateLevelSql, [level, userId], (err) => {
        if (err) return callback(err);
        db.query(updatePointsSql, [points, userId], callback);
    });
};

module.exports = {
    createUser,
    createUserLevel,
    createUserPoints,
    getUserById,
    getUserByName,
    getUserLevel,
    getUserPoints,
    getUsersWithPoints,
    updateUserPointsAndLevel
};