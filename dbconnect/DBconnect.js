const mysql = require('mysql2/promise');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'BN6',
    password: '123123'
})

module.exports = {connection};