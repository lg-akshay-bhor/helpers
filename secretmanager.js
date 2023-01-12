// NOTE: DO NOT USE console in this file, because this is supposed to run before exporting the config
function getConfig(config) {
    console.debug(`config: ${JSON.stringify(config)}`);
    let newConfig = { ...config };
    if (config.SERVICE_SECRET) {
        newConfig = { ...newConfig, ...getServiceProperties(config.SERVICE_SECRET) };
    }
    if (config.MYSQL_SECRET) {
        newConfig = { ...newConfig, ...getMySqlProperties(config.MYSQL_SECRET) };
    }
    if (config.CRYPTO_SECRET) {
        newConfig = { ...newConfig, ...getCryptoProperties(config.CRYPTO_SECRET) };
    }
    if (config.AUTH0_SECRET) {
        newConfig = { ...newConfig, ...getAuth0Properties(config.AUTH0_SECRET) };
    }
    if (config.S3_SECRET) {
        newConfig = { ...newConfig, ...getS3Properties(config.S3_SECRET) };
    }
    if (config.SCRATCH_SECRET) {
        newConfig = { ...newConfig, ...getScratchProperties(config.SCRATCH_SECRET) };
    }
    if (config.MONGO_SECRET) {
        newConfig = { ...newConfig, ...getMongoProperties(config.MONGO_SECRET) };
    }
    if (config.DIFI_LENDERS_SECRET) {
        newConfig = { ...newConfig, ...getDifiLendersProperties(config.DIFI_LENDERS_SECRET) };
    }
    if (config.TRANSUNION_SECRET) {
        newConfig = { ...newConfig, ...getTransunionProperties(config.TRANSUNION_SECRET) };
    }
    if (config.PINPOINT_SECRET) {
        newConfig = { ...newConfig, ...getPinpointProperties(config.PINPOINT_SECRET) };
    }
    console.debug(`newConfig: ${JSON.stringify(newConfig)}`);
    return newConfig;
}

function getServiceProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let secretObject = JSON.parse(secretString);
            let config = {
                ...secretObject,
                MYSQL_HOST: secretObject.host,
                MYSQL_PORT: secretObject.port,
                MYSQL_USER: secretObject.username,
                MYSQL_PWD: secretObject.password,
                MYSQL_DB: secretObject.dbname,
            };
            console.debug("getServiceProperties::" + JSON.stringify(config));
            return config;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getMySqlProperties(secResp) {
    try {
        let mySqlSecret = JSON.parse(secResp.SecretString);
        let config = {
            MYSQL_HOST: mySqlSecret.host,
            MYSQL_PORT: mySqlSecret.port,
            MYSQL_USER: mySqlSecret.username,
            MYSQL_PWD: mySqlSecret.password,
            MYSQL_DB: mySqlSecret.dbname,
        };
        return config;
    } catch (err) {
        logger.error("Error while fetching Mysql secret values err:" + err);
    }
}

function getCryptoProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let cryptoSecret = JSON.parse(secretString);
            let config = {
                CRYPTO_ENCRYPTION_KEY: cryptoSecret.CRYPTO_ENCRYPTION_KEY,
                CRYPTO_HASHING_KEY: cryptoSecret.CRYPTO_HASHING_KEY,
                CRYPTO_IV: cryptoSecret.CRYPTO_IV,
            };
            return config;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getAuth0Properties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let auth0Secret = JSON.parse(secretString);
            let config = {
                AUTH0_CLIENT_ID: auth0Secret.AUTH0_CLIENT_ID,
                AUTH0_AUTH_DOMAIN: auth0Secret.AUTH0_AUTH_DOMAIN,
            };
            return config;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getPinpointProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let pinpointSecret = JSON.parse(secretString);
            return pinpointSecret;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getS3Properties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let s3Secret = JSON.parse(secretString);
            return s3Secret;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getScratchProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let scratchSecret = JSON.parse(secretString);
            return scratchSecret;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getMongoProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let mongoSecret = JSON.parse(secretString);
            let config = {
                MONGODB_CONNECTION_URL: mongoSecret.connectionurl,
                MONGODB_DATABASE_NAME: mongoSecret.dbname,
            };
            return config;
        } catch (err) {
            console.error(`Error while fetching ${secretName} secret values err: ${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getDifiLendersProperties(secretName) {
    let secretString = process.env[secretName];
    if (secretString) {
        try {
            let difiLendersSecret = JSON.parse(secretString);
            return difiLendersSecret;
        } catch (err) {
            console.error(`Error while fetching ${secretName} Lenders secret values err:${err.message}`);
            return {};
        }
    } else {
        console.error(`Error while reading ${secretName} from env`);
        return {};
    }
}

function getTransunionProperties(secResp) {
    logger.error("fetching transunion secret");
    try {
        let transunionSecret = JSON.parse(secResp.SecretString);
        logger.error("Fetched transunion secret", JSON.stringify(transunionSecret));
        let config = {
            ...transunionSecret,
        };
        return config;
    } catch (err) {
        logger.error("Error while fetching transunion secret values err:" + err);
    }
}

module.exports = {
    getConfig,
};
