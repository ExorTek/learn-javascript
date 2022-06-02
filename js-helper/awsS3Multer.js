const multer = require('fastify-multer');
const multerS3 = require('multer-s3')
const randomstring = require("randomstring");
const CustomError = require("../../helpers/error/CustomError");
const {AWS_BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY} = process.env;
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION
});
const s3Storage = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            const extension = file.mimetype.split('/')[1];
            const name = `${file.mimetype.includes('video') ? 'video_' : 'photo_'}` + randomstring.generate(22) + "." + extension;
            cb(null, name)
        }
    })
});
const fileFilter = (req, file, callback) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm', 'video/ogg'];
    if (!allowedTypes.includes(file.mimetype)) {
        return callback(new CustomError('Please provide a valid image or video file!', 400), false);
    }
    return callback(null, true);
}
const fileUpload = multer({storage: s3Storage.storage, fileFilter}).array('files', 5);
module.exports = fileUpload;