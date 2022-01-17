const mongoose = require('mongoose');
const fastify = require("fastify")({logger: true});
const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB Connection Successfully.');
    }).catch((err) => {
        console.error(err);
        fastify.log.error('DB Connection Error: ' + err)
    });
};
module.exports = connectDatabase;