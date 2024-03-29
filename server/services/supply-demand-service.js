'use strict';
let self;
const uuid = require('uuid');
const Model = require('../models/index');
const AccountModel = Model.Accounts;
const UsersInfoModel = Model.UsersInfo;
const CommodityModel = Model.Commodities;
const SupplyDemandModel = Model.SupplyDemand;
const BasePagingService = require('../core/base-paging-service');

class SupplyDemandService extends BasePagingService {
  constructor() {
    super();
    self = this;
    self.includes = [
      { model: UsersInfoModel, as: 'userDetails' },
      { model: AccountModel, as: 'accountDetails', attributes: ['displayName', 'roleId'] },
      { model: CommodityModel, as: 'commodityDetails', attributes: ['name', 'type', 'unit', 'price'] },
    ];
  }

  getAllPaging(params) {
    return SupplyDemandModel.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      include: self.includes,
      order: [['createdDate', 'DESC']],
    }).then(result => self.generatePaging(result, params));
  }

  findById(id) {
    return SupplyDemandModel.findOne({ where: { id }, include: self.includes });
  }

  create(payload) {
    payload.id = uuid.v4();
    payload.createdDate = new Date();
    return SupplyDemandModel.create(payload);
  }

  delete(id) {
    return SupplyDemandModel.destroy({ where: { id } });
  }
}

module.exports = SupplyDemandService;
