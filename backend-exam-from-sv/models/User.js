const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonAuthProperties, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required.'],
            default: '',
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        avatar: {
            type: Schema.Types.ObjectId,
            ref: 'ProfilePhoto',
            default: null,
        },
        personalInfo: {
            type: Object,
            default: {
                gender: '',
                education: '',
                maritalStatus: '',
                monthlyHouseholdIncome: '',
                city: '',
                workingStatus: '',
                birthYear: '',
            },
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended', 'deleted'],
            default: 'active',
        },

        ...commonAuthProperties,
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(UserSchema);

module.exports = mongoose.model('User', UserSchema);
