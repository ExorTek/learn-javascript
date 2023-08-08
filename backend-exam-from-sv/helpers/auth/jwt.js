const jwt = require('jsonwebtoken');
const CustomError = require('../error/CustomError');
const {JWT_SECRET_KEY} = process.env;
const sendJwtToClient = (id, ip, longSession, res, next) => {
    const payload = {
        sub: id,
        ip,
    };
    const options = {
        expiresIn: longSession ? '30d' : '1s',
        algorithm: 'HS256',
    };
    const jwtCallback = (err, token) => {
        if (err) return next(new CustomError('Token Error', 500));
        return res.setHeader('X-Access-Key', 'derdi veren hudadir kula minnet eylemem').status(200).json({
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

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader,
};
