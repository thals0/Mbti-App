const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'dlthals17',
  port: '3306',
  database: 'mydb',
});

connection.connect();

module.exports = connection;
