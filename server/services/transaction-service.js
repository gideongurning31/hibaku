'use strict';
let self;
const Model = require('../models/index');
const SupplyDemandModel = Model.SupplyDemand;
const ApplicationError = require('../core/application-error');

class TransactionService {
  constructor() {
    self = this;
  }

  async findPossiblePairs(commodityId, requestType) {
    const type = requestType === 'DEMAND' ? 'SUPPLY' : 'DEMAND';
    const match = await SupplyDemandModel.findAndCountAll({ where: { commodityId, type }});
    if (match.count === 0) {
      throw new ApplicationError(`Kandidat ${type === 'SUPPLY' ? 'Pemasok' : 'Penerima'} Hibah tidak ditemukan.`);
    }
    return `Ditemukan ${match.count} kandidat untuk transaksi hibah.`;
  }
}

module.exports = TransactionService;
