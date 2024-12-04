const checklistModel = require('../models/checklistModel');

const getChecklistsByCategoryAndLevel = (req, res) => {
    const { categoryId, level } = req.params;
    console.log(`Fetching checklists for category ID: ${categoryId}, level: ${level}`);
    checklistModel.getChecklistsByCategoryAndLevel(categoryId, level, (err, checklists) => {
        if (err) {
            console.error('Error fetching checklists:', err);
            return res.status(500).json({ error: err });
        }
        console.log('Checklists fetched successfully:', checklists);
        res.json(checklists);
    });
};

module.exports = {
    getChecklistsByCategoryAndLevel
};