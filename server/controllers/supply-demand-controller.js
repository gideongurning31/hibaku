'use strict';
let self;
const BaseController = require('../core/base-controller');
const SupplyDemandService = new (require('../services/supply-demand-service'))();

class SupplyDemandController extends BaseController {

  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/supply-demand').get(self.getAllPaging).post(self.create).all(self.notImplemented);
    self.router.route('/api/supply-demand/:id').get(self.findById).all(self.notImplemented);
    self.router.route('/api/supply-demand/delete/:id').get(self.delete).all(self.notImplemented);
  }

  getAllPaging(req, res, next) {
    return SupplyDemandService.getAllPaging(self.generatePaging(req.query))
      .then(result => res.status(200).json(result))
      .catch(next);
  }

  findById(req, res, next) {
    SupplyDemandService.findById(req.params.id)
      .then(result => res.status(200).json(result))
      .catch(next);
  }

  create(req, res, next) {
    SupplyDemandService.create(req.body)
      .then(result => res.status(200).json(result))
      .catch(next);
  }

  delete(req, res, next) {
    res.status(200).json(req.body);
  }
}

module.exports = new SupplyDemandController();
