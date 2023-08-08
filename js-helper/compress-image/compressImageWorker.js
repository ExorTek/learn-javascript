(async () => {
    const {parentPort, workerData} = require('worker_threads');
    const sharp = require('sharp');
    parentPort.postMessage(
        await sharp(workerData)
            .jpeg({
                quality: 50,
            })
            .toBuffer()
    );
})();
