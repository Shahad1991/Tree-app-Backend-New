const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'tree_app_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;