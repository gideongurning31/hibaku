'use strict';
let self;
const uuid = require('uuid');
const Model = require('../models/index');
const CommodityModel = Model.Commodities;
const UsersCommodityModel = Model.UsersCommodities;
const ApplicationError = require('../core/application-error');

class CommodityService {
  constructor() {
    self = this;
  }

  getAll() {
    return CommodityModel.findAll();
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
    return UsersCommodityModel.findOne({ where: { commodityId: id }})
      .then(result => {
        if (result) throw new ApplicationError(`Komoditas tidak dapat dihapus, karena masih digunakan dalam transaksi yang berlangsung.`);
        return CommodityModel.destroy({ where: { id } });
      });
  }
}

module.exports = CommodityService;
