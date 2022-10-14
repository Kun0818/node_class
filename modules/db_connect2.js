const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'proj57',
  waitForConnections: true,
  connectionLimit: 5,
  queryFormat: 0,
})

module.exports = pool.promise();