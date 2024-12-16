const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/users', userController.getUsersWithPoints);
router.get('/user', authController.verifyToken, userController.getUserData);
router.put('/user/points', authController.verifyToken, userController.updateUserPointsAndLevel);

// New route to fetch user data by username
router.get('/user/:username', authController.verifyToken, userController.getUserByUsername);

module.exports = router;