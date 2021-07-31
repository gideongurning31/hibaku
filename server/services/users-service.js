'use strict';
let self;
const Model = require('../models/index');
const AccountsModel = Model.Accounts;
const UsersInfoModel = Model.UsersInfo;
const RolesModel = Model.Roles;
const moment = require('moment');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const ApplicationError = require('../core/application-error');
const BasePagingService = require('../core/base-paging-service');

class UsersService extends BasePagingService {

  constructor() {
    super();
    self = this;
  }

  fetchAccounts(params) {
    return AccountsModel.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      where: { verified: true },
      attributes: { exclude: ['pass'] },
      include: [
        { model: UsersInfoModel, as: 'info' },
        { model: RolesModel, as: 'role' }
      ],
    }).then(result => self.generatePaging(result, params));
  }

  fetchUsers(params) {
    return UsersInfoModel.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      include: [{ model: AccountsModel, as: 'account', attributes: { exclude: ['userId', 'pass'] }}],
    }).then(result => self.generatePaging(result, params));
  }

  findByAccountName(username) {
    return AccountsModel.findOne({
      where: { userId: username },
      include: [{ model: RolesModel, as: 'role' }],
    });
  }

  registerUser(user) {
    if (user.userId) delete user.userId;
    user.birthDate = new Date(moment(user.birthDate, 'YYYYMMDD'));
    return UsersInfoModel.findOne({ where: { nik: user.nik }}).then(result => {
      if (result) throw new ApplicationError('NIK sudah terdaftar, silakan registrasi akun.');
      return UsersInfoModel.create(user);
    });
  }

  createAccount(payload) {
    let user;
    return AccountsModel.findOne({ where: { userId: payload.userId }})
      .then(user => {
        if (user) throw new ApplicationError(`User ID "${payload.userId}" sudah terdaftar.`);
        return UsersInfoModel.findOne({ where: { nik: payload.nik }});
      })
      .then(info => {
        if (!info) throw new ApplicationError(`NIK "${payload.nik}" belum terdaftar, silakan lakukan registrasi terlebih dahulu.`);
        if (info.dataValues.userId) throw new ApplicationError(`NIK "${payload.nik}" sudah terdaftar dengan User ID: "${info.dataValues.userId}"`);
        user = info.dataValues;
        user.userId = payload.userId;
        return AccountsModel.create({
          userId: payload.userId,
          pass: bcrypt.hashSync(payload.pass, bcrypt.genSaltSync(saltRounds)),
          displayName: info.lastName ? `${info.firstName}${info.lastName}` : info.firstName,
          roleId: parseInt(user.accountType),
          verified: false,
        });
      })
      .then(() => UsersInfoModel.update(user, { where: { nik: payload.nik }}));
  }

  async verifyAccount(userId, approval) {
    const user = await AccountsModel.findOne({ where: { userId }});
    if (!user) throw new ApplicationError(`Akun ID "${userId}" tidak ditemukan.`);
    user.verified = approval;
    return user.save({ fields: ['verified'] });
  }

  deleteAccount(userId) {
    return AccountsModel.destroy({ where: { userId }});
  }
}

module.exports = UsersService;
