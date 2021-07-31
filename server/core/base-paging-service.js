'use strict';
let service;
const ApplicationError = require('./application-error');

class BasePagingService {
  constructor() {
    service = this;
  }

  generatePaging(result, params) {
    const limit = params && params.limit ? params.limit : 10;
    const paging = {
      page: params && params.page ? params.page : 1,
      limit: limit < result.count ? limit : result.count,
      startRow: params.offset + 1,
      totalData: result.count,
      totalPage: Math.ceil(result.count / limit),
    };

    if (paging.page > paging.totalPage) {
      throw new ApplicationError('Page requested exceeds maximum page.');
    }
    return { paging, data: result.rows };
  }
}

module.exports = BasePagingService;
