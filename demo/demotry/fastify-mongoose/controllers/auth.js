const {validateUserInputLogin, validateUserInputRegister, comparePassword} = require('../helpers/input/inputHelper');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");

const register = async (req, reply) => {
    const {username, name, email, password} = req.body;
    if (!validateUserInputRegister(username, name, email, password)) {
        return new CustomError('Please don\'t empty the input!', 400);
    }
    const user = await User.create({
        username,
        name,
        email,
        password
    });
    sendJwtToClient(user, reply);
};
const login = async (req, reply) => {
    const {username, password} = req.body;
    if (!validateUserInputLogin(username, password)) {
        return new CustomError('Please don\'t empty the input!', 400);
    }
    const user = await User.findOne({$or: [{username: username}, {email: username}]}).select('+password');
    if (user === null) {
        return new CustomError('Username/Email or Password is incorrect!', 400)
    }
    if (!comparePassword(password, user.password)) {
        return new CustomError('Please check the password!', 400);
    }
    sendJwtToClient(user, reply);
};
const update = async (req, reply) => {
    const {email, password} = req.body;
    let user = await User.findOne({email: email});
    user.password = password;
    await user.save();
    reply.code(200).send({
        success: true,
        data: {
            username: user.username,
            name: user.name
        }
    })

}
module.exports = {
    register,
    login,
    update
}