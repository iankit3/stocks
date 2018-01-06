var settings = require('../settings');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database:'prices',
    password: settings.consts.password
})

module.exports = pool;
