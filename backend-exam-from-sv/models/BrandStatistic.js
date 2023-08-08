const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const BrandStatisticSchema = new Schema(
    {
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
        totalSharedComplaints: {
            type: Number,
            default: 0,
        },
        totalAnsweredComplaints: {
            type: Number,
            default: 0,
        },
        totalUnansweredComplaints: {
            type: Number,
            default: 0,
        },
        averageAnswerTime: {
            type: Number,
            default: 0,
        },
        answeredRate: {
            type: Number,
            default: 0,
        },
        lastOneYearComplaints: {
            type: Number,
            default: 0,
        },
        satisfactionRate: {
            type: Number,
            default: 0,
        },
        totalViews: {
            type: Number,
            default: 0,
        },
        lastOneMonthViews: {
            type: Number,
            default: 0,
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(BrandStatisticSchema);

module.exports = BrandStatistic = mongoose.model('BrandStatistic', BrandStatisticSchema);
