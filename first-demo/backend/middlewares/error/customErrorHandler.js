const CustomError = require('../../helpers/error/CustomError');
const customErrorHandler = async (error, req, reply) => {
    console.log(error)
    let customError = error;
    if (error.name === 'SyntaxError') {
        customError = new CustomError('Unexpected syntax error!', 400);
    }
    if(error.code==='LIMIT_UNEXPECTED_FILE'){
        customError = new CustomError('Please upload no more than 4 images!', 400);
    }
    if (error.name === "ValidationError") {
        let splitted = error.message.split(":")
        if (splitted && splitted[3]) {
            customError = new CustomError((error.message.split(":")[2] || "").split(",")
                [(error.message.split(":")[2] || "").split(",").length - 2].trim(), 400);
        } else {
            customError = new CustomError((error.message.split(":")[2] || "").split(",")
                [(error.message.split(":")[2] || "").split(",").length - 1].trim(), 400);
        }
    }
    reply.code(customError.status || 500).send({
        success: false,
        message: customError.message
    });
};
module.exports = customErrorHandler;