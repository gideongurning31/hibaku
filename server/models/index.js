'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

let db = {};

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  timezone: process.env.TZ,
  logging: parseInt(process.env.SQL_LOGGING) ? (str) => console.log(str) : false,
  operatorsAliases: false,
  pool: {
    min: parseInt(process.env.DB_POOL_MIN),
    max: parseInt(process.env.DB_POOL_MAX),
    acquire: process.env.DB_POOL_ACQUIRE,
    idle: process.env.DB_POOL_TIMEOUT,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    let model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) db[modelName].associate(db);
});

if (process.env.SEQUELIZE_SYNC && process.env.SEQUELIZE_SYNC == 'true') sequelize.sync();

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
