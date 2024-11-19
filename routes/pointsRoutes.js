const express = require('express');
const router = express.Router();
const pointsController = require('../controllers/pointsController');

router.post('/savePoints', pointsController.savePoints);

module.exports = router;