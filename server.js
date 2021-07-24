'use strict';
require('./server/core/environment');
const app = require('./server/index');
const start = () => {
  app.listen(process.env.BASE_PORT).on('listening', () => {
    console.info(`${process.env.APP_NAME} (${process.env.NODE_ENV}) available on ${process.env.BASE_URL}:${process.env.BASE_PORT}`);
  });
};

start();
