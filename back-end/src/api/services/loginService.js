const Joi = require('joi');
const md5 = require('md5');
const throwError = require('../utils/errorHandler');
const createToken = require('../utils/token');
const { Users } = require('../../database/models');

const LoginService = {
  validateLogin(login) {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(login);

   if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  async loginUser(body) {
    this.validateLogin(body);

    const password = md5(body.password);
    const { email } = body;
    const login = await Users.findOne({ where: { email, password } });
    if (!login) return throwError('notFound', 'User not Found');
    const { dataValues: { id, name, role } } = login;
    
    const createdToken = createToken({ id, name, role, email });
    return createdToken;
  },
};

module.exports = LoginService;
