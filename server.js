if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes');
const config = require('./config');

const URL = config.DB[process.env.NODE_ENV];

const connectDb = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.info(`successfully connected to ${URL}`);
  } catch (error) {
    console.error(`connection failed - ${error}`);
  }
};

connectDb();

app.use(bodyParser.json());

app.use('/api/v1', router);

app.use('/*', (req, res, next) => {
  const err = new Error('Invalid path');
  err.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res
    .status(err.statusCode)
    .json({ error: err.message, status: err.statusCode });
  next();
});

module.exports = app;
