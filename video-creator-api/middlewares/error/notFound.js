const { statusCodes, messages } = require('../../constants');
const notFound = (req, res) =>
    res.status(404).json({
        success: false,
        status: statusCodes.NOT_FOUND,
        message: messages.NOT_FOUND,
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
    });

module.exports = notFound;
