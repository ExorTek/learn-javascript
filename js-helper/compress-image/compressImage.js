const {Worker} = require('worker_threads');
const path = require('path');
const compressImage = async file =>
    await new Promise((resolve, reject) => {
        const workerPath = path.resolve(__dirname, 'compressImageWorker.js');
        const worker = new Worker(workerPath, {workerData: file.buffer});
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });

module.exports = compressImage;
