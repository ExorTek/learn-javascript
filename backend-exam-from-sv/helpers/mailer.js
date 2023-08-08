const nodemailer = require('nodemailer');
const {SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS} = process.env;

const mailTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

module.exports = mailTransport;
