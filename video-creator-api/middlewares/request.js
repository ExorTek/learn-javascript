const CustomError = require('../helpers/error/CustomError');
const { messages, statusCodes } = require('../constants');

const isParamsValid = (req, res, next) => {
    const objectIdRegex = /^[0-9a-f]{24}$/i;
    if (!req.params.id || !objectIdRegex.test(req.params.id)) {
        return next(new CustomError(messages.ID_NOT_VALID, statusCodes.BAD_REQUEST));
    }
    next();
};

module.exports = {
    isParamsValid,
};
