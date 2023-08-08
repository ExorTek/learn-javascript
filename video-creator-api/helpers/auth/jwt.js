const jwt = require('jsonwebtoken');
const CustomError = require('../error/CustomError');
const { messages, statusCodes } = require('../../constants');
const { JWT_SECRET_KEY, JW_EXPIRE_TIME } = process.env;
const sendJwtToClient = ({ id, ip, res, next }) => {
    const payload = {
        sub: id,
        ip,
    };
    const options = {
        expiresIn: JW_EXPIRE_TIME,
        algorithm: 'HS512',
    };
    const jwtCallback = (err, token) => {
        if (err) throw new CustomError(messages.INVALID_TOKEN, statusCodes.UNAUTHORIZED);
        return res.status(200).json({
            success: true,
            token,
        });
    };
    jwt.sign(payload, JWT_SECRET_KEY, options, jwtCallback);
};

const isTokenIncluded = req =>
    req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ');

const getAccessTokenFromHeader = req =>
    req.headers.authorization.split(' ')[1] || req.headers['authorization'].split(' ')[1];

const isJwt = token => /^[\w-]+\.[\w-]+\.[\w-]+$/.test(token);

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader,
    isJwt,
};
