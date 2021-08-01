'use strict';
let self;
const BaseController = require('../core/base-controller');
const TransactionService = new (require('../services/transaction-service'))();

class TransactionController extends BaseController {
  constructor() {
    super();
    self = this;
    self.registerRoutes();
  }

  registerRoutes() {
    self.router.route('/api/transaction/findCandidate/:commodityId/:type').get(self.findPossiblePairs).all(self.notImplemented);
  }

  findPossiblePairs(req, res, next) {
    TransactionService.findPossiblePairs(req.params.commodityId, req.params.type)
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
}

module.exports = new TransactionController();
