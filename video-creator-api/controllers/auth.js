const asyncHandler = require('../helpers/handlers/asyncHandler');
const User = require('../models/User');
const CustomError = require('../helpers/error/CustomError');
const argon2 = require('argon2');
const { sendJwtToClient } = require('../helpers/auth/jwt');
const userIp = require('../helpers/auth/userIp');
const { statusCodes, messages } = require('../constants');

const login = asyncHandler(async (req, res, next) => {
    const { uniqueIdentifier, password } = req.body;
    const ip = userIp(req);

    const user = await User.findOne({
        $or: [
            {
                username: uniqueIdentifier,
            },
            {
                email: uniqueIdentifier,
            },
        ],
    });

    if (!user) throw new CustomError('User not found', 404);

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new CustomError(messages.PASSWORD_NOT_MATCH, statusCodes.BAD_REQUEST);

    return sendJwtToClient({
        id: user._id,
        ip,
        res,
        next,
    });
});

const register = asyncHandler(async (req, res, next) => {
    const { name, surname, username, email, password, role } = req.body;
    const requestUser = req.user;

    const isUserExists = await User.findOne({
        $or: [
            {
                username,
            },
            {
                email,
            },
        ],
    });

    if (isUserExists) throw new CustomError(messages.USER_ALREADY_EXISTS, statusCodes.BAD_REQUEST);

    const hashedPassword = await argon2.hash(password);

    await User.create({
        name,
        surname,
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
        createdBy: requestUser.id,
    });

    return res.status(statusCodes.CREATED).json({
        success: true,
        message: messages.USER_CREATED,
    });
});

const updatePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword, newPasswordAgain } = req.body;
    const requestUser = req.user;

    if (newPassword !== newPasswordAgain) throw new CustomError(messages.PASSWORD_NOT_MATCH, statusCodes.BAD_REQUEST);

    const user = await User.findById(requestUser.id);

    const isPasswordValid = await argon2.verify(user.password, oldPassword);

    if (!isPasswordValid) throw new CustomError(messages.PASSWORD_NOT_MATCH, statusCodes.BAD_REQUEST);

    user.password = await argon2.hash(newPassword);

    await user.save();

    return res.status(statusCodes.NO_CONTENT).json({
        success: true,
        message: messages.NO_CONTENT,
    });
});

const updateProfile = asyncHandler(async (req, res, next) => {
    const allowedFields = ['name', 'surname', 'username', 'email'];
    const fields = Object.keys(req.body);
    const isAllowed = fields.every(field => allowedFields.includes(field));
    if (!isAllowed) throw new CustomError(messages.INVALID_FIELDS, statusCodes.BAD_REQUEST);

    await User.updateOne(
        {
            _id: req.user.id,
        },
        {
            ...req.body,
        }
    );

    return res.status(statusCodes.OK).json({
        success: true,
    });
});

const changeAccountStatus = asyncHandler(async (req, res, next) => {
    const defaultStatus = ['active', 'inactive', 'deleted', 'banned'];
    const { status, userId } = req.body;
    const requestUser = req.user;

    if (!defaultStatus.includes(status)) throw new CustomError(messages.INVALID_STATUS, statusCodes.BAD_REQUEST);

    await User.updateOne(
        {
            _id: userId,
        },
        {
            status,
            updatedBy: requestUser.id,
        }
    );

    return res.status(statusCodes.NO_CONTENT).json({
        success: true,
        message: messages.NO_CONTENT,
    });
});

const getMe = asyncHandler(async (req, res, next) => {
    return res.status(statusCodes.OK).json({
        success: true,
        data: req.user,
    });
});

module.exports = {
    login,
    register,
    updatePassword,
    updateProfile,
    changeAccountStatus,
    getMe,
};
