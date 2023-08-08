'use strict';
require('dotenv').config();
const server = require('./app');
const {PORT, HOST, NODE_ENV, MONGODB_URI} = process.env;
const totalCPU = require('os').cpus().length; // Get total CPU cores
const cluster = require('cluster'); // Cluster module
const connectMongoDB = require('./helpers/database/connectMongoDB');
const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const startServer = () =>
    connectMongoDB(mongoose, mongoOptions, MONGODB_URI)
        .then(
            async () =>
                await server.listen(PORT, HOST, () => {
                    console.log(`Server is running on http://${HOST}:${PORT} in ${NODE_ENV} mode`);
                })
        )
        .catch(err => console.log('MongoDB connection error. Please make sure MongoDB is running. ', err));

/**
 * @description We are using cluster to use all CPU cores
 * @description We are using cluster to restart the server if it crashes
 */
if (cluster.isMaster && NODE_ENV === 'production') {
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

process.on('uncaughtException', (error, origin) => {
    console.log('uncaughtException');
    console.log(error, origin);
    cluster.disconnect(() => {
        process.exit(0);
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandledRejection');
    console.log(reason, promise);
    cluster.disconnect(() => {
        process.exit(0);
    });
});
