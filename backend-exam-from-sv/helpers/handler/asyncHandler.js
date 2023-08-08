/**
 * Async Handler
 * @param fn
 * @return {function(...[*]): Promise<unknown>}
 * @description This function is used to wrap the async function and catch the error
 */
const asyncHandler =
    fn =>
    (...args) =>
        Promise.resolve(fn(...args)).catch(args[2]);

module.exports = asyncHandler;
