'use strict';
const express = require('express');
const app = express();
const middlewares = require('./middlewares/index');
const controllers = require('./controllers/index');

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.status(200).json({ message: `${process.env.APP_NAME} (${process.env.APP_STAGE}) is running.` });
});

app.disable('etag');
app.use(middlewares.before);
app.use(controllers);
app.use(middlewares.after);

module.exports = app;
