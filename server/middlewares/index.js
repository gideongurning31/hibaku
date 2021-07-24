'use strict';
const middlewaresBefore = require('./middlewares-before');
const middlewaresAfter = require('./middlewares-after');

module.exports.before = middlewaresBefore;
module.exports.after = middlewaresAfter;
