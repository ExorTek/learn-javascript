const crypto = require("crypto")
const CustomError = require("../error/CustomError");
const algorithm = 'aes-256-gcm';
const ivLength = 16;
const saltLength = 64;
const tagLength = 16;
const tagPosition = saltLength + ivLength;
const encryptedPosition = tagPosition + tagLength;
const getKey = (salt) => {
    return crypto.pbkdf2Sync((process.env.JWT_SECRET_KEY), salt, 100000, 32, 'sha512');
}
const encrypt = (value = "") => {
    try {
        const iv = crypto.randomBytes(ivLength);
        const salt = crypto.randomBytes(saltLength);
        const key = getKey(salt);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(String(value), 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();
        return Buffer.concat([salt, iv, tag, encrypted]).toString('hex');
    } catch (e) {
        throw new CustomError("Invalid token!", 401);
    }
};

const decrypt = (value = "") => {
    try {
        const stringValue = Buffer.from(String(value), 'hex');
        const salt = stringValue.slice(0, saltLength);
        const iv = stringValue.slice(saltLength, tagPosition);
        const tag = stringValue.slice(tagPosition, encryptedPosition);
        const encrypted = stringValue.slice(encryptedPosition);
        const key = getKey(salt);
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        decipher.setAuthTag(tag);
        return decipher.update(encrypted) + decipher.final('utf8');
    } catch (e) {
        throw new CustomError("Invalid token!", 401);
    }
};

module.exports = {
    encrypt, decrypt
}