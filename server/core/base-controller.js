'use strict';
let controller;

class BaseController {
  constructor() {
    this.router = require('express').Router();
    controller = this;
  }

  routes() {
    return this.router;
  }

  notImplemented(req, res) {
    console.log(req);
    res.status(405).json({ error: `Request method ${req.method} not allowed on '${process.env.BASE_URL + req.url}'` });
  }

  internalError(req, res) {
    res.status(500).json({ error: 'Server experienced an internal error.' });
  }
}

module.exports = BaseController;
