const RegisterService = require('../services/registerService');

const RegisterController = {
  async registerUser(req, res, next) {
    const { body } = req;

    try {
      const costumer = await RegisterService.registerUser(body);
      
      return res.status(201).json(costumer);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = RegisterController;
