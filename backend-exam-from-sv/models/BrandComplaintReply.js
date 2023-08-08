const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const BrandComplaintReplySchema = new Schema(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
        },
        comment: {
            type: String,
            minLength: [120, 'Comment must be at least 120 characters long.'],
            maxLength: [1000, 'Comment must be at most 1000 characters long.'],
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        complaintUserReply: {
            type: Schema.Types.ObjectId,
            ref: 'ComplaintUserReply',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(BrandComplaintReplySchema);

module.exports = mongoose.model('BrandComplaintReply', BrandComplaintReplySchema);
