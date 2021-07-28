let self;
const Model = require('../models/index');
const CommodityModel = Model.Commodities;

class CommodityService {
  constructor() {
    self = this;
  }

  getAll() {
    return CommodityModel.findAll();
  }

  create(payload) {
    if (payload.id) delete payload.id;
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
    return CommodityModel.destroy({ where: { id }});
  }
}

module.exports = CommodityService;
