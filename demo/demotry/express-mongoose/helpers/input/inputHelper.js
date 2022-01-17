const bcrypt = require("bcryptjs");
const validateUserInputLogin = (username, password) => {
    return username && password;
};
const validateUserInputRegister = (username, name, email, password) => {
    return username && name && email && password;
};
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};
module.exports = {
    validateUserInputLogin,
    validateUserInputRegister,
    comparePassword
}