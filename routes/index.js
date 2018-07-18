'use strict';

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/upload', upload.single('photo'), (req, res, next) => {
  const { name, price } = req.body;
  const fileUrl = req.file.url;
  // const imgName = req.file.originalname;
  const data = { name, price, fileUrl };
  const newMovie = new Product(data);
  newMovie.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
