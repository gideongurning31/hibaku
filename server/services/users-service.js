const UsersModel = require('../models/index').Users;
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UsersService {
  constructor() {}

  fetchUsers() {
    return UsersModel.findAll();
  }

  findByUsername(username) {
    return UsersModel.findOne({ where: { userId: username }});
  }

  login(user, pass) {
    return this.findByUsername(user).then(user => {
      if (!user) return false;
      return bcrypt.compareSync(pass, user.pass);
    });
  }

  createUser(payload) {
    const salt = bcrypt.genSaltSync(saltRounds);
    payload.pass = bcrypt.hashSync(payload.pass, salt);
    return UsersModel.create(payload);
  }
}

module.exports = UsersService;
