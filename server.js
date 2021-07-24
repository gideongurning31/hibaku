'use strict';
require('./server/core/environment');
const app = require('./server/index');
const models = require('./server/models/index');

const start = () => {
  models.sequelize
    .authenticate()
    .then(() => {
      app.listen(process.env.BASE_PORT).on('listening', () => {
        console.info(`${process.env.APP_NAME} (${process.env.NODE_ENV}) available on ${process.env.BASE_URL}:${process.env.BASE_PORT}`);
      });
    })
    .catch((err) => {
      console.error(`${process.env.APP_NAME} (${process.env.NODE_ENV}) failed to start.`);
      console.error(error);
      process.exit(-1);
    });
};

start();
