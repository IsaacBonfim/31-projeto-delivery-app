const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  saleId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'sale_id',
    references: {
      model: 'sales',
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    field: 'product_id',
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const SalesProducts = sequelize.define('SalesProducts', attributes, {
    tableName: 'salesProducts',
  });
  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Sales, { key: 'saleId', as: 'sale' });
  };
  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Products, { key: 'productId', as: 'product' });
  };
  return SalesProducts;
};
