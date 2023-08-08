const TEST_REGEX = /^\$|\./;
const REPLACE_REGEX = /^\$|\./g;
/**
 * Check if the given object is a plain object
 * @param obj
 * @return {boolean}
 */
const isPlainObject = obj => obj !== null && Object.prototype.toString.call(obj) === '[object Object]';

/**
 * Test if the given object contains a key that matches the test regex
 * @param obj
 * @return {boolean|boolean|*}
 */
const testObject = obj => {
    for (const key in obj) {
        if (TEST_REGEX.test(key)) {
            return true;
        }
        if (isPlainObject(obj[key])) {
            return testObject(obj[key]);
        }
    }
    return false;
};

/**
 * Replace the keys of the given object that match the test regex
 * @param obj
 * @return {*}
 */
const replaceObject = obj => {
    for (const key in obj) {
        if (TEST_REGEX.test(key)) {
            obj[key.replace(REPLACE_REGEX, '_')] = obj[key];
            delete obj[key];
        }
        if (isPlainObject(obj[key])) {
            replaceObject(obj[key]);
        }
    }
    return obj;
};

/**
 * Sanitize the request body, query and params
 * @param req
 * @param res
 * @param next
 * @description This middleware is used to sanitize the request body, query and params
 */
const mongoSanitize = (req, res, next) => {
    if (testObject(req.body)) {
        replaceObject(req.body);
    }
    if (testObject(req.query)) {
        replaceObject(req.query);
    }
    if (testObject(req.params)) {
        replaceObject(req.params);
    }
    next();
};

module.exports = mongoSanitize;
