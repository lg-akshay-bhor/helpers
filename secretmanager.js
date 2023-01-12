const logger = require("./logger");

function getSecretForAccess(secretName) {
    return new Promise((resolve, reject) => {
        const secretValue = process.env[secretName];
        if (secretValue) {
            return resolve({ SecretString: secretValue });
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ errMsg: `Unable to read env variable:${secretName}` });
    });
}

function getServiceSpecificProperties(secResp) {
    try {
        const serviceSpeficiSecret = JSON.parse(secResp.SecretString);
        const config = {
            MYSQL_HOST: serviceSpeficiSecret.host,
            MYSQL_PORT: serviceSpeficiSecret.port,
            MYSQL_USER: serviceSpeficiSecret.username,
            MYSQL_PWD: serviceSpeficiSecret.password,
            MYSQL_DB: serviceSpeficiSecret.dbname,
            TU_DATAGATEWAY_SFTP_HOST: serviceSpeficiSecret.TU_DATAGATEWAY_SFTP_HOST,
            TU_DATAGATEWAY_SFTP_PORT: serviceSpeficiSecret.TU_DATAGATEWAY_SFTP_PORT,
            TU_DATAGATEWAY_SFTP_USERNAME: serviceSpeficiSecret.TU_DATAGATEWAY_SFTP_USERNAME,
            TU_DATAGATEWAY_SFTP_PASSWORD: serviceSpeficiSecret.TU_DATAGATEWAY_SFTP_PASSWORD,
            TU_DATAGATEWAY_SFTP_PRIVATE_KEY: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_PRIVATE_KEY,
            SMUD_DATAGATEWAY_SFTP_HOST: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_HOST,
            SMUD_DATAGATEWAY_SFTP_PORT: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_PORT,
            SMUD_DATAGATEWAY_SFTP_USERNAME: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_USERNAME,
            SMUD_DATAGATEWAY_SFTP_PASSWORD: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_PASSWORD,
            SMUD_DATAGATEWAY_SFTP_PRIVATE_KEY: serviceSpeficiSecret.SMUD_DATAGATEWAY_SFTP_PRIVATE_KEY,
        };
        return config;
    } catch (err) {
        logger.error(`Error while fetching Mysql secret values err:${err}`);
        return undefined;
    }
}

function getCryptoProperties(secResp) {
    try {
        const cryptoSecret = JSON.parse(secResp.SecretString);
        const config = {
            CRYPTO_ENCRYPTION_KEY: cryptoSecret.CRYPTO_ENCRYPTION_KEY,
            CRYPTO_HASHING_KEY: cryptoSecret.CRYPTO_HASHING_KEY,
            CRYPTO_IV: cryptoSecret.CRYPTO_IV,
        };
        return config;
    } catch (err) {
        logger.error(`Error while fetching Crypto secret values err:${err}`);
        return undefined;
    }
}

// function getAuth0Properties(secResp) {
//     try {
//         const auth0Secret = JSON.parse(secResp.SecretString);
//         const config = {
//             AUTH0_CLIENT_ID: auth0Secret.AUTH0_CLIENT_ID,
//             AUTH0_AUTH_DOMAIN: auth0Secret.AUTH0_AUTH_DOMAIN,
//         };
//         return config;
//     } catch (err) {
//         logger.error(`Error while fetching Auth0 secret values err:${err}`);
//         return undefined;
//     }
// }

// function getS3Properties(secResp) {
//     try {
//         const s3Secret = JSON.parse(secResp.SecretString);
//         const config = {
//             ...s3Secret,
//         };
//         return config;
//     } catch (err) {
//         logger.error(`Error while fetching S3 secret values err:${err}`);
//         return undefined;
//     }
// }

function getMongoProperties(secResp) {
    try {
        const mongoSecret = JSON.parse(secResp.SecretString);
        const config = {
            MONGODB_CONNECTION_URL: mongoSecret.connectionurl,
            MONGODB_DATABASE_NAME: mongoSecret.dbname,
        };
        return config;
    } catch (err) {
        logger.error(`Error while fetching mongo secret values err:${err}`);
        return undefined;
    }
}

function getConfig(config) {
    return new Promise((resolve, reject) => {
        const servicePromise = getSecretForAccess(config.SERVICE_SECRET);
        const cryptoPromise = getSecretForAccess(config.CRYPTO_SECRET);
        const mongoPromise = getSecretForAccess(config.MONGO_SECRET);
        Promise.all([servicePromise, cryptoPromise, mongoPromise])
            .then((results) => {
                const newConfig = {
                    ...config,
                    ...getServiceSpecificProperties(results[0]),
                    ...getCryptoProperties(results[1]),
                    ...getMongoProperties(results[2]),
                };
                resolve(newConfig);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = {
    getConfig,
};
