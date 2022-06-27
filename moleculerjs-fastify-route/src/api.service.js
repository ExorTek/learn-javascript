'use strict';
const customErrorHandler = require("../middlewares/error/customErrorHandler");
const CustomError = require("../helpers/error/CustomError");
const fastify = require('fastify')({logger: false});
const connectDatabase = require("../helpers/database/connectDatabase");
const apiRoute = require("../routers");
require('dotenv').config({
    path: '../.env'
})
module.exports = {
    name: 'api',
    settings: {
        port: 3000,
    },
    created() {
        connectDatabase();
        fastify.setErrorHandler(customErrorHandler);
        fastify.register((e) => apiRoute(e, this.broker), {prefix: '/api'});
    },
    started() {
        try {
            fastify.listen(this.settings.port).then(r => console.log("Server started on PORT " + this.settings.port))
        } catch (error) {
            console.log(error)
        }
    },
}