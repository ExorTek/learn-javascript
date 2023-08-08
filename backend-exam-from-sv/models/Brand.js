const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonAuthProperties, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const BrandSchema = new Schema(
    {
        brandName: {
            type: String,
            required: [true, 'Brand name is required.'],
            minlength: [3, 'Brand name must be at least 3 characters long.'],
            maxlength: [50, 'Brand name must be at most 50 characters long.'],
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
        sector: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
        },
        password: {
            type: String,
            default: '',
        },
        email: {
            type: String,
        },
        verified: {
            type: Object,
            default: {
                email: false,
                phone: false,
            },
        },
        status: {
            type: String,
            enum: ['created', 'verified', 'notVerified', 'suspended', 'deleted'],
            default: 'created',
        },
        achievements: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Achievement',
            },
        ],
        ...commonAuthProperties,
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(BrandSchema);

module.exports = mongoose.model('Brand', BrandSchema);
