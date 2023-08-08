const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const AchievementSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required.'],
            minLength: [3, 'Name must be at least 3 characters long.'],
            maxLength: [50, 'Name must be at most 50 characters long.'],
        },
        description: {
            type: String,
            minlength: [25, 'Description must be at least 25 characters long'],
            maxlength: [500, 'Description must be at most 500 characters long'],
        },
        image: {
            type: String,
            default: '',
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'Admin',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(AchievementSchema);

module.exports = mongoose.model('Achievement', AchievementSchema);
