const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());

consign()
  .include('app/routes')
  .into(app);


module.exports = app;
