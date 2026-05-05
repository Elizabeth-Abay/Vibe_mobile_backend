const crypto = require('crypto');

function sha1Hasher(valueToBeHashed) {
    try {
        return crypto.createHash('sha1').update(valueToBeHashed).digest('hex');
    } catch (err){
        err.from = "from utils sha1Hasher";

        throw err
    }
}


module.exports = sha1Hasher