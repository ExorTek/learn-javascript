const {isTokenIncluded, getAccessTokenFromHeader} = require('../../helpers/auth/jwt');
const CustomError = require('../../helpers/error/CustomError');
const {statusCodes, messages} = require('../../constants');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const asyncHandler = require('../../helpers/handler/asyncHandler');
const {JWT_SECRET_KEY} = process.env;

const getAccessToRoute = asyncHandler(async (req, res, next) => {
    if (isTokenIncluded(req)) {
        const token = getAccessTokenFromHeader(req);
        if (!token) return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
        return jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
            if (err) return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
            const reqIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const {sub, ip} = decoded;
            if (!sub || !ip) return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
            if (ip !== reqIp) return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
            const user = await User.findById(sub).select('-password');
            if (!user) return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
            if (user.status !== 'active') return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
            req.user = {
                id: user._id,
                ...user._doc,
            };
            next();
        });
    }
    return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
});

const nonAuthJwtDecode = (req, res, next) => {
    if (!isTokenIncluded(req)) return next();
    const token = getAccessTokenFromHeader(req);
    if (!token) return next();
    return jwt.verify(token, JWT_SECRET_KEY, async (err, decoded) => {
        if (err) return next();
        req.user = {
            id: decoded.sub,
        };
        next();
    });
};

module.exports = {
    getAccessToRoute,
    nonAuthJwtDecode,
};
