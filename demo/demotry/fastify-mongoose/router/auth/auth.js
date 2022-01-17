const {registerOptions, loginOptions,updateOptions} = require('./authSchema');

async function auth(fastify) {
    fastify.post('/register', registerOptions);
    fastify.post('/login', loginOptions);
    fastify.post('/update', updateOptions);
}

module.exports = auth;