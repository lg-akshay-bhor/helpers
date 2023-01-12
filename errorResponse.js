const errorResponse = (data, message) => ({
    error : true,
    data,
    message,
});

module.exports = errorResponse;
