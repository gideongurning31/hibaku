'use strict';
let self;
const BaseController = require('../core/base-controller');
const UsersService = new (require('../services/users-service'))();

class LoginController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/login')
      .post(self.login)
      .all(self.notImplemented);

    self.router.route('/api/users')
      .get(self.fetchUsers)
      .post(self.createUser)
      .all(self.notImplemented);
  }

  login(req, res) {
    UsersService.login(req.body.username, req.body.password).then((result) => res.status(200).json(result));
  }

  fetchUsers(req, res) {
    UsersService.fetchUsers().then((result) => res.status(200).json(result));
  }

  createUser(req, res) {
    UsersService.createUser(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.error(err));
  }
}

module.exports = new LoginController();
