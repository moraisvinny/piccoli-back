const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary');

const app = express();

cloudinary.config({
  cloud_name: 'moraisvinny-com',
  api_key: '632655925321471',
  api_secret: 'pcwqA0-xQ6b2IrprvhBjtXxTgAU'
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(fileUpload());
consign()
  .include('app/routes')
  .then('app/db/db.js')
  .into(app);
module.exports = app;
