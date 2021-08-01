'use strict';
let self;
const uuid = require('uuid');
const Model = require('../models/index');
const CommodityModel = Model.Commodities;
const SupplyDemandModel = Model.SupplyDemand;
const ApplicationError = require('../core/application-error');
const BasePagingService = require('../core/base-paging-service');

class CommodityService extends BasePagingService {

  constructor() {
    super();
    self = this;
  }

  getAll() {
    return CommodityModel.findAll({
      order: [['type', 'ASC'], ['price', 'DESC']]
    });
  }

  getAllPaging(params) {
    return CommodityModel.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      order: [['type', 'ASC'], ['price', 'DESC']],
    }).then(result => self.generatePaging(result, params));
  }

  create(payload) {
    payload.id = uuid.v4();
    return CommodityModel.create(payload);
  }

  async update(id, payload) {
    delete payload.id;
    const fields = [];
    const item = await CommodityModel.findOne({ where: { id }});
    Object.keys(payload).forEach((key) => {
      if (key in CommodityModel.rawAttributes) {
        item[key] = payload[key];
        fields.push(key);
      }
    });
    return item.save({ fields });
  }

  delete(id) {
    return SupplyDemandModel.findOne({ where: { commodityId: id }})
      .then(result => {
        if (result) throw new ApplicationError(`Komoditas tidak dapat dihapus, karena masih digunakan dalam transaksi yang berlangsung.`);
        return CommodityModel.destroy({ where: { id } });
      });
  }
}

module.exports = CommodityService;
