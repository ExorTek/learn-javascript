const userIp = req => {
    return (
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.ip
    )
        .split(',')[0]
        .trim();
};

module.exports = userIp;
