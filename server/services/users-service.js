const Model = require('../models/index');
const UsersModel = Model.Users;
const RolesModel = Model.Roles;
const bcrypt = require('bcrypt');
const saltRounds = parseInt(process.env.BCRYPT_SALT);

class UsersService {
  constructor() {}

  fetchUsers() {
    return UsersModel.findAll({ where: { verified: true } });
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

  fetchRoles() {
    return RolesModel.findAll({});
  }
}

module.exports = UsersService;
