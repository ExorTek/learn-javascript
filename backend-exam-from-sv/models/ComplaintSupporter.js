const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const ComplaintSupporterSchema = new Schema(
    {
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
        },
        supporter: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(ComplaintSupporterSchema);

module.exports = mongoose.model('ComplaintSupporter', ComplaintSupporterSchema);
