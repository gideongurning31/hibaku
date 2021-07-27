'use strict';
let self;
const sequelize = require('sequelize');
const SqlValidationError = sequelize.ValidationError;
const SqlDatabaseError = sequelize.DatabaseError;
const ApplicationError = require('../core/application-error');

class HttpInterceptor {
  constructor() {
    self = this;
  }

  errorHandler(err, req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (err instanceof SqlValidationError) {
      let messages = [];
      for (let i = 0; i < err.errors.length; i++) messages.push(err.errors[i].message);
      res.status(400).json({ messages: messages });
    } else if (err instanceof SqlDatabaseError) {
      res.status(400).json({ messages: err.parent.sqlMessage });
    } else if (err instanceof ApplicationError) {
      res.status(200).json({ exception: true, message: err.message });
    } else {
      console.error('===[', err, ']===');
      res.status(500).json({ message: 'Server experienced an internal error.' });
    }
  }
}

module.exports = new HttpInterceptor();
