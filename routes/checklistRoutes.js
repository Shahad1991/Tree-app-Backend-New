const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

router.get('/checklists/:categoryId/:level', checklistController.getChecklistsByCategoryAndLevel);

module.exports = router;