'use strict';
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.status(200).json({ message: `${process.env.APP_NAME} (${process.env.APP_STAGE}) is running.` });
});

module.exports = app;
