'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  Product.find()
    .then((result) => {
      const data = {
        products: result
      };
      res.render('index', data);
    });
});

router.post('/upload', upload.single('photo'), (req, res, next) => {
  const { name, price } = req.body;
  if (!req.file) {
    res.redirect('/validation-error');
    return;
  }
  const imgUrl = req.file.url;
  const data = { name, price, imgUrl };
  const newMovie = new Product(data);
  newMovie.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
