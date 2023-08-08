const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoCategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        // description: {
        //     type: String,
        //     required: true,
        // },
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

module.exports = mongoose.model('video_category', VideoCategorySchema);
