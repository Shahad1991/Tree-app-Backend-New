const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../controllers/authController');

router.post('/saveUserData', verifyToken, userController.saveUserData);

module.exports = router;