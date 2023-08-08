const TEST_REGEX = /^\$|\./;
const REPLACE_REGEX = /^\$|\./g;

const isPlainObject = obj => obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const sanitizeObject = obj => {
    for (const [key, value] of Object.entries(obj)) {
        if (TEST_REGEX.test(key)) {
            const newKey = key.replace(REPLACE_REGEX, '_');
            if (newKey !== key) {
                obj[newKey] = value;
                delete obj[key];
            }
        }
        if (isPlainObject(value)) {
            sanitizeObject(value);
        }
    }
};

const mongoSanitize = (req, res, next) => {
    if (isPlainObject(req.body)) {
        sanitizeObject(req.body);
    }
    if (isPlainObject(req.query)) {
        sanitizeObject(req.query);
    }
    if (isPlainObject(req.params)) {
        sanitizeObject(req.params);
    }
    next();
};

module.exports = mongoSanitize;
