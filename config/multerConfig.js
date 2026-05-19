const multer = require('multer');

const storage = multer.memoryStorage();


// maximum 5 MB of memory is allowed
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});


module.exports = upload;