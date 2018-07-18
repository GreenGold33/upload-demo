'use strict';

const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'ironhack-bcn', // process.env.CLOUDINARY_NAME,
  api_key: '544917682468444', // process.env.CLOUDINARY_KEY,
  api_secret: 'vhIDJKW9j8OTUUz2tRWasQOUKjU' // process.env.CLOUDINARY_SECRET
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'products', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
