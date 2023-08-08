const {Worker} = require('worker_threads');
const path = require('path');

/**
 * Get thumbnail of an image
 * @param {Object} file
 * @returns {Promise<Buffer>}
 */
const getThumbnail = async file =>
    await new Promise((resolve, reject) => {
        const workerPath = path.resolve(__dirname, 'thumbnailWorker.js');
        const worker = new Worker(workerPath, {workerData: file});
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });

module.exports = getThumbnail;
