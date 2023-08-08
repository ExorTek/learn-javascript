// const multer = require('multer');
// const multerS3Transform = require('multer-s3-transform');
// const aws = require('aws-sdk');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const S3 = new aws.S3({
//     accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//     region: process.env.AWS_S3_REGION,
// });
//
// const upload = multer({
//     storage: multerS3Transform({
//         s3: S3,
//         bucket: process.env.AWS_S3_BUCKET_NAME,
//         onProgress: (req, file, progress) => {
//             console.log(progress);
//             return progress;
//         },
//         transforms: [
//             {
//                 id: 'videos',
//                 key: (req, file, cb) => {
//                     cb(null, `videos/${file.originalname}`);
//                 },
//                 transform: (req, file, cb) => {
//                     const proc = ffmpeg();
//                     proc.input(file.stream)
//                         .videoCodec('libx264')
//                         .audioCodec('aac')
//                         .outputFormat('mp4')
//                         .outputOptions('-movflags frag_keyframe+empty_moov')
//                         .on('error', err => {
//                             console.log('An error occurred: ' + err.message);
//                         })
//                         .pipe(cb(null, fs.createWriteStream(file.stream.path)));
//                 },
//             },
//             {
//                 id: 'thumbnails',
//                 key: (req, file, cb) => {
//                     cb(null, `thumbnails/${file.originalname}`);
//                 },
//                 transform: (req, file, cb) => {
//                     const proc = ffmpeg();
//                     proc.input(file.path).screenshots({
//                         count: 1,
//                         folder: 'thumbnails',
//                         filename: `${file.originalname}.png`,
//                         size: '320x240',
//                     });
//                 },
//             },
//         ],
//     }),
// });
//
//
//
// module.exports = {
//     uploadVideo,
// };
// const S3 = require('../helpers/aws/S3');
// const asyncHandler = require('../helpers/handlers/asyncHandler');
// const s3Stream = require('../helpers/Client')(S3);
//
// const uploadVideoFromS3Stream = asyncHandler(async (req, res, next) => {
//     const {file} = req;
//     const {originalname, mimetype, size} = file;
//
//     const uploadParams = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: `videos/${originalname}`,
//         Body: file.stream,
//         ContentType: mimetype,
//         ContentLength: size,
//         ACL: 'public-read',
//     };
//
//     const upload = s3Stream.upload(uploadParams);
//     upload.on('httpUploadProgress', progress => {
//         console.log(progress);
//     });
//
//     upload.promise().then(data => {
//         console.log(data);
//         res.status(200).json({
//             success: true,
//             data: data,
//         });
//     });
// });
//
//
// const multer = require('multer');
//
//
// const upload = multer({
//     storage: multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, 'uploads/');
//         },
//         filename: (req, file, cb) => {
//             cb(null, `${Date.now()}_${file.originalname}`);
//         }
//
//     })
//
// });
//
//
// module.exports = {
//     uploadVideoFromS3Stream,
//     upload: upload.single('file'),
// };

// const multer = require('multer');
// const S3 = require('../helpers/aws/S3');
// const multerS3 = require('multer-s3');
// const randomString = require('randomstring');
//
//
// const upload = multer({
//     storage: multerS3({
//         s3: S3,
//         bucket: process.env.AWS_S3_BUCKET_NAME,
//         metadata: (req, file, cb) => {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: (req, file, cb) => {
//             const ext = file.originalname.split('.').pop();
//             cb(null, `${randomString.generate(16)}.${ext}`);
//         },
//     }),
// });
//
// module.exports = {
//     upload,
// };
