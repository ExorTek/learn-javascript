const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
};
const getAccessTokenFromHeaders = (req) => {
    const authorization = req.headers.authorization;
    return authorization.split(' ')[1];
};