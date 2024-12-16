const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const admin = require('../firebaseConfig');
const db = require('../config/db');

// Function to hash the password
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const registerUser = (req, res) => {
    const { name, password, email, phone } = req.body;
    const hashedPassword = hashPassword(password);

    userModel.createUser(name, hashedPassword, email, phone, (err, result) => {
        if (err) {
            console.error('Error registering user:', err);
            return res.status(500).json({ error: err });
        }

        const userId = result.insertId;

        userModel.createUserLevel(userId, (err) => {
            if (err) {
                console.error('Error inserting user level:', err);
                return res.status(500).json({ error: err });
            }
        });

        userModel.createUserPoints(userId, (err) => {
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

    userModel.getUserByName(name, (err, results) => {
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

        userModel.getUserLevel(user.user_id, (err, levelResults) => {
            if (err) {
                console.error('Error fetching user level:', err);
                return res.status(500).json({ error: err });
            }

            const level = levelResults.length > 0 ? levelResults[0].level : 1;

            userModel.getUserPoints(user.user_id, (err, pointsResults) => {
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

const firebaseAuth = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;
        console.log('Firebase UID:', uid); // Log the Firebase UID

        userModel.getUserByFirebaseUid(uid, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: err });
            }

            if (user) {
                // User exists, generate JWT
                const token = jwt.sign({ id: user.user_id }, 'secret', { expiresIn: 86400 }); // 24 hours

                // Fetch user level and points
                userModel.getUserLevel(user.user_id, (err, levelResults) => {
                    if (err) {
                        console.error('Error fetching user level:', err);
                        return res.status(500).json({ error: err });
                    }

                    const level = levelResults.length > 0 ? levelResults[0].level : 1;

                    userModel.getUserPoints(user.user_id, (err, pointsResults) => {
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
            } else {
                // User does not exist, create new user
                const newUser = {
                    uid,
                    name: decodedToken.name,
                    email: decodedToken.email
                };

                userModel.createUserWithFirebase(newUser, (err, createdUser) => {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({ error: err });
                    }

                    const token = jwt.sign({ id: createdUser.insertId }, 'secret', { expiresIn: 86400 }); // 24 hours

                    // Create user level and points
                    userModel.createUserLevel(createdUser.insertId, (err) => {
                        if (err) {
                            console.error('Error inserting user level:', err);
                            return res.status(500).json({ error: err });
                        }
                    });

                    userModel.createUserPoints(createdUser.insertId, (err) => {
                        if (err) {
                            console.error('Error inserting user points:', err);
                            return res.status(500).json({ error: err });
                        }
                    });

                    res.json({
                        auth: true,
                        token,
                        user: {
                            id: createdUser.insertId,
                            name: newUser.name,
                            email: newUser.email,
                            level: 1,
                            points: 0
                        }
                    });
                });
            }
        });
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        res.status(500).json({ error: 'Failed to authenticate with Firebase' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    firebaseAuth
};