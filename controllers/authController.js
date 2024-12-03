const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = (req, res) => {
    const { name, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const userSql = `
        INSERT INTO users (name, password, level, points) VALUES (?, ?, 1, 0)
    `;

    db.query(userSql, [name, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'User registered successfully' });
    });
};

const loginUser = (req, res) => {
    const { name, password } = req.body;

    const userSql = `
        SELECT * FROM users WHERE name = ?
    `;

    db.query(userSql, [name], (err, results) => {
        if (err) {
            console.error('Error logging in user:', err);
            return res.status(500).json({ error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: 86400 }); // 24 hours

        // Hent brugerens niveau og point
        const userLevel = user.level;
        const userPoints = user.points || 0;

        res.json({ auth: true, token, name: user.name, level: userLevel, points: userPoints });
    });
};

const getUsersWithPoints = (req, res) => {
    const userSql = `
        SELECT name, level, points FROM users ORDER BY points DESC
    `;

    db.query(userSql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: err });
        }
        res.json(results);
    });
};

const getUserData = (req, res) => {
    const userId = req.userId;

    const userSql = `
        SELECT name, level, points FROM users WHERE user_id = ?
    `;

    db.query(userSql, [userId], (err, results) => {
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

    const updateSql = `
        UPDATE users SET points = ?, level = ? WHERE user_id = ?
    `;

    db.query(updateSql, [points, level, userId], (err, result) => {
        if (err) {
            console.error('Error updating user points and level:', err);
            return res.status(500).json({ error: err });
        }
        res.json({ message: 'User points and level updated successfully' });
    });
};

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        next();
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUsersWithPoints,
    getUserData,
    updateUserPointsAndLevel,
    verifyToken
};