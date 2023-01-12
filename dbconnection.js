const mysql = require("mysql");
const config = require("../config");

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

module.exports = pool;
