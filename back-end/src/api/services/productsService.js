const { Products } = require('../../database/models');
const throwError = require('../utils/errorHandler');

const ProductsService = {
  async getAllProducts() {
    const products = await Products.findAll({});

    if (!products) return throwError('notFound', 'Empty');

    return products;
  },
};

module.exports = ProductsService;
