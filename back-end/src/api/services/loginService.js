const Joi = require('joi');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { readFile } = require('../utils/readFile');
const throwError = require('../utils/errorHandler');
const { Users } = require('../../database/models');

const secret = readFile();

const LoginService = {
  validateLogin(login) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(login);

   if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  // Usar na rota /login
  createToken({ id, name, role, email }) {
      const jwtConfig = { expiresIn: '21d', algorithm: 'HS256' };
      const payload = { data: { id, name, role, email } };
      const token = jwt.sign(payload, secret, jwtConfig);
      return { token, id, role, name };
  },

  async loginUser(body) {
    this.validateLogin(body);

    const password = md5(body.password);
    const { email } = body;
    const login = await Users.findOne({ where: { email, password } });
    if (!login) return throwError('conflict', 'All fields must be filled correctly');
    const { dataValues: { id, name, role } } = login;
    const createdToken = this.createToken({ id, name, role, email });
    return createdToken;
  },
};

module.exports = LoginService;