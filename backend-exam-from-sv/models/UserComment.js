const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const UserCommentSchema = new Schema(
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
            minLength: [120, 'Comment must be at least 120 character'],
            maxLength: [2500, 'Comment must be at most 2500 characters'],
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserCommentReply',
            },
        ],
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(UserCommentSchema);

module.exports = mongoose.model('UserComment', UserCommentSchema);
