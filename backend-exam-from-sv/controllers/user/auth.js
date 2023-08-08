const {statusCodes, messages} = require('../../constants');
const asyncHandler = require('../../helpers/handler/asyncHandler');
const {registerInputCheck, loginInputCheck, checkVerifyInput} = require('../../helpers/input');
const CustomError = require('../../helpers/error/CustomError');
const {hashPassword, verifyPassword} = require('../../helpers/auth/hashPassword');
const User = require('../../models/User');
const ProfilePhoto = require('../../models/ProfilePhoto');
const {sendJwtToClient} = require('../../helpers/auth/jwt');
const generateResetPwdToken = require('../../helpers/generators/generateResetPwdToken');
const mailTransport = require('../../helpers/mailer');
const generateOtpCode = require('../../helpers/generators/generateOtpCode');
const generateExpireDate = require('../../helpers/generators/generateExpireDate');
const getThumbnail = require('../../helpers/image/thumbnail/getThumbnail');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const s3 = require('../../helpers/aws/s3');
const {SMTP_FROM, AWS_BUCKET_NAME, AWS_S3_REGION} = process.env;
const {nanoid} = require('nanoid');
const {createStatistic} = require('../../services/User');

/**
 * @api {post} /api/v1/auth/register
 * @type {function(*, *, *): Promise<*>}
 * @description Register a new user
 * @access Public
 * @postman created
 */
const register = asyncHandler(async (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {name, surname, email, password, longSession} = req.body;

    if (
        !registerInputCheck({
            name,
            surname,
            email,
            password,
        })
    )
        return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const emailExist = await User.findOne({email});
    if (emailExist) return next(new CustomError(messages.EMAIL_ALREADY_EXISTS, statusCodes.BAD_REQUEST));

    const hashedPassword = await hashPassword(password);

    const user = await User.create({name, surname, email, password: hashedPassword});

    await createStatistic(user._id);

    return sendJwtToClient(user._id, ip, longSession, res, next);
});

/**
 * @api {post} /api/v1/auth/login
 * @type {function(*, *, *): Promise<*>}
 * @description Login a user
 * @access Public
 * @postman created
 */
const login = asyncHandler(async (req, res, next) => {
    const {credential, password, longSession} = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if (
        !loginInputCheck({
            credential,
            password,
        })
    )
        return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const user = await User.findOne({$or: [{email: credential}, {phone: credential}]});

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) return next(new CustomError(messages.INVALID_CREDENTIALS, statusCodes.BAD_REQUEST));

    return sendJwtToClient(user._id, ip, longSession, res, next);
});

/**
 * @api {post} /api/v1/auth/forgotPassword
 * @type {function(*, *, *): Promise<*>}
 * @description Send a reset password token to user's email
 * @access Public
 * @postman craeted
 */
const forgotPassword = asyncHandler(async (req, res, next) => {
    const {credential} = req.body;
    if (!credential) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));

    const user = await User.findOne({$or: [{email: credential}, {phone: credential}]});
    if (!user) return next(new CustomError(messages.USER_NOT_FOUND, statusCodes.NOT_FOUND));

    const {resetPasswordToken, expireDate} = generateResetPwdToken();

    user.resetPassword = {
        token: resetPasswordToken,
        expires: expireDate,
    };
    await user.save();

    await mailTransport.sendMail({
        from: SMTP_FROM,
        to: user.email,
        subject: 'Password Reset (test)',
        html: `
            <h3>Password Reset</h3>
            <a target="_blank" href="http://localhost:3000/reset-password?token=${resetPasswordToken}">Reset My Password</a>
        `,
    });

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.IF_YOU_HAVE_AN_ACCOUNT,
    });
});

/**
 * @api {post} /api/v1/auth/resetPassword
 * @type {function(*, *, *): Promise<*>}
 * @description Reset user's password
 * @access Public
 * @postman created
 */
const resetPassword = asyncHandler(async (req, res, next) => {
    const {password, passwordAgain, resetPasswordToken} = req.body;

    if (!resetPasswordToken || !password || !passwordAgain)
        return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
    if (password !== passwordAgain)
        return next(new CustomError(messages.PASSWORDS_DO_NOT_MATCH, statusCodes.BAD_REQUEST));

    const user = await User.findOne({}).where('resetPassword.token').equals(resetPasswordToken);
    if (!user) return next(new CustomError(messages.TOKEN_DONT_MATCH, statusCodes.NOT_FOUND));

    if (user.resetPassword.expires < Date.now())
        return next(new CustomError(messages.TOKEN_EXPIRED, statusCodes.BAD_REQUEST));

    user.password = await hashPassword(password);

    user.resetPassword = {
        token: null,
        expires: null,
    };
    await user.save();

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.PASSWORD_CHANGED,
    });
});

/**
 * @api {post} /api/v1/auth/changePassword
 * @type {function(*, *, *): Promise<*>}
 * @description Change user's password
 * @access Private
 * @postman created
 */
const changePassword = asyncHandler(async (req, res, next) => {
    const user = req.user;

    const {oldPassword, oldPasswordAgain, newPassword} = req.body;
    if (!oldPassword || !oldPasswordAgain || !newPassword)
        return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
    if (oldPassword !== oldPasswordAgain)
        return next(new CustomError(messages.PASSWORDS_DO_NOT_MATCH, statusCodes.BAD_REQUEST));

    const isPasswordCorrect = await verifyPassword(oldPassword, user.password);
    if (!isPasswordCorrect) return next(new CustomError(messages.INVALID_CREDENTIALS, statusCodes.BAD_REQUEST));

    user.password = await hashPassword(newPassword);
    await user.save();

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.PASSWORD_CHANGED,
    });
});

/**
 * @api {get} /api/v1/auth/me
 * @type {function(*, *, *): Promise<*>}
 * @description Get logged in user
 * @access Private
 * @postman created
 */
const getMe = asyncHandler(async (req, res) =>
    res.status(statusCodes.OK).json({
        success: true,
        data: req.user,
    })
);

/**
 * @api {post} /api/v1/auth/sendOtpCode
 * @type {function(*, *, *): Promise<*>}
 * @description Send an otp code to user's email or phone
 * @access Private
 * @postman created
 */
const sendOtpCode = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const {credential, type} = req.body;
    const {error, messageType} = checkVerifyInput({
        credential,
        type,
        user,
    });
    if (error) return next(new CustomError(messages[messageType], statusCodes.BAD_REQUEST));

    const otpCode = generateOtpCode();
    const expireDate = generateExpireDate(3);
    if (type === 'email') {
        await mailTransport.sendMail({
            from: SMTP_FROM,
            to: user.email,
            subject: `OTP Code (test) - ${otpCode}`,
            html: `
            <h3>OTP Code</h3>
            <p>${otpCode}</p>
        `,
        });
    }
    if (type === 'phone') {
        const [isThereSuchPhone] = await User.find({phone: credential}, {_id: 1});
        if (isThereSuchPhone) return next(new CustomError(messages.PHONE_ALREADY_EXISTS, statusCodes.BAD_REQUEST));
        // TODO: Send sms
    }
    user.verification = {
        otp: otpCode,
        expires: expireDate,
        type: type,
    };
    await User.findByIdAndUpdate(
        user.id,
        {
            verification: user.verification,
        },
        {new: true}
    );

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.OTP_CODE_SENT,
        expireDate,
        code: otpCode,
    });
});

/**
 * @api {post} /api/v1/auth/verifyOtpCode
 * @type {function(*, *, *): Promise<*>}
 * @description Verify user's otp code
 * @access Private
 * @postman created
 */
const verifyOtpCode = asyncHandler(async (req, res, next) => {
    const user = req.user;
    const {otpCode, type} = req.body;
    const {error, messageType} = checkVerifyInput({
        credential: otpCode,
        type,
        user,
    });
    if (error) return next(new CustomError(messages[messageType], statusCodes.BAD_REQUEST));

    if (user.verification.otp !== otpCode)
        return next(new CustomError(messages.INVALID_OTP_CODE, statusCodes.BAD_REQUEST));
    if (user.verification.expires < Date.now())
        return next(new CustomError(messages.OTP_CODE_EXPIRED, statusCodes.BAD_REQUEST));

    user.verification = {
        otp: null,
        expires: null,
        type: null,
    };
    user.verified = {
        email: type === 'email' ? true : user.verified.email,
        phone: type === 'phone' ? true : user.verified.phone,
    };

    await User.findByIdAndUpdate(
        user.id,
        {
            verification: user.verification,
            verified: user.verified,
        },
        {new: true}
    );

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.OTP_CODE_VERIFIED,
    });
});

/**
 * @api {post} /api/v1/auth/uploadProfilePhoto
 * @type {function(*, *, *): Promise<*>}
 * @description Upload profile photo
 * @access Private
 * @postman created
 */
const uploadProfilePhoto = asyncHandler(async (req, res, next) => {
    const originalFile = req.file;
    if (!originalFile) return next(new CustomError(messages.MISSING_FIELDS, statusCodes.BAD_REQUEST));
    const user = req.user;
    const fileID = nanoid(22);
    const fileExtension = originalFile.mimetype.split('/')[1];
    const fileName = `${fileID}.${fileExtension}`;
    const thumb = await getThumbnail(originalFile);
    const imageKey = `profile/thumb/${fileName}`;

    const thumbParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: imageKey,
        Body: thumb.buffer,
        ContentType: originalFile.mimetype,
    };
    const command = new PutObjectCommand(thumbParams);
    await s3.send(command);

    const profilePhoto = new ProfilePhoto({
        user: user.id,
        key: imageKey,
        url: `https://${AWS_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${imageKey}`, // TODO: Cloudfront url
        type: originalFile.mimetype,
        size: originalFile.size,
    });
    const profile = await profilePhoto.save();

    await User.findByIdAndUpdate(user.id, {
        avatar: profile._id,
    });

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.PROFILE_PHOTO_UPDATED,
    });
});

/**
 * @api {delete} /api/v1/auth/deleteProfilePhoto
 * @type {function(*, *, *): Promise<*>}
 * @description Delete profile photo
 * @access Private
 * @postman created
 */
const deleteProfilePhoto = asyncHandler(async (req, res, next) => {
    const {avatar, id} = req.user;
    if (!avatar) return next(new CustomError(messages.NO_PROFILE_PHOTO, statusCodes.BAD_REQUEST));

    const profilePhoto = await ProfilePhoto.findOne({user: id});
    profilePhoto.deleted = true;
    profilePhoto.deletedAt = Date.now();
    await profilePhoto.save();

    const user = await User.findById(id);
    user.avatar = null;
    await user.save();

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.PROFILE_PHOTO_DELETED,
    });
});

/**
 * @api {delete} /api/v1/auth/deleteMyAccount
 * @type {function(*, *, *): Promise<*>}
 * @description Delete user's account
 * @access Private
 * @postman created
 */
const deleteMyAccount = asyncHandler(async (req, res, next) => {
    const user = req.user;
    await User.findByIdAndUpdate(
        user.id,
        {
            status: 'deleted',
            phone: '',
            email: '',
        },
        {new: true}
    );

    return res.status(statusCodes.OK).json({
        success: true,
        message: messages.ACCOUNT_DELETED,
    });
});

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    changePassword,
    getMe,
    uploadProfilePhoto,
    sendOtpCode,
    verifyOtpCode,
    deleteProfilePhoto,
    deleteMyAccount,
};
