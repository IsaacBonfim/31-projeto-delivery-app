const LoginService = require('../services/loginService');
const OrderServices = require('../services/orderService');
const SalesService = require('../services/salesService');

const OrderController = {
  async getAll(_req, res, next) {
    try {
      const orders = await OrderServices.getAll();

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    const { params } = req;

    try {
      OrderServices.validateId(params);
      const id = Number(params.id);

      const { sellerId, saleDate, status, totalPrice } = await OrderServices.getById(id);
      const sellerName = await LoginService.getNameById(sellerId);
      const products = await SalesService.getProductsBySaleId(id);

      const orders = {
        id,
        sellerName,
        saleDate,
        status,
        totalPrice,
        products,
      };

      return res.status(200).json(orders);
    } catch (error) { next(error); }
  },

  async getByCostumerId(req, res, next) {
    const { params } = req;

    try {
      OrderServices.validateId(params);
      const id = Number(params.id);

      const orders = await OrderServices.getByCostumerId(id);

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },

  async getBySellerId(req, res, next) {
    const { params } = req;

    try {
      OrderServices.validateId(params);
      const id = Number(params.id);

      const orders = await OrderServices.getBySellerId(id);
      
      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = OrderController;
