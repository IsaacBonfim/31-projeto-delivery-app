const { Router } = require('express');
const OrderController = require('../controllers/orderController');

const OrderRouter = Router();

OrderRouter.get('', OrderController.getAll);
OrderRouter.get('/sale/:id', OrderController.getById);
OrderRouter.put('/sale/:id', OrderController.updateSale);
OrderRouter.get('/seller/:id', OrderController.getBySellerId);
OrderRouter.get('/customer/:id', OrderController.getByCostumerId);

module.exports = OrderRouter;
