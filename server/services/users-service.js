const Model = require('../models/index');
const AccountsModel = Model.Accounts;
const UsersInfoModel = Model.UsersInfo;
const RolesModel = Model.Roles;
const moment = require('moment');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const ApplicationError = require('../core/application-error');

class UsersService {
  constructor() {}

  fetchAccounts() {
    return AccountsModel.findAll({
      where: { verified: true },
      include: [{ model: RolesModel, as: 'role' }],
    });
  }

  fetchUsers() {
    return UsersInfoModel.findAll();
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
          displayName: info.lastName ? `${info.firstName} ${info.lastName}` : info.firstName,
          roleId: parseInt(user.accountType),
          verified: false,
        });
      })
      .then(() => UsersInfoModel.update(user, { where: { nik: payload.nik }}));
  }

  verifyAccount(userId, approval) {
    if (!approval) return this.deleteAccount(userId);
    return AccountsModel.findOne({ where: { userId }}).then(user => {
      if (!user) throw new ApplicationError(`Akun ID "${userId}" tidak ditemukan.`);
      user = user.dataValues;
      user.verified = true;
      return AccountsModel.update(user, { where: { userId }});
    });
  }

  deleteAccount(userId) {
    return AccountsModel.destroy({ where: { userId }});
  }
}

module.exports = UsersService;
