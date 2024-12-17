const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/verify-token', authController.verifyToken, (req, res) => {
    res.json({ auth: true, message: 'Token is valid' });
});

module.exports = router;