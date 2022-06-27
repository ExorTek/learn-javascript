const CustomError = require("../helpers/error/CustomError");

const auth = async (fastify, broker) => {
    fastify.post('/ge', async (req, reply) => {
        reply.send({
            message: 'Başarılı'
        })
    })
    fastify.post('/login', async (req) => {
       return await broker.call('auth.login', {username: req.body.username, password: req.body.password})

    })
    fastify.post('/register', async (req, reply) => {
        return await broker.call('auth.register', {username: req.body.username, password: req.body.password})
    })
};

module.exports = auth;