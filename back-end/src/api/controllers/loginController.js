const LoginService = require('../services/loginService');

const LoginController = {
  async loginUser(req, res, next) {
    const { body } = req;

    try {
      const { token, id, role, name, email } = await LoginService.loginUser(body);
  
      return res.status(200).json({ token, id, role, name, email });
    } catch (error) {
        next(error);
    }
  },
};

module.exports = LoginController;