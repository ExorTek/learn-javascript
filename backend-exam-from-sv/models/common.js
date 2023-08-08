/**
 * @type {{resetPassword: {default: {expires: null, token: null}, type: ObjectConstructor}, surname: {min: (number|string)[], max: (number|string)[], type: StringConstructor, required: (boolean|string)[]}, name: {min: (number|string)[], trim: boolean, max: (number|string)[], type: StringConstructor, required: (boolean|string)[]}, verified: {default: {phone: boolean, email: boolean}, type: ObjectConstructor}, verification: {default: {expires: null, otp: null, type: null}, type: ObjectConstructor}}}
 * @description Common properties for auth models
 */
const commonAuthProperties = {
    name: {
        type: String,
        required: [true, 'Name and surname is required.'],
        trim: true,
        min: [3, 'Name and surname must be at least 3 characters long.'],
        max: [25, 'Name and surname must be at most 50 characters long.'],
    },
    surname: {
        type: String,
        required: [true, 'Surname is required.'],
        min: [3, 'Surname must be at least 3 characters long.'],
        max: [25, 'Surname must be at most 50 characters long.'],
    },
    resetPassword: {
        type: Object,
        default: {
            token: null,
            expires: null,
        },
    },
    verification: {
        type: Object,
        default: {
            otp: null,
            expires: null,
            type: null,
        },
    },
    verified: {
        type: Object,
        default: {
            email: false,
            phone: false,
        },
    },
};

/**
 * @type {{createdAt: {default: () => number, type: DateConstructor}, updatedAt: {default: () => number, type: DateConstructor}}}
 * @description Common properties for all models.
 */
const commonDateProperties = {
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
};

/**
 * @param schema
 * @returns {void}
 * @description Refreshes updatedAt property on update operations.
 */
const commonUpdatedAtRefresh = schema => {
    ['updateOne', 'updateMany', 'update', 'findOneAndUpdate'].forEach(method => {
        schema.pre(method, function (next) {
            this.updatedAt = Date.now();
            next();
        });
    });
};

module.exports = {
    commonAuthProperties,
    commonUpdatedAtRefresh,
    commonDateProperties,
};
