const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  price: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: false
  },
  urlImage: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const products = sequelize.define('Products', attributes, { tableName: 'products' });
  products.associate = (models) => {
    products.hasMany(models.SalesProducts, { key: 'productId', as: 'product' });
  };
  return products;
};

//
