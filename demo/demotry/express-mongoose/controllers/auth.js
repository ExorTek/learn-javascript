const errorHandler = require('express-async-handler');
const CustomError = require("../helpers/error/CustomError");
const User = require('../models/User');
const {validateUserInputLogin, validateUserInputRegister, comparePassword} = require('../helpers/input/inputHelper');
const {sendJwtToClient} = require("../helpers/authorization/tokenHelper");
const register = errorHandler(async (req, res, next) => {
    const {username, name, email, password} = req.body;
    if (!validateUserInputRegister(username, name, email, password)) {
        return next(new CustomError('Please don\'t empty the input!', 400));
    }
    const user = await User.create({
        username,
        name,
        email,
        password
    });
    sendJwtToClient(user, res);
});
const login = errorHandler(async (req, res, next) => {
    const {username, password} = req.body;
    if (!validateUserInputLogin(username, password)) {
        return next(new CustomError('Please don\'t empty the input!', 400));
    }
    const user = await User.findOne({$or: [{username: username}, {email: username}]}).select('+password');
    if (user === null) {
        return next(new CustomError('Username/Email or Password is incorrect!', 400));
    }
    if (!comparePassword(password, user.password)) {
        return next(new CustomError('Please check the password!', 400));
    }
    sendJwtToClient(user, res);
});

module.exports = {
    register,
    login
};