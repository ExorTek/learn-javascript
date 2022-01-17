const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = async (error, req, reply, done) => {
    let customError = error;
    if (error.name === 'SyntaxError') {
        customError = new CustomError('Unexpected syntax error!', 400);
    }
    if (error.name === 'ValidationError') {
        customError = new CustomError(error.message, 400);
    }
    if (error.code === 11000) {
        customError = new CustomError('Duplicate Key Found!: Check your email address', 400);
    }
    if (error.name === 'CastError') {
        customError = new CustomError('Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters', 400);
    }
    if (error.name === 'TypeError') {
        customError = new CustomError('Type Error: Type dont match! Check the value(s) you sent.', 400);
    }
    reply.code(customError.status || 500).send({
        success: false,
        message: customError.message
    });
};
module.exports = customErrorHandler;