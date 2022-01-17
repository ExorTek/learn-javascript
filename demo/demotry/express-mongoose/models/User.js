const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {nanoid} = require('nanoid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid(40)
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'Please provide a username']
    },
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, 'Please provide a password'],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    about: {
        type: String
    },
    website: {
        type: String
    },
    place: {
        type: String
    },
    profile_image: {
        type: String,
        default: 'default.jpg'
    },
    blocked: {
        type: Boolean,
        default: false
    }
});
UserSchema.methods.generateAccessToken = function () {
    const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;
    const payload = {
        id: this._id,
        name: this.name
    };
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
};
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        next()
    }
    bcrypt.genSalt(15, (error, salt) => {
        if (error) next(error);
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) next(error);
            this.password = hash;
            next();
        });
    });

});

module.exports = mongoose.model('User', UserSchema);