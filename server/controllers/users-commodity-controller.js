'use strict';
let self;
const BaseController = require('../core/base-controller');
const UsersCommodityService = new (require('../services/users-commodity-service'))();

class UsersCommodityController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/users-commodities').get(self.getAll).post(self.create).all(self.notImplemented);
    self.router.route('/api/users-commodities/:id').get(self.findById).all(self.notImplemented);
    self.router.route('/api/users-commodities/delete/:id').get(self.delete).all(self.notImplemented);
  }

  getAll(req, res, next) {
    UsersCommodityService.getAll()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  findById(req, res, next) {
    UsersCommodityService.findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  create(req, res, next) {
    res.status(200).json(req.body);
  }

  delete(req, res, next) {
    res.status(200).json(req.body);
  }
}

module.exports = new UsersCommodityController();
