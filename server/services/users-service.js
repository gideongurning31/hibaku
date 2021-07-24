const UsersModel = require('../models/index').Users;
const bcrypt = require('bcrypt');
const saltRounds = process.env.BCRYPT_SALT;

class UsersService {
  constructor() {}

  fetchUsers() {
    return UsersModel.findAll();
  }

  findByUsername(username) {
    return UsersModel.findOne({ where: { userId: username }});
  }

  createUser(payload) {
    const salt = bcrypt.genSaltSync(saltRounds);
    payload.pass = bcrypt.hashSync(payload.pass, salt);
    return UsersModel.create(payload);
  }
}

module.exports = UsersService;
