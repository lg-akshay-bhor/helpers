const winston = require("winston");
const config = require("../../../config");

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({
            timestamp: true,
            colorize: true,
            prettyPrint: true,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf((log) => {
                    // var ns = cls.getNamespace("com.loanglide");
                    // var tid = ns.get("tid");
                    const tid = "";
                    return `:( ${tid} ): ${log.timestamp} ${log.level} --- ${log.message}`;
                    // return `${log.timestamp} ${log.level} --- ${log.message}`;
                })
            ),
        }),
    ],
    levels: {
        critical: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        verbose: 5,
        debug: 6,
        silly: 7,
    },
});

logger.level = config.LOG_LEVEL || "debug";

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

logger.updateLogLevel = () => {
    logger.info(`updating log level - ${config.LOG_LEVEL}`);
    logger.level = config.LOG_LEVEL || "debug";
};
module.exports = logger;
