const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoStatisticsSchema = new Schema(
    {
        video: {
            type: Schema.Types.ObjectId,
            ref: 'Video',
        },
        views: {
            type: Number,
            default: 0,
        },
        stars: [
            {
                type: Object,
                default: {
                    star: 0,
                    comment: '',
                    ip: '',
                },
            },
        ],
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

module.exports = mongoose.model('video_statistics', VideoStatisticsSchema);
