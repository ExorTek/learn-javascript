const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minLength: [10, 'Title must be at least 10 characters long.'],
            maxLength: [70, 'Title must be at most 70 characters long.'],
        },
        description: {
            type: String,
            required: true,
            minLength: [250, 'Description must be at least 250 characters long.'],
            maxLength: [2500, 'Description must be at most 2500 characters long.'],
        },
        attachments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Attachment',
            },
        ],
        status: {
            type: String,
            enum: [
                'created',
                'inProgress',
                'inSolutionProcess',
                'solved',
                'notResolved',
                'rejected',
                'deleted',
                'archived',
                'spam',
                'blocked',
            ],
            default: 'created',
        },
        supporters: {
            type: Schema.Types.ObjectId,
            ref: 'ComplaintSupporter',
        },
        brandReplies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BrandComplaintReply',
            },
        ],
        userReplies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserComplaintReply',
            },
        ],
        usersComments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'UserComment',
            },
        ],
        statistics: {
            type: Schema.Types.ObjectId,
            ref: 'ComplaintStatistic',
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(ComplaintSchema);

module.exports = mongoose.model('Complaint', ComplaintSchema);
