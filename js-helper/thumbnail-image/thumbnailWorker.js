/**
 * @param {Object} workerData
 * @param {Buffer} workerData.buffer
 * @returns {Promise<Buffer>}
 * @description This file is not meant to be executed directly.
 */
(async () => {
    const {parentPort, workerData} = require('worker_threads');
    const sharp = require('sharp');
    parentPort.postMessage(
        await sharp(workerData.buffer)
            .resize(150, 150, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toBuffer()
    );
})();
