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
    self.router.route('/api/user').get(self.getAllUser).post(self.registerUser).all(self.notImplemented);
    self.router.route('/api/account').get(self.getAllAccount).post(self.createAccount).all(self.notImplemented);
    self.router.route('/api/account/verify').post(self.verifyAccount).all(self.notImplemented);
  }

  getAllAccount(req, res, next) {
    UsersService.fetchAccounts(self.generatePaging(req.query))
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  createAccount(req, res, next) {
    UsersService.createAccount(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  verifyAccount(req, res, next) {
    UsersService.verifyAccount(req.body.userId, req.body.approval)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  getAllUser(req, res, next) {
    UsersService.fetchUsers(self.generatePaging(req.query))
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  registerUser(req, res, next) {
    UsersService.registerUser(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new AccountController();
