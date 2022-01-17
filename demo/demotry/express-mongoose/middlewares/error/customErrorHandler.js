const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = async (err, req, res,next) => {
    let customError = err;
    if (err.name === 'SyntaxError') {
        customError = new CustomError('Unexpected syntax error!', 400);
    }
    if (err.name === 'ValidationError') {
        customError = new CustomError(err.message, 400);
    }
    if (err.code === 11000) {
        customError = new CustomError('Duplicate Key Found!: Check your email address', 400);
    }
    if (err.name === 'CastError') {
        customError = new CustomError('Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters', 400);
    }
    if (err.name === 'TypeError') {
        customError = new CustomError('Type Error: Type dont match! Check the value(s) you sent.', 400);
    }
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    });
};
module.exports = customErrorHandler;