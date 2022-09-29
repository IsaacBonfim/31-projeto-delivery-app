const { Router } = require('express');
const SalesController = require('../controllers/salesController');

const SalesRouter = Router();

SalesRouter.post('/orders', SalesController.createSale);

module.exports = SalesRouter;
