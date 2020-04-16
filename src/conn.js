const mysql = require('mysql')
const key = require('./keys');
const conn = mysql.createConnection(key);

module.exports = conn;

