(async () => {
    const ffmpeg = require('fluent-ffmpeg');
    const { workerData, parentPort } = require('worker_threads');
    const inputBuffer = new Buffer.from(workerData);
    const outputFormat = 'png';
    ffmpeg()
        .input(inputBuffer)
        .inputFormat('mp4')
        .outputFormat(outputFormat)
        .noAudio()
        .seekInput(0)
        .frames(1)
        .outputOptions('-vf', `scale=320:-1`)
        .on('error', err => {
            parentPort.postMessage({ error: err });
        })
        .on('end', (stdout, stderr) => {
            const outputBuffer = Buffer.concat(stderr.filter(Boolean));
            const thumbnailArray = new Uint8Array(outputBuffer);
            parentPort.postMessage({ thumbnailArray: thumbnailArray });
        })
        .toFormat(outputFormat)
        .output('-');
})();
