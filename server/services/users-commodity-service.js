'use strict';
let self;
const uuid = require('uuid');
const Model = require('../models/index');
const UserModel = Model.Accounts;
const CommodityModel = Model.Commodities;
const UsersCommodityModel = Model.UsersCommodities;

class UsersCommodityService {
  constructor() {
    self = this;
    self.includes = [
      { model: UserModel, as: 'owner' },
      { model: CommodityModel, as: 'commodityDetails' },
    ];
  }

  getAll() {
    return UsersCommodityModel.findAll({ include: self.includes });
  }

  findById(id) {
    return UsersCommodityModel.findOne({ where: { id }, include: self.includes });
  }

  create(payload) {
    payload.id = uuid.v4();
    return UsersCommodityModel.create(payload);
  }

  delete(id) {
    return UsersCommodityModel.destroy({ where: { id } });
  }
}

module.exports = UsersCommodityService;
