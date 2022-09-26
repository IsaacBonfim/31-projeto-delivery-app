const Joi = require('joi');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const throwError = require('../utils/errorHandler');
const { Users } = require('../../database/models');

const secret = process.env.JWT_SECRET;

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
  createToken({ id, name }) {
      const jwtConfig = { expiresIn: '21d', algorithm: 'HS256' };
      const payload = { data: { id, name } };
      const token = jwt.sign(payload, secret, jwtConfig);
      return token;
  },

  async loginUser(body) {
      console.log("fdp");
    this.validateLogin(body);

    const password = md5(body.password);
    const { email } = body;

    const login = await Users.findOne({ email, password });

    if (!login) return throwError('conflict', 'All fields must be filled correctly');
    const createdToken = this.createToken(login);
    return createdToken;
  },
};

module.exports = LoginService;