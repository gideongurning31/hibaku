'use strict';
let self;
const BaseController = require('../core/base-controller');
const AuthService = new (require('../services/authentication-service'))();
const UsersService = new (require('../services/users-service'))();

class LoginController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/login').post(self.login).all(self.notImplemented);

    self.router.route('/api/users').get(self.fetchUsers).post(self.createUser).all(self.notImplemented);

    self.router.route('/api/users/:userId').get(self.findUserById).all(self.notImplemented);

    self.router.route('/api/roles').get(self.fetchRoles).all(self.notImplemented);
  }

  login(req, res, next) {
    AuthService.login(req.body.username, req.body.password)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  fetchUsers(req, res, next) {
    UsersService.fetchUsers()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  findUserById(req, res, next) {
    UsersService.findByUsername(req.params.userId)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  createUser(req, res, next) {
    UsersService.createUser(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  fetchRoles(req, res, next) {
    UsersService.fetchRoles()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new LoginController();
