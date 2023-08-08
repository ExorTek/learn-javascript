const mongoose = require('mongoose');
const {commonUpdatedAtRefresh, commonDateProperties} = require('./common');
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
    {
        name: {
            type: String,
            default: '',
        },
        surname: {
            type: String,
            default: '',
        },
        username: {
            type: String,
            default: '',
        },
        password: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            default: '',
        },
        phone: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            enum: ['admin', 'supportAdmin', 'advisor', 'supportAdvisor', 'superAdmin', 'none'],
            default: 'none',
        },
        status: {
            type: String,
            enum: ['created', 'active', 'inactive', 'deleted'],
            default: 'active',
        },
        ...commonDateProperties,
    },
    {
        versionKey: false,
    }
);

commonUpdatedAtRefresh(AdminSchema);

module.exports = mongoose.model('Admin', AdminSchema);
