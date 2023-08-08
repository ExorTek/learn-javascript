const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const ProfilePhotoSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        key: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        size: {
            type: Number,
            default: 0,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(ProfilePhotoSchema);

module.exports = mongoose.model('ProfilePhoto', ProfilePhotoSchema);
