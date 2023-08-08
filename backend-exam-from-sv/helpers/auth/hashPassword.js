const argon2 = require('argon2');
const {PASSWORD_SECRET_KEY} = process.env;

const hashPassword = async password =>
    await argon2.hash(password, {
        secret: Buffer.from(PASSWORD_SECRET_KEY),
    });

const verifyPassword = async (password, hash) =>
    await argon2.verify(hash, password, {
        secret: Buffer.from(PASSWORD_SECRET_KEY),
    });

module.exports = {
    hashPassword,
    verifyPassword,
};
