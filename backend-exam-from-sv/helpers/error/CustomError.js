/**
 * Custom Error Class
 * @param {String} message
 * @param {Number} statusCode
 * @constructor CustomError extends Error Class from Node.js API Reference https://nodejs.org/api/errors.html#errors_class_error
 * @return {CustomError}
 * @example throw new CustomError('Custom Error Message', 400);
 */
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;
