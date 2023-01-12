const pool = require("./dbconnection");
const logger = require("./logger");

exports.executeQuery = async function (query, options) {
    return new Promise((resolve, reject) => {
        let actualQuery = pool.query(query, options, (error, response) => {
            logger.debug("ExecuteQuery:: " + actualQuery.sql);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.executeQueryWithConnection = async function (connection, query, options) {
    return new Promise((resolve, reject) => {
        let actualQuery = connection.query(query, options, (error, response) => {
            logger.debug("ExecuteQueryWithConnection:: " + actualQuery.sql);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

exports.beginTransaction = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

exports.getConnection = async () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) reject(err);
            else {
                resolve(connection);
            }
        });
    });
};

exports.commitConnection = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};
