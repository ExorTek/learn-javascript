const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const ComplaintStatisticSchema = new Schema(
    {
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
        },
        views: {
            type: Number,
            default: 0,
        },
        supporters: {
            type: Number,
            default: 0,
        },
        satisfaction: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(ComplaintStatisticSchema);

module.exports = mongoose.model('ComplaintStatistic', ComplaintStatisticSchema);
