const Model = require('../models/index');
const UsersModel = Model.Users;
const UsersInfoModel = Model.UsersInfo;
const RolesModel = Model.Roles;
const bcrypt = require('bcrypt');
const moment = require('moment');
const BadRequestError = require('../errors/bad-request-error');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class UsersService {
  constructor() {}

  fetchUsers() {
    return UsersModel.findAll({ where: { verified: true } });
  }

  fetchUsersDetails() {
    return UsersInfoModel.findAll();
  }

  findByUsername(username) {
    return UsersModel.findOne({
      where: { userId: username },
      include: [{ model: RolesModel, attributes: [['id', 'roleId'], ['name', 'roleName']], as: 'roles' }]
    });
  }

  createUser(payload) {
    const salt = bcrypt.genSaltSync(saltRounds);
    payload.pass = bcrypt.hashSync(payload.pass, salt);
    return UsersModel.create(payload);
  }

  registerUser(user) {
    delete user.userId;
    user.birthDate = new Date(moment(user.birthDate, 'YYYYMMDD'));
    return UsersInfoModel.findOne({ where: { nik: user.nik } }).then((result) => {
      if (result) throw new BadRequestError(`NIK ${user.nik} sudah terdaftar.`);
      return UsersInfoModel.create(user);
    });
  }

  createAccount(payload) {
    let updatedUser;
    return UsersInfoModel.findOne({ where: { nik: payload.nik } })
      .then((info) => {
        if (!info) throw new BadRequestError(`NIK ${payload.nik} belum didaftarkan.`);
        updatedUser = info.dataValues;
        return this.createUser({
          userId: payload.userId,
          pass: payload.pass,
          displayName: info.lastName ? `${info.firstName} ${info.lastName}` : info.firstName,
          verified: true
        });
      })
      .then(() => {
        updatedUser.userId = payload.userId;
        return UsersInfoModel.update(updatedUser, { where: { nik: payload.nik } });
      });
  }

  fetchRoles() {
    return RolesModel.findAll({});
  }
}

module.exports = UsersService;
