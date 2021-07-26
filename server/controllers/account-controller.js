'use strict';
let self;
const BaseController = require('../core/base-controller');
const UsersService = new (require('../services/users-service'))();

class AccountController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/account').get(self.getAllAccount).all(self.notImplemented);
    self.router.route('/api/register').all(self.notImplemented);
  }

  getAllAccount(req, res, next) {
    UsersService.fetchAccounts()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

}

module.exports = new AccountController();
