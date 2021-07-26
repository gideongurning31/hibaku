const Model = require('../models/index');
const AccountsModel = Model.Accounts;
const UsersInfoModel = Model.UsersInfo;
const RolesModel = Model.Roles;
const moment = require('moment');
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);
const BadRequestError = require('../errors/bad-request-error');

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
    return UsersInfoModel.findOne({ where: { nik: user.nik } }).then((result) => {
      if (result) throw new BadRequestError(`NIK ${user.nik} sudah terdaftar.`);
      return UsersInfoModel.create(user);
    });
  }

  createAccount(payload) {
    let user;
    return UsersInfoModel.findOne({ where: { nik: payload.nik } })
      .then((info) => {
        if (!info) throw new BadRequestError(`NIK ${payload.nik} belum terdaftar.`);
        user = info.dataValues;
        user.userId = payload.userId;
        return AccountsModel.create({
          userId: payload.userId,
          pass: bcrypt.hashSync(payload.pass, bcrypt.genSaltSync(saltRounds)),
          displayName: info.lastName ? `${info.firstName} ${info.lastName}` : info.firstName,
          roleId: parseInt(user.accountType),
          verified: true,
        });
      })
      .then(() => UsersInfoModel.update(user, { where: { nik: payload.nik } }));
  }
}

module.exports = UsersService;
