const expressRateLimit = require('express-rate-limit');
const {statusCodes, messages} = require('../../constants');
const {msToStringTime} = require('../../helpers/time');
const {LIMITER_MAX_REQUESTS, LIMITER_BAN_MINUTE} = process.env;

const rateLimiter = expressRateLimit({
    windowMs: Number(LIMITER_BAN_MINUTE) * 60 * 1000,
    max: LIMITER_MAX_REQUESTS,
    handler: (req, res, next) => {
        res.status(statusCodes.TOO_MANY_REQUESTS).json({
            success: false,
            statusCodes: statusCodes.TOO_MANY_REQUESTS,
            message: messages.TOO_MANY_REQUESTS,
            remainingTime: msToStringTime(req.rateLimit.resetTime - Date.now()),
        });
    },
});

module.exports = rateLimiter;
