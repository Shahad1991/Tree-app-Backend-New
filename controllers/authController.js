const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to hash the password
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const registerUser = (req, res) => {
    const { name, password, email, phone } = req.body;
    const hashedPassword = hashPassword(password);

    const userSql = `
        INSERT INTO users (name, password, email, phone)
        VALUES (?, ?, ?, ?)
    `;

    db.query(userSql, [name, hashedPassword, email, phone], (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: err });
        }

        const userId = result.insertId;

        const levelSql = `
            INSERT INTO user_levels (user_id, level)
            VALUES (?, ?)
        `;

        const pointsSql = `
            INSERT INTO user_points (user_id, points)
            VALUES (?, ?)
        `;

        db.query(levelSql, [userId, 1], (err) => {
            if (err) {
                console.error('Error inserting user level:', err);
                return res.status(500).json({ error: err });
            }
        });

        db.query(pointsSql, [userId, 0], (err) => {
            if (err) {
                console.error('Error inserting user points:', err);
                return res.status(500).json({ error: err });
            }
        });

        const token = jwt.sign({ id: userId }, 'secret', { expiresIn: 86400 }); // 24 hours

        const user = {
            id: userId,
            name,
            email,
            phone,
            level: 1,
            points: 0
        };

        res.json({ auth: true, token, user });
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

        const levelSql = `
            SELECT level FROM user_levels WHERE user_id = ?
        `;

        const pointsSql = `
            SELECT points FROM user_points WHERE user_id = ?
        `;

        db.query(levelSql, [user.user_id], (err, levelResults) => {
            if (err) {
                console.error('Error fetching user level:', err);
                return res.status(500).json({ error: err });
            }

            const level = levelResults.length > 0 ? levelResults[0].level : 1;

            db.query(pointsSql, [user.user_id], (err, pointsResults) => {
                if (err) {
                    console.error('Error fetching user points:', err);
                    return res.status(500).json({ error: err });
                }

                const points = pointsResults.length > 0 ? pointsResults[0].points : 0;

                res.json({
                    auth: true,
                    token,
                    user: {
                        id: user.user_id,
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        level,
                        points
                    }
                });
            });
        });
    });
};

const getUsersWithPoints = (req, res) => {
    const userSql = `
        SELECT u.name, l.level, p.points
        FROM users u
        JOIN user_levels l ON u.user_id = l.user_id
        JOIN user_points p ON u.user_id = p.user_id
        ORDER BY p.points DESC
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
        SELECT u.user_id AS id, u.name, u.email, u.phone, l.level, p.points
        FROM users u
        JOIN user_levels l ON u.user_id = l.user_id
        JOIN user_points p ON u.user_id = p.user_id
        WHERE u.user_id = ?
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

    const updateLevelSql = `
        UPDATE user_levels SET level = ? WHERE user_id = ?
    `;

    const updatePointsSql = `
        UPDATE user_points SET points = ? WHERE user_id = ?
    `;

    db.query(updateLevelSql, [level, userId], (err) => {
        if (err) {
            console.error('Error updating user level:', err);
            return res.status(500).json({ error: err });
        }
    });

    db.query(updatePointsSql, [points, userId], (err) => {
        if (err) {
            console.error('Error updating user points:', err);
            return res.status(500).json({ error: err });
        }
    });

    res.json({ message: 'User points and level updated successfully' });
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