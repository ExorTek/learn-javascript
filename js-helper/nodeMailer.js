const nodemailer = require('nodemailer');
const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    });
    return await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;