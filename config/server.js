const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

consign()
  .include('app/routes')
  .into(app);

app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
  next();
});

module.exports = app;
