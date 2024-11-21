const db = require('../config/db');

const getChecklistsByCategory = (category, callback) => {
    const sql = 'SELECT * FROM checklists WHERE category = ?';
    db.query(sql, [category], callback);
};

module.exports = {
    getChecklistsByCategory
};