const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');

const Schema = mongoose.Schema;

const ComplaintUserReplySchema = new Schema(
    {
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        comment: {
            type: String,
            minLength: [120, 'Comment must be at least 120 characters long.'],
            maxLength: [2500, 'Comment must be at most 2500 characters long.'],
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        brandReply: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BrandComplaintReply',
            },
        ],
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);
commonUpdatedAtRefresh(ComplaintUserReplySchema);

module.exports = mongoose.model('ComplaintUserReply', ComplaintUserReplySchema);
