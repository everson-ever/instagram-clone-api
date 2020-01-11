const multer = require('multer');
const path = require('path');


module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'posts'),
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' +file.originalname)
        }
    })
}


