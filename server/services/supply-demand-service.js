'use strict';
let self;
const uuid = require('uuid');
const Model = require('../models/index');
const UserModel = Model.Accounts;
const CommodityModel = Model.Commodities;
const UsersCommodityModel = Model.UsersCommodities;

class SupplyDemandService {
  constructor() {
    self = this;
    self.includes = [
      { model: UserModel, as: 'userDetails', attributes: ['displayName', 'roleId'] },
      { model: CommodityModel, as: 'commodityDetails', attributes: ['name', 'type', 'unit', 'price'] },
    ];
  }

  getAll() {
    return UsersCommodityModel.findAll({ include: self.includes, order: [['createdDate', 'ASC']] });
  }

  findById(id) {
    return UsersCommodityModel.findOne({ where: { id }, include: self.includes });
  }

  create(payload) {
    payload.id = uuid.v4();
    payload.createdDate = new Date();
    return UsersCommodityModel.create(payload);
  }

  delete(id) {
    return UsersCommodityModel.destroy({ where: { id }});
  }
}

module.exports = SupplyDemandService;
