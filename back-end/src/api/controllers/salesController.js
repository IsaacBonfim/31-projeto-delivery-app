const SalesService = require('../services/salesService');

const SalesController = {
  async createSale(req, res, next) {
    const { body, headers } = req;

    try {
      const saleId = await SalesService.createSale(body, headers);

      return res.status(201).json({ id: saleId });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  async sellerList(_req, res) {
    const sellers = await SalesService.sellerList();

    return res.status(200).json(sellers);
  },
};

module.exports = SalesController;
