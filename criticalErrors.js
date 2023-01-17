const { SERVICE_NAME } = require("../../../utils/common");

const criticalError = (message, ipAddress, loanApplicationId, errorCategory, metaData) => ({
    message,
    serviceName: SERVICE_NAME,
    timestamp: new Date(),
    ipAddress,
    loanApplicationId,
    errorCategory,
    metaData,
});

module.exports = criticalError;
