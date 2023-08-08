const mongoose = require('mongoose');
const {commonDateProperties, commonUpdatedAtRefresh} = require('./common');
const Schema = mongoose.Schema;

const UserSaveComplaintSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        complaint: {
            type: Schema.Types.ObjectId,
            ref: 'Complaint',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(UserSaveComplaintSchema);

module.exports = mongoose.model('UserSaveComplaint', UserSaveComplaintSchema);
