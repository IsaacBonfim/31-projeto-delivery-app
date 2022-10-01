const { Router } = require('express');
const ProductsController = require('../controllers/productsController');
const SalesController = require('../controllers/salesController');

const SalesRouter = Router();

SalesRouter.get('/products', ProductsController.getAllProducts);
SalesRouter.post('/orders', SalesController.createSale);

module.exports = SalesRouter;
