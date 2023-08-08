const {nanoid} = require('nanoid');
const reqId = (req, res, next) => {
    req.reqId = nanoid(22);
    next();
};

module.exports = reqId;
