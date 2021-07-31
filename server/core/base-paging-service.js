'use strict';
let service;

class BasePagingService {
  constructor() {
    service = this;
  }

  generatePaging(result, params) {
    const page = params && params.page ? params.page : 1;
    const limit = params && params.limit ? params.limit : 10;
    const totalData = result.count;
    const totalPage = Math.ceil(result.count / limit);
    const paging = { page, limit: limit < totalData ? limit : totalData, totalData, totalPage };
    return { paging, data: result.rows };
  }
}

module.exports = BasePagingService;
