const multer = require('multer');
const S3 = require('../../helpers/aws/S3');
const multerS3 = require('multer-s3');
const CustomError = require('../../helpers/error/CustomError');
const { messages, statusCodes } = require('../../constants');
const randomString = require('randomstring');

const s3Storage = {
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = file.originalname.split('.').pop();
            cb(null, `${randomString.generate(16)}.${ext}`);
        },
    }),
};

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['video/mp4'];
    if (!allowedMimes.includes((file.mimetype || file.mimeType).toLowerCase()))
        cb(new CustomError(messages.UNSUPPORTED_FILE_TYPE, statusCodes.BAD_REQUEST), false);
    cb(null, true);
};

const videoUpload = multer({
    ...s3Storage,
    fileFilter,
});

module.exports = {
    videoUpload,
};
