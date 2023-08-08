const asyncHandler =
    fn =>
    (...args) =>
        Promise.resolve(fn(...args)).catch(args[2]);

module.exports = asyncHandler;
