const SalesService = require('../services/salesService');

const SalesController = {
  async createSale(req, res, next) {
    const { body } = req;

    try {
      const saleId = await SalesService.createSale(body);

      return res.status(200).json({ id: saleId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = SalesController;
