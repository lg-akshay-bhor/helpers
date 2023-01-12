const pool = require("./dbconnection");
const logger = require("./logger");

// eslint-disable-next-line arrow-body-style
exports.executeQuery = (query, options) => {
    return new Promise((resolve, reject) => {
        const actualQuery = pool.query(query, options, (error, response) => {
            logger.debug(`ExecuteQuery:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};

// eslint-disable-next-line arrow-body-style
exports.executeQueryWithConnection = (connection, query, options) => {
    return new Promise((resolve, reject) => {
        const actualQuery = connection.query(query, options, (error, response) => {
            logger.debug(`ExecuteQueryWithConnection:: ${actualQuery.sql}`);
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
        });
    });
};
