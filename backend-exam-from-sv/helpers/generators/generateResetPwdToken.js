const crypto = require('crypto');
const generateExpireDate = require('./generateExpireDate');
const generateResetPwdToken = () => {
    const randomHex = crypto.randomBytes(15).toString('hex');
    const resetPasswordToken = crypto.createHash('SHA256').update(randomHex).digest('hex');
    const expireDate = generateExpireDate(3);
    return {resetPasswordToken, expireDate};
};

module.exports = generateResetPwdToken;
