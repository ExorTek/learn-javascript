const CustomError = require('../../helpers/error/CustomError');
const { messages, statusCodes } = require('../../constants');

const getAdminAccessToRoute = (req, res, next) => {
    const user = req.user;
    if (user.role !== 'admin') return next(new CustomError(messages.UNAUTHORIZED, statusCodes.UNAUTHORIZED));
    return next();
};

module.exports = {
    getAdminAccessToRoute,
};
