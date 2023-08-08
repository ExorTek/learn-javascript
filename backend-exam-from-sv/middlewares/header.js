const CustomError = require('../helpers/error/CustomError');

const headerSetter = (req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP 7.4.0');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
};

const headerFilter = (req, res, next) => {
    const accessKey = req.headers['x-access-key'] || req.headers['X-Access-Key'];
    if (!accessKey) return next(new CustomError('You are not allowed to access this API', 403));
    if (accessKey !== 'derdi veren hudadir kula minnet eylemem')
        return next(new CustomError('You are not allowed to access this API', 403));
    next();
};

module.exports = {
    headerSetter,
    headerFilter,
};
