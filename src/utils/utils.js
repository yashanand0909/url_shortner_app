const crypto = require('crypto');

const genHash = () => {
    const inputString = Math.random().toString(36).substring(2);

    const hash = crypto.createHash('md5').update(inputString).digest('hex');

    return hash.substring(0, 7);
}

module.exports = genHash;