const generateOtpCode = (length = 6) => {
    let otp = '';
    while (length--) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};

module.exports = generateOtpCode;
