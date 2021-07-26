'use strict';
let self;
const BaseController = require('../core/base-controller');
const UsersService = new (require('../services/users-service'))();

class RegisterController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/register').get(self.findAllRegisteration).post(self.registerUser).all(self.notImplemented);

    self.router.route('/api/create-account').post(self.createAccount).all(self.notImplemented);
  }

  findAllRegisteration(req, res, next) {
    UsersService.fetchUsersDetails()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  registerUser(req, res, next) {
    UsersService.registerUser(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  createAccount(req, res, next) {
    UsersService.createAccount(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new RegisterController();
