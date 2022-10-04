const Joi = require('joi');
const throwError = require('../utils/errorHandler');
const { validateToken } = require('../utils/token');
const { Products, Sales, Users, SalesProducts } = require('../../database/models');

const SalesService = {
  validateSaleProduct(saleProduct) {
    const schema = Joi.object({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    });

    const { error } = schema.validate(saleProduct);

    if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  validateSale(sale) {
    const schema = Joi.object({
      userId: Joi.number().required(),
      sellerId: Joi.number().required(),
      totalPrice: Joi.number().required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.number().required(),
      salesProducts: Joi.array().required(),
    });

    const { error } = schema.validate(sale);

    if (error) return throwError('conflict', 'All fields must be filled correctly');
  },

  async productVerify(saleProduct) {
    this.validateSaleProduct(saleProduct);

    const id = saleProduct.productId;
    const product = await Products.findOne({ where: { id }, raw: true });

    if (!product) return throwError('conflict', 'Product not exists!');
  },

  async userAndSellerVerify(sale) {
    this.validateSale(sale);
    const { userId, sellerId } = sale;

    const user = await Users.findOne({ where: { id: userId, role: 'customer' } });
    if (!user) return throwError('conflict', 'User not exists!');

    const seller = await Users.findOne({ where: { id: sellerId, role: 'seller' } });
    if (!seller) return throwError('conflict', 'Seller not exists!');
  },

  async createSaleProduct(saleId, saleProduct) {
    await this.productVerify(saleProduct);

    const { productId, quantity } = saleProduct;

    const created = await SalesProducts.create({ saleId, productId, quantity });
    if (!created) return throwError('conflict', 'Error in products!');

    return created;
  },

  async createSale(body, headers) {
    validateToken(headers);
    await this.userAndSellerVerify(body);
    let sale;

    const { status, salesProducts } = body;
    
    if (status) {
      const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = body;
      const saleValues = { userId, sellerId, status, totalPrice, deliveryAddress, deliveryNumber };
      sale = await Sales.create({ ...saleValues });
    } else {
      const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber } = body;
      const saleValues = { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber };
      sale = await Sales.create({ ...saleValues });
    }
    
    const { id } = sale;

    await Promise.all(salesProducts.map(
      async (saleProduct) => this.createSaleProduct(id, saleProduct),
    ));

    return id;
  },

  async sellerList() {
    const role = 'seller'
    const sellers = await Users.findAll({ where: { role }, raw: true });

    return sellers;
  },
};

module.exports = SalesService;
