const Joi = require('joi');
const throwError = require('../utils/errorHandler');
const { Sales } = require('../../database/models');

const OrderServices = {
  validateId(params) {
    const schema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = schema.validate(params);

    if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  async getAll() {
    const orders = await Sales.findAll({});

    if (!orders || orders.length === 0) return throwError('notFound', 'Orders not found!');

    return orders;
  },

  async getById(id) {
    const orders = await Sales.findOne({ where: { id }, raw: true });

    if (!orders) return throwError('notFound', 'Sale not found!');

    return orders;
  },

  async getByCostumerId(id) {
    const orders = await Sales.findAll({ where: { userId: id }, raw: true });

    if (!orders || orders.length === 0) return throwError('notFound', 'Costumer not found!');

    return orders;
  },

  async getBySellerId(id) {
    const orders = await Sales.findAll({ where: { sellerId: id }, raw: true });

    if (!orders || orders.length === 0) return throwError('notFound', 'Seller not found!');

    return orders;
  },
};

module.exports = OrderServices;
