const CustomError = require('../../helpers/error/CustomError');
const {messages, statusCodes} = require('../../constants');
const errorLogger = require('../../helpers/logger/errorLogger');
const customErrorHandler = (err, req, res, next) => {
    let customError = err;
    if (process.env.NODE_ENV === 'development') console.log(err);
    if (process.env.NODE_ENV === 'production') errorLogger(err);
    if (err.name === 'SyntaxError') customError = new CustomError(messages.SYNTAX_ERROR, statusCodes.BAD_REQUEST);
    if (err.name === 'TypeError') customError = new CustomError(messages.TYPE_ERROR, statusCodes.BAD_REQUEST);
    if (err.name === 'CastError') customError = new CustomError(messages.CAST_ERROR, statusCodes.BAD_REQUEST);
    if (err.code === 11000) {
        if (err.keyValue) {
            let key = Object.keys(err.keyValue)[0];
            if (key) {
                key = key.charAt(0).toUpperCase() + key.slice(1);
                customError = new CustomError(`${key} already exists!`, 400);
            } else customError = new CustomError('Duplicate key error! Please Enter unique key.', 400);
        } else {
            let splittedMessage = err.message.split(':')[3]?.split(' ')[2];
            if (splittedMessage) {
                splittedMessage = splittedMessage.charAt(0).toUpperCase() + splittedMessage.slice(1);
                customError = new CustomError(`${splittedMessage} already exist!`, 400);
            } else customError = new CustomError('Duplicate key error! Please Enter unique key.', 400);
        }
    }
    if (err.errors) {
        if (err.message.includes('Cast to [ObjectId]')) {
            const first = err.message.split('ObjectId')[1];
            const original = first.split('value')[1].split('"')[1];
            customError = new CustomError(`Invalid argument: ${original}`, statusCodes.BAD_REQUEST);
        } else {
            let errorKey = Object.keys(err.errors)[0];
            let message = '';
            if (err.errors[errorKey].message.includes('BSONError')) {
                const first = err.errors[errorKey].message.split('ObjectId')[1];
                const original = first.split('value')[1].split('"')[1];
                message += `Invalid argument: ${original}`;
            } else message += err.errors[errorKey].message;
            customError = new CustomError(message, statusCodes.BAD_REQUEST);
        }
    }

    res.status(customError.status || statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: customError.status || statusCodes.INTERNAL_SERVER_ERROR,
        message: customError.message,
        path: req.originalUrl,
        method: req.method,
        timeStamp: new Date().toISOString(),
    });
};

module.exports = customErrorHandler;
