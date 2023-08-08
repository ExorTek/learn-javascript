const VideoTag = require('../models/VideoTag');
const asyncHandler = require('../helpers/handlers/asyncHandler');

const getVideoTags = asyncHandler(async (req, res, next) => {
    const videoTags = await VideoTag.find({});
    res.status(200).json({
        success: true,
        data: videoTags,
    });
});

const getVideoTag = asyncHandler(async (req, res, next) => {
    const videoTag = await VideoTag.findById(req.params.id);
    res.status(200).json({
        success: true,
        data: videoTag,
    });
});

const createVideoTag = asyncHandler(async (req, res, next) => {
    const videoTag = await VideoTag.create(req.body);
    res.status(201).json({
        success: true,
        data: videoTag,
    });
});

const updateVideoTag = asyncHandler(async (req, res, next) => {
    const videoTag = await VideoTag.findByIdAndUpdate(req.params.id, {
        ...req.body,
    });
    res.status(200).json({
        success: true,
        data: videoTag,
    });
});

module.exports = {
    getVideoTags,
    getVideoTag,
    createVideoTag,
    updateVideoTag,
};
