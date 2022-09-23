const Joi = require('joi');
const md5 = require('md5');
const throwError = require('../utils/errorHandler');
const { Users } = require('../../database/models');

const RegisterService = {
  validateUser(user) {
    const schema = Joi.object({
      name: Joi.string().min(12).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(user);

    if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  async registerUser(body) {
    this.validateUser(body);

    const password = md5(body.password);
    const { name, email } = body;

    const user = await Users.create({ name, email, password, role: 'customer' });

    if (!user) return throwError('conflict', 'All fields must be filled correctly');

    return user;
  },
};

module.exports = RegisterService;
