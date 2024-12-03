const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/users-with-points', verifyToken, authController.getUsersWithPoints);
router.get('/user', verifyToken, authController.getUserData);
router.put('/user/points', verifyToken, authController.updateUserPointsAndLevel);

module.exports = router;