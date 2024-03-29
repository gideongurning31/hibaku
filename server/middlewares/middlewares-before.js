'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const moment = require('moment');
const compression = require('compression');
const requestSanitizer = require('express-sanitize-escape');
const Router = express.Router();

Router.all('*', (req, res, next) => {
  req.app.set('request-timestamp', moment().valueOf());
  res.on('finish', () => {
    if (req.method && req.method.toLowerCase() !== 'options') {
      console.log(`${res.statusCode} : ${req.method} ${req.url}`);
      if (res.statusCode === 400 || res.statusCode === 403 || res.statusCode === 500) {
        console.info(`${res.statusCode} : ${req.method} ${req.url}`);
        console.info(`body ${JSON.stringify(req.body)}`);
      }
    }
  });
  next();
});

let corsOptions = { methods: 'GET,POST,PUT,DELETE' };
if (process.env.APP_STAGE.toUpperCase() !== 'DEVELOPMENT') {
  corsOptions.origin = process.env.FRONT_END_URL;
  corsOptions.optionsSuccessStatus = 200;
}

Router.use(cors(corsOptions));
Router.use(helmet());
Router.use(compression());
Router.use(express.json());
Router.use(requestSanitizer.middleware());

module.exports = Router;
