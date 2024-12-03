const db = require('../config/db');

const getChecklistsByCategoryAndLevel = (category, level, callback) => {
    const sql = 'SELECT * FROM checklists WHERE category = ? AND level = ?';
    db.query(sql, [category, level], callback);
};

module.exports = {
    getChecklistsByCategoryAndLevel
};