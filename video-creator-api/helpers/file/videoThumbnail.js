const { Worker } = require('worker_threads');
const path = require('path');

const absolutePath = path.resolve(__dirname, '../workers/videoThumbnailWorker.js');

const getThumbnail = async video =>
    await new Promise((resolve, reject) => {
        const worker = new Worker(absolutePath, {
            workerData: video,
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });

module.exports = getThumbnail;
