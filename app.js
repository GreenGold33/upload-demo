'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const index = require('./routes/index');

const app = express();

// -- database

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/upload-demo', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// -- setup the app

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -- cloudinary

// cloudinary.config({
//   cloud_name: 'ironhack-bcn', // process.env.CLOUDINARY_NAME,
//   api_key: '544917682468444', // process.env.CLOUDINARY_KEY,
//   api_secret: 'vhIDJKW9j8OTUUz2tRWasQOUKjU' // process.env.CLOUDINARY_SECRET
// });

// -- routes

app.use('/', index);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found');
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error');
  }
});

module.exports = app;
