'use strict';
let self;
const BaseController = require('../core/base-controller');
const AuthService = new (require('../services/authentication-service'))();

class LoginController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/login').post(self.login).all(self.notImplemented);
  }

  login(req, res, next) {
    AuthService.login(req.body.username, req.body.password)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new LoginController();
