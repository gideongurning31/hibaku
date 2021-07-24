'use strict';
const path = require('path');
const reader = require('node-dir');

class Loader {
  constructor() {
    this.cachedModules = { controllers: null };
    this.modules = {};
  }

  getModules() {
    return this.modules;
  }

  getFiles(filepath, keyword) {
    return reader.files(filepath, { sync: true }).filter((file) => path.basename(file).toLowerCase().lastIndexOf(keyword) > -1 && path.extname(file).toLowerCase() === '.js');
  }

  getClasses(files) {
    this.modules = {};
    files.forEach((module) => {
      module = require(module);
      this.modules[module.constructor.name] = module;
    });
  }

  loadControllers() {
    if (this.cachedModules.controllers === null) {
      let files = path.join(process.env.APP_PATH, 'controllers');
      files = this.getFiles(files, 'controller');
      this.getClasses(files);
    } else {
      this.modules = this.cachedModules.controllers;
    }
  }
}

module.exports = Loader;
