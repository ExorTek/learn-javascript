const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');

const Schema = mongoose.Schema;

const UserCommentReplySchema = new Schema(
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
            min: [120, 'Comment must be at least 120 characters long.'],
            max: [2500, 'Comment must be at most 2500 characters long.'],
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        userCommentReplies: [
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

commonUpdatedAtRefresh(UserCommentReplySchema);

module.exports = mongoose.model('UserCommentReply', UserCommentReplySchema);
