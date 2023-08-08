const multer = require('multer');
const CustomError = require('../../helpers/error/CustomError');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedExtensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.pdf',
        '.doc',
        '.docx',
        '.xls',
        '.xlsx',
        '.txt',
        '.odt',
        '.mp4',
        '.mov',
        '.wav',
    ];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) return cb(new CustomError('Invalid file type', 400), false);
    cb(null, true);
};

const attachmentUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 200,
    },
});

module.exports = attachmentUpload;
