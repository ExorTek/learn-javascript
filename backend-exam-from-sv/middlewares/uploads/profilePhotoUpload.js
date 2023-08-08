const multer = require('multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError');
const {statusCodes, messages} = require('../../constants');
const {MAX_PROFILE_IMAGE_SIZE_MB} = process.env;

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension))
        return cb(new CustomError(messages.INVALID_FILE_TYPE, statusCodes.BAD_REQUEST), false);
    cb(null, true);
};

const profilePhotoUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * parseInt(MAX_PROFILE_IMAGE_SIZE_MB),
    },
});

module.exports = profilePhotoUpload;
