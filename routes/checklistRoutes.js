const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

router.get('/checklists/:category/:level', checklistController.getChecklistsByCategoryAndLevel);

module.exports = router;