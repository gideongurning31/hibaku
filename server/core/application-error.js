'use strict';
class ApplicationError extends Error {
  constructor(message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'Something went wrong.';
  }
}

module.exports = ApplicationError;
