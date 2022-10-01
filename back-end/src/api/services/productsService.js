// const fs = require('fs');
// const path = require('path');
const { Products } = require('../../database/models');

const findAll = async () => {
  const products = await Products.findAll();
  
  return products;
};

// const findById = async (params) => {
//   try {
//     const result = await Products.findByPk(params);
//     const { id, name, price, urlImage } = result;

//     return { id, name, price, urlImage };
//   } catch (error) {
//     return { status: 404, message: 'Product not found' };
//   }
// };

// const getImage = async (url) => {
//   const data = await fs.readFileSync(path.join(__dirname, `../../images/${url}`));

//   return data;
// };

module.exports = {
  findAll,
  // findById,
  // getImage,
};

// const ProductsService = {
//   async getAllProducts() {
//     const products = await Products.findAll({});

//     if (!products) return throwError('notFound', 'Empty');

//     return products;
//   },

//   async getOneProducts() {
//     const { id } = req.params;
//     const product = await Products.findOne({ where: { id } });

//     if (!product) return throwError('notFound', 'Empty');

//     return product;
//   },
// };

// module.exports = ProductsService;
