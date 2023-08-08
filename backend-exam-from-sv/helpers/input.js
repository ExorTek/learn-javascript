const onlyNumberRegex = /^\d+$/;
const registerInputCheck = ({name, surname, email, password}) => name && surname && email && password;

const loginInputCheck = ({credential, password}) => credential && password;

const checkVerifyInput = ({credential, type, user}) => {
    const defaultTypes = ['email', 'phone'];
    const {verified} = user;
    if (!credential || !type)
        return {
            error: true,
            messageType: 'MISSING_FIELDS',
        };
    if (!defaultTypes.includes(type))
        return {
            error: true,
            messageType: 'INVALID_OTP_TYPE',
        };
    if (verified.email && verified.phone)
        return {
            error: true,
            messageType: 'ALREADY_VERIFIED',
        };
    if (verified[type])
        return {
            error: true,
            messageType: 'ALREADY_VERIFIED',
        };
    return {
        error: false,
        messageType: 'SUCCESS',
    };
};

const checkBrandRegisterInput = ({name, surname, brandName, phone, email}) =>
    name && surname && brandName && phone && email;

const checkComplaintInput = ({title, description, brand}) => title && description && brand;

const checkSearchFieldValue = ({fields, values}) => Array.isArray(fields) && Array.isArray(values);

module.exports = {
    registerInputCheck,
    loginInputCheck,
    checkVerifyInput,
    checkBrandRegisterInput,
    checkComplaintInput,
    checkSearchFieldValue,
};
