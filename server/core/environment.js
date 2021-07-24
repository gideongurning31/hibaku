'use strict';
const dotenv = require('dotenv');
const path = require('path');
const dir = require('app-root-dir');
const fs = require('fs');
const localEnvPath = path.join(dir.get(), '.env');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Jakarta');
process.env.BASE_PATH = dir.get();
process.env.APP_PATH = path.join(dir.get(), 'server');

if (fs.existsSync(localEnvPath)) {
  dotenv.config();
  console.info('Using local environment variable.');
} else {
  console.info(`${process.env.APP_NAME} running on ${process.env.APP_STAGE} stage.`);
}

module.exports = dotenv;
