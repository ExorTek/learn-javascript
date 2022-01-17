const {register, login,update} = require('../../controllers/auth');
const registerOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                name: {type: 'string'},
                email: {type: 'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: register
};
const loginOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: {type: 'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: login
};
const updateOptions = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: {type: 'string'},
                password: {type: 'string'}
            }
        }
    },
    handler: update
};
module.exports = {
    registerOptions,
    loginOptions,
    updateOptions
};