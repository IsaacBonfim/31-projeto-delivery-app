const LoginService = require('../services/loginService');

const LoginController = {
  async loginUser(req, res, next) {
    const { body } = req;

    try {
      const { token, id, role, name } = await LoginService.loginUser(body);
  
      return res.status(201).json({ token, id, role, name });
    } catch (error) {
        next(error);
    }
  },
};

module.exports = LoginController;