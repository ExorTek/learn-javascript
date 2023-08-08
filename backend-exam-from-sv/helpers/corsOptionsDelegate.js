const {ALLOWED_ORIGINS} = process.env;
const corsOptionsDelegate = (req, callback) =>
    callback(null, {
        origin: ALLOWED_ORIGINS.split(';').indexOf(req.header('Origin')) !== -1,
    });
module.exports = corsOptionsDelegate;
