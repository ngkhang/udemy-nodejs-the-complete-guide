const mysql = require('mysql2');

// Create connect pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'node-complete',
  password: 'Mysql@01213506177',
});

module.exports = pool.promise();