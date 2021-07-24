'use strict';
const Loader = require('../core/common-loader');
const Router = require('express').Router();
const loader = new Loader();

loader.loadControllers();
let controllers = loader.getModules();
for (let controller in controllers) {
  controller = controllers[controller];
  Router.use(controller.routes());
}

module.exports = Router;
