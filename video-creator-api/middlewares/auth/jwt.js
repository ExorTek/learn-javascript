const asyncHandler = require('../../helpers/handlers/asyncHandler');
const { isTokenIncluded, isJwt, getAccessTokenFromHeader } = require('../../helpers/auth/jwt');
const CustomError = require('../../helpers/error/CustomError');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { statusCodes, messages } = require('../../constants');
const userIp = require('../../helpers/auth/userIp');

const getAccessToRoute = asyncHandler(async (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env;
    const requestIp = userIp(req);

    if (!isTokenIncluded(req)) {
        throw new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
    }

    const token = getAccessTokenFromHeader(req);

    if (!isJwt(token)) {
        throw new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
    }

    const decoded = await jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
        return decoded;
    });
    const { sub: id, ip } = decoded;

    if (requestIp !== ip) {
        throw new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
    }

    const user = await User.findById(id).select('-password');

    if (!user || user.status !== 'active' || user.deleted) {
        throw new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED);
    }

    req.user = {
        id: user._id,
        ...user._doc,
    };

    return next();
});

module.exports = {
    getAccessToRoute,
};
