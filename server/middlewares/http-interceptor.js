'use strict';
let self;
const sequelize = require('sequelize');
const ApplicationError = require('../errors/application-error');

class HttpInterceptor {
  constructor() {
    self = this;
  }

  errorHandler(err, req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (err instanceof sequelize.ValidationError) {
      let messages = [];
      for (let i = 0; i < err.errors.length; i++) messages.push(err.errors[i].message);
      res.status(400).json({ messages: messages });
    } else if (err instanceof ApplicationError) {
      res.status(err.status).json({ message: err.message });
    } else {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new HttpInterceptor();
