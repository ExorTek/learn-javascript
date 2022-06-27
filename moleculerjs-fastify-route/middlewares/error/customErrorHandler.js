const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = async (error, req, reply) => {
    let customError = error;
    if (error.name === 'SyntaxError') {
        customError = new CustomError('Unexpected syntax error!', 400);
    }
    reply.code(customError.status || 500).send({
        success: false,
        message: customError.message
    });
};
module.exports = customErrorHandler;