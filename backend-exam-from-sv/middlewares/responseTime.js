/**
 * @param {function} callback - callback function
 * @param callback
 * @return {(function(*, *, *): void)|*}
 * @description - This middleware is used to calculate the response time of the request
 */
const responseTime = callback => (req, res, next) => {
    const start = process.hrtime();
    const end = () => {
        const diff = process.hrtime(start);
        const time = diff[0] * 1e3 + diff[1] * 1e-6;
        callback(req, res, time);
    };
    res.once('finish', end);
    res.once('close', end);
    next();
};

module.exports = responseTime;
