if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require('./config');

const URL = config.DB[process.env.NODE_ENV];

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`successfully connected to ${URL}`))
  .catch((error) => console.log(`connection failed - ${error}`));

app.use(bodyParser.json());

module.exports = app;
