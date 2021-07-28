'use strict';
let self;
const BaseController = require('../core/base-controller');
const CommodityService = new (require('../services/commodity-service'))();

class CommodityController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/commodity').get(self.getAll).post(self.create).all(self.notImplemented);
    self.router.route('/api/commodity/:id').post(self.update).delete(self.delete).all(self.notImplemented);
  }

  getAll(req, res, next) {
    return CommodityService.getAll()
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  create(req, res, next) {
    return CommodityService.create(req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  update(req, res, next) {
    return CommodityService.update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }

  delete(req, res, next) {
    return CommodityService.delete(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new CommodityController();
