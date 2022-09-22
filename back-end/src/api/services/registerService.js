import Joi from 'joi';
import throwError from '../utils/errorHandler';

const md5 = require('md5');
const { User } = require('../../database/models/users');

const RegisterService = {
  validateUser: (user) => {
    const schema = Joi.object({
      name: Joi.string().min(12).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(user);

    if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  registerUser: async (body) => {
    RegisterService.validateUser(body);

    const password = md5(body.password);
    const { name, email } = body;

    const user = await User.create({ name, email, password, role: 'customer' });

    if (!user) return throwError('conflict', 'All fields must be filled correctly');
  },
};

export default RegisterService;
