'use strict';
let self;
const BaseController = require('../core/base-controller');

class TestController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/test')
      .get(self.test)
      .all(self.notImplemented);
  }

  test(req, res, next) {
    res.status(200).json('You have reached this endpoint.');
  }
}

module.exports = new TestController();
