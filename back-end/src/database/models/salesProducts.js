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
    timestamps: false,
  });
  SalesProducts.associate = (models) => {
    SalesProducts.belongsToMany(models.Sales, {
      through: SalesProducts,
      foreignKey: 'saleId',
      otherKey: 'productId',
      as: 'sale',
    });
  };
  SalesProducts.associate = (models) => {
    SalesProducts.belongsTo(models.Products, {
      through: SalesProducts,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'product'
    });
  };
  return SalesProducts;
};
