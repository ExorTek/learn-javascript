const multer = require('fastify-multer');
const path = require('path');
const CustomError = require('../../helpers/error/CustomError');
const randomstring = require("randomstring");
const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      const rootDir = path.dirname(require.main.filename);
      callback(null, path.join(rootDir, '/public/uploads'));
   },
   filename: function (req, file, callback) {
      if (!req.savedProductImage) {
         req.savedProductImage = []
      }
      const extension = file.mimetype.split('/')[1];
      const name = "product_" + randomstring.generate(12) + "." + extension;
      req.savedProductImage.push("http://localhost:5001/public/uploads/" + name)
      callback(null, name);
   }
});

const fileFilter = (req, file, callback) => {
   allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
   if (!allowedTypes.includes(file.mimetype)) {
      return callback(new CustomError('Please provide a valid image file', 400), false);
   }
   return callback(null, true);
}

const imageUpload = multer({storage, fileFilter});
const upload = imageUpload.array('files', 4);

module.exports = upload;
