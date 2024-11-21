const checklistModel = require('../models/checklistModel');

const getChecklistsByCategory = (req, res) => {
    const { category } = req.params;
    checklistModel.getChecklistsByCategory(category, (err, checklists) => {
        if (err) return res.status(500).json({ error: err });
        res.json(checklists);
    });
};

module.exports = {
    getChecklistsByCategory
};