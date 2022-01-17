const sendJwtToClient = (user, reply) => {
    const token = user.generateAccessToken();
    const {JWT_COOKIE, NODE_ENV} = process.env;
    return reply.code(200).header('Authorization', token, {
        httpOnly: true,
        expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
        secure: NODE_ENV === 'development' ? false : true
    }).send({
        success: true,
        accessToken: token,
        data: {
            username: user.username,
            profileImage: user.profile_image,
        }
    });
};


module.exports = {sendJwtToClient};