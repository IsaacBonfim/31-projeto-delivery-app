const LoginService = require('../services/loginService');

const LoginController = {
  async loginUser(req, res, next) {
    const { body } = req;

    try {
        
      const login = await LoginService.loginUser(body);
      
      return res.status(201).json(login);
    } catch (error) {
        console.log("passou por aqui");
        next(error);
    }
  },
};

module.exports = LoginController;