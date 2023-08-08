/**
 * @description Convert milliseconds to string time
 * @param duration
 * @return {`${number}:${number}:${number}`}
 */
const msToStringTime = duration => {
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const seconds = Math.floor((duration / 1000) % 60);
    return `${hours}:${minutes}:${seconds}`;
};

module.exports = msToStringTime;
