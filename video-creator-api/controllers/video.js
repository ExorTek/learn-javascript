const asyncHandler = require('../helpers/handlers/asyncHandler');
const Video = require('../models/Video');
// const VideoTag = require('../models/VideoTag');
// const UploadVideo = require('../models/UploadVideo');
const VideoStatistics = require('../models/VideoStatistics');
const { statusCodes, messages } = require('../constants');
// const { AWS_S3_BUCKET_NAME } = process.env;
const pagination = require('../helpers/database/pagination');
// const S3 = require('../helpers/aws/S3');
// const getThumbnail = require('../helpers/file/videoThumbnail');
// const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { videoPopulates } = require('../helpers/modelPopulate/populates');
const { getYoutubeId, getYoutubeThumbnail, getYoutubeEmbedUrl } = require('../helpers/inputs/youtube');
const CustomError = require('../helpers/error/CustomError');
const userIp = require('../helpers/auth/userIp');

const getVideos = asyncHandler(async (req, res, next) => {
    const { categories, sort, limit = 12, page = 1 } = req.query;
    const videos = await pagination({
        model: Video,
        query: {
            ...(categories?.length ? { category: { $in: categories } } : {}),
        },
        sort:
            sort && Object.keys(sort).length
                ? {
                      ...(sort === 'newest' && { createdAt: -1 }),
                      ...(sort === 'oldest' && { createdAt: 1 }),
                      ...(sort === 'mostViewed' && { 'statistics.views': -1 }),
                  }
                : { createdAt: -1 },
        reqPagination: {
            limit,
            page,
        },
        select: '-createdBy',
    });

    return res.status(statusCodes.OK).json({
        success: true,
        data: videos,
    });
});
const getVideo = asyncHandler(async (req, res, next) => {
    const video = await Video.findById(req.params.id).populate(videoPopulates);
    const stars = video.statistics.stars.map(star => star.star);
    const totalStar = video.statistics.stars.length ? (stars.reduce((a, b) => a + b) / stars.length).toFixed(1) : 0;

    const recommendedVideos = await Video.find({
        category: video.category,
    })
        .select('_id title description thumbnail')
        .limit(3);
    return res.status(statusCodes.OK).json({
        success: true,
        data: {
            video: {
                ...video.toObject(),
                totalStar,
            },
            recommendedVideos,
        },
    });
});

// const createVideo = asyncHandler(async (req, res, next) => {
//     const reqVideo = req.file;
//
//     const getObjectCommandOptions = {
//         Bucket: AWS_S3_BUCKET_NAME,
//         Key: reqVideo.key,
//     };
//     const getObjectCommand = new GetObjectCommand(getObjectCommandOptions);
//     const video = await S3.send(getObjectCommand);
//     const thumbnail = await getThumbnail(await video.Body.transformToByteArray());
//     const thumbnailKey = `thumbnails/${reqVideo.key}.jpg`;
//
//     const putObjectCommandOptions = {
//         Bucket: AWS_S3_BUCKET_NAME,
//         Key: thumbnailKey,
//         Body: thumbnail,
//     };
//
//     const putObjectCommand = new PutObjectCommand(putObjectCommandOptions);
//     await S3.send(putObjectCommand);
//
//     const uploadProps = {
//         originalName: reqVideo.originalname,
//         encoding: reqVideo.encoding,
//         location: reqVideo.location,
//         bucket: reqVideo.bucket,
//         mimType: reqVideo.mimetype,
//         size: reqVideo.size,
//         key: reqVideo.key,
//         thumbnail: thumbnailKey,
//         createdBy: 'req.user.i',
//     };
//
//     const uploadedVideo = await UploadVideo.create(uploadProps);
//
//     return res.status(statusCodes.CREATED).json({
//         success: true,
//         data: uploadedVideo,
//     });
// });

const createVideo = asyncHandler(async (req, res, next) => {
    const ytId = getYoutubeId(req.body.url);
    if (!ytId) throw new CustomError(messages.INVALID_YOUTUBE_URL, statusCodes.BAD_REQUEST);

    const videoProps = {
        title: req.body.title,
        description: req.body.description,
        url: getYoutubeEmbedUrl(ytId),
        ytId,
        thumbnail: getYoutubeThumbnail(ytId),
        category: req.body.category,
        createdBy: '643420d2740f7e716a87e199',
    };

    const [video] = await Video.insertMany(videoProps);

    const statistics = await VideoStatistics.create({ video: video._id });

    video.statistics = statistics._id;
    await video.save();

    return res.status(statusCodes.CREATED).json({
        success: true,
    });
});

const updateVideo = asyncHandler(async (req, res, next) => {
    const video = await Video.findByIdAndUpdate(req.params.id, {
        ...req.body,
    });

    return res.status(statusCodes.OK).json({
        success: true,
        data: video,
    });
});

const changeVideoStatus = asyncHandler(async (req, res, next) => {
    const video = await Video.findByIdAndUpdate(req.params.id, {
        active: req.body.active,
    });

    return res.status(statusCodes.OK).json({
        success: true,
        data: video,
    });
});

const updateStatistics = asyncHandler(async (req, res, next) => {
    const statistics = await VideoStatistics.findOne({ video: req.params.id });
    if (statistics.stars.find(star => star.ip === userIp(req)))
        return next(new CustomError(messages.ALREADY_STARRED, statusCodes.BAD_REQUEST));

    statistics.stars.push({
        ip: userIp(req),
        userAgent: req.headers['user-agent'],
        ...req.body,
    });
    await statistics.save();
    return res.status(statusCodes.NO_CONTENT).json({
        success: true,
    });
});

const updateVideoViews = asyncHandler(async (req, res, next) => {
    await VideoStatistics.findOneAndUpdate(
        { video: req.params.id },
        {
            $inc: {
                views: 1,
            },
        }
    );
    return res.status(statusCodes.NO_CONTENT).json({
        success: true,
    });
});

const searchVideos = asyncHandler(async (req, res, next) => {
    const { search = '', limit = 4, page = 1 } = req.query;
    const videos = await pagination({
        model: Video,
        query: {
            title: { $regex: search, $options: 'i' },
        },
        reqPagination: {
            limit,
            page,
        },
        select: '-createdBy',
    });

    return res.status(statusCodes.OK).json({
        success: true,
        data: videos,
    });
});

module.exports = {
    getVideos,
    getVideo,
    createVideo,
    updateVideo,
    changeVideoStatus,
    updateStatistics,
    updateVideoViews,
    searchVideos,
};
