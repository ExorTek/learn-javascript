'use strict';
require('dotenv').config();
const connectMongoDB = require('./helpers/database/connectMongoDB');
const app = require('./app');
const mongoose = require('mongoose');
let totalCPU = require('os').cpus().length;
const cluster = require('cluster');
const { PORT, HOST, NODE_ENV, MONGO_URI } = process.env;

const isProduction = NODE_ENV === 'production';

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const startServer = () =>
    connectMongoDB({
        mongoose,
        options: mongoOptions,
        mongoUri: MONGO_URI,
    })
        .then(
            async () =>
                await app.listen(PORT, HOST, () => {
                    console.log(`Server is running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
                })
        )
        .catch(err => console.log('MongoDB connection error. Please make sure MongoDB is running. ', err));

if (cluster.isMaster && isProduction) {
    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < totalCPU; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
    cluster.on('online', worker => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
    cluster.on('listening', (worker, address) => {
        console.log(`Worker ${worker.process.pid} is listening on ${address.address}:${address.port}`);
    });
    cluster.on('disconnect', worker => {
        console.log(`Worker ${worker.process.pid} is disconnected`);
    });
} else {
    console.log(`Worker ${process.pid} started`);
    startServer();
}
