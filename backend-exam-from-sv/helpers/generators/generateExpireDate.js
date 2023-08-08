const generateExpireDate = (minute = 3) => Date.now() + minute * 60 * 1000;

module.exports = generateExpireDate;
