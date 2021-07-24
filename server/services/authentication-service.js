let self;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/index').Users;

class AuthenticationService {
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtOptions = {
      algorithm: process.env.JWT_ALGORITHM,
      expiresIn: parseInt(process.env.TOKEN_EXP) * 1000,
      issuer: process.env.APP_NAME,
    };
    self = this;
  }

  login(user, pass) {
    return UsersModel.findOne({ where: { userId: user } }).then(user => {
      if (!user || !bcrypt.compareSync(pass, user.pass)) return 'Wrong username/password combination.';
      return this.generateJwt({ id: user.userId, name: user.displayName });
    });
  }

  generateJwt(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.jwtSecret, this.jwtOptions, (err, token) => {
        if (err || !token) reject(err);
        else resolve({ token });
      });
    });
  }
}

module.exports = AuthenticationService;
