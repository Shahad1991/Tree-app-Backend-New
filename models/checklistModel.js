const db = require('../config/db');

const getChecklistsByCategoryAndLevel = (categoryId, level, callback) => {
    const sql = `
        SELECT * FROM checklists WHERE category_id = ? AND level = ?
    `;
    db.query(sql, [categoryId, level], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    getChecklistsByCategoryAndLevel
};