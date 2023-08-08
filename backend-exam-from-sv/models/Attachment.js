const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const AttachmentSchema = new Schema(
    {
        key: {
            type: String,
            default: '',
        },
        url: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        visibility: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
        },
        type: {
            type: String,
            default: '',
        },
        size: {
            type: Number,
            default: 0,
        },
        uploader: {
            type: String,
            default: '',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(AttachmentSchema);

module.exports = mongoose.model('Attachment', AttachmentSchema);
