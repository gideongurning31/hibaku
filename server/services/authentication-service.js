let self;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserService = new (require('../services/users-service'))();
const ApplicationError = require('../core/application-error');

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

  login(userId, pass) {
    return UserService.findByAccountName(userId).then((user) => {
      if (!user || !bcrypt.compareSync(pass, user.pass)) {
        throw new ApplicationError('Kombinasi username / password salah.');
      }
      delete user.dataValues.pass;
      return this.generateJwt(user.dataValues);
    });
  }

  generateJwt(payload) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.jwtSecret, this.jwtOptions, (err, token) => {
        if (err || !token) reject(err);
        else resolve(token);
      });
    });
  }
}

module.exports = AuthenticationService;
