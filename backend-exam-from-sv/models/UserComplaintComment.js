const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const UserComplaintCommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
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
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(UserComplaintCommentSchema);

module.exports = mongoose.model('UserComplaintComment', UserComplaintCommentSchema);
