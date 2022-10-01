const ProductsServices = require('../services/productsService');

const ProductsControler = {
  async getAllProducts(_req, res, next) {
    try {
      const products = await ProductsServices.findAll();

      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ProductsControler;
