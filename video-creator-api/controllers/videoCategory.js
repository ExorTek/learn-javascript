const asyncHandler = require('../helpers/handlers/asyncHandler');
const VideoCategory = require('../models/VideoCategory');

const getVideoCategories = asyncHandler(async (req, res, next) => {
    const videoCategories = await VideoCategory.find({});

    res.status(200).json({
        success: true,
        data: videoCategories,
    });
});

const getVideoCategory = asyncHandler(async (req, res, next) => {
    const videoCategory = await VideoCategory.findById(req.params.id);

    res.status(200).json({
        success: true,
        data: videoCategory,
    });
});

const createVideoCategory = asyncHandler(async (req, res, next) => {
    const videoCategory = await VideoCategory.create(req.body);

    res.status(201).json({
        success: true,
        data: videoCategory,
    });
});

const updateVideoCategory = asyncHandler(async (req, res, next) => {
    const videoCategory = await VideoCategory.findByIdAndUpdate(req.params.id, {
        ...req.body,
    });

    res.status(200).json({
        success: true,
        data: videoCategory,
    });
});

module.exports = {
    getVideoCategories,
    getVideoCategory,
    createVideoCategory,
    updateVideoCategory,
};
