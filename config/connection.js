const mysql = require('mysql2');
require('dotenv').config();

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected.');
});

module.exports = connection;