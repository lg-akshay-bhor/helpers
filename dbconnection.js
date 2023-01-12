const mysql = require("mysql");
const config = require("../config");
var logger = require("./logger");

const pool = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PWD,
    database: config.MYSQL_DB,
    debug: false,
    connectionLimit: 10,
    ssl: config.ssl,
});


pool.on('acquire', function (connection) {
	logger.debug('Connection ' + connection.threadId + ' acquired');
});

pool.on('connection', function (connection) {
	logger.debug('Connection ' + connection.threadId + ' acquired from pool');
});

pool.on('enqueue', function () {
	logger.debug('Waiting for available connection slot');
});

pool.on('release', function (connection) {
	logger.debug('Connection ' + connection.threadId + ' released');
});

module.exports = pool;
