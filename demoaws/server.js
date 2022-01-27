// const express = require('express');
// const path = require("path");
// const app = express();
const multer = require('fastify-multer');
const path = require("path");
const fs = require("fs");
const S3 = require('');
const AWS_BUCKET_NAME = "";
const AWS_REGION = "";
const AWS_ACCESS_KEY = "";
const AWS_SECRET_KEY = "";

// const S3 = require('aws-sdk/clients/s3');
// const fs = require("fs");
// const AWS_BUCKET_NAME = "";
// const AWS_REGION = "eu-central-1";
// const AWS_ACCESS_KEY = "";
// const AWS_SECRET_KEY = "";
// const s3 = new S3({
//     AWS_REGION,
//     AWS_ACCESS_KEY,
//     AWS_SECRET_KEY
// })
// app.post('/upload', async (req, res) => {
//     const files = req.body
//     console.log(files)
//
// })
// app.listen(3001, () => {
//     console.log("Server listening on 3001");
// })
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const rootDir = path.dirname(require.main.filename);
        callback(null, path.join(rootDir, '/public'));
    },
    filename: function (req, file, callback) {
        const extension = file.mimetype.split('/')[1];
        const name = "product_" + "123" + "." + extension;
        callback(null, name);
    }
});
const {pipeline} = require('stream')
const util = require('util')
const pump = util.promisify(pipeline)
const fileFilter = (req, file, callback) => {
    allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    return callback(null, true);
}
const imageUpload = multer({storage, fileFilter});
const upload = imageUpload.array('files', 4);
const fastify = require('fastify')({logger: true});
fastify.register(require('fastify-multipart'))
fastify.post("/upload", async (req, reply) => {
    const data = await req.file()
    const buff = await data.toBuffer()
    const params = {
        Bucket: AWS_BUCKET_NAME,
        Key: data.filename,
        Body: buff
    };
    const s3 = new S3({
        region: AWS_REGION,
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    })
    const result = await s3.putObject(params, (err, data) => {
        if (err) {
            return err
        } else {
            return data
        }
    });
    console.log(result)
});
const start = async () => {
    try {
        await fastify.listen(3001);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};
start();