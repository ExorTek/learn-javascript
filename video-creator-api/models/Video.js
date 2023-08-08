const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        url: {
            type: String,
            required: true,
        },
        ytId: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        statistics: {
            type: Schema.Types.ObjectId,
            ref: 'video_statistics',
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'video_category',
        },
        active: {
            type: Boolean,
            enum: [true, false],
            default: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('Video', VideoSchema);
