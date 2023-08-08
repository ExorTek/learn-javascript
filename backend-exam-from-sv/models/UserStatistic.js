const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const UserStatisticSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        totalSharedComplaints: {
            type: Number,
            default: 0,
        },
        totalComments: {
            type: Number,
            default: 0,
        },
        totalSupportComplaints: {
            type: Number,
            default: 0,
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(UserStatisticSchema);

module.exports = UserStatistic = mongoose.model('UserStatistic', UserStatisticSchema);
